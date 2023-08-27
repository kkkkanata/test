import Image from "next/image";
import React from "react";
import Link from "next/link";

// 検索結果画面にて画像をグリッド状に表示
interface ImageGridProps {
  shop: {
    name: string;
    logo_image: string;
    id: string;
  };
  focusedImage: string | null;
  handleMouseEnter: (id: string) => void;
  handleMouseLeave: () => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({
  shop,
  focusedImage,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  return (
    <div className="shop-item">
      <Link href={`/searchdetail?id=${shop.id}`}>
        <a>
          <div
            className={`image-hover ${
              focusedImage === shop.id ? "focused" : ""
            }`}
          >
            <Image
              src={shop.logo_image}
              alt={shop.name}
              onMouseEnter={() => handleMouseEnter(shop.id)}
              onMouseLeave={handleMouseLeave}
              tabIndex={0}
              width={200}
              height={120}
            />
          </div>
          <div>{shop.name}</div>
        </a>
      </Link>
    </div>
  );
};

export default ImageGrid;
