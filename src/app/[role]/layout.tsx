import AuthGuard from "@/components/AuthGuard";
import RolePanelLayout from "@/components/role/RolePanelLayout";

export default function RoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard roles={["admin"]}>
      <RolePanelLayout>{children}</RolePanelLayout>
    </AuthGuard>
  );
}