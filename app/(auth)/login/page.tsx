"use client";

import CardAuth from "@/features/auth/components/CardAuth";
import LoginForm from "@/features/auth/components/LoginForm";
import { getGoogleAuthUrl } from "@/features/auth/auth.api";

export default function LoginPage() {
  const handleGoogleClick = () => {
    window.location.href = getGoogleAuthUrl();
  };

  return (
    <CardAuth title="Đăng nhập" onGoogleClick={handleGoogleClick}>
      <LoginForm />
    </CardAuth>
  );
}