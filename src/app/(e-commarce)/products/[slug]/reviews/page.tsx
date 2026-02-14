import ProductReviewsContent from "@/components/products/ProductReviewsContent";
import { extractTitleFromSlug } from "@/lib/utils";

const DEFAULT_PRODUCT = {
  name: "MikroTik hAP ax³",
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCNJq-b9v3yj3CyFlAbMo5p2bp9U2v-EONr8uxtq7h7ooTyEVZJTlYjYs9-SocziXnMnf2toAM1bo0rxL6Qe-lpnt9hRC3IeV2Cyep_yzXR9ejXj5QEg78SAZ4j9EhQsX3Yx9KM94GV-QjF73mVnCIaj8916f2clfsehogq0SBJX1sHx6GwL6mt3PUoIRhowC2k0Ie0PtS2K6YFzm93b_Cgnj3MHjjZ5FAasOGqWNSCTZIiwfjrHScq6-QChNlMfnOdH4O4Z-U-Tpo",
  subtitle: "The ultimate home access point with Wi-Fi 6 dual-band support.",
  sku: "C53UiG+5HPaxD2HPax-D2HPaxD",
  rating: 4.8,
  reviewCount: 124,
  price: "৳21,000",
};

export default async function ProductReviewsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const productName = extractTitleFromSlug(slug) || DEFAULT_PRODUCT.name;

  return (
    <ProductReviewsContent
      slug={slug}
      productName={productName}
      productImage={DEFAULT_PRODUCT.image}
      productSubtitle={DEFAULT_PRODUCT.subtitle}
      sku={DEFAULT_PRODUCT.sku}
      rating={DEFAULT_PRODUCT.rating}
      reviewCount={DEFAULT_PRODUCT.reviewCount}
      price={DEFAULT_PRODUCT.price}
    />
  );
}
