import type { ProductCardProps } from "@/components/e-commerce/ProductCard";

export const CATEGORY_PRODUCTS_MOCK: Omit<ProductCardProps, "inStock">[] = [
  {
    id: "cat-1",
    brand: "ASUS",
    name: "ASUS RT-AXE7800 Tri-Band WiFi 6E Router, 6GHz Band, Safe Browsing",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAnj2JEIFtFxj2AfmuYBfL4aUuFH-X3akltUAxl0kDCY1_h6FwGy9kMpB-SvaAssqQgkvC9Rn28Z0QpSDGZ2YmWkx_6WRc_swiqyZS7r6z2Ssa6UP-D2ekLBB86aCYSp4daUZbYLJ1RSG2v7JBL33gftyr7AS0PbmiYwPfGbnJ5mU5jZU6bw2zdPYvvFp9ztkC3PiXuaSGRg2BEBbaBeaxxcU4ImVxqwCRG8bzQ3uNC0Fhy7gRQTpp3oSkje-OWCvkg5tDfknodCOk",
    price: 32900,
    originalPrice: 37900,
    rating: 4.5,
    reviews: 42,
    specs: ["WiFi 6E Ultra-fast 6GHz", "2.5G WAN/LAN Port", "Subscription-free Security"],
    badge: "NEW",
  },
  {
    id: "cat-2",
    brand: "TP-Link",
    name: "TP-Link Archer AXE75 Tri-Band Wi-Fi 6E Router - Gig+ Speeds",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-HXc_hziC7eStiwQLFBOCmeRW03AdfRg_y12NGZSSiOAzkgospnzhzA0keqOhcNsertCbCmpCnGwovoNCI9rDr-M5xKYZP5artBmkgZpuHblN9FdIvGNCuK5QFib16uoX9Ce80DTOGwkyhorefDh3KxlfJjPuWVrgaF2h6lgKv_ZUjcyV5Gh1k2wjNIrdm4dTBr6cOPi5nyaGaXxUnJh69bFHIWlJ0iVNzBTE7LvRUUUQ90M1KroZQbix7jxOTM-pICrkW8LAhN8",
    price: 19900,
    rating: 5,
    reviews: 156,
    specs: ["Up to 5400 Mbps", "6 High-Performance Antennas"],
    badge: "HOT",
  },
  {
    id: "cat-3",
    brand: "Netgear",
    name: "NETGEAR Nighthawk RAXE500 WiFi 6E - 12-Stream AX11000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB9PQ79nUhOhMa117eo6ZYcbpK4JoG2Rq1QZIG4HzABiC5EO0bpW5EMufGC9u_bdOhvYGpZ_TYfTJ-KPxPaxkkDrXhASHGFohFL1jWlR4AM121pM68nEtv60OE6Hp71ywDxrO2ksqU0f9G5kk0KtazJenxBVPf6xZWXe_MGqFjX_kUC89aJuKkx25EMc7y7UCOdRglHXyqEYeBoXIdVlZlXYTSFm7ITwgL2oHytUlSl8vPzdqxnnjIVZHLZGB2QA1qPezl67ek-CpU",
    price: 59900,
    rating: 4,
    reviews: 89,
    specs: ["AX11000 Quad-Band", "2.5G Multi-Gig Port"],
  },
  {
    id: "cat-4",
    brand: "Ubiquiti",
    name: "Ubiquiti UniFi Dream Router (UDR) - Dual-Band WiFi 6",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDcdpQorI8j_HALV7eTC_fwJBy-PnS-GSY_EJwNAAOcyWsWeP1YFINA7_T-Qowg2VEjrQfqBHFSYBFo8uhGiG4RkziX885sGF008cvlavPv1m0xill1LRM4tHIuMI0HRZNZifljn2zJIjkb1fyYFHnAxFQ9EKg77rgRdeMVwtVuE9qx6i-V7Y0VgGALf1_af7eEbnjq8SsOgHU6Gis7iHzC7znhnGP4JuOWH7eh_h2EtHxCCXh3ndAu1zOSSPHGEY_Kr_xEiOyIEsQ",
    price: 19900,
    originalPrice: 23500,
    rating: 5,
    reviews: 212,
    specs: ["Integrated Security Gateway", "4-Port Switch (2x PoE)"],
    badge: "SAVE 15%",
  },
  {
    id: "cat-5",
    brand: "ASUS",
    name: "ASUS RT-AX88U Pro Dual Band WiFi 6 Router, Quad-core CPU",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBHmABTZQ8f9gzHWMwrtc8zQrd4c5ffOREH8fg2F12Wn8UKKJZbtBVfeJW1dscH5acmRIMTeybg9LHGF262Wb15ohQySUnReLTixjG0OKW2--TprcJbH9Ajp-6z9pV7uuIaT25K9SJB9ge1PLuB9lX6C5kKeX5zon_s2eDGFeaWwz2_GqcxpnFlw1hCTSekVZswRzLHRlic_wJaVsi2pKtZcxwP47vRWC8_Q-YJI6b3JfZELI-g-9SKPbMquKuXoEiIeiH_jDQ5Uto",
    price: 27900,
    rating: 5,
    reviews: 324,
    specs: ["6000 Mbps Speed", "RangeBoost Plus Technology"],
  },
  {
    id: "cat-6",
    brand: "TP-Link",
    name: "TP-Link Deco XE75 Pro AXE5400 Tri-Band Mesh WiFi 6E",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCv_3sb1o-XRqNJanvfi0H406alsFxsh6s65VA3Nkbxx4Z-hFEnJc5gYPNi8d-B5D38VF8NAg5PuvTE2yLrYoqzb_XQQmpHg_m6xmX9DmlNtxptYboFDyBig0niVPXpOpXCKzOYhKGWac6Ye973hFoGgsszbNmS3XbV0M8HRw-XhjVOw8u3PS7HOm2FHFcpCIUcgGsXSH8tAET_B6MFUoUIxqFkvEgcB-xleLj016Bk7yGuuqgV7MW4e81BAl-w3SgY_tkUdhSx79s",
    price: 39900,
    rating: 4.5,
    reviews: 67,
    specs: ["Coverage up to 7200 sq.ft.", "Connect 200+ Devices"],
  },
  {
    id: "cat-7",
    brand: "Linksys",
    name: "Linksys Hydra Pro 6E: Tri-Band Mesh WiFi 6E Router",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuApJLNq1_czkWejKDhwD1VVBQjm04xgqTnPJcVXEmit5RGj_WFCA0Vec0JQE4PAX7A5CG2a6XJHB5TifVVy3Bgd3pCUJtB_kntqglP1ctMxuFzm-BkKXWcqhz2CDh_kGR7co-uV8rrqs8esDEonIBruh6QwVvYOa6JPhtU9bLc8bjUyBBG5gUNJITivlphPcMkQd3bG4lBtrKutqE76HzZ6xY_5bwXHy_MsEwn7qflhGHqibYqdk6gCWuZDMMoTceGj_uHjGi-IFV0",
    price: 24900,
    rating: 4,
    reviews: 31,
    specs: ["AXE6600 Speed", "2.5 Gbps WAN Port"],
  },
  {
    id: "cat-8",
    brand: "TP-Link",
    name: "TP-Link Archer AX55 Pro Dual-Band Wi-Fi 6 Router",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDj3Y6lIW7nmVsocVGBoGA4sA11DWIOYclzZDAxWCKdmGTFjxlcw_tozPDy4RtS5PRC_snlyeG1mZnonP_ujlLn6-lFjLajwdZy-CJ48Evo1XB-aHknWzhty73Ijzhpj_QKg2KulwKlpf8alu0Nti7sWknMoLS0wqHJpLKMcpLShR0GBnzhwhu9UqIFIY5ZDJRW9szBM7KDWQndEb1tpPPUx5k-ficR6vpiB0vJMNPAx-q5kKGMiCNr7b-L4kfM-9jSvdTGIZSPEAc",
    price: 12900,
    rating: 5,
    reviews: 184,
    specs: ["AX3000 Gigabit WiFi", "Ultra-Low Latency"],
  },
];
