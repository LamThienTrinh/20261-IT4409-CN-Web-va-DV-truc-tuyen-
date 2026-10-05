# Assignment 2 — Sửa lỗi CSS với GenAI

## 1. Nội dung điền vào phần kết quả/chẩn đoán

Trang có 3 lỗi CSS thật sự:

1. `.page { overflow-x: hidden; }` tạo một scroll container ở phần tử cha của `.site-header`, khiến `position: sticky` không bám theo viewport như mong muốn. Sửa thành `.page { overflow-x: clip; }`. Giá trị `clip` vẫn cắt phần tràn ngang nhưng không tạo scroll container.

2. `.card { box-sizing: content-box; }` làm `flex-basis` chỉ tính phần content, sau đó cộng thêm padding và border. Vì vậy tổng chiều rộng của ba thẻ lớn hơn chiều rộng `.card-list` và thẻ thứ ba bị rớt hàng. Sửa thành `.card { box-sizing: border-box; }` để kích thước 1/3 đã bao gồm content, padding và border.

3. `.card img` có `position: relative; z-index: 2;` trong khi `.badge` không có `z-index`. Ảnh vì thế nằm trên và che nhãn `-20%`. Thêm `.badge { z-index: 3; }` để nhãn nằm trên ảnh nhưng vẫn neo theo chính `.card`.

Không cần sửa các đoạn sau vì chúng đang đúng và cần thiết: `position: sticky`, `top: 0` và `z-index: 100` của header; `position: relative` của `.hero` và `.card`; `object-fit: cover`; phép căn giữa bằng `top/left: 50%` kết hợp `transform: translate(-50%, -50%)`; negative margin của `.products`; `position: fixed` của nút lên đầu trang; và `transform: scale(1.08)` của ảnh hero.

## 2. Prompt dùng AI

```text
[Context — Bối cảnh]
Tôi có một trang khuyến mãi Tết gồm hai file `trang.html` và `style-loi.css`. Phần HTML đã đúng về nội dung, semantic và cấu trúc nên tuyệt đối không được thay đổi HTML. CSS cố ý chứa một vài lỗi tinh vi về box model và position. Trang nhìn gần đúng nhưng có thể lỗi khi cuộn hoặc khi quan sát kỹ.

Yêu cầu hiển thị đúng:
- Thanh menu trên cùng phải sticky khi cuộn và luôn nằm trên ảnh hero.
- Ảnh hero phải phủ kín khung; tiêu đề, mô tả và nút nằm chính giữa ảnh.
- Ba thẻ sản phẩm phải nằm trên cùng một hàng ngang trong khung rộng hiện tại.
- Mỗi nhãn `-20%` phải nằm ở góc trên bên phải của chính thẻ tương ứng và hiển thị trên ảnh.
- Ảnh và toàn bộ nội dung phải nằm gọn trong thẻ.
- Nút `↑` phải cố định ở góc dưới bên phải viewport khi cuộn.

Trong CSS có một số khai báo trông lạ nhưng có chủ ý và có thể đang đúng. Không được sửa một khai báo chỉ vì nó khác cách viết thông thường.

[Role — Vai trò]
Bạn là Senior Front-end Developer, am hiểu CSS box model, flexbox, containing block, stacking context, overflow, `position: sticky`, `absolute`, `fixed` và cách trình duyệt tính computed style.

[Action — Hành động]
1. Đọc toàn bộ `trang.html` để hiểu quan hệ cha-con nhưng KHÔNG sửa HTML.
2. Đọc toàn bộ `style-loi.css`, kiểm tra lần lượt sáu yêu cầu hiển thị ở trên.
3. Xác định đúng nguyên nhân gốc của từng lỗi; chú ý ảnh hưởng của overflow ở phần tử tổ tiên đối với sticky, box-sizing đối với công thức độ rộng flex item, và z-index/painting order giữa ảnh với badge.
4. Chỉ sửa các khai báo CSS thực sự gây lỗi theo nguyên tắc minimum changes.
5. Giữ nguyên tên selector, nội dung, màu sắc, kích thước và bố cục không liên quan.
6. Sau khi sửa, tự kiểm tra lại: cuộn trang, vị trí badge trên cả ba thẻ, tổng chiều rộng ba thẻ và vị trí nút `↑`.

Không được tự ý sửa hoặc xóa các kỹ thuật hợp lệ sau nếu chúng không phải nguyên nhân trực tiếp của lỗi:
- `position: sticky; top: 0; z-index: 100` của header;
- `position: relative` ở phần tử dùng làm containing block;
- `overflow: hidden` trực tiếp trên khung hero;
- `object-fit: cover` và việc phóng nhẹ ảnh hero bằng transform;
- căn giữa overlay bằng absolute positioning và translate;
- negative margin của khối sản phẩm;
- `position: fixed` của nút lên đầu trang.

[Format — Định dạng]
Trả lời thành 3 phần:

1. CÁC LỖI CẦN SỬA
Với mỗi lỗi, ghi:
- Selector và khai báo lỗi
- Hiện tượng
- Nguyên nhân CSS
- Khai báo sửa chính xác

2. CÁC ĐOẠN TRÔNG LẠ NHƯNG ĐANG ĐÚNG
Liệt kê ngắn gọn và giải thích vì sao không sửa.

3. FILE CSS SAU KHI SỬA
Trả về toàn bộ nội dung `style-loi.css` hoàn chỉnh trong một code block. Không trả về HTML và không đề xuất thay đổi HTML.

[Target — Mục tiêu]
Kết quả đạt yêu cầu khi menu sticky đúng lúc cuộn, hero phủ kín và overlay căn giữa, ba thẻ ở cùng một hàng, ba badge đều nằm đúng góc trên bên phải và không bị ảnh che, nội dung nằm gọn trong thẻ, nút `↑` cố định đúng viewport, đồng thời các phần CSS vốn đúng vẫn được giữ nguyên.
```

## 3. Các thay đổi CSS đã áp dụng

```css
.page {
	overflow-x: clip;
}

.card {
	/* Các khai báo khác giữ nguyên. */
	box-sizing: border-box;
}

.badge {
	/* Các khai báo khác giữ nguyên. */
	z-index: 3;
}
```

## 4. Link để điền vào bài nộp

- Link website sau khi deploy: `https://www.lamthientrinh256.id.vn/bai-tap/assignment-02/trang.html`
- Link thư mục mã nguồn GitHub: `https://github.com/LamThienTrinh/20261-IT4409-CN-Web-va-DV-truc-tuyen-/tree/main/public/bai-tap/assignment-02`
- Link Google Docs: tạo một Google Docs, dán toàn bộ nội dung file này vào, bật quyền **Anyone with the link / Bất kỳ ai có đường liên kết — Viewer**, rồi điền link Docs đó vào biểu mẫu.

Nếu biểu mẫu có các ô riêng, dùng nội dung như sau:

- **Loại bài:** Assignment 2 — sử dụng AI.
- **Kết quả phân tích:** dùng mục 1.
- **Prompt AI:** dùng mục 2.
- **Link sản phẩm:** dùng link website ở trên sau khi đã push và Vercel deploy thành công.
- **Link minh chứng/câu trả lời:** dùng link Google Docs do bạn tạo.
