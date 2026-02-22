import EmailTemplatesPage from "@/components/role/settings/email-templates/EmailTemplatesPage";

interface Props {
  params: Promise<{ role: string; template: string }>;
}

export default async function Page({ params }: Props) {
  const { template } = await params;
  return <EmailTemplatesPage templateKey={template ?? "orders-confirmation"} />;
}
