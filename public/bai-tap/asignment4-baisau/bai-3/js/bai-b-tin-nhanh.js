/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------

// F1. Bộ đếm "Đang hiển thị x/y tin" trong #bo-dem.
const danhSach = document.getElementById("list");
const oTimKiem = document.getElementById("o-tim-kiem");
const boDem = document.getElementById("bo-dem");
const khongThay = document.getElementById("khong-thay");
const oTieuDe = document.getElementById("tin-tieu-de");
const oNoiDung = document.getElementById("tin-noi-dung");
const baoLoi = document.getElementById("bao-loi");

function capNhatBoDem() {
	const cacTin = danhSach.querySelectorAll("li");
	const soHien = Array.from(cacTin).filter(tin => !tin.classList.contains("an")).length;
	boDem.textContent = `Đang hiển thị ${soHien}/${cacTin.length} tin`;
	return soHien;
}

// F2 + F3. Lọc tin khi gõ vào #o-tim-kiem (sự kiện keyup) và thông báo #khong-thay.
function locTin() {
	const tuKhoa = oTimKiem.value;
	const tuKhoaThuong = tuKhoa.toLowerCase();
	for (const tin of danhSach.querySelectorAll("li")) {
		const tieuDe = tin.querySelector("h3").textContent;
		const noiDung = tin.querySelector("p").textContent;
		const khop = tieuDe.toLowerCase().includes(tuKhoaThuong) ||
			noiDung.toLowerCase().includes(tuKhoaThuong);
		tin.classList.toggle("an", !khop);
	}
	const soHien = capNhatBoDem();
	khongThay.classList.toggle("an", soHien > 0);
	khongThay.textContent = soHien === 0 ? `Không tìm thấy tin nào cho "${tuKhoa}"` : "";
}

oTimKiem.addEventListener("keyup", locTin);

// F4. Nút "Read more >>" / "Thu gọn <<" — MỘT trình lắng nghe đặt trên #list.
danhSach.addEventListener("click", (e) => {
	const nut = e.target.closest("button.more");
	if (!nut || !danhSach.contains(nut)) {
		return;
	}
	const tin = nut.closest("li");
	const doanVan = tin.querySelector("p");
	const dangMo = doanVan.classList.toggle("day-du");
	nut.textContent = dangMo ? "Thu gọn <<" : "Read more >>";
});

// F5. Nút #nut-dang: kiểm tra dữ liệu, tạo <li> mới, chèn vào đầu #list.
document.getElementById("nut-dang").addEventListener("click", () => {
	const tieuDe = oTieuDe.value;
	const noiDung = oNoiDung.value;
	if (tieuDe.trim() === "" || noiDung.trim() === "") {
		baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
		return;
	}

	const tin = document.createElement("li");
	const ngay = document.createElement("span");
	ngay.className = "time";
	ngay.textContent = homNay();
	const tieuDeTin = document.createElement("h3");
	tieuDeTin.textContent = tieuDe;
	const noiDungTin = document.createElement("p");
	noiDungTin.textContent = noiDung;
	const nut = document.createElement("button");
	nut.type = "button";
	nut.className = "more";
	nut.textContent = "Read more >>";
	tin.append(ngay, tieuDeTin, noiDungTin, nut);
	danhSach.prepend(tin);

	oTieuDe.value = "";
	oNoiDung.value = "";
	baoLoi.textContent = "";
	locTin();
});

locTin();
