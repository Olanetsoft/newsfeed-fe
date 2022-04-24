import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

export default function Sidebar({ updateCategory }) {
  const [active, setActive] = useState("All");

  let categories = [
    {
      name: <p style={{ color: active === "All" ? "green" : "black" }}>All</p>,
      onClick: () => {
        setActive("All");
        updateCategory("All");
      },
    },
    {
      name: (
        <p style={{ color: active === "Travel" ? "green" : "black" }}>Travel</p>
      ),
      onClick: () => {
        setActive("Travel");
        updateCategory("Travel");
      },
    },
    {
      name: (
        <p style={{ color: active === "Sports" ? "green" : "black" }}>Sports</p>
      ),
      onClick: () => {
        setActive("Sports");
        updateCategory("Sports");
      },
    },
    {
      name: (
        <p style={{ color: active === "Music" ? "green" : "black" }}>Music</p>
      ),
      onClick: () => {
        setActive("Music");
        updateCategory("Music");
      },
    },

    {
      name: (
        <p style={{ color: active === "Technology" ? "green" : "black" }}>
          Technology
        </p>
      ),
      onClick: () => {
        setActive("Technology");
        updateCategory("Technology");
      },
    },
    {
      name: (
        <p style={{ color: active === "Gaming" ? "green" : "black" }}>Gaming</p>
      ),
      onClick: () => {
        setActive("Gaming");
        updateCategory("Gaming");
      },
    },
    {
      name: (
        <p style={{ color: active === "News" ? "green" : "black" }}>News</p>
      ),
      onClick: () => {
        setActive("News");
        updateCategory("News");
      },
    },
    {
      name: (
        <p style={{ color: active === "Education" ? "green" : "black" }}>
          Education
        </p>
      ),
      onClick: () => {
        setActive("Education");
        updateCategory("Education");
      },
    },
    {
      name: (
        <p style={{ color: active === "Entertainment" ? "green" : "black" }}>
          Entertainment
        </p>
      ),
      onClick: () => {
        setActive("Entertainment");
        updateCategory("Entertainment");
      },
    },
  ];
  return (
    <div className="border-r border-borderWhiteGray dark:border-borderGray p-7">
      <AiOutlineMenu
        color="#fff"
        size="25px"
        className="fill-whiteIcons dark:fill-white"
      />
      <div className="mt-14 flex flex-col justify-between h-80">
        {categories.map((category, index) => (
          <div
            className="cursor-pointer hover:bg-gray-300 dark:bg-borderGray p-3 rounded-md hover:shadow-md transition-all duration-200 ease-in-out"
            onClick={category.onClick}
            key={index}
          >
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
}
