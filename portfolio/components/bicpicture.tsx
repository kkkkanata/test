import React from "react";
import { ShopType } from "../pages/searchbox";

interface BicPictureProps {
  focusedImage: string | null;
  searchShops: ShopType[] | null | undefined;
}

// 画像フォーカス時にビックピクチャ表示
const BicPicture: React.FC<BicPictureProps> = ({
  focusedImage,
  searchShops,
}) => {
  if (!focusedImage || !searchShops) return null;
  // focusedImageのIDに対応する店舗情報を探す
  const focusedShop = searchShops
    .flatMap((shopType) => shopType.results.shop)
    .find((shop) => shop.id === focusedImage);

  if (!focusedShop) return null;

  return (
    <div className="focused-image-container">
      <div className="focused-image-wrapper">
        <div className="focused-image-caption-container">
          <div className="focused-image-caption">
            <strong>店名:</strong>
            {focusedShop.name}
          </div>
          <div className="focused-image-caption">
            <strong>ジャンル:</strong>
            {focusedShop.genre.name}
          </div>
        </div>
        <img
          src={focusedShop.logo_image}
          alt={focusedShop.name}
          width={500}
          height={300}
        />
      </div>
    </div>
  );
};

export default BicPicture;
