import { Route, Routes } from "react-router-dom";

import HomePage from "./HomePage";
import Upload from "./UploadPage";
import Feed from "./FeedPage";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<HomePage />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/feed" element={<Feed />} />
    </Routes>
  );
}

export default App;
