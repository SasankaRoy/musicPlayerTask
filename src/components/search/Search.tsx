import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import bg from "../../assets/search2.png";
import bg2 from "../../assets/noData.png";
import "./Search.css";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import axios from "axios";
import { motion } from "framer-motion";
const Search = () => {
  const [noSearchData, setNoSearchData] = useState(true);
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const getSongs = async () => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onChageHandler = (event: String) => {
    // @ts-ignore
    let matches = [];
    if (event.length > 0) {
      setNoSearchData(false);
      matches = songs.filter((song) => {
        // @ts-ignore
        const items = new RegExp(`${event}`, "gi");
        // @ts-ignore
        return song.title.match(items);
      });
    } else {
      setNoSearchData(true);
    }

    // @ts-ignore
    setSuggestions(matches);
    // @ts-ignorets
    setText(event);
  };

  useEffect(() => {
    getSongs();
  }, []);
  return (
    <div className="main__div">
      <Sidebar />
      <div className="searchpage__main__div">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="homepage__top__div"
        >
          <img src={bg} alt="" className="homepage__bg" />
          <div className="homepage__text__div">
            <h1 className="homepage__h1">
              Find
              <SearchTwoToneIcon className="star__icon" />
              Your favourite tunes
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
        {noSearchData ? (
          <div className="searchResult__div">
            <div className="NoSearchimg__div">
              <img src={bg2} alt="" className="Nosearch__img" />
              <h1 className="noSearch__h1">
                Search to get the search results.
              </h1>
            </div>
          </div>
        ) : (
          <>
            <h1 className="searchResults__h1">Search Results ...</h1>
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
                  <h3 className="songName__h3">
                    {" "}
                    {
                      // @ts-ignore
                      cur?.title
                    }
                  </h3>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
