"use client";

import React from "react";
import { Row, Col } from "antd";
import DealCard from "./DealCard";
import type { DealCard as DealCardType } from "@/mock/home";

interface DealCardsRowProps {
  deals: DealCardType[];
}

export default function DealCardsRow({ deals }: DealCardsRowProps) {
  return (
    <Row gutter={[16, 16]}>
      {deals.map((deal) => (
        <Col key={deal.id} xs={24} sm={24} md={8}>
          <DealCard deal={deal} />
        </Col>
      ))}
    </Row>
  );
}
