import type { FormProps } from "react-router";
import useLogin from "../hooks/useLogin";
import LoginForm from "./LoginForm";
import type { logInRequest } from "../types/api-request";

export default function AuthRightPanel() {
  const { mutate: onLogin } = useLogin();

  const onFinish: FormProps<logInRequest>["onFinish"] = (values) => {
    onLogin(
      { ...values },
      {
        onSuccess: () => {
          console.log("Login successful");
        },
        onError: (error) => {
          console.log("Login failed", error);
        }
      }
    );
  };
  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold">Đăng nhập</h2>
        <p className="text-gray-500 mt-1">
          Chào mừng bạn quay trở lại với hệ thống.
        </p>

        <LoginForm onFinish={onFinish}/>
      </div>
    </div>
  );
}