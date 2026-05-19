import { ComponentType, JSX, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/token";

function AuthHoc<T extends JSX.IntrinsicAttributes>(
  WrappedComponent: ComponentType<T>
) {
  const AuthenticatedComponent = (props: T) => {
    const navigate = useNavigate();
    const token = getToken();

    useEffect(() => {
      // nếu đã login → không cho vào login/register
      if (token) {
        navigate("/", { replace: true });
      }
    }, [token, navigate]);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
}

export default AuthHoc;