
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


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        
        <Route path="/movie/search/:keyword" element={<Catalog />} />
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Detail />} />
        <Route path="/my-movie" element={<MyMovie />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
