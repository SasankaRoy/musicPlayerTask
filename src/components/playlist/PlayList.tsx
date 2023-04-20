import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import "./Playlist.css";
import bg from "../../assets/createplaylist.png";
import PlaylistPlayTwoToneIcon from "@mui/icons-material/PlaylistPlayTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import axios from "axios";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StarTwoToneIcon from "@mui/icons-material/StarTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import { motion } from "framer-motion";
const PlayList = () => {
  const [songs, setSongs] = useState([]);

  const [suggestions, setSuggestions] = useState([]);
  const [showOptions, setShowOptions] = useState();
  const [playList, setPlayList] = useState([]);

  const handleClick = (id: number) => {
    // @ts-ignore
    setShowOptions(id + 1);
  };

  const getSongs = async () => {
    try {
      const options = {
        params: { id: "40008598", locale: "en-US" },
        headers: {
          "X-RapidAPI-Key":
            "ee3f072a9cmsh203549290a8ac40p112db4jsn5f4d7b5b9650",
          "X-RapidAPI-Host": "shazam.p.rapidapi.com",
        },
      };
      const result = await axios.get(
        "https://shazam.p.rapidapi.com/songs/list-artist-top-tracks",
        options
      );

      setSongs(result.data.tracks);
    } catch (error) {
      console.log(error);
    }
  };

  const setPlayListLocal = (cur: any) => {
    // @ts-ignore
    setPlayList([...playList, cur]);
  };

  useEffect(() => {
    if (playList.length == 0) {
      return;
    } else {
      localStorage.setItem("playlist", JSON.stringify(playList));
    }
    console.log(playList.length);
  }, [playList]);
  useEffect(() => {
    const data = localStorage.getItem("playlist");
    // @ts-ignore
    const data2 = JSON.parse(data);
    setPlayList(data2);
  }, []);

  const onChageHandler = (event: String) => {
    // @ts-ignore
    let matches = [];
    if (event.length > 0) {
      matches = songs.filter((song) => {
        // @ts-ignore
        const items = new RegExp(`${event}`, "gi");
        // @ts-ignore
        return song.title.match(items);
      });
    }

    // @ts-ignore
    setSuggestions(matches);
  };

  useEffect(() => {
    getSongs();
  }, []);
  return (
    <div className="main__div">
      <Sidebar />
      <div className="playlist__main__div">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="homepage__top__div"
        >
          <img src={bg} alt="" className="homepage__bg" />
          <div className="homepage__text__div">
            <h1 className="homepage__h1">
              Your Playlist <PlaylistPlayTwoToneIcon className="star__icon" />{" "}
            </h1>
            <h1 className="homepage__h1">Right here.</h1>
          </div>
        </motion.div>

        <div className="searchBox__div">
          <div className="searchInput__div">
            <input
              type="text"
              placeholder="Search..."
              className="search__input"
              onChange={(e) => onChageHandler(e.target.value)}
            />
            <SearchTwoToneIcon className="search__icon" />
          </div>
        </div>
        <div className="songCard__div">
          {suggestions.map((cur, id) => (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              key={id}
              className="warapper"
            >
              <div className="image__div">
                <img
                  src={
                    // @ts-ignore
                    cur.images.coverarthq
                  }
                  className="songImage"
                  alt="img"
                />
              </div>
              <div className="song__div">
                <h3 className="songName__h3">
                  {
                    // @ts-ignore
                    cur?.title
                  }
                </h3>
                <MoreVertIcon
                  onClick={() => handleClick(id)}
                  className="more__Icon"
                />
              </div>
              {showOptions == id + 1 && showOptions ? (
                <div className="options__div">
                  <CancelTwoToneIcon
                    onClick={() => {
                      // @ts-ignore
                      setShowOptions();
                    }}
                    className="Can__icon"
                  />
                  <h3
                    onClick={() => setPlayListLocal(cur)}
                    className="options__h3"
                  >
                    <StarTwoToneIcon /> create playlist
                  </h3>
                </div>
              ) : (
                ""
              )}
            </motion.div>
          ))}
        </div>
        <div className="playliBox__div">
          <h3 className="playlist__h3"> Your Playlist.</h3>
          <div className="songCard__div">
            {playList.map((cur, id) => (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                key={id}
                className="warapper"
              >
                <div className="image__div">
                  <img
                    src={
                      // @ts-ignore
                      cur.images.coverarthq
                    }
                    className="songImage"
                    alt="img"
                  />
                </div>
                <h3 className="songName__h3">
                  {
                    // @ts-ignore
                    cur?.title
                  }
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayList;
