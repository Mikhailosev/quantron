import React from "react";
import "./Spinner.css";
const spinner = () => (
  //! Элемент который появляется при загрузке данных на странице
  //! Сам CSS для спинера нашёл в интернете у одного аниматора,
  //! Но если убрать, то loading не пропадёт, скорее косметический эффект
  <div className="has-text-centered">
    <div className="Loader" />
    <h1 className="title">LOADING ...</h1>
  </div>
);
export default spinner;
