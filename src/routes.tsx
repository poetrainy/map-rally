import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "@/pages/Home";
import { SearchPage } from "@/pages/Search";
import { PostPage } from "@/pages/Post";
import { Setting } from "@/pages/Setting";
import { NewMapPage } from "@/pages/NewMap";
import { MapPage } from "@/pages/Map";
import { UserPage } from "@/pages/User";

export const ReactRouter = () => {
  return (
    <BrowserRouter basename="/petaree">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/maps">
          <Route path=":id" element={<MapPage />} />
          <Route path="new" element={<NewMapPage />} />
        </Route>
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/users/:id" element={<UserPage />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </BrowserRouter>
  );
};
