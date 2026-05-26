# 🌌 Creative Portfolio — Trần Quốc Bình

Bilingual: **[Tiếng Việt](#tiếng-việt-vietnamese)** | **[English](#english)**

---

## Tiếng Việt (Vietnamese)

Chào mừng bạn đến với kho lưu trữ mã nguồn Portfolio cá nhân của **Trần Quốc Bình**. Đây là một trang web giới thiệu bản thân, kỹ năng, các giải thưởng và dự án nổi bật, được thiết kế với giao diện tối giản hiện đại (minimalist dark mode) kết hợp cùng hiệu ứng chuyển động mượt mà và cao cấp.

### 🚀 Công Nghệ Sử Dụng (Tech Stack)
* **Core:** React 19 + TypeScript + Vite (Khởi tạo môi trường siêu nhanh và tối ưu hóa dung lượng production).
* **Styling & Design:** Tailwind CSS + Custom CSS Variables (Thiết lập bảng màu dark mode cao cấp, bố cục Bento Grid sang trọng).
* **Animations (Chuyển động):**
  * **GSAP (GreenSock):** Dùng cho hiệu ứng parallax cuộn ảnh kỹ năng (`Explorations.tsx`) và chạy dòng chữ vô tận ở chân trang (`ContactFooter.tsx`).
  * **Framer Motion:** Điều khiển hoạt ảnh xuất hiện của các thẻ phần thưởng, màn hình tải trang (`LoadingScreen.tsx`), và con trỏ chuột tương tác (`CustomCursor.tsx`).
  * **Lenis Scroll:** Cung cấp trải nghiệm cuộn mượt mà (smooth scrolling) chất lượng điện ảnh.
* **Tích Hợp Khác:** 
  * **Hls.js:** Stream video nền tốc độ cao qua Mux.
  * **Lucide React:** Bộ thư viện icon vector sắc nét, tối giản.

### ✨ Tính Năng Nổi Bật
1. **Premium Loading Screen:** Bộ đếm số từ `000` đến `100` đi kèm hiệu ứng chuyển chữ sống động trước khi hiển thị trang chủ.
2. **Interactive Custom Cursor:** Con trỏ chuột tròn thông minh tự bám theo chuột, đổi màu (mix-blend-difference) và phóng to khi rê qua các liên kết hoặc nút bấm.
3. **Responsive Bento Grid:** Trực quan hóa các dự án tiêu biểu (`Kizo Shop`, `OmiFood`, `Ví Nhỏ Finance`, `AI-Bridge`, v.v.) bằng bố cục Bento linh hoạt, có hiệu ứng zoom ảnh và làm mờ khi di chuột.
4. **Visual Playground:** Hệ thống parallax cuộn ngược chiều thể hiện bộ kỹ năng lập trình sinh động.
5. **Timeline & Achievements:** Trình bày hành trình học tập cùng hơn 13 giải thưởng học thuật/robotic từ 2024 - 2026.

---

## English

Welcome to the source code repository of **Trần Quốc Bình's** Personal Portfolio. This is a creative, highly interactive, and responsive portfolio designed with a sleek minimalist dark theme, smooth micro-interactions, and premium cinematic animations.

### 🚀 Tech Stack
* **Core:** React 19 + TypeScript + Vite.
* **Styling & Design:** Tailwind CSS + Custom CSS Variables.
* **Animations:**
  * **GSAP (GreenSock):** Used for advanced scroll-driven parallax grids (`Explorations.tsx`) and infinite text marquee (`ContactFooter.tsx`).
  * **Framer Motion:** Handles entrance transitions, loading screens, gallery cards, and custom cursor animations.
  * **Lenis Scroll:** Ensures premium, high-frequency smooth-scroll experiences.
* **Integrations:**
  * **Hls.js:** Serves ambient, high-performance background video streams via Mux.
  * **Lucide React:** Minimalist icons.

### ✨ Core Features
1. **Interactive Custom Cursor:** A sleek magnetic custom cursor that dynamically scales up and inverts colors using CSS `mix-blend-mode` over interactive links.
2. **Bento Grid Projects:** High-quality presentation of projects with responsive, non-uniform grid spans and blur/zoom transitions on hover.
3. **Scroll-Driven Parallax Playground:** Toolkit column animations that slide in opposite directions during scroll triggers.
4. **Clean Academic Journey:** Highlighted timeline of experiences (CodeGym, Funix) and an impressive collection of 13+ national & local awards from 2024 to 2026.

---

## 🛠️ Khởi Chạy Địa Phương (Local Setup)

Để chạy dự án trên máy tính của bạn, hãy làm theo các bước sau:

1. **Clone repository:**
   ```bash
   git clone https://github.com/tqbinhhh/portfolio_quocbinh.git
   cd portfolio_quocbinh
   ```

2. **Cài đặt các gói phụ thuộc (Dependencies):**
   ```bash
   npm install
   ```

3. **Chạy server phát triển (Development Server):**
   ```bash
   npm run dev
   ```
   Mở trình duyệt truy cập `http://localhost:5173`.

4. **Biên dịch bản phân phối Production (Build):**
   ```bash
   npm run build
   ```
   Thư mục `/dist` sẵn sàng được deploy lên Netlify, Vercel hoặc GitHub Pages.

---

*Thiết kế & hoàn thiện bởi **Trần Quốc Bình** &copy; 2026.*
