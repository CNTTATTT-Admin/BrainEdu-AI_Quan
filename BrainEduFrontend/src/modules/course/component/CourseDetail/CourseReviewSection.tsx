import React, { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import useRateCourse from '../../hooks/useRateCourse';
import useGetRateCourse from '../../hooks/useGetRateCourse';
interface CourseReviewSectionProps {
  courseId: number;
}

const CourseReviewSection = ({ courseId }: CourseReviewSectionProps) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [page, setPage] = useState<number>(0);

  const { mutate: submitReview, isPending } = useRateCourse(courseId);
  const { data: reviewsData, isPending: isLoadingReviews } = useGetRateCourse(courseId);

  const reviewList = reviewsData?.data || [];
  const meta = reviewsData?.meta;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Vui lòng chọn số sao đánh giá!");
      return;
    }

    submitReview(
      { rating, comment: comment.trim() },
      {
        onSuccess: () => {
          setRating(0);
          setComment("");
        }
      }
    );
  };

  return (
    <div className="space-y-6 mt-6">
      {/* KHU VỰC 1: FORM GỬI ĐÁNH GIÁ CỦA BẠN */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MessageSquare size={16} className="text-blue-600" /> Đánh giá khóa học của bạn
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500">Chất lượng bài giảng:</span>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, idx) => {
                const starValue = idx + 1;
                return (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHoverRating(starValue)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="focus:outline-none transition-transform active:scale-95"
                  >
                    <Star
                      size={20}
                      className={
                        starValue <= (hoverRating ?? rating)
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-200"
                      }
                    />
                  </button>
                );
              })}
            </div>
            {rating > 0 && <span className="text-xs font-semibold text-amber-500">({rating} sao)</span>}
          </div>

          <div className="space-y-1">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Chia sẻ trải nghiệm học tập của bạn về khóa học này để giúp các học viên khác lựa chọn nhé..."
              rows={3}
              className="w-full text-xs p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 placeholder-gray-400 resize-none leading-relaxed"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending || !comment.trim() || rating === 0}
              className="bg-[#0052cc] text-white text-xs font-semibold px-5 py-2 rounded-xl shadow-sm hover:bg-[#0043a8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isPending ? "Đang gửi..." : "Gửi đánh giá"}
            </button>
          </div>
        </form>
      </div>

      {/* KHU VỰC 2: HIỂN THỊ DANH SÁCH ĐÁNH GIÁ TỪ NGƯỜI KHÁC */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-gray-900 border-b border-gray-50 pb-3">
          Nhận xét từ học viên ({meta?.totalElements || 0})
        </h3>

        {isLoadingReviews ? (
          <div className="space-y-4 py-4">
            {Array.from({ length: 2 }).map((_, idx) => (
              <div key={idx} className="flex gap-3 animate-pulse">
                <div className="w-9 h-9 bg-gray-200 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : reviewList.length === 0 ? (
          <div className="text-center py-8 text-xs text-gray-400">
            Chưa có đánh giá nào cho khóa học này. Hãy là người đầu tiên để lại ý kiến đóng góp!
          </div>
        ) : (
          <div className="divide-y divide-gray-50 space-y-4">
            {reviewList.map((review: any) => (
              <div key={review.id} className="flex gap-3 pt-4 first:pt-0 items-start">
                <img
                  src={review.userAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"}
                  alt={review.userName}
                  className="w-9 h-9 rounded-full object-cover border border-gray-100 shrink-0"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-gray-800 truncate">{review.userName}</h5>
                    <span className="text-[10px] text-gray-400">
                      {review.createdAt ? new Date(review.createdAt).toLocaleDateString('vi-VN') : ""}
                    </span>
                  </div>
                  
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={12}
                        className={idx < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}
                      />
                    ))}
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed pt-1">
                    {review.comment}
                  </p>
                </div>
              </div>
            ))}

            {/* Điều hướng phân trang (Pagination) */}
            {meta && meta.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-50">
                <button
                  disabled={!meta.hasPrevious}
                  onClick={() => setPage((prev) => prev - 1)}
                  className="px-3 py-1 text-[11px] font-medium border border-gray-200 text-gray-600 rounded-lg disabled:opacity-40 transition-colors hover:bg-gray-50"
                >
                  Trước
                </button>
                <span className="text-[11px] text-gray-500 font-medium">
                  Trang {meta.page + 1} / {meta.totalPages}
                </span>
                <button
                  disabled={!meta.hasNext}
                  onClick={() => setPage((prev) => prev + 1)}
                  className="px-3 py-1 text-[11px] font-medium border border-gray-200 text-gray-600 rounded-lg disabled:opacity-40 transition-colors hover:bg-gray-50"
                >
                  Sau
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseReviewSection;