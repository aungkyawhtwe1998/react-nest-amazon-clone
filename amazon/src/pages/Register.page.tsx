import AuthLayout from "../features/auth/components/AuthLayout";
import RegistrationForm from "../features/auth/components/RegistrationForm.component";

const RegisterPage = () => {
  return (
    <AuthLayout>
      <RegistrationForm />
    </AuthLayout>
  );
};

export default RegisterPage;
