import { Form } from "antd";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import useSendOtp from "../hooks/useSendOtp";
import useResetPassword from "../hooks/useResetPassword";

function ForgotPassword() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  
  const { mutate: sendOtp, isPending: isSendingOtp } = useSendOtp();
  const { mutate: resetPassword, isPending: isResetting } = useResetPassword();
  
  const [step, setStep] = useState<1 | 2>(1);
  const [emailSaved, setEmailSaved] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleRequestOtp = async () => {
    try {
      const values = await form.validateFields(["email"]);
      sendOtp(
        { email: values.email },
        {
          onSuccess: () => {
            setEmailSaved(values.email);
            setCountdown(60);
            setStep(2);
          },
          onError: (err) => {
            console.error("Gửi OTP thất bại:", err);
          },
        }
      );
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  const onFinish = (values: any) => {
    resetPassword(
      {
        email: emailSaved,
        otpCode: values.otpCode,
        newPassword: values.newPassword,
      },
      {
        onSuccess: () => {
          alert("Đổi mật khẩu thành công! Bạn sẽ được chuyển hướng về trang đăng nhập.");
          navigate("/account/login");
        },
        onError: (err) => {
          console.error("Đổi mật khẩu thất bại:", err);
        },
      }
    );
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 border border-gray-200 rounded-2xl shadow-sm">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Quên mật khẩu?</h2>
        <p className="text-sm text-gray-500 mt-2">
          {step === 1 
            ? "Nhập email của bạn để nhận mã OTP khôi phục mật khẩu." 
            : `Hệ thống đã gửi mã xác thực đến ${emailSaved}`}
        </p>
      </div>

      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
        className="space-y-4"
      >
        {step === 1 ? (
          <>
            <Form.Item
              label={<span className="text-sm font-medium text-gray-700">Email liên kết</span>}
              name="email"
              rules={[
                { required: true, message: "Email không được để trống" },
                { type: "email", message: "Email không hợp lệ" }
              ]}
            >
              <input
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="name@example.com"
              />
            </Form.Item>

            <button
              type="button"
              onClick={handleRequestOtp}
              disabled={isSendingOtp}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-blue-400"
            >
              {isSendingOtp ? "Đang xử lý..." : "Tiếp tục"}
            </button>
          </>
        ) : (
          <>
            <Form.Item
              label={<span className="text-sm font-medium text-gray-700">Mã OTP xác thực</span>}
              name="otpCode"
              rules={[
                { required: true, message: "Vui lòng nhập mã OTP" },
                { pattern: /^[0-9]{6}$/, message: "Mã OTP phải là 6 chữ số" }
              ]}
            >
              <input
                maxLength={6}
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 tracking-widest font-mono text-center text-lg"
                placeholder="000000"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-sm font-medium text-gray-700">Mật khẩu mới</span>}
              name="newPassword"
              rules={[
                { required: true, message: "Mật khẩu mới không được để trống" },
                { min: 6, message: "Mật khẩu phải chứa ít nhất 6 ký tự" }
              ]}
            >
              <input
                type="password"
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="••••••••"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-sm font-medium text-gray-700">Xác nhận mật khẩu mới</span>}
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "Vui lòng xác nhận lại mật khẩu" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu xác nhận không trùng khớp"));
                  },
                }),
              ]}
            >
              <input
                type="password"
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="••••••••"
              />
            </Form.Item>

            <div className="flex items-center justify-between text-sm py-1">
              <button
                type="button"
                onClick={handleRequestOtp}
                disabled={countdown > 0 || isSendingOtp}
                className="text-blue-600 font-semibold hover:underline disabled:text-gray-400 disabled:no-underline"
              >
                {countdown > 0 ? `Gửi lại mã sau ${countdown}s` : "Gửi lại mã OTP"}
              </button>
              
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-gray-500 hover:underline"
              >
                Thay đổi email
              </button>
            </div>

            <button
              type="submit"
              disabled={isResetting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-blue-400"
            >
              {isResetting ? "Đang xử lý..." : "Xác nhận đổi mật khẩu →"}
            </button>
          </>
        )}

        <div className="text-sm text-gray-500 text-center pt-2">
          Quay lại trang{" "}
          <NavLink to="/account/login" className="text-blue-600 font-semibold hover:underline">
            Đăng nhập
          </NavLink>
        </div>
      </Form>
    </div>
  );
}

export default ForgotPassword;