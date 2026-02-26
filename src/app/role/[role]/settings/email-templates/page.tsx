import { Routes } from "@/lib/routes";
import { useAppSelector } from "@/store/hooks";
import { redirect } from "next/navigation";

const EmailTemplatesPage = () => {
  const user = useAppSelector((s) => s.auth.user);
  redirect(
    user
      ? Routes.me
          .role(user.role)
          .settings.emailTemplates.template("orders-confirmation")
      : Routes.home,
  );
  return null;
};

export default EmailTemplatesPage;
