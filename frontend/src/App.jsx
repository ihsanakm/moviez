
import "./App.scss"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MovieGrid from "./components/movieGrid/MovieGrid";
import Catalog from "./pages/Catalog";
import Detail from "./pages/Detail";
import Header from "./components/header/Header";
import MyMovie from "./pages/MyMovie";
import LogIn from "./pages/LogIn"
import SignUp from "./pages/SignUp";
import AuthorizeUser from "./authContext/authorizeUser";



function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />

      
        <Route path="/movie/search/:keyword" element={<Catalog />} />
        <Route path="/movie/:id" element={<AuthorizeUser><Detail /></AuthorizeUser>} />
        <Route path="/my-movie" element={<AuthorizeUser><MyMovie /></AuthorizeUser>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
