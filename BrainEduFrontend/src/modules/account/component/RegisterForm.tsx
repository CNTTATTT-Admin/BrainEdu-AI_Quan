import { Form } from "antd";
import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import type { RegisterRequest } from "../types/api-request";
import useSendOtp from "../hooks/useSendOtp";

function RegisterForm({
  onFinish,
}: {
  onFinish: (values: RegisterRequest) => void;
}) {
  const [form] = Form.useForm<RegisterRequest>();
  const { mutate: sendOtp, isPending: isSendingOtp } = useSendOtp();
  const [countdown, setCountdown] = useState<number>(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendOtp = async () => {
    try {
      const emailValue = await form.validateFields(["email"]);
      sendOtp(emailValue.email, {
        onSuccess: () => {
          setCountdown(60);
          console.log("OTP sent to email");
        },
        onError: (err) => {
          console.error("Failed to send OTP", err);
        }
      });
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={() => {
        console.log("Registration failed validation");
      }}
      layout="vertical"
      autoComplete="off"
      className="mt-6 space-y-4"
    >
      <Form.Item
        label={<span className="text-sm font-medium text-gray-700">Họ và tên</span>}
        name="name"
        rules={[
          {
            required: true,
            message: "Họ và tên không được để trống",
          },
        ]}
      >
        <input
          className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Nguyễn Văn A"
        />
      </Form.Item>

      <Form.Item
        label={<span className="text-sm font-medium text-gray-700">Email</span>}
        required
        className="mb-4"
      >
        <div className="flex gap-2 mt-1">
          <div className="flex-1">
            <Form.Item
              name="email"
              noStyle
              rules={[
                {
                  required: true,
                  message: "Email không được để trống",
                },
                {
                  type: "email",
                  message: "Email không hợp lệ",
                },
              ]}
            >
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="name@example.com"
              />
            </Form.Item>
          </div>

          <button
            type="button"
            onClick={handleSendOtp}
            disabled={countdown > 0 || isSendingOtp}
            className="px-4 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 border border-transparent disabled:cursor-not-allowed transition flex items-center justify-center min-w-[120px] text-sm"
          >
            {isSendingOtp ? (
              <span className="flex items-center gap-1">Đang gửi...</span>
            ) : countdown > 0 ? (
              <span>Gửi lại sau {countdown}s</span>
            ) : (
              "Gửi mã OTP"
            )}
          </button>
        </div>
        
        <Form.Item 
          noStyle 
          shouldUpdate={(prevValues, currentValues) => prevValues.email !== currentValues.email}
        >
          {() => (
            <div className="text-red-500 text-sm mt-1 min-h-[20px]">
              {form.getFieldError("email")[0]}
            </div>
          )}
        </Form.Item>
      </Form.Item>

      <Form.Item
        label={<span className="text-sm font-medium text-gray-700">Mã OTP xác thực</span>}
        name="otpCode"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mã OTP đã nhận",
          },
          {
            pattern: /^[0-9]{6}$/,
            message: "Mã OTP phải là chuỗi 6 chữ số",
          },
        ]}
      >
        <input
          maxLength={6}
          className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 tracking-widest font-mono text-center text-lg"
          placeholder="000000"
        />
      </Form.Item>

      <Form.Item
        label={<span className="text-sm font-medium text-gray-700">Mật khẩu</span>}
        name="password"
        rules={[
          {
            required: true,
            message: "Mật khẩu không được để trống",
          },
          {
            min: 6,
            message: "Mật khẩu phải ít nhất 6 ký tự",
          },
        ]}
      >
        <input
          type="password"
          className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="••••••••"
        />
      </Form.Item>

      <div className="text-sm text-gray-500 text-center pt-2">
        Bạn đã có tài khoản?{" "}
        <NavLink to="/account/login" className="text-blue-600 font-semibold hover:underline">
          Đăng nhập ngay
        </NavLink>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Đăng ký tài khoản →
      </button>
    </Form>
  );
}

export default RegisterForm;