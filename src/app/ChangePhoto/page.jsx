"use client";
import React, { useEffect, useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Loader from "../../components/Loader";
import { firestore, storage } from "../../context/FirebaseContext";
import { doc, updateDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  decryptObjData,
  encryptObjData,
  getCookie,
} from "../../modules/encryption";
import { useGlobalContext } from "../../context/Store";
import axios from "axios";

const ChangePhoto = () => {
  const { state, setState } = useGlobalContext();
  const router = useRouter();

  let id, teachersID, url, photoName;
  let details = getCookie("uid");
  if (details) {
    let userdetails = decryptObjData("uid");
    id = userdetails.id;
    teachersID = userdetails.teachersID;
    url = userdetails.url;
    photoName = userdetails.photoName;
  }

  const folder = "profileImage";
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState({});
  const [progress, setProgress] = useState(0);
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [uploadablePhoto, setUploadablePhoto] = useState(null);
  const [photoCropped, setPhotoCropped] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [errField, setErrField] = useState({
    profilePhotoErr: "",
  });
  const uploadFiles = () => {
    if (validForm()) {
      if (file == null) {
        toast.error("Upload File First!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,

          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      } else {
        setLoader(true);
        const desertRef = ref(storage, `${folder}/${photoName}`);
        deleteObject(desertRef)
          .then(async () => {
            const filestorageRef = ref(
              storage,
              `/${folder}/${teachersID + "-" + file.name}`
            );
            const uploadTask = uploadBytesResumable(
              filestorageRef,
              uploadablePhoto
            );
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const percent = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // // update progress
                setProgress(percent);
              },
              (err) => console.log(err),
              () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then(
                  async (photourl) => {
                    // console.log(url);

                    try {
                      const docRef = doc(firestore, "userteachers", id);
                      await updateDoc(docRef, {
                        url: photourl,
                        photoName: teachersID + "-" + file.name,
                      });
                      const docRef2 = doc(firestore, "profileImage", id);
                      await updateDoc(docRef2, {
                        url: photourl,
                        fileName: teachersID + "-" + file.name,
                      });
                      const url = `/api/updateProfileImage`;
                      const response = await axios.post(url, {
                        id,
                        url: photourl,
                        photoName: teachersID + "-" + file.name,
                      });
                      const record = response.data;
                      if (record.success) {
                        toast.success(
                          "Congrats! Profile Image Changed Successfully!"
                        );

                        setSrc(null);
                        setResult(null);
                        setLoader(false);
                        setDisabled(true);
                        setProgress(0);

                        let userdetails = decryptObjData("uid");
                        let newUserDetails = {
                          ...userdetails,
                          url: photourl,
                          photoName: teachersID + "-" + file.name,
                        };
                        encryptObjData("uid", newUserDetails, 10080);
                        if (typeof window !== "undefined") {
                          // browser code
                          document.getElementById("file-upload").value = "";
                        }
                      } else {
                        toast.error("Failed to Change Image!");
                      }
                    } catch (e) {
                      toast.success("File Upload Failed!", {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,

                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      });
                      setLoader(false);
                    }
                  }
                );
              }
            );
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
            console.log(error);
            toast.error("Something Went Wrong!", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,

              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      }
    }
  };
  const validForm = () => {
    let formIsValid = true;
    setErrField({
      profilePhotoErr: "",
    });

    if (!file.name) {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        profilePhotoErr: "Please Upload Profile Picture",
      }));
    }
    if (!uploadablePhoto) {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        profilePhotoErr:
          "Please Properly Select & Crop Profile Picture As Shown In the Picture",
      }));
    }
    return formIsValid;
  };
  const handleChange = (e) => {
    if (e.target.files[0].type.startsWith("image/")) {
      setSrc(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
      setPhotoCropped(true);
    } else {
      setSrc(null);
      toast.error("Please select an image file.");
      setPhotoCropped(false);
    }
  };
  function getCroppedImg() {
    setPhotoCropped(false);
    setDisabled(false);
    let canvas;
    if (typeof window !== "undefined") {
      canvas = document.createElement("canvas");
    }
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    const base64Image = canvas.toDataURL("image/jpeg");
    setResult(base64Image);
    // console.log(base64Image);
    // As Base64 string
    // const base64Image = canvas.toDataURL('image/jpeg');
    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          try {
            blob.name = teachersID + "-" + file.name;
            resolve(blob);
            setUploadablePhoto(blob);
          } catch (e) {
            setResult(null);
            toast.error("Select Crop Area First, Plese Reselect Photo", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,

              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        },
        file.type,
        1
      );
    });
  }
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Change Photo";
    if (!state) {
      router.push("/logout");
    }
  });
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
      {loader ? <Loader /> : null}
      <div className="container my-5">
        <div className="col-md-6 mx-auto">
          <h3 className="text-center text-primary mb-3">Current Photo</h3>
          <img src={url} alt="profile" className="profileImage" />
        </div>
        <div className="col-md-6 mx-auto">
          <h3 className="text-center text-primary mb-3">Change Photo</h3>
          <div className="mb-3">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="" className="form-label">
                  Press Choose File, Select Your Image File And Select Crop Area
                  before pressing crop on Image As Shown in Picture
                </label>
                <img
                  src="https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/Crop.gif"
                  alt="select"
                  width={"100vw"}
                  className="mb-3 mx-auto"
                />
                <input
                  type="file"
                  accept="image/*"
                  id="file-upload"
                  className="form-control"
                  placeholder="Upload Document"
                  onChange={handleChange}
                />
                {errField.profilePhotoErr.length > 0 && (
                  <span className="error">{errField.profilePhotoErr}</span>
                )}
              </div>
              <div className="col-md-6 mt-3">
                {src && photoCropped && (
                  <div
                    className="col-md-6 mx-auto"
                    style={{ width: "70%", height: "70%" }}
                  >
                    <ReactCrop
                      src={src}
                      onImageLoaded={setImage}
                      crop={crop}
                      onChange={setCrop}
                    />
                    <div>
                      <button
                        type="button"
                        className="btn btn-success my-2"
                        onClick={getCroppedImg}
                      >
                        Crop
                      </button>
                    </div>
                  </div>
                )}
                {result && (
                  <div className="col-md-6">
                    <img
                      src={result}
                      alt="profilePhoto"
                      className="img-fluid"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className="progress-bar"
            style={{
              width: progress + "%",
              height: "15px",
              backgroundColor: "purple",
              borderRadius: "10px",
              transformOrigin: "start",
            }}
          ></div>
          <div className="my-3">
            <button
              type="button"
              className="btn btn-success"
              disabled={disabled}
              onClick={uploadFiles}
            >
              Upload Image
            </button>
          </div>
          <div className="mx-auto noprint mb-5">
            <button
              type="button"
              className="btn btn-info text-white font-weight-bold p-2 rounded"
              onClick={() => router.back()}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePhoto;
