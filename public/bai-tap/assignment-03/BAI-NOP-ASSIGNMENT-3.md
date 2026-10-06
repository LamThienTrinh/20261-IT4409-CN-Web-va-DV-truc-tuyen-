# Assignment 03 — Sửa lỗi CSS Box Model và Position

## Thông tin sinh viên

- Họ và tên: Trịnh Thiên Lam
- MSSV: 20235359
- Ngày sinh: 25/06/2005

## Bài 1 — Bộ lỗi CSS rõ ràng

Các thay đổi được áp dụng trong `bai-1/style-loi.css`:

1. `.site-header`: thêm `top: 0` và `z-index: 100` để sticky bám mép trên và nằm trên hero.
2. `.hero`: thêm `position: relative` để làm containing block cho overlay.
3. `.hero-bg`: thêm `object-fit: cover` để ảnh phủ khung mà không bị méo.
4. `*`: thêm `box-sizing: border-box`; `.card` đổi `height` thành `min-height` để padding/border không phá độ rộng và nội dung không bị ép tràn.
5. `.card`: thêm `position: relative` để badge neo theo từng thẻ.
6. `.card img`: thêm width, height, `object-fit` và border-radius để ảnh nằm gọn trong thẻ.
7. `.back-to-top`: đổi `top` thành `bottom`, thêm `z-index: 200` để nút cố định đúng góc dưới bên phải.

Link sau khi deploy: `https://www.lamthientrinh256.id.vn/bai-tap/assignment-03/bai-1/trang.html`

> Đề ghi phần này yêu cầu tự thực hiện, không dùng AI. File trên là kết quả kỹ thuật đã chuẩn bị; khi nộp cần trình bày trung thực theo quy định môn học.

## Bài 2 — Xây dựng prompt sửa lỗi bằng AI

### Chẩn đoán

1. `.page { overflow-x: hidden; }` tạo scroll container ở tổ tiên của sticky. Sửa thành `overflow-x: clip`.
2. `.card { box-sizing: content-box; }` làm flex-basis chưa bao gồm padding/border, khiến ba thẻ vượt tổng chiều rộng. Sửa thành `border-box`.
3. Ảnh thẻ có `z-index: 2` nhưng badge không có z-index nên badge bị che. Thêm `.badge { z-index: 3; }`.

### Prompt CRAFT

**Context:** Tôi có `trang.html` đã đúng và không được thay đổi. `style-loi.css` chứa một vài lỗi tinh vi về Box Model, Position, overflow và stacking order. Menu phải sticky; hero phủ kín và căn giữa; ba card cùng hàng; badge nằm trên ảnh; nút ↑ fixed ở góc dưới phải.

**Role:** Bạn là Senior Front-end Developer am hiểu CSS Box Model, Flexbox, containing block, stacking context, overflow, sticky, absolute và fixed positioning.

**Action:** Đọc toàn bộ HTML để hiểu quan hệ cha-con nhưng không sửa HTML. Kiểm tra từng yêu cầu, xác định nguyên nhân gốc và chỉ sửa khai báo CSS thực sự gây lỗi. Chú ý overflow của ancestor đối với sticky, box-sizing đối với kích thước flex item và z-index giữa ảnh với badge. Tự kiểm tra lại khi cuộn và ở độ rộng khung hiện tại.

Bảo vệ các đoạn đang đúng: `position: sticky; top: 0; z-index: 100`, `position: relative` ở hero/card, `overflow: hidden` trực tiếp trên hero, `object-fit: cover`, `transform: scale(1.08)`, căn giữa bằng translate, negative margin của products và `position: fixed` của nút.

**Format:** Trả lời ba phần: lỗi cần sửa; đoạn trông lạ nhưng đúng; toàn bộ CSS sau khi sửa. Với mỗi lỗi ghi selector, hiện tượng, nguyên nhân và khai báo sửa chính xác. Không trả về HTML.

**Target:** Chỉ thay đổi tối thiểu ba lỗi thật; menu sticky, card và badge hoạt động đúng; không làm mất các kỹ thuật CSS vốn hợp lệ.

Link sau khi deploy: `https://www.lamthientrinh256.id.vn/bai-tap/assignment-03/bai-2/trang.html`

## Bảng nộp

- Bảng nộp: <https://docs.google.com/spreadsheets/d/1LAMcdidHEfBITJ023MLw5ksllhf9SgwBMoPtUQF6TVQ/edit?usp=drive_link>
- Họ tên: Trịnh Thiên Lam
- MSSV: 20235359
- Ngày sinh: 25/06/2005
- Phần tự chẩn đoán: dùng mục Bài 1
- Link Bài 1: dùng URL `/assignment-03/bai-1/trang.html`
- Prompt AI: dùng mục Bài 2
- Link Bài 2: dùng URL `/assignment-03/bai-2/trang.html`
