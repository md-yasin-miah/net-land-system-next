import UserPanelLayout from "@/components/me/UserPanelLayout";
import type { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
  return <UserPanelLayout>{children}</UserPanelLayout>;
}
