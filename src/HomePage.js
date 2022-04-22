import React, { useState } from "react";
import { Header } from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function Main() {
  const [loading] = useState(true);
  const [loadingArray] = useState(15);

  return (
    <div className="w-full  flex flex-row">
      <Sidebar updateCategory="" />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 flex flex-row flex-wrap">
          {loading && (
            <div className="flex-1 flex flex-row flex-wrap">
              {Array(loadingArray)
                .fill(0)
                .map((_, index) => (
                  <div className="w-80">
                    <Loader />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const Loader = () => {
  return (
    <div class="flex flex-col m-5 animate-pulse">
      <div class="w-full bg-gray-300 dark:bg-borderGray h-40 rounded-lg "></div>
      <div class="w-50 mt-3 bg-gray-300 dark:bg-borderGray h-6 rounded-md "></div>
      <div class="w-24 bg-gray-300 h-3 dark:bg-borderGray mt-3 rounded-md "></div>
    </div>
  );
};
