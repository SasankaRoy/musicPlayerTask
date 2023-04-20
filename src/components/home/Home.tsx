import { useEffect, useState } from "react";
import bg from "../../assets/homeBg.png";
import Sidebar from "../sidebar/Sidebar";
import "./home.css";
import StarTwoToneIcon from "@mui/icons-material/StarTwoTone";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { motion } from "framer-motion";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favorite, setFavorite] = useState([]);
  const [showOptions, setShowOptions] = useState();

  const handleClick = (id: number) => {
    // @ts-ignore
    setShowOptions(id + 1);
  };

  const setFavoriteLocal = (cur: any) => {
    // @ts-ignore
    setFavorite([...favorite, cur]);
  };

  // setting the data into the localStorage
  useEffect(() => {
    if (favorite?.length == 0) return;
    else {
      localStorage.setItem("favourate", JSON.stringify(favorite));
    }
  }, [favorite]);

  // get the favourate from the localStorage...
  useEffect(() => {
    const data = localStorage.getItem("favourate");
    // @ts-ignore
    const data2 = JSON.parse(data);
    // @ts-ignore
    setFavorite(data2);
  }, []);
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

  useEffect(() => {
    getSongs();
  }, []);

  return (
    <div className="main__div">
      <Sidebar />
      <div className="homepage">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="homepage__top__div"
        >
          <img src={bg} alt="" className="homepage__bg" />
          <div className="homepage__text__div">
            <h1 className="homepage__h1">
              Your favorites
              <StarTwoToneIcon className="star__icon" /> tunes
            </h1>
            <h1 className="homepage__h1">All at once.</h1>
          </div>
          <div className="show__div" />
        </motion.div>
        <div className="homepage__main__div">
          <div className="favoritesSongs__div">
            <h5 className="favorate__div__subheading">Tunes you might like.</h5>
            <hr />
            <div className="songCard__div">
              {isLoading ? (
                <CircularProgress />
              ) : (
                <>
                  {songs.map((cur, id) => (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="warapper"
                      key={id}
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
                            onClick={() => setFavoriteLocal(cur)}
                            className="options__h3"
                          >
                            <StarTwoToneIcon /> favorites
                          </h3>
                        </div>
                      ) : (
                        ""
                      )}
                    </motion.div>
                  ))}
                </>
              )}
            </div>
          </div>
          {favorite?.length >= 0 && (
            <div className="playlist__div">
              <h5 className="favorate__div__subheading">
                You favourates tunes.
              </h5>
              <hr />

              <div className="songCard__div">
                {favorite.map((cur, id) => (
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
                        cur.title
                      }
                    </h3>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
