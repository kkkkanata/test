    import React, { useState, useEffect } from 'react';
    import { searchGourmet, searchIds } from '../api/search';
    import { debounce } from 'lodash';
    import Image from 'next/image';
    import Head from 'next/head';
    import 'src/styles/style.css'
import Link from 'next/link';
    
    export interface IDType {
    results:{
    results_returned: string;
    shop:[
        {name:string,id:string,}
    ];
    }
    }

    export interface ShopType {
        results:{
        results_returned: string;
        shop:[
            {name:string,logo_image:string,photo:{pc:{s:string,m:string,l:string}},
            genre:{name:string,},capacity:string,url:{pc:string},
            id:string
        }
        ];
        // 他のパラメータもここに型を定義します
        }
        }
    const Search = () => {
    // 検索結果を管理するstate
    const [searchId, setSearchId] = useState<IDType | null>();
    // 検索結果IDを管理するstate
    const [searchShops, setsearchShops] = useState<ShopType[] | null>();
    // 検索ワードを管理するstate
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const handleSearch = debounce(async () => {
        setLoading(true);  // 検索開始前にローディング状態をtrueに
        let resultShops: ShopType[] = [];
        try {
            const result: any = await searchIds(searchTerm);
            if (result) {
                setSearchId(result);
            }
            for (let n = 0; n <= result.results?.shop.length - 1; n++) {
                const individualPhotoResult = await searchGourmet(result.results?.shop[n].id);
                if (individualPhotoResult) {
                    resultShops.push(individualPhotoResult);
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            // 最終的に検索結果を設定
            setsearchShops(resultShops.length ? resultShops : null);
            setLoading(false);  // ローディング状態を解除
        }
    }, 500);    
    useEffect(() => {
        if(searchTerm){
            handleSearch();
        }
        return () => {
            handleSearch.cancel();  // cleanup関数でキャンセル
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
            onChange={e => setSearchTerm(e.target.value)}  // 入力が変わる度にstateを更新
            />
        <div className="shop-container" >
      {
        searchShops?.slice(0, 5).map((shopType, index) => 
          shopType.results.shop.map((shop, innerIndex) => (
            <div key={`${index}-${innerIndex}`} className="shop-item">
                 <Link href={`/searchdetail?id=${shop.id}`}>
            <a>
              <Image src={shop.logo_image} alt={shop.name} width={200} height={120} />
              <div>{shop.name}</div>
            </a>
          </Link>
            </div>
          ))
        )

      }
    {
  searchShops && searchShops.length >= 6 ? (
    <Link href={`/searchresult?term=${searchTerm}`}>
      <a><button>全ての検索結果を表示</button></a>
    </Link>
  ) : null
}
    
    

    </div>
        {/* {loading ? <div>ローディング中...</div> : searchId?.results?.shop?.length?<div>{searchId?.results?.shop[0].name}</div>:<div>店舗情報が見つかりません</div>} */}
        {/* {loading ? <div>ローディング中...</div> : searchPhoto?<Image src={searchPhoto?.results.shop[0].photo.pc.s} alt="Description" width={500} height={300} />:<div>店舗画像が見つかりません</div>}        */}
        </div>
        </div>
    );

    }

    export default Search;
