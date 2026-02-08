"use client";

import Image from "next/image";
import Link from "next/link";

interface StaticPosterCardProps {
  poster: Poster;
}

export default function StaticPosterCard({ poster }: StaticPosterCardProps) {
  const { id, image, href } = poster;

  return (
    <div className="w-full h-full relative rounded-lg overflow-hidden">
      <Link href={href}>
        <Image
          src={image}
          alt={`Poster ${id}`}
          className="w-full h-full object-cover"
          fill
        />
      </Link>
    </div>
  );
}
