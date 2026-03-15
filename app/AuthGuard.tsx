"use client";

import { RoleName } from "@/common/constants/app.constant";
import { useCurrentUser } from "@/features/user/user.hook";
import { useAuthStore } from "@/store/auth.store";
import { useUserStore } from "@/store/user.store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const LOGIN_PATH = "/login";

interface Props {
  children: ReactNode;
  requiredRole?: RoleName;
}

export default function AuthGuard({ children, requiredRole }: Props) {
  const router = useRouter();
  const { accessToken, loading: authLoading } = useAuthStore();
  const { data: user, isLoading: userLoading, isSuccess } = useCurrentUser({
    enabled: !!accessToken,
  });
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    if (authLoading) return;

    if (!accessToken) {
      router.replace(LOGIN_PATH);
      return;
    }

    if (isSuccess && user) {
      setUser(user);
    }

    // Chỉ redirect khi đã load xong user; tránh redirect khi user còn undefined (trang vừa load)
    if (requiredRole && !userLoading) {
      if (!user || user.role?.name !== requiredRole) {
        router.replace("/");
      }
    }
  }, [accessToken, authLoading, user, isSuccess, requiredRole, userLoading, router, setUser]);

  if (authLoading || !accessToken) {
    return null;
  }

  if (requiredRole) {
    if (userLoading) return null;
    if (user && user.role?.name !== requiredRole) return null;
  }

  return <>{children}</>;
} 