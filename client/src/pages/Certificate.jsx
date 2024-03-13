import React, { useState, useRef } from "react";
import certi from "/Certificate.jpg";
import { toast } from "react-toastify";

function Certificate() {
  const [loading, setloading] = useState(false);
  const [name, setName] = useState("");
  const hiddenAnchorRef = useRef(null);
  const blobUrlRef = useRef("");
  const handleBibSubmit = (e) => {
    e.preventDefault();
    // const today = new Date();

    setloading(true);
    onDownloadPosterClick();
  };

  async function onDownloadPosterClick() {
    const offscreen = new OffscreenCanvas(842, 595);
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }
    var base_image = new Image();

    base_image.src = certi;
    if (base_image.complete) {
      ctx.drawImage(base_image, 0, 0, 842, 595);
      ctx.font = "22px serif";
      ctx.textAlign = "center";
      var textWidth = ctx.measureText(name).width;
      const leftI = (440 / textWidth / 2) * textWidth + 200;
      ctx.fillText(name, leftI, 315, 440);
      const blob = await offscreen.convertToBlob({
        type: "image/png",
      });

      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
      blobUrlRef.current = URL.createObjectURL(blob);

      if (hiddenAnchorRef.current) {
        hiddenAnchorRef.current.href = blobUrlRef.current;
        hiddenAnchorRef.current.click();
      }
    } else {
      base_image.onload = function () {
        ctx.drawImage(base_image, 0, 0, 842, 595);
      };
      // ctx.font = "22px serif";
      // ctx.textAlign = "center";
      // var textWidth = ctx.measureText(name).width;
      // const leftI = (440 / textWidth / 2) * textWidth + 200;
      // ctx.fillText(name, leftI, 315, 440);
      // const blob = await offscreen.convertToBlob({
      //   type: "image/png",
      // });

      // if (blobUrlRef.current) {
      //   URL.revokeObjectURL(blobUrlRef.current);
      // }
      // blobUrlRef.current = URL.createObjectURL(blob);

      // if (hiddenAnchorRef.current) {
      //   hiddenAnchorRef.current.href = blobUrlRef.current;
      //   hiddenAnchorRef.current.click();
      // }
    }
    // base_image.onload = function () {
    //   console.log("load");
    //   ctx.drawImage(base_image, 0, 0, 842, 595);
    // };
    // ctx.drawImage(base_image, 0, 0, 842, 595);
  }

  return (
    <div className="p-5 flex flex-col items-center">
      <img src="/WOH Logo.png" className="w-[200px]" alt="" />
      <h1 className="text-center w-full text-3xl uppercase">
        Get your certificate
      </h1>
      <div className="flex flex-col gap-4 w-[300px] my-10">
        <form
          onSubmit={handleBibSubmit}
          action=""
          className="flex flex-col items-end gap-4 w-[300px] my-10"
        >
          <label className="w-full" htmlFor="name">
            Enter your Name
          </label>
          <input
            required
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="w-full border-[1px] py-2 px-2 rounded-xl focus:outline-blue-100"
          />
          <div className="w-fit">
            <button className="w-fit bg-blue-500 px-4 py-2 rounded-xl text-white hover:bg-blue-700">
              {loading ? "Download" : "Get Certificate"}
            </button>
            <a
              href="#hidden"
              ref={hiddenAnchorRef}
              download
              style={{
                position: "absolute",
                top: "-200vh",
                visibility: "hidden",
              }}
            >
              Hidden download
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Certificate;
