export default function AuthLeftPanel() {
  return (
    <div className="hidden lg:flex w-1/2 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white p-12 flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold">✨ BrainEdu AI</h1>

        <h2 className="mt-10 text-4xl font-bold leading-snug">
          Kiến tạo tương lai hứa hẹn<br />cùng Trí tuệ nhân tạo.
        </h2>

        <p className="mt-6 text-blue-100">
          Tham gia cộng đồng học tập cá nhân hóa hàng đầu Việt Nam.
        </p>
      </div>

      {/* testimonial */}
      <div className="bg-white/10 p-4 rounded-xl">
        <p className="text-sm">
          "Nhờ lộ trình AI gợi ý, tôi hoàn thành khóa học nhanh hơn 30%."
        </p>
        <p className="mt-2 text-xs opacity-80">
          — Nguyễn Hồng Quân
        </p>
      </div>
    </div>
  );
}