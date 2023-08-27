import { API_ENDPOINTS } from '@/app/webapi';

//店舗検索
export const searchIds = async (query:string) => {
  const keyword = query;
  const apikey = process.env.NEXT_PUBLIC_API_KEY as string;
  const url = `${API_ENDPOINTS.HOT_PEPPER_SEARCH}?key=${apikey}&keyword=${encodeURIComponent(keyword)}&format=json`;
        try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      } catch (error) { 
        console.error("Error fetching Id_data:", error);
      }
    };

//グルメ検索
export const searchGourmet = async (query:string) => {
  const id = query;
  const apikey = process.env.NEXT_PUBLIC_API_KEY as string;
  const url = `${API_ENDPOINTS.GOURMET_SEARCH}?key=${apikey}&id=${id}&format=json`;
        try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      } catch (error) { 
        console.error("Error fetching gourmet_data:", error);
      }
    };
