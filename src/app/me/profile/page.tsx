import ProfileContent from "@/components/me/ProfileContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile | Net Land System",
  description: "View and edit your profile and notification preferences.",
};

export default function MeProfilePage() {
  return <ProfileContent />;
}
