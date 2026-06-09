import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import useEnrollCourse from '../hooks/useEnrollCourse';
import useGetMe from '../../../hooks/useGetMe';
import useCreatePayment from '../hooks/useCreatePayment';
import { formatDate, formatVND } from '../../../utils/helper';
import useCreateNotification from '../../../hooks/useCreateNotification';
const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { courseId, price } = location.state || {};
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { mutate: enrollCourse } = useEnrollCourse();
    const { mutate: createPayment } = useCreatePayment();
    const { data: currentUser } = useGetMe()

    const { mutate: createNotification } = useCreateNotification();

    const handleCheckout = async () => {
        if (!courseId || !currentUser?.data?.id) return;
        setError(null);

        createPayment(
            { userId: Number(currentUser.data?.id), courseId },
            {
                onSuccess: () => {
                    createNotification({
                        userId: Number(currentUser.data?.id),
                        title: 'Thanh toán thành công',
                        content: `Khóa học #${courseId} đã được kích hoạt. Chúc bạn học tốt!`,
                        type: 'PAYMENT_SUCCESS'
                    });
                },
                onError: (err: any) => {
                    setError(err?.response?.data?.message || 'Đã có lỗi xảy ra.');
                }
            }
        );
    };

    if (!courseId) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">Không tìm thấy thông tin khóa học.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Xác nhận thanh toán</h2>
                <p className="text-gray-500 text-sm mb-6">
                    Bạn sẽ được chuyển đến cổng thanh toán để hoàn tất đăng ký khóa học.
                </p>

                <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Mã khóa học</span>
                        <span className="font-medium text-gray-800">#{courseId}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Học phí</span>
                        <span className="font-bold text-red-500">{formatVND(price)}</span>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
                        {error}
                    </div>
                )}

                <div className="flex gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        disabled={isProcessing}
                        className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 
                                   hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm font-medium"
                    >
                        Quay lại
                    </button>
                    <button
                        onClick={handleCheckout}
                        disabled={isProcessing}
                        className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-medium text-sm
                                   hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                        {isProcessing && (
                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        )}
                        {isProcessing ? 'Đang xử lý...' : '🔒 Thanh toán ngay'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;