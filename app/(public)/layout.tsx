"use client";

import React from "react";
import { Layout } from "antd";
import { Header } from "@/components/layouts/index";

const { Content } = Layout;

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Content className="mx-[30px] mt-5">{children}</Content>
    </Layout>
  );
}
