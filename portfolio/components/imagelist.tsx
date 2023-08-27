import Image from "next/image";
import React from "react";

interface ImageList {
  src: string;
  alt: string;
  id: string;
}

// 検索結果をリスト状に表示
const ImageList: React.FC<ImageList> = ({ src, alt }) => {
  return (
    <div className="image-hover">
      <Image src={src} alt={alt} tabIndex={0} width={200} height={120} />
    </div>
  );
};

export default ImageList;
