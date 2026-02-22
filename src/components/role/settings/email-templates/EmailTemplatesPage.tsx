"use client";

import OrdersConfirmationContent from "./OrdersConfirmationContent";
import ShippingUpdateContent from "./ShippingUpdateContent";
import WelcomeEmailContent from "./WelcomeEmailContent";
import PasswordResetContent from "./PasswordResetContent";
import AbandonedCartContent from "./AbandonedCartContent";

interface Props {
  templateKey: string;
}

export default function EmailTemplatesPage({ templateKey }: Props) {
  switch (templateKey) {
    case "shipping-update":
      return <ShippingUpdateContent />;
    case "welcome-email":
      return <WelcomeEmailContent />;
    case "password-reset":
      return <PasswordResetContent />;
    case "abandoned-cart":
      return <AbandonedCartContent />;
    case "orders-confirmation":
    default:
      return <OrdersConfirmationContent />;
  }
}
