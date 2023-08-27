import React from "react";
import Search from "./searchbox";

const HomePage = () => {
  return (
    <div>
      <Search /> {/* アプリ起動時にSearchBoxコンポーネントをレンダリング */}
    </div>
  );
};

export default HomePage;
