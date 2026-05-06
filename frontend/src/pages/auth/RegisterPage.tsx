import RegisterForm from "../../components/auth/RegisterForm";
import AuthLayout from "../../layouts/AuthLayout";

const RegisterPage: React.FC = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
