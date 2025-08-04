"use client";
import SignInForm from "@/features/auth/login/page";
import AuthLayout from "../AuthPageLayout";

export default function SignIn() {
  return (
    <>
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
