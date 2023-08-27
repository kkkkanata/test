import React, { useState, useEffect } from "react";
import { searchGourmet, searchIds } from "../api/search";
import { debounce } from "lodash";
import Head from "next/head";
import "src/styles/style.css";
import Link from "next/link";
import ImageList from "../components/imagelist";

export interface IDType {
  results: {
    results_returned: string;
    shop: [{ name: string; id: string }];
  };
}

export interface ShopType {
  results: {
    results_returned: string;
    shop: [
      {
        name: string;
        logo_image: string;
        photo: { pc: { s: string; m: string; l: string } };
        genre: { name: string };
        capacity: string;
        url: { pc: string };
        id: string;
      }
    ];
  };
}
// キーワード検索画面を表示
const Search = () => {
  // 検索結果を管理するstate
  const [searchShops, setsearchShops] = useState<ShopType[] | null>();
  // 検索ワードを管理するstate
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  // 入力スピードが早くても500ミリ秒ごとの呼び出し
  const handleSearch = debounce(async () => {
    setLoading(true); // 検索開始前にローディング状態をtrueに
    let resultShops: ShopType[] = [];
    try {
      // キーワードから店舗情報を取得
      const result: any = await searchIds(searchTerm);
      if (result) {
        //店舗情報があればIDを元に詳細情報取得
        for (let n = 0; n <= result.results?.shop.length - 1; n++) {
          const individualPhotoResult = await searchGourmet(
            result.results?.shop[n].id
          );
          if (individualPhotoResult) {
            resultShops.push(individualPhotoResult);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // 最終的に検索結果を設定
      setsearchShops(resultShops.length ? resultShops : null);
      setLoading(false); // ローディング状態を解除
    }
  }, 500);
  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    }
    return () => {
      handleSearch.cancel(); // cleanup関数でキャンセル
    };
  }, [searchTerm]);

  return (
    <div>
      <Head>
        <link rel="stylesheet" href="style.css" />
      </Head>
      <div>
        <h1>店舗検索</h1>
        <input
          type="text"
          placeholder="検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // 入力が変わる度にstateを更新
        />

        <div className="shop-container">
          {loading ? (
            <div>検索ボックスに入力してください</div>
          ) : searchShops ? (
            searchShops.slice(0, 5).map((shopType, index) =>
              shopType.results.shop.map((shop, innerIndex) => (
                <div key={`${index}-${innerIndex}`} className="shop-item">
                  <Link href={`/searchdetail?id=${shop.id}`}>
                    <a>
                      {/* 検索結果画像をリスト表示 */}
                      <ImageList
                        src={shop.logo_image}
                        alt={shop.name}
                        id={shop.id}
                      />
                      <div>{shop.name}</div>
                    </a>
                  </Link>
                </div>
              ))
            )
          ) : (
            <div>店舗情報が見つかりません</div>
          )}
          {searchShops && searchShops.length >= 6 ? (
            <Link href={`/searchresult?term=${searchTerm}`}>
              <a>
                <button className={"result-button"}>
                  全ての検索結果を表示
                </button>
              </a>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Search;
