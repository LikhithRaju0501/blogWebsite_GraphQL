import React from "react";

import { Link } from "react-router-dom";

import "./Cardcomp.css";
import bg1 from "../../Assests/cardimg1.webp";
import bg2 from "../../Assests/cardimg2.webp";
import bg3 from "../../Assests/cardimg3.webp";
import bg4 from "../../Assests/cardimg4.webp";
import { isLoggedIn } from "../Authentication/auth";

const Cardcomp = ({ blog }) => {
  const { id, image, author, category, title, content } = blog;
  const ranNum = Math.round(Math.random() * 4);
  let bg = bg1;
  if (ranNum === 0) bg = bg1;
  if (ranNum === 1) bg = bg2;
  if (ranNum === 2) bg = bg3;
  if (ranNum === 3) bg = bg4;
  return (
    <div className="cardGroup">
      <div className="cardComp">
        <Link
          to={isLoggedIn() && `/blogContent/${id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          {image ? (
            <img src={image} className="imgCard" alt="BlogImage" />
          ) : (
            <div
              className="imgCard"
              style={{ backgroundImage: "url(" + bg + ")" }}
            ></div>
          )}
          <div className="authorCard" style={{ textTransform: "uppercase" }}>
            POSTED BY :{author}
          </div>
          <div className="categoryCard" style={{ textTransform: "uppercase" }}>
            {category?.trim() === "" ? "General" : category}
          </div>
          <div className="headingCard" style={{ textTransform: "uppercase" }}>
            {title}
          </div>
        </Link>
        <div className="contentCard">
          <p>{content}</p>
          <div className="iconCard">
            <i
              className="far fa-heart"
              style={{ fontSize: "15px", textAlign: "center" }}
            ></i>
            <i
              className="fas fa-comment-alt-lines"
              style={{ fontSize: "15px", textAlign: "center" }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cardcomp;
