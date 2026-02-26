import { Routes } from "@/lib/routes";
import { redirect } from "next/navigation";

const SupportPage = () => {
  redirect(Routes.support.tickets);
  return null;
};

export default SupportPage;
