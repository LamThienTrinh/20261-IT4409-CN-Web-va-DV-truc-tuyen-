# Assignment 02 — HTML, form, media và semantic HTML5

## Thông tin sinh viên

- Họ và tên: Trịnh Thiên Lam
- MSSV: 20235359
- Ngày sinh: 25/06/2005
- Giới tính, email và lớp: chưa được cung cấp

## 1. Kết quả phát hiện lỗi trong `news_wrong.html`

1. Dòng 1 — `<!DOCTYPE HTML5>`: sai khai báo doctype. Sửa thành `<!DOCTYPE html>`.
2. Dòng 5 — `<meta charset="UTF-88">`: sai tên bảng mã. Sửa thành `UTF-8`.
3. Dòng 6 — thẻ `<title>` thiếu `</title>`.
4. Dòng 9 — `<boby>` viết sai tên thẻ. Sửa thành `<body>`.
5. Dòng 19 — ảnh logo thiếu thuộc tính `alt`.
6. Dòng 24 — thẻ `input` thiếu dấu `>` kết thúc.
7. Dòng 27 — mở bằng `<div id="header">` nhưng đóng bằng `</section>`. Sửa thành `</div>`.
8. Dòng 33 — `class="time'` dùng dấu nháy không khớp. Sửa thành `class="time"`.
9. Dòng 34 — `<h7>` không phải heading HTML hợp lệ. Sửa thành `<h3>`.
10. Dòng 45 — đoạn văn của tin thứ hai thiếu `</p>` trước liên kết “Read more”.
11. Dòng 53 — liên kết “Read more” thiếu `</a>`.
12. Dòng 71 — danh sách mở bằng `<ul>` nhưng đóng bằng `</ol>`. Sửa thành `</ul>`.

Phiên bản đã sửa: [`website/news_fixed.html`](website/news_fixed.html).

## 2. Prompt CRAFT kiểm tra `blog_wrong.html`

### Context

Tôi có `blog.html` là bản tham khảo và `blog_wrong.html` là bản được cố ý chèn lỗi HTML. Một số lỗi vẫn được trình duyệt tự khôi phục nên giao diện có thể trông gần như bình thường. Tuy nhiên, không phải mọi khác biệt so với file tham khảo đều là lỗi.

### Role

Bạn là Senior Front-end Developer am hiểu HTML5, DOM, content model, thuộc tính, quy tắc lồng thẻ và cơ chế HTML parser tự khôi phục mã sai.

### Action

Đọc toàn bộ hai file, xác định từng lỗi thực sự trong `blog_wrong.html`, giải thích nguyên nhân và sửa theo nguyên tắc minimum changes. Không được sửa chỉ vì cách viết khác `blog.html`.

Bảo vệ các trường hợp hợp lệ sau:

- `meta charset="utf8"` là nhãn mã hóa được trình duyệt nhận diện.
- `<i>free</i>` vẫn là phần tử HTML hợp lệ.
- URL `blog.html?page=2&sort=new` không tạo thành character reference và không được tự ý đổi chỉ vì có dấu `&`.
- `href=""` là liên kết rỗng hợp lệ.
- Các void element như `img`, `input`, `meta`, `link` không cần thẻ đóng riêng.
- Liên kết rỗng nội dung có thể được CSS dùng làm icon.

### Format

Chia kết quả thành:

1. Các lỗi cần sửa — ghi số dòng, code sai, lý do và code đúng.
2. Các đoạn trông đáng ngờ nhưng hợp lệ — ghi “HỢP LỆ – KHÔNG SỬA”.
3. Toàn bộ HTML sau khi sửa.

### Target

Phát hiện đúng lỗi cú pháp/cấu trúc, tránh false positive, giữ nguyên tối đa nội dung và giao diện, và tạo ra DOM hợp lệ sau khi sửa.

### Kết quả chẩn đoán

1. Dòng 7: dư thẻ `<title>` thứ hai.
2. Dòng 14: lặp thuộc tính `class`; gộp thành `class="sitename brand"`.
3. Dòng 14: `width="142px"` không đúng cú pháp thuộc tính kích thước HTML; sửa thành `width="142"`.
4. Dòng 16: ảnh thiếu `alt`.
5. Dòng 71: `<div>` không được là con trực tiếp của `<ul>`; đổi thành `<li class="ad">`.
6. Dòng 74: liên kết số 1 thiếu `</a>`, gây lồng thẻ `<a>`.
7. Dòng 81: `id="list"` bị trùng; bỏ ID ở danh sách navigation.
8. Dòng 118: danh sách mở bằng `<ul>` nhưng đóng bằng `</ol>`.

Phiên bản đã sửa: [`website/blog_fixed.html`](website/blog_fixed.html).

## 3. Trang đăng ký

Trang mới giữ khung Blakletterpress, có `fieldset`, `legend`, label liên kết đúng input, validation HTML5, radio, checkbox, select và textarea.

- Link sau khi deploy: `https://www.lamthientrinh256.id.vn/bai-tap/assignment-02/website/register.html`

## 4. Trang media HTML5

Trang mới giữ khung cũ và sử dụng `main`, `article`, `section`, `figure`, `figcaption`, `time`, `video`, `audio` và `iframe`.

- Link sau khi deploy: `https://www.lamthientrinh256.id.vn/bai-tap/assignment-02/website/media.html`

## 5. Prompt refactor `index.html` sang semantic HTML5

**Context:** Tôi có trang `index.html` của template Blakletterpress đang dùng nhiều `div` để chia header, main, gallery, nội dung, sidebar, navigation và footer.

**Role:** Bạn là Front-end Developer am hiểu semantic HTML5 và SEO cơ bản.

**Action:** Tạo file `index_new.html`. Chỉ thay các phần tử bao bố cục bằng `header`, `main`, `section`, `article`, `aside`, `nav`, `footer` khi phù hợp. Không sửa trực tiếp `index.html`.

**Format:** Trả về toàn bộ mã nguồn `index_new.html`, giữ nguyên CSS link, ảnh, nội dung, liên kết, `id`, `class` và thứ tự bố cục.

**Target:** Giao diện không thay đổi so với `index.html`; mã đóng/mở thẻ hợp lệ và cấu trúc semantic rõ hơn.

- Kết quả: `https://www.lamthientrinh256.id.vn/bai-tap/assignment-02/website/index_new.html`

## Dữ liệu điền vào bảng nộp

- Họ tên: Trịnh Thiên Lam
- MSSV: 20235359
- Ngày sinh: 25/06/2005
- Kết quả phần tìm lỗi: dùng mục 1
- Prompt sửa `blog_wrong.html`: dùng mục 2
- Link register: dùng link ở mục 3
- Link media: dùng link ở mục 4
- Prompt semantic và link `index_new.html`: dùng mục 5
- Bảng nộp: <https://docs.google.com/spreadsheets/d/1LAMcdidHEfBITJ023MLw5ksllhf9SgwBMoPtUQF6TVQ/edit?usp=drive_link>

Không điền giới tính, email hoặc lớp bằng dữ liệu suy đoán.
