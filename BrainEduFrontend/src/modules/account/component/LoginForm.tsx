import { Form } from "antd";
import { NavLink } from "react-router";
import type { logInRequest } from "../types/api-request";

function LoginForm({
  onFinish,
}: {
  onFinish: (values: logInRequest) => void;
}) {
  const [form] = Form.useForm<logInRequest>();

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={() => {
        console.log("Login failed");
      }}
      layout="vertical"
      autoComplete="off"
      className="mt-6 space-y-4"
    >
      <Form.Item
        label={<span className="text-sm font-medium text-gray-700">Email</span>}
        name="email"
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
          className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="name@example.com"
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

      <div className="flex items-center justify-between text-sm pt-1">
        <label className="flex items-center gap-2 text-gray-600 cursor-pointer select-none">
          <input 
            type="checkbox" 
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          Ghi nhớ đăng nhập
        </label>

        <NavLink 
          to="/account/forgot-password" 
          className="text-blue-600 font-semibold hover:underline"
        >
          Quên mật khẩu?
        </NavLink>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Đăng nhập →
      </button>

      <div className="text-sm text-gray-500 text-center pt-2">
        Bạn chưa có tài khoản?{" "}
        <NavLink to="/account/register" className="text-blue-600 font-semibold hover:underline">
          Đăng ký ngay
        </NavLink>
      </div>
    </Form>
  );
}

export default LoginForm;