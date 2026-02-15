import RolePanelLayout from "@/components/role/RolePanelLayout";

export default function RoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RolePanelLayout>{children}</RolePanelLayout>;
}