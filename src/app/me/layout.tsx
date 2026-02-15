import AuthGuard from "@/components/AuthGuard";
import UserPanelLayout from "@/components/me/UserPanelLayout";
import type { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard roles={["customer"]}>
      <UserPanelLayout>{children}</UserPanelLayout>
    </AuthGuard>
  );
}
