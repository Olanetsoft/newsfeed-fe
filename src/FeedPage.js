import React, { useEffect, useState } from "react";
import getContract from "./utilities/getContract";
import { Link } from "react-router-dom";
import FeedList from "./components/FeedList";
import Feed from "./components/Feed";

export default function FeedPage() {
  const [relatedFeeds, setRelatedFeeds] = useState([]);

  // state variable to store the current feed
  const [feed, setFeed] = useState([]);

  // Function to get the feed id from the url
  const getUrlValue = () => {
    let vars = {};
    window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function (m, key, value) {
        vars[key] = value;
      }
    );
    return vars;
  };

  /*
   * Get Feed
   */
  const getFeed = async () => {
    try {
      const contract = await getContract();
      let feedId = getUrlValue()["id"];
      const singleFeed = await contract.getFeed(feedId);

      // Format feed
      const formattedFeed = {
        id: singleFeed[0],
        title: singleFeed[1],
        description: singleFeed[2],
        location: singleFeed[3],
        category: singleFeed[4],
        coverImageHash: singleFeed[5],
        date: singleFeed[6],
        author: singleFeed[7],
      };

      setFeed(formattedFeed);
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Get Related Feeds
   */
  const getRelatedFeeds = async () => {
    try {
      const contract = await getContract();
      let feedId = getUrlValue()["id"];
      // Get all feeds and return feeds and filter only the one in the same category as the feed
      const allFeeds = await contract.getAllFeeds();
      const singleFeed = await contract.getFeed(feedId);
      // Format feed
      const formattedSingleFeed = {
        id: singleFeed[0],
        title: singleFeed[1],
        description: singleFeed[2],
        location: singleFeed[3],
        category: singleFeed[4],
        coverImageHash: singleFeed[5],
        date: singleFeed[6],
        author: singleFeed[7],
      };
      const relatedFeeds = allFeeds.filter(
        (feed) => feed.category === formattedSingleFeed.category
      );

      const formattedFeeds = relatedFeeds.map((feed) => {
        return {
          id: feed.id,
          title: feed.title,
          description: feed.description,
          location: feed.location,
          category: feed.category,
          coverImageHash: feed.coverImageHash,
          author: feed.author,
          date: feed.date,
        };
      });

      setRelatedFeeds(formattedFeeds);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
    getRelatedFeeds();
  }, []);

  return (
    <div className="w-full  flex flex-row">
      <div className="flex-1 flex flex-col">
        <div className="flex flex-col m-10 justify-between lg:flex-row">
          <div className="lg:w-4/6 w-6/6">{feed && <Feed feed={feed} />}</div>
          <div className="w-2/6">
            <h4 className="text-xl font-bold dark:text-white ml-5 mb-3 text-black">
              Related Feeds
              <Link to="/">
                <button className="bg-red-600 hover:bg-red-800 text-white font-bold px-2 rounded ml-10">
                  Go Back
                </button>
              </Link>
            </h4>
            {relatedFeeds.map((f) => {
              return (
                <Link
                  onClick={() => {
                    setFeed(f);
                  }}
                  to={`/feed?id=${f.id}`}
                >
                  <FeedList feed={f} horizontal={true} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
