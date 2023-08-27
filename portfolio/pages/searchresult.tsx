import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { searchGourmet, searchIds } from '../api/search';
import Head from 'next/head';
import Image from 'next/image';
import 'src/styles/style.css'
import { ShopType } from './searchbox';

const SearchResults = () => {
  const router = useRouter();
  const [searchShops, setSearchShops] = useState<ShopType[] | null>();
  const [loading, setLoading] = useState(true);

  const term = router.query.term as string;
  const handleSearch = async () => {
    try {
        let resultShops:ShopType[]=[];
        const result:any = await searchIds(term);
        if(result){
            setLoading(false); 
        }
        for(let n = 0;n<=result.results?.shop.length-1;n++){
            const individualPhotoResult = await searchGourmet(result.results?.shop[n].id);
            if (individualPhotoResult) {
                resultShops.push(individualPhotoResult);
            }
        }
        if (resultShops.length) {
            setSearchShops(resultShops);
            setLoading(false);
        }
    } catch (error) {   
        console.error("Error fetching data:", error);
        setLoading(false);
    }
};
useEffect(() => {
    if(term){
        handleSearch();
    }
}, [term]);

  return (
    <div>
        <Head>
        <link rel="stylesheet" href="style.css" />
        </Head>
        <div>
        <h1>検索結果</h1>
        <div className="shop-grid-container">
      {
        searchShops?.map((shopType, index) => 
          shopType.results.shop.map((shop, innerIndex) => (
            <div key={`${index}-${innerIndex}`} className="shop-item">
              <Image src={shop.logo_image} alt={shop.name} width={200} height={120} />
              <div>{shop.name}</div>
            </div>
          ))
        )
      }
    </div>
        {/* {loading ? <div>ローディング中...</div> : searchId?.results?.shop?.length?<div>{searchId?.results?.shop[0].name}</div>:<div>店舗情報が見つかりません</div>} */}
        {/* {loading ? <div>ローディング中...</div> : searchPhoto?<Image src={searchPhoto?.results.shop[0].photo.pc.s} alt="Description" width={500} height={300} />:<div>店舗画像が見つかりません</div>}        */}
        </div>
        </div>
  );
};

export default SearchResults;
