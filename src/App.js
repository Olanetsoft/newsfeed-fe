import { Route, Routes } from "react-router-dom";

import HomePage from "./HomePage";
import Upload from "./UploadPage";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<HomePage />} />
      <Route path="/upload" element={<Upload />} />
    </Routes>
  );
}

export default App;
