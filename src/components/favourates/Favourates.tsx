import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import "./Favourates.css";
import StarTwoToneIcon from "@mui/icons-material/StarTwoTone";
import bg from "../../assets/favourateBg.png";
import { motion } from "framer-motion";

const Favourates = () => {
  const [favourate, setFavourate] = useState([]);
  useEffect(() => {
    const data = localStorage.getItem("favourate");
    // @ts-ignore
    const data2 = JSON.parse(data);
    // @ts-ignore
    setFavourate(data2);
  }, []);
  return (
    <div className="main__div">
      <Sidebar />
      <div className="favouratepage__main__div">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="homepage__top__div"
        >
          <img src={bg} alt="" className="homepage__bg" />
          <div className="homepage__text__div">
            <h1 className="homepage__h1">
              Your favourite <StarTwoToneIcon className="star__icon" /> tunes
            </h1>
            <h1 className="homepage__h1">Right here.</h1>
          </div>
        </motion.div>
        <div className="favourateBox__div">
          <h3 className="favourate__h3">You most liked tunes...</h3>

          <div className="songCard__div">
            {favourate.map((cur, id) => (
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
      </div>
    </div>
  );
};

export default Favourates;
