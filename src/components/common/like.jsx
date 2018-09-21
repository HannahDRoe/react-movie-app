import React from "react";

const Like = ({ toggleLike, liked }) => {
  return (
    <React.Fragment>
      <i
        style={{ cursor: "pointer" }}
        onClick={toggleLike}
        className={liked ? "fa fa-heart" : "fa fa-heart-o"}
        aria-hidden="true"
      />
    </React.Fragment>
  );
};

export default Like;
