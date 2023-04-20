import { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/home/Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Search from "./components/search/Search";
import Favourates from "./components/favourates/Favourates";
import PlayList from "./components/playlist/PlayList";
import keycloak from "keycloak-js";

function App() {
  const [count, setCount] = useState(0);
  const checkUser = async () => {
    const keyClock = new keycloak({
      url: "http://127.0.0.1:8080",
      realm: "musicPlayer",
      clientId: "musicPlayer",
    });
    const isAuth = await keyClock.init({ onLoad: "login-required" });
    console.log(isAuth);
  };
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <BrowserRouter>
      <div className="main__container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favourate" element={<Favourates />} />
          <Route path="/playlist" element={<PlayList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
