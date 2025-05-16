import React, { Fragment } from "react";

const PromiseCard = ({ image,text }) => {
  
  return (
    <Fragment>
      <div className="promise-comp">
        <img src={image} alt="fresh image"></img>
        <p>{text}</p>
      </div>
    </Fragment>
  );
};

export default PromiseCard;
