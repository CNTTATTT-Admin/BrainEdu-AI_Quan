import type { FormProps } from "react-router";
import useRegister from "../hooks/useRegister";
import RegisterForm from "./RegisterForm";
import type { RegisterRequest } from "../types/api-request";

export default function RegisterRightPanel() {
  const { mutate: onRegister } = useRegister();

  const onFinish: FormProps<RegisterRequest>["onFinish"] = (values) => {
    console.log(values);
    
    onRegister(
      { ...values },
      {
        onSuccess: () => {
          console.log("Registration successful");
        },
        onError: (error) => {
          console.log("Registration failed", error);
        }
      }
    );
  };

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold">Đăng ký tài khoản</h2>
        <p className="text-gray-500 mt-1">
          Học tập thông minh và xây dựng lộ trình tương lai của bạn.
        </p>

        <RegisterForm onFinish={onFinish}/>
      </div>
    </div>
  );
}