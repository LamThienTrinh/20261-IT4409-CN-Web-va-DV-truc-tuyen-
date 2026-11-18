const USERS_URL = "users.json";

function emptyUser() {
  return {
    name: "", username: "", email: "",
    address: { street: "", suite: "", city: "" },
    phone: "", website: ""
  };
}

function copyUser(user) {
  return {
    ...user,
    address: {
      ...user.address,
      ...(user.address?.geo ? { geo: { ...user.address.geo } } : {})
    },
    ...(user.company ? { company: { ...user.company } } : {})
  };
}

function changeField(user, field, value) {
  if (["street", "suite", "city"].includes(field)) {
    return { ...user, address: { ...user.address, [field]: value } };
  }
  return { ...user, [field]: value };
}

function normalizeUser(user) {
  const result = copyUser(user);
  for (const field of ["name", "username", "email", "phone", "website"]) {
    result[field] = (result[field] || "").trim();
  }
  for (const field of ["street", "suite", "city"]) {
    result.address[field] = (result.address[field] || "").trim();
  }
  return result;
}

function validateUser(user) {
  if (!user.name.trim()) return { field: "name", message: "Vui lòng nhập họ và tên." };
  if (!user.username.trim()) return { field: "username", message: "Vui lòng nhập tên đăng nhập." };
  if (user.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email.trim())) {
    return { field: "email", message: "Email chưa đúng định dạng, ví dụ ten@example.com." };
  }
  return null;
}

function matchesKeyword(user, keyword) {
  const query = keyword.trim().toLowerCase();
  return user.name.toLowerCase().includes(query) || user.username.toLowerCase().includes(query);
}

// App giữ hai state được chia sẻ; con gửi dữ liệu qua callback props.
function App() {
  const [kw, setKeyword] = React.useState("");
  const [newUser, setNewUser] = React.useState(null);
  const clearNewUser = React.useCallback(() => setNewUser(null), []);

  return (
    <>
      <header className="page-heading">
        <p className="eyebrow">Bài tập 06 · React CRUD</p>
        <h1>Quản lý người dùng</h1>
        <p className="intro">Tìm người dùng, cập nhật thông tin và quản lý danh sách trong một nơi.</p>
      </header>
      <section className="directory" aria-labelledby="directory-title">
        <div className="directory-toolbar">
          <SearchForm value={kw} onChangeValue={setKeyword} />
          <AddUser onAdd={setNewUser} />
        </div>
        <ResultTable keyword={kw} user={newUser} onAdded={clearNewUser} />
      </section>
    </>
  );
}

function SearchForm({ value, onChangeValue }) {
  return (
    <form className="search-form" role="search" onSubmit={event => event.preventDefault()}>
      <label htmlFor="user-search">Tìm kiếm người dùng</label>
      <div className="search-control">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" />
        </svg>
        <input id="user-search" type="search" value={value} placeholder="Tên hoặc tên đăng nhập…"
          onChange={event => onChangeValue(event.target.value)} aria-describedby="result-count" />
        {value && <button className="clear-search" type="button" onClick={() => onChangeValue("")} aria-label="Xóa từ khóa tìm kiếm">×</button>}
      </div>
    </form>
  );
}

function UserModal({ mode, draft, error, onChange, onSubmit, onCancel }) {
  const dialogRef = React.useRef(null);
  const title = mode === "add" ? "Thêm người dùng" : "Sửa người dùng";
  const fields = [
    { key: "name", label: "Họ và tên", required: true, autoComplete: "name" },
    { key: "username", label: "Tên đăng nhập", required: true, autoComplete: "off" },
    { key: "email", label: "Email", type: "email", autoComplete: "email" },
    { key: "phone", label: "Số điện thoại", type: "tel", autoComplete: "tel" },
    { key: "street", label: "Đường", nested: true, autoComplete: "address-line1" },
    { key: "suite", label: "Căn hộ / phòng", nested: true, autoComplete: "address-line2" },
    { key: "city", label: "Thành phố", nested: true, autoComplete: "address-level2" },
    { key: "website", label: "Website", autoComplete: "url", placeholder: "example.com" }
  ];

  React.useEffect(() => {
    const trigger = document.activeElement;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    dialog.querySelector("input")?.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus();
      else document.getElementById("user-search")?.focus();
    };
  }, []);

  React.useEffect(() => {
    if (error) document.getElementById(`${mode}-${error.field}`)?.focus();
  }, [error, mode]);

  return (
    <dialog className="user-modal" ref={dialogRef} aria-labelledby={`${mode}-title`} aria-describedby={`${mode}-hint`}
      onCancel={event => { event.preventDefault(); onCancel(); }}>
      <form noValidate onSubmit={event => { event.preventDefault(); onSubmit(); }}>
        <div className="modal-heading">
          <div><p className="eyebrow">Thông tin người dùng</p><h2 id={`${mode}-title`}>{title}</h2></div>
          <button className="close-modal" type="button" onClick={() => onCancel()} aria-label="Đóng biểu mẫu">×</button>
        </div>
        <p className="form-hint" id={`${mode}-hint`}>Các trường có dấu <span aria-hidden="true">*</span> là bắt buộc. Thông tin còn lại có thể bổ sung sau.</p>
        {error && <p className="form-error" id={`${mode}-error`} role="alert">{error.message}</p>}
        <div className="form-grid">
          {fields.map(field => (
            <div className="field" key={field.key}>
              <label htmlFor={`${mode}-${field.key}`}>{field.label}{field.required && <span className="required" aria-hidden="true"> *</span>}</label>
              <input id={`${mode}-${field.key}`} name={field.key} type={field.type || "text"}
                value={(field.nested ? draft.address[field.key] : draft[field.key]) || ""}
                onChange={event => onChange(field.key, event.target.value)}
                required={field.required} autoComplete={field.autoComplete} placeholder={field.placeholder}
                maxLength={field.key === "email" ? 254 : 160}
                aria-invalid={error?.field === field.key || undefined}
                aria-describedby={error?.field === field.key ? `${mode}-error` : undefined} />
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <button className="button button-secondary" type="button" onClick={() => onCancel()}>Hủy</button>
          <button className="button" type="submit">{mode === "add" ? "Thêm người dùng" : "Lưu thay đổi"}</button>
        </div>
      </form>
    </dialog>
  );
}

function AddUser({ onAdd }) {
  const [adding, setAdding] = React.useState(false);
  const [draft, setDraft] = React.useState(emptyUser);
  const [error, setError] = React.useState(null);

  function openForm() {
    setDraft(emptyUser());
    setError(null);
    setAdding(true);
  }

  function handleAdd() {
    const problem = validateUser(draft);
    if (problem) { setError(problem); return; }
    onAdd(normalizeUser(draft));
    setDraft(emptyUser());
    setError(null);
    setAdding(false);
  }

  return (
    <>
      <button className="button add-button" type="button" onClick={openForm}>
        <span aria-hidden="true">＋</span> Thêm người dùng
      </button>
      {adding && <UserModal mode="add" draft={draft} error={error}
        onChange={(field, value) => setDraft(previous => changeField(previous, field, value))}
        onSubmit={handleAdd} onCancel={() => setAdding(false)} />}
    </>
  );
}

function ResultTable({ keyword, user, onAdded }) {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [editing, setEditing] = React.useState(null);
  const [editError, setEditError] = React.useState(null);
  const [notice, setNotice] = React.useState("");
  const nextLocalId = React.useRef(1);
  const activeRequest = React.useRef(null);

  async function loadUsers() {
    activeRequest.current?.abort();
    const controller = new AbortController();
    activeRequest.current = controller;
    setLoading(true);
    setError("");
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(USERS_URL, { signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data) || !data.every(person => typeof person.id === "number" && typeof person.name === "string" && typeof person.username === "string")) {
        throw new Error("Dữ liệu trả về không phải danh sách người dùng hợp lệ.");
      }
      // Giữ các người dùng được thêm trong lúc yêu cầu mạng đang chạy.
      setUsers(previous => [...data.map(copyUser), ...previous.filter(person => String(person.id).startsWith("local-"))]);
    } catch (problem) {
      if (activeRequest.current !== controller) return;
      setError(problem.name === "AbortError"
        ? "Yêu cầu tải dữ liệu đã hết thời gian chờ. Bạn có thể thử lại."
        : "Chưa tải được danh sách sinh viên. Kiểm tra kết nối rồi thử lại.");
    } finally {
      window.clearTimeout(timeout);
      if (activeRequest.current === controller) setLoading(false);
    }
  }

  React.useEffect(() => {
    loadUsers();
    return () => { activeRequest.current?.abort(); activeRequest.current = null; };
  }, []);

  React.useEffect(() => {
    if (user) {
      // Tách mã người dùng mới khỏi MSSV trong danh sách ban đầu.
      const added = { ...copyUser(user), id: `local-${nextLocalId.current++}` };
      setUsers(previous => [...previous, added]);
      setNotice(`Đã thêm ${added.name}. Bộ lọc tìm kiếm hiện tại vẫn được giữ.`);
      onAdded();
    }
  }, [user, onAdded]);

  function editUser(person) {
    setEditing(copyUser(person));
    setEditError(null);
  }

  function saveUser() {
    const problem = validateUser(editing);
    if (problem) { setEditError(problem); return; }
    const saved = normalizeUser(editing);
    setUsers(previous => previous.map(person => person.id === saved.id ? copyUser(saved) : person));
    setNotice(`Đã cập nhật ${saved.name}.`);
    setEditing(null);
    setEditError(null);
  }

  function removeUser(person) {
    setUsers(previous => previous.filter(item => item.id !== person.id));
    setNotice(`Đã xóa ${person.name}.`);
  }

  const filteredUsers = users.filter(person => matchesKeyword(person, keyword));

  return (
    <>
      <div className="table-heading">
        <div><h2 id="directory-title">Danh sách người dùng</h2><p id="result-count" role="status">{loading ? "Đang tải danh sách…" : `Đang hiển thị ${filteredUsers.length}/${users.length} người dùng`}</p></div>
        <span className="source-badge"><span aria-hidden="true"></span>Danh sách sinh viên</span>
      </div>
      <p className="notice" role="status" aria-live="polite">{notice}</p>
      {error && <div className="fetch-error" role="alert"><p>{error}</p><button className="button button-secondary" type="button" onClick={() => loadUsers()}>Thử tải lại</button></div>}
      {loading && <div className="loading-panel" role="status"><span className="loading-dot" aria-hidden="true"></span>Đang tải danh sách sinh viên…</div>}
      {!loading && users.length === 0 && !error && <div className="empty-state"><h3>Danh sách đang trống</h3><p>Thêm người dùng để bắt đầu.</p></div>}
      {!loading && users.length > 0 && filteredUsers.length === 0 && <div className="empty-state"><h3>Không tìm thấy người dùng</h3><p>Thử một tên khác hoặc xóa từ khóa tìm kiếm.</p></div>}
      {filteredUsers.length > 0 && <>
        <p className="scroll-hint">Vuốt ngang để xem đầy đủ thông tin và thao tác.</p>
        <div className="table-scroll" role="region" aria-label="Bảng người dùng, có thể cuộn ngang" tabIndex="0">
          <table>
            <caption className="sr-only">Người dùng khớp từ khóa tìm kiếm. Mỗi dòng có nút sửa và xóa.</caption>
            <thead><tr><th scope="col">ID</th><th scope="col">Họ và tên</th><th scope="col">Tên đăng nhập</th><th scope="col">Email</th><th scope="col">Địa chỉ</th><th scope="col">Điện thoại</th><th scope="col">Thao tác</th></tr></thead>
            <tbody>
              {filteredUsers.map(person => <tr key={person.id} data-user-id={person.id}>
                <td className="id-cell">{person.id}</td>
                <th scope="row" className="person-name">{person.name}</th>
                <td><span className="username">{person.username}</span></td>
                <td>{person.email || <span className="missing">Chưa có</span>}</td>
                <td className="address-cell">{[person.address?.street, person.address?.suite, person.address?.city].filter(Boolean).join(", ") || <span className="missing">Chưa có</span>}</td>
                <td>{person.phone || <span className="missing">Chưa có</span>}</td>
                <td><div className="row-actions">
                  <button className="row-button" type="button" onClick={() => editUser(person)} aria-label={`Sửa ${person.name}`}>Sửa</button>
                  <button className="row-button delete-button" type="button" onClick={() => removeUser(person)} aria-label={`Xóa ${person.name}`}>Xóa</button>
                </div></td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </>}
      {editing && <UserModal mode="edit" draft={editing} error={editError}
        onChange={(field, value) => setEditing(previous => changeField(previous, field, value))}
        onSubmit={saveUser} onCancel={() => { setEditing(null); setEditError(null); }} />}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
