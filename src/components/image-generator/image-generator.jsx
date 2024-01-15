import React, { useRef, useState } from "react";
import "./image-generator.css";
import default_img from "../images/Default-Image.jpg";

const ImageGenerator = () => {
  const [imageURL, setimageURL] = useState("/");
  const [inputref, setInput] = useState("");

  const key = "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";
  const apiurl = "";
  const generateImage = async () => {
    if (inputref === "") {
      //if without input we clicked button then return 0;
      return 0;
    }
    const response = await fetch(
      "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer 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",

          /*
          The Bearer keyword is used to indicate that the token is a bearer token, which is a type of authentication token that grants access to a protected resource when presented.
           */
        },
        body: JSON.stringify({ inputs: inputref }),
        /*
        The JSON.stringify() method is used to convert this object to a JSON string, which is then passed as the request body in the API request. 
        This is necessary because the API expects the request body to be a JSON string, and not a JavaScript object. */
      }
    );

    const blob = await response.blob();
    setimageURL(URL.createObjectURL(blob));

    /*
    setimageURL(URL.createObjectURL(blob)); is used to create a URL object that can be used to reference the Blob object as an image source. The URL.createObjectURL(blob) method creates a URL object that points to the Blob object, and the setimageURL function is used to set the URL object as the image source URL.
     */
  };
  return (
    <div className="image-generator">
      <div className="header">
        <span className="art">Art</span>ify
      </div>

      <div className="header-descr">
        <span className="art-descr">
          "Instantly generate captivating images with AI magic!"
        </span>
      </div>

      <div className="image-loading">
        <div className="image">
          <img src={imageURL === "/" ? default_img : imageURL}></img>
        </div>
      </div>

      <div className="searchBox">
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="search"
          placeholder="Create AI Images"
        ></input>
        <div className="generate-btn" onClick={generateImage}>
          Artify
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
