import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import Sidebar from "./components/Sidebar";
import { ToastContainer } from "react-toastify";
import FeedList from "./components/FeedList";
import { Link } from "react-router-dom";
import getContract from "./utilities/getContract";

import { success, error, warn } from "./utilities/response";

import "react-toastify/dist/ReactToastify.css";

export default function Main() {
  const [loading, setLoading] = useState(false);
  const [loadingArray] = useState(15);
  const [feeds, setFeeds] = useState([]);

  /*
   * A state variable we use to store our user's public wallet.
   */
  const [currentAccount, setCurrentAccount] = useState("");

  /*
   * A function to check if a user wallet is connected.
   */
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      /*
       * Check if we're authorized to access the user's wallet
       */
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account);
        success("🦄 Wallet is Connected!");
      } else {
        success("Welcome 🎉  ");
        warn("To create a feed, Ensure your wallet Connected!");
      }
    } catch (err) {
      error(`${err.message}`);
    }
  };

  /**
   * Implement your connectWallet method here
   */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        warn("Make sure you have MetaMask Connected");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (err) {
      error(`${err.message}`);
    }
  };

  /*
   * Get Feeds
   */
  const getFeeds = async () => {
    try {
      setLoading(true);
      const contract = await getContract();
      const AllFeeds = await contract.getAllFeeds();

      /*
       * We only need title, category, coverImageHash, and author
       * pick those out
       */
      const formattedFeed = AllFeeds.map((feed) => {
        return {
          id: feed.id,
          title: feed.title,
          category: feed.category,
          coverImageHash: feed.coverImageHash,
          author: feed.author,
          date: new Date(feed.date * 1000),
        };
      });
      setFeeds(formattedFeed);
      setLoading(false);
    } catch (err) {
      error(`${err.message}`);
    }
  };

  /*
   * Filter feeds by category
   */
  const filterBasedOnCategory = (category) => {
    if (category === "All") {
      setFeeds(feeds);
    } else {
      let filteredFeeds = feeds.filter((feed) => {
        return feed.category === category;
      });
      setFeeds(filteredFeeds);
    }
  };

  /*
   * This runs our function when the page loads.
   */
  useEffect(() => {
    getFeeds();
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="w-full  flex flex-row">
      <Sidebar updateCategory={(category) => filterBasedOnCategory(category)} />
      <div className="flex-1 flex flex-col">
        <Header
          currentAccount={currentAccount}
          connectWallet={connectWallet}
          ToastContainer={ToastContainer}
        />
        <div className="flex-1 flex flex-row flex-wrap">
          {feeds.map((feed, index) => {
            return (
              <Link to={`/feed?id=${feed.id}`} key={index}>
                <div className="w-80 h-80 m-2">
                  <FeedList feed={feed} />
                </div>
              </Link>
            );
          })}
          {loading && (
            <div className="flex-1 flex flex-row flex-wrap">
              {Array(loadingArray)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="w-80">
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
    <div className="flex flex-col m-5 animate-pulse">
      <div className="w-full bg-gray-300 dark:bg-borderGray h-40 rounded-lg "></div>
      <div className="w-50 mt-3 bg-gray-300 dark:bg-borderGray h-6 rounded-md "></div>
      <div className="w-24 bg-gray-300 h-3 dark:bg-borderGray mt-3 rounded-md "></div>
    </div>
  );
};
