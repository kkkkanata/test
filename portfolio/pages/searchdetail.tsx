import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import 'src/styles/style.css'
import { searchGourmet } from '../api/search';

export interface ShopDetailType {
        name:string,logo_image:string,photo:{pc:{s:string,m:string,l:string}},
        genre:{name:string,},capacity:string,url:{pc:string},
        id:string
    }
const SearchShopDetail = () => {
  const router = useRouter();
  const id =router.query.id as string;
  const [ShopDetail, setShopDetail] = useState<ShopDetailType | null>();
  const handleSearchDetail = async () => {
    try {
        let result = await searchGourmet(id);
        if(result.results.shop.length >= 1){
            setShopDetail(result.results.shop[0]);
            }
    } catch (error) {   
        console.error("Error fetching data:", error);
    }
};
  
useEffect(() => {
        handleSearchDetail();
}, [router.query]);

  return (
    <div>
        <Head>
        <link rel="stylesheet" href="style.css" />
        </Head>
        <div>
        <h1>{ShopDetail?.name}</h1>
        <div className="shop-grid-container">
      {     <div>
          <Image src={ShopDetail?.photo?.pc?.l as string} alt={ShopDetail?.name as string} width={500} height={300} />


      </div>
            
      }
    </div>
        {/* {loading ? <div>ローディング中...</div> : searchId?.results?.shop?.length?<div>{searchId?.results?.shop[0].name}</div>:<div>店舗情報が見つかりません</div>} */}
        {/* {loading ? <div>ローディング中...</div> : searchPhoto?<Image src={searchPhoto?.results.shop[0].photo.pc.s} alt="Description" width={500} height={300} />:<div>店舗画像が見つかりません</div>}        */}
        </div>
        </div>
  );
};

export default SearchShopDetail;
