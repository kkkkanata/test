import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import "src/styles/style.css";
import { searchGourmet } from "../api/search";

export interface ShopDetailType {
  name: string;
  logo_image: string;
  photo: { pc: { s: string; m: string; l: string } };
  genre: { name: string };
  capacity: string;
  urls: { pc: string };
  id: string;
  address: string;
  station_name: string;
  access: string;
  open: string;
  close: string;
}
//検索結果店舗の詳細を表示
const SearchShopDetail = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [ShopDetail, setShopDetail] = useState<ShopDetailType | null>();
  const handleSearchDetail = async () => {
    try {
      let result = await searchGourmet(id);
      if (result.results?.shop?.length >= 1) {
        setShopDetail(result.results.shop[0]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      handleSearchDetail();
    }
  }, [router.query]);
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="style.css" />
      </Head>
      <div className="shop-detail">
        {ShopDetail ? (
          <>
            <h1>{ShopDetail.name}</h1>
            <div className="shop-detail-container">
              <div className="shop-detail-image">
                <Image
                  src={ShopDetail.photo.pc.l}
                  alt={ShopDetail.name}
                  width={500}
                  height={300}
                />
              </div>
              <div className="shop-info">
                <p>
                  <strong>営業時間:</strong> {ShopDetail.open}
                </p>
                <p>
                  <strong>定休日:</strong> {ShopDetail.close}
                </p>
                <p>
                  <strong>住所:</strong> {ShopDetail.address}
                </p>
                <p>
                  <strong>最寄り駅:</strong> {ShopDetail.station_name}
                </p>
                <p>
                  <strong>アクセス:</strong> {ShopDetail.access}
                </p>
                <p>
                  <strong>ジャンル:</strong> {ShopDetail.genre.name}
                </p>
                <a
                  href={ShopDetail.urls.pc}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  公式サイトへ
                </a>
              </div>
            </div>
          </>
        ) : (
          <div>ローディング中...</div>
        )}
      </div>
    </div>
  );
};

export default SearchShopDetail;
