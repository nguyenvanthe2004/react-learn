import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default AuthLayout;
