import React from "react";

export default function Feed({ feed }) {
  return (
    <div>
      {/* <VideoPlayer hash={video.hash} /> */}
      <div className="flex justify-between flex-row py-4 border-borderWhiteGray dark:border-borderGray border-b-2">
        <div>
          <h3 className="text-2xl dark:text-white">{feed.title}</h3>
          <p className="text-gray-500 mt-1">
            {feed.category} • {feed.date}
          </p>
        </div>
        <button> Tip to author</button>
      </div>
      {/* <ChannelInfoInVideo video={video} /> */}
    </div>
  );
}
