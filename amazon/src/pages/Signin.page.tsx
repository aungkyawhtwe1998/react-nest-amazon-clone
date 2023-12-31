import React from "react";
import AuthLayout from "../features/auth/components/AuthLayout";
import SigninFormComponent from "../features/auth/components/SigninForm.component";

const Signinpage = () => {
  return (
    <AuthLayout>
      <SigninFormComponent />
    </AuthLayout>
  );
};

export default Signinpage;
