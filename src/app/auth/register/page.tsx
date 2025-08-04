"use client";
import SignUpForm from "@/features/auth/register/SignUpForm";
import AuthLayout from "../AuthPageLayout";

export default function SignUp() {
  return (
    <>
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
