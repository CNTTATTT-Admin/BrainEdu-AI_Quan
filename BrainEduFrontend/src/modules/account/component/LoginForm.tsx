import { Form } from "antd";
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
        label={<span className="text-sm">Email</span>}
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
          className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="name@example.com"
        />
      </Form.Item>

      <Form.Item
        label={<span className="text-sm">Mật khẩu</span>}
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
          className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="••••••••"
        />
      </Form.Item>

      <div className="flex justify-between text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Ghi nhớ đăng nhập
        </label>

        <a className="text-blue-600 cursor-pointer">
          Quên mật khẩu?
        </a>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
      >
        Đăng nhập →
      </button>
    </Form>
  );
}

export default LoginForm;