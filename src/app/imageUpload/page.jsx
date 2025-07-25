"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../context/Store";
import { SHA1 } from "crypto-js";
const page = () => {
  const { USER } = useGlobalContext();
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const [public_id, setPublic_id] = useState("");
  const saveImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "slides");
    data.append("cloud_name", cloudName);
    data.append("public_id", USER.id + "-" + image.name);

    try {
      if (image === null) {
        return toast.error("Please Upload image");
      }
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      await axios
        .post(url, data)
        .then((data) => {
          const result = data.data;
          console.log(result);
          setUrl(result.secure_url);
          setPublic_id(result.public_id);
          toast.success("Image uploaded successfully");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to Upload Image");
        });
    } catch (error) {
      console.error(error);
      toast.error("Failed to Upload Image");
    }
  };

  const uploadImage = async () => {
    try {
      if (image === null) {
        return toast.error("Please Upload image");
      }
      const data = new FormData();
      data.append("file", image);
      const url = `/api/addCloudinary`;

      await axios
        .post(url, data)
        .then((data) => {
          const result = data.data.data;
          setUrl(result.secure_url);
          setPublic_id(result.public_id);
          toast.success("Image uploaded successfully");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to Upload Image");
        });
    } catch (error) {}
  };

  const deleteImage = async () => {
    console.log(public_id);
    try {
      await axios
        .post("/api/delFromCloudinary", { public_id })
        .then(() => toast.success("Image deleted successfully"))
        .catch((e) => {
          toast.error("Failed to delete image");
          console.log(e);
        });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error deleting image");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
  }, [url, public_id]);
  return (
    <div className="container">
      <div className="col-md-6 mx-auto">
        <h1>Image Upload</h1>
        <label
          htmlFor="file-upload"
          className="my-3"
          suppressHydrationWarning={true}
        >
          {image ? (
            <div>
              {image.type.split("image")[0] === "image" ? (
                <img
                  src={image ? URL.createObjectURL(image) : ""}
                  alt="img"
                  style={{ width: "40vw", height: "auto" }}
                />
              ) : (
                <h3>Non Image</h3>
              )}
              <button
                className="btn btn-primary my-3"
                onClick={() => {
                  saveImage();
                  // uploadImage();
                }}
              >
                Send
              </button>
            </div>
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/128/1665/1665680.png"
              className="h-20 w-20"
            />
          )}
        </label>
        <input
          id="file-upload"
          className="form-control mb-3 d-none"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        {url && (
          <>
            {image.type.split("image")[0] === "image" && (
              <img
                src={url}
                style={{ width: "40vw", height: "auto" }}
                className="mb-3"
              />
            )}

            <button
              className="btn btn-danger"
              onClick={() => {
                deleteImage();
              }}
              type="button"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default page;
