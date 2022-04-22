import React from "react";
import { Link } from "react-router-dom";

export const Header = ({ currentAccount, connectWallet, ToastContainer }) => {
  return (
    <header className="w-full flex justify-between h-20 items-center border-b p-4 border-borderWhiteGray dark:border-borderGray">
      <div className=" w-1/3">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-green-700">Home</h1>
        </Link>
      </div>
      <div className=" w-1/3 flex justify-center items-center">
        <h1 className="text-2xl font-bold text-green-500 dark:text-green-400">
          News Feed!
        </h1>
      </div>

      {currentAccount ? (
        <div className="w-1/3 flex justify-end items-center">
          <Link to="/upload">
            <button className="items-center bg-green-600 rounded-full font-medium p-2 shadow-lg color-blue-500 hover:bg-green-500 focus:outline-none focus:shadow-outline text-white">
              <span className="">Create a New Feed</span>
            </button>
          </Link>
        </div>
      ) : (
        <div className=" w-1/3 flex justify-end">
          <button
            className="items-center bg-green-700 rounded-full font-medium p-3 shadow-lg color-blue-500 hover:bg-green-500 focus:outline-none focus:shadow-outline text-white"
            onClick={() => {
              connectWallet();
            }}
          >
            <span className="">Connect your wallet</span>
          </button>
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </header>
  );
};
