import React from "react";
import style from "./message.module.css";

function Message() {
  return (
    <>
      <p className={style.swal}>Cant add! Contact already exist!</p>
    </>
  );
}

export default Message;
