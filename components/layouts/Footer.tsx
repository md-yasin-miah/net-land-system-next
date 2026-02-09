"use client";

import React from "react";
import { Layout, Row, Col, Typography, Divider, theme } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { motion } from "framer-motion";

const { Footer: AntFooter } = Layout;
const { Title, Text } = Typography;

const footerLinks = {
  shop: [
    { label: "Today's Deals", href: "#deals" },
    { label: "New Arrivals", href: "#new-arrivals" },
    { label: "Best Sellers", href: "#bestsellers" },
    { label: "Categories", href: "#categories" },
  ],
  support: [
    { label: "Help Center", href: "#help" },
    { label: "Contact Us", href: "#contact" },
    { label: "Shipping Info", href: "#shipping" },
    { label: "Returns & Refunds", href: "#returns" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Careers", href: "#careers" },
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
  ],
};

const socialLinks = [
  { href: "#facebook", icon: FacebookOutlined, label: "Facebook", color: "#1877f2" },
  { href: "#twitter", icon: TwitterOutlined, label: "Twitter", color: "#1da1f2" },
  { href: "#instagram", icon: InstagramOutlined, label: "Instagram", color: "#e4405f" },
  { href: "#linkedin", icon: LinkedinOutlined, label: "LinkedIn", color: "#0a66c2" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function Footer() {
  const { token } = theme.useToken();
  const footerBg = token.colorPrimary;
  const textPrimary = "rgba(255, 255, 255, 0.95)";
  const textSecondary = "rgba(255, 255, 255, 0.75)";
  const dividerColor = "rgba(255, 255, 255, 0.2)";

  const linkStyle: React.CSSProperties = {
    color: textSecondary,
    fontSize: 14,
    textDecoration: "none",
    display: "block",
    marginBottom: 8,
    transition: "color 0.2s ease",
    cursor: "pointer",
  };

  return (
    <AntFooter
      style={{
        background: `linear-gradient(160deg, ${footerBg} 0%, ${footerBg}dd 50%, ${footerBg}cc 100%)`,
        borderTop: "none",
        padding: 0,
        marginTop: "auto",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px 28px" }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <Row gutter={[32, 32]}>
            {/* Brand & contact */}
            <Col xs={24} sm={24} md={8} lg={6}>
              <motion.div variants={itemVariants}>
                <Title level={5} style={{ marginBottom: 16, color: textPrimary, fontWeight: 700 }}>
                  NetLand
                </Title>
                <Text style={{ color: textSecondary, fontSize: 14, display: "block", marginBottom: 16, lineHeight: 1.6 }}>
                  Your trusted destination for tech and electronics. Quality products, competitive prices.
                </Text>
                <motion.div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                  variants={containerVariants}
                >
                  <motion.a
                    href="mailto:support@netland.com"
                    variants={itemVariants}
                    className="footer-link-light"
                    style={{ ...linkStyle, display: "flex", alignItems: "center", gap: 10 }}
                    whileHover={{ x: 6, transition: { duration: 0.2 } }}
                    whileTap={{ x: 2 }}
                  >
                    <MailOutlined style={{ fontSize: 16 }} />
                    support@netland.com
                  </motion.a>
                  <motion.a
                    href="tel:+8801700000000"
                    variants={itemVariants}
                    className="footer-link-light"
                    style={{ ...linkStyle, display: "flex", alignItems: "center", gap: 10 }}
                    whileHover={{ x: 6, transition: { duration: 0.2 } }}
                    whileTap={{ x: 2 }}
                  >
                    <PhoneOutlined style={{ fontSize: 16 }} />
                    +880 1700-000000
                  </motion.a>
                  <motion.span
                    variants={itemVariants}
                    style={{ ...linkStyle, display: "flex", alignItems: "flex-start", gap: 10, color: textSecondary }}
                  >
                    <EnvironmentOutlined style={{ marginTop: 4, fontSize: 16 }} />
                    <span>Dhaka, Bangladesh</span>
                  </motion.span>
                </motion.div>
              </motion.div>
            </Col>

            {/* Shop */}
            <Col xs={12} sm={12} md={5} lg={5}>
              <motion.div variants={itemVariants}>
                <Title level={5} style={{ marginBottom: 16, color: textPrimary, fontWeight: 600 }}>
                  Shop
                </Title>
                {footerLinks.shop.map((item) => (
                  <motion.div
                    key={item.href}
                    variants={itemVariants}
                    whileHover={{ x: 6, transition: { duration: 0.2 } }}
                    whileTap={{ x: 2 }}
                  >
                    <Link href={item.href} className="footer-link-light" style={linkStyle}>
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </Col>

            {/* Support */}
            <Col xs={12} sm={12} md={5} lg={5}>
              <motion.div variants={itemVariants}>
                <Title level={5} style={{ marginBottom: 16, color: textPrimary, fontWeight: 600 }}>
                  Customer Service
                </Title>
                {footerLinks.support.map((item) => (
                  <motion.div
                    key={item.href}
                    variants={itemVariants}
                    whileHover={{ x: 6, transition: { duration: 0.2 } }}
                    whileTap={{ x: 2 }}
                  >
                    <Link href={item.href} className="footer-link-light" style={linkStyle}>
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </Col>

            {/* Company + Social */}
            <Col xs={24} sm={24} md={6} lg={5}>
              <motion.div variants={itemVariants}>
                <Title level={5} style={{ marginBottom: 16, color: textPrimary, fontWeight: 600 }}>
                  Company
                </Title>
                {footerLinks.company.map((item) => (
                  <motion.div
                    key={item.href}
                    variants={itemVariants}
                    whileHover={{ x: 6, transition: { duration: 0.2 } }}
                    whileTap={{ x: 2 }}
                  >
                    <Link href={item.href} className="footer-link-light" style={linkStyle}>
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                {/* Modern social links */}
                <div style={{ marginTop: 24 }}>
                  <Text style={{ color: textSecondary, fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 12, display: "block" }}>
                    Follow us
                  </Text>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    {socialLinks.map((social, idx) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05, duration: 0.3 }}
                        whileHover={{ scale: 1.12, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 12,
                          background: "rgba(255, 255, 255, 0.12)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid rgba(255, 255, 255, 0.18)",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 20,
                          textDecoration: "none",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          transition: "background 0.2s, box-shadow 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = social.color;
                          e.currentTarget.style.boxShadow = `0 8px 20px ${social.color}44`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
                        }}
                      >
                        <social.icon style={{ fontSize: 20 }} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>

          <Divider style={{ borderColor: dividerColor, margin: "40px 0 28px" }} />

          {/* Bottom bar */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Row align="middle" justify="space-between" gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12}>
                <Text style={{ color: textSecondary, fontSize: 13 }}>
                  © {new Date().getFullYear()} NetLand. All rights reserved.
                </Text>
              </Col>
              <Col xs={24} sm={24} md={12} style={{ textAlign: "end" }}>
                <motion.span style={{ display: "inline-block", marginRight: 20 }} whileHover={{ x: 4, transition: { duration: 0.2 } }} whileTap={{ x: 2 }}>
                  <Link href="#privacy" className="footer-link-light" style={{ ...linkStyle, display: "inline" }}>
                    Privacy
                  </Link>
                </motion.span>
                <motion.span style={{ display: "inline-block" }} whileHover={{ x: 4, transition: { duration: 0.2 } }} whileTap={{ x: 2 }}>
                  <Link href="#terms" className="footer-link-light" style={{ ...linkStyle, display: "inline" }}>
                    Terms
                  </Link>
                </motion.span>
              </Col>
            </Row>
          </motion.div>
        </motion.div>
      </div>
    </AntFooter>
  );
}
