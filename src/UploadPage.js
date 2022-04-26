import React, { useState, useRef } from "react";
import { create } from "ipfs-http-client";
import { BiCloud, BiPlus } from "react-icons/bi";
import getContract from "./utilities/getContract";
import { ToastContainer } from "react-toastify";

import { success, error, defaultToast } from "./utilities/response";

export default function Upload() {
  /*
   * A state variable we use to store new feed input.
   */

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [coverImage, setCoverImage] = useState("");

  /*
   * Create an IPFS node
   */
  const client = create("https://ipfs.infura.io:5001/api/v0");
  const coverImageRef = useRef();

  /*
   * A function to handle validation of uploading a new feed.
   */
  const handleSubmit = async () => {
    if (
      title === "" ||
      description === "" ||
      category === "" ||
      location === "" ||
      coverImage === ""
    ) {
      error("Please, all the fields are required!");
      return;
    }

    /*
     * Upload the cover image to IPFS
     */
    uploadCoverImage(coverImage);
  };

  /*
   * A function to upload a cover image to IPFS
   */
  const uploadCoverImage = async (coverImage) => {
    defaultToast("Uploading Cover Image...");

    try {
      const image = await client.add(coverImage);

      /*
       * Save the new feed to the blockchain
       */
      await saveFeed(image.path);
    } catch (err) {
      error("Error Uploading Cover Image");
    }
  };

  /*
   * A function to save a new feed to the blockchain
   */
  const saveFeed = async (coverImage) => {
    defaultToast("Saving Feed...");

    console.log(title, description, category, location, coverImage);

    try {
      const contract = await getContract();
      const UploadedDate = String(new Date());

      /*
       * Save the new feed to the blockchain
       */
      await contract.createFeed(
        title,
        description,
        location,
        category,
        coverImage,
        UploadedDate
      );

      success("Feed Saved Successfully");

      // reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setLocation("");
      setCoverImage("");

      // Redirect to Home Page
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      error("Error Saving Feed");
    }
  };

  // Handles redirect to Home Page or previous page
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="w-full h-screen flex flex-row">
      <div className="flex-1 flex flex-col">
        <div className="mt-5 mr-10 flex  justify-end">
          <div className="flex items-center">
            <button
              className="bg-transparent  dark:text-[#9CA3AF] py-2 px-6 border rounded-lg  border-gray-600  mr-6"
              onClick={() => {
                goBack();
              }}
            >
              Discard
            </button>
            <button
              onClick={() => {
                handleSubmit();
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-lg flex px-4 justify-between flex-row items-center"
            >
              <BiCloud />
              <p className="ml-2">Upload</p>
            </button>
          </div>
        </div>
        <div className="flex flex-col m-10 mt-5 lg:flex-row lg:justify-center">
          <div className="flex lg:w-3/4 flex-col ">
            <label className="text-gray-600 dark:text-[#9CA3AF] text-md font-bold mb-2">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Web3 is taking over the world!"
              className="w-[60%] dark:text-white dark:placeholder:text-gray-600 rounded-xl mt-2 h-12 p-2 border border-borderWhiteGray bg-white dark:bg-backgroundBlack dark:border-[#444752] focus:outline-none"
            />
            <label className="text-gray-600 dark:text-[#9CA3AF] mt-10 text-md font-bold">
              Body
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Web3 is all about decentralization — it aims to give users more control over their data."
              className="w-[60%] dark:text-white dark:placeholder:text-gray-600 rounded-xl mt-2 h-32 p-2 border border-borderWhiteGray bg-white dark:bg-backgroundBlack dark:border-[#444752] focus:outline-none"
            />

            <div className="flex flex-row mt-10 w-[60%] justify-between">
              <div className="flex flex-col w-2/5	">
                <label className="text-gray-600 dark:text-[#9CA3AF] text-md font-bold">
                  Location
                </label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  placeholder="Lagos - Nigeria"
                  className="rounded-md dark:text-white mt-2 dark:placeholder:text-gray-600 h-12 p-2 border border-borderWhiteGray bg-white dark:bg-backgroundBlack dark:border-[#444752] focus:outline-none"
                />
              </div>
              <div className="flex flex-col w-2/5">
                <label className="text-gray-600 dark:text-[#9CA3AF] text-md font-bold">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="dark:text-white mt-2 h-12 p-2 dark:border-gray-600 border rounded-xl border-borderWhiteGray bg-white dark:bg-backgroundBlack dark:text-[#9CA3AF] focus:outline-none"
                >
                  <option>Music</option>
                  <option>Sports</option>
                  <option>Gaming</option>
                  <option>News</option>
                  <option>Entertainment</option>
                  <option>Education</option>
                  <option>Technology</option>
                  <option>Travel</option>
                </select>
              </div>
            </div>
            <label className="text-gray-600 dark:text-[#9CA3AF] mt-10 text-md font-bold">
              Cover Image
            </label>

            <div
              onClick={() => {
                coverImageRef.current.click();
              }}
              className="border-2 w-64 dark:border-gray-600 border-dashed border-borderWhiteGray rounded-md mt-2 p-2 h-46 items-center justify-center flex flex-row"
            >
              {coverImage ? (
                <img
                  onClick={() => {
                    coverImageRef.current.click();
                  }}
                  src={URL.createObjectURL(coverImage)}
                  alt="coverImage"
                  className="h-full rounded-md w-full"
                />
              ) : (
                <BiPlus size={70} color="gray" />
              )}
            </div>

            <input
              type="file"
              className="hidden"
              ref={coverImageRef}
              onChange={(e) => {
                setCoverImage(e.target.files[0]);
              }}
            />
          </div>
        </div>
      </div>
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
    </div>
  );
}
