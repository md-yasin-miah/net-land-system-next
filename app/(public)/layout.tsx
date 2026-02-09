"use client";

import React from "react";
import { Layout } from "antd";
import { Header, Footer } from "@/components/layouts/index";

const { Content } = Layout;

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Content className="mx-[30px] my-5">{children}</Content>
      <Footer />
    </Layout>
  );
}
