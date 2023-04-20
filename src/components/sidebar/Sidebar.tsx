import React from "react";
import "./sidebar.css";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import MapsHomeWorkTwoToneIcon from "@mui/icons-material/MapsHomeWorkTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import StarTwoToneIcon from "@mui/icons-material/StarTwoTone";
import PlaylistPlayTwoToneIcon from "@mui/icons-material/PlaylistPlayTwoTone";
import { motion } from "framer-motion";
const Sidebar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="sidebar_main__div"
    >
      {/* the logo or top div */}
      <div className="top__div">
        <div className="logo__div">
          <img src={Logo} alt="logo" className="logo__img" />
        </div>
        <h1 className="logo__h1">
          <span className="logo__span">#</span>JustplayIt.
        </h1>
      </div>

      {/* the navigatin link div */}
      <div className="nav__div">
        <ul className="nav__ul">
          <Link to="/" className="nav__li">
            <MapsHomeWorkTwoToneIcon className="nav__icons" />
            <span className="nav__span">Home</span>
          </Link>
          <Link to="/search" className="nav__li">
            <SearchTwoToneIcon className="nav__icons" />
            <span className="nav__span">Search</span>
          </Link>
          <Link to="/favourate" className="nav__li">
            <StarTwoToneIcon className="nav__icons" />
            <span className="nav__span">Favourites</span>
          </Link>
          <Link to="/playlist" className="nav__li">
            <PlaylistPlayTwoToneIcon className="nav__icons" />
            <span className="nav__span">playlists</span>
          </Link>
        </ul>
      </div>

      {/* the footer */}
      {/* <div className="footer">
        <button className="footer__btn">Log out</button>
      </div> */}
    </motion.div>
  );
};

export default Sidebar;
