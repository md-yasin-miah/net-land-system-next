"use client";

import React from "react";
import { Layout } from "antd";
import Header from "../components/layouts/Header";

const { Content } = Layout;

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Content style={{ padding: "0 24px", marginTop: "20px" }}>
        {children}
      </Content>
    </Layout>
  );
}
