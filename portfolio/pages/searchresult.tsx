import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { searchGourmet, searchIds } from "../api/search";
import Head from "next/head";
import "src/styles/style.css";
import { ShopType } from "./searchbox";
import ImageGrid from "../components/imagegrid";
import BicPicture from "../components/bicpicture";

// 検索結果が6軒以上の場合に遷移できる
const SearchResults = () => {
  const router = useRouter();
  const [searchShops, setSearchShops] = useState<ShopType[] | null>();
  // 画像フォーカス時を管理するstate
  const [focusedImage, setFocusedImage] = useState<string | null>(null);
  // 検索画面からキーワード受け取る
  const term = router.query.term as string;
  const handleSearch = async () => {
    try {
      let resultShops: ShopType[] = [];
      const result: any = await searchIds(term);
      if (result) {
        for (let n = 0; n <= result.results?.shop.length - 1; n++) {
          const individualPhotoResult = await searchGourmet(
            result.results?.shop[n].id
          );
          if (individualPhotoResult) {
            resultShops.push(individualPhotoResult);
          }
        }
        if (resultShops.length) {
          setSearchShops(resultShops);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (term) {
      handleSearch();
    }
  }, [term]);
  // マウスオーバー時にビッグピクチャ表示
  const handleMouseEnter = (imageId: string) => {
    setFocusedImage(imageId);
  };
  // 画像にマウスオーバーしていない時は空
  const handleMouseLeave = () => {
    setFocusedImage(null);
  };
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="style.css" />
      </Head>
      <div>
        <h1>検索結果</h1>
        {/* ビッグピクチャ */}
        <BicPicture focusedImage={focusedImage} searchShops={searchShops} />
        <div className="shop-grid-container">
          {searchShops?.map((shopType, index) =>
            shopType.results.shop.map((shop, innerIndex) => (
              // 検索結果画像をグリッド状に表示
              <ImageGrid
                key={`${index}-${innerIndex}`}
                shop={shop}
                focusedImage={focusedImage}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
