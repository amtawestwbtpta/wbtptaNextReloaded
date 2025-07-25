"use client";
import React, { useEffect, useState, useContext } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { firestore } from "../../context/FirebaseContext";
import {
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  collection,
  updateDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../context/FirebaseContext";

import AdminNavBar from "../../components/AdminNavBar";
import { v4 as uuid } from "uuid";
import Loader from "../../components/Loader";
import axios from "axios";
import { compareObjects } from "../../modules/calculatefunctions";
const AdminUploadImage = () => {
  const { state, slideState, setSlideState, setSlideUpdateTime } =
    useGlobalContext();

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const router = useRouter();
  const docId = uuid();
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState(null);
  const [editFile, setEditFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [inputField, setInputField] = useState({
    title: "",
    description: "",
    url: "",
  });
  const [errInputField, setErrInputField] = useState({
    errTitle: "",
    errDescription: "",
  });
  const [editField, setEditField] = useState({
    title: "",
    url: "",
    description: "",
    id: "",
    fileName: "",
    cloudinaryUrl: "",
  });
  const [orgEditField, setorgEditField] = useState({
    title: "",
    url: "",
    description: "",
    id: "",
    fileName: "",
    cloudinaryUrl: "",
  });
  const [errEditField, setErrEditField] = useState({
    errTitle: "",
    errDescription: "",
    errFile: "",
  });
  const [data, setData] = useState(false);
  const [datas, setDatas] = useState([]);
  const [folder, setFolder] = useState("galaryimages");
  const getData = async () => {
    setLoader(true);
    setData(true);
    const q = query(collection(firestore, folder));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    setDatas(data);
    setLoader(false);
  };
  const validForm = () => {
    setErrInputField({
      errTitle: "",
      errDescription: "",
    });
    let isvalid = true;
    if (inputField.title === "") {
      setErrInputField((prev) => ({
        prev,
        errTitle: "Please Enter Valid Title",
      }));
      isvalid = false;
    }
    if (inputField.description === "") {
      setErrInputField({
        ...errInputField,
        errDescription: "Please Enter Valid Description",
      });
      isvalid = false;
    }
    return isvalid;
  };

  const validEditForm = () => {
    setErrEditField({
      errTitle: "",
      errDescription: "",
      errFile: "",
    });
    let isvalid = true;
    if (editField.title === "") {
      setErrEditField((prev) => ({
        prev,
        errTitle: "Please Enter Valid Title",
      }));
      isvalid = false;
    }
    if (editField.description === "") {
      setErrEditField({
        ...errEditField,
        errDescription: "Please Enter Valid Description",
      });
      isvalid = false;
    }

    if (compareObjects(editField, orgEditField)) {
      if (editFile !== null) {
        isvalid = true;
      } else if (
        (editField.title !== orgEditField.title ||
          editField.description !== orgEditField.description) &&
        editFile === null
      ) {
        isvalid = true;
      } else {
        isvalid = false;

        setErrEditField({
          ...errEditField,
          errFile: "Please Select a File",
        });
      }
    }
    return isvalid;
  };

  const uploadFiles = () => {
    if (validForm()) {
      if (file == null) {
        toast.error("Upload File First!");
        return;
      } else {
        setLoader(true);
        const filestorageRef = ref(storage, `/${folder}/${file.name}`);
        const uploadTask = uploadBytesResumable(filestorageRef, file);
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
            getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
              // console.log(url);
              try {
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", folder);
                data.append("cloud_name", cloudName);
                data.append("public_id", file.name);
                const cldUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

                await axios
                  .post(cldUrl, data)
                  .then(async (data) => {
                    const cdurl = data.data.secure_url;
                    try {
                      await setDoc(doc(firestore, folder, docId), {
                        title: inputField.title,
                        description: inputField.description,
                        url: url,
                        id: docId,
                        fileName: file.name,
                        cloudinaryUrl: cdurl,
                      });
                      if (folder === "slides") {
                        setSlideState([
                          ...slideState,
                          {
                            title: inputField.title,
                            description: inputField.description,
                            url: url,
                            id: docId,
                            fileName: file.name,
                            cloudinaryUrl: cdurl,
                          },
                        ]);
                        setSlideUpdateTime(Date.now());
                        const nextApi = `/api/addSlides`;
                        const response = await axios.post(nextApi, {
                          title: inputField.title,
                          description: inputField.description,
                          url: url,
                          id: docId,
                          fileName: file.name,
                          cloudinaryUrl: cdurl,
                        });
                        const record = response.data;
                        if (record.success) {
                          toast.success(
                            "Congrats! Slide Image added Successfully to MongoDB!"
                          );
                        } else {
                          toast.error("Failed to Upload Image");
                        }
                      }
                      toast.success("Congrats! File Uploaded Successfully!");

                      setLoader(false);

                      setInputField({
                        title: "",
                        description: "",
                        url: "",
                      });
                      setProgress(0);
                      setData(false);
                      setFile(null);
                      getData();
                      if (typeof window !== "undefined") {
                        // browser code
                        document.getElementById("file-upload").value = "";
                        document.getElementById("progress-bar").style.width = 0;
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
                    toast.success(
                      "Congrats! File Uploaded Successfully to Clodinary!"
                    );
                  })
                  .catch((error) => {
                    setLoader(false);
                    console.error(error);
                    toast.error("Failed to Upload Image");
                  });
              } catch (error) {
                setLoader(false);
                console.error("Error:", error);
                toast.error("Failed to Upload File to Cloudinary!");
              }
            });
          }
        );
      }
    }
  };

  const deleteFile = (name, id, cloudinaryUrl) => {
    setLoader(true);
    const desertRef = ref(storage, `${folder}/${name}`);
    deleteObject(desertRef)
      .then(async () => {
        await deleteDoc(doc(firestore, folder, id));
        try {
          await axios
            .post("/api/delSlides", { id })
            .then(() => toast.success("Image deleted successfully"))
            .catch((e) => {
              toast.error("Failed to delete image");
              console.log(e);
            });
        } catch (error) {
          console.error("Error:", error);
          toast.error("Error deleting image");
        }
        if (folder === "slides") {
          setSlideState(slideState.filter((item) => item.id !== id));
          setSlideUpdateTime(Date.now());
        }
        if (cloudinaryUrl) {
          try {
            deleteImage(name);
          } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to Delete Image From Cloudinary");
          }
        }

        // File deleted successfully
        toast.success("Congrats! File Deleted Successfully!");
        setLoader(false);
        getData();
      })
      .catch((error) => {
        setLoader(false);
        // Uh-oh, an error occurred!
        toast.error("Something Went Wrong!");
      });
  };

  const updateSlide = async () => {
    if (validEditForm()) {
      setLoader(true);
      if (editFile) {
        try {
          const desertRef = ref(storage, `${folder}/${editField.fileName}`);
          await deleteObject(desertRef);
          const filestorageRef = ref(storage, `/${folder}/${editFile.name}`);
          const uploadTask = uploadBytesResumable(filestorageRef, editFile);
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
              getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
                // console.log(url);
                if (editField.cloudinaryUrl) {
                  try {
                    const data = new FormData();
                    data.append("file", editFile);
                    data.append("public_id", editField.fileName);
                    data.append("folder", folder);
                    const cloudinaryUpDel = `/api/cloudinaryUpDel`;

                    await axios
                      .post(cloudinaryUpDel, data)
                      .then((data) => {
                        toast.success(
                          "Congrats! File Updated Successfully on Clodinary!"
                        );
                      })
                      .catch((error) => {
                        console.error(error);
                        toast.error("Failed to Upload Image");
                      });
                  } catch (error) {
                    console.error("Error:", error);
                    toast.error("Failed to Upload File to Cloudinary!");
                  }
                }
                const data = new FormData();
                data.append("file", editFile);
                data.append("upload_preset", folder);
                data.append("cloud_name", cloudName);
                data.append("public_id", editFile.name);
                const cldUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

                await axios.post(cldUrl, data).then(async (data) => {
                  const cdurl = data.data.secure_url;
                  try {
                    await updateDoc(doc(firestore, folder, editField.id), {
                      title: editField.title,
                      description: editField.description,
                      url: url,
                      fileName: editFile.name,
                      cloudinaryUrl: cdurl,
                    });
                    if (folder === "slides") {
                      let x = slideState.filter(
                        (el) => el.id === editField.id
                      )[0];
                      x.title = editField.title;
                      x.description = editField.description;
                      x.url = url;
                      x.fileName = editFile.name;
                      x.cloudinaryUrl = cdurl;
                      let y = slideState.filter((el) => el.id !== editField.id);
                      y = [...y, x];
                      setSlideState(y);
                      setSlideUpdateTime(Date.now());
                      const nextApi = `/api/updateSlide`;
                      const response = await axios.post(nextApi, {
                        title: editField.title,
                        description: editField.description,
                        url: url,
                        id: editField.id,
                        fileName: editFile.name,
                        cloudinaryUrl: cdurl,
                      });
                      const record = response.data;
                      if (record.success) {
                        toast.success(
                          "Congrats! Slide Image added Successfully to MongoDB!"
                        );
                      } else {
                        toast.error("Failed to Upload Image");
                      }
                    }
                    toast.success("Congrats! File Uploaded Successfully!");

                    setLoader(false);

                    setInputField({
                      title: "",
                      description: "",
                      url: "",
                    });

                    setData(false);
                    setFile(null);
                    getData();
                    if (typeof window !== "undefined") {
                      // browser code
                      document.getElementById("file-upload").value = "";
                      document.getElementById("progress-bar").style.width = 0;
                    }
                  } catch (e) {
                    console.log(e);
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
                });
              });
            }
          );
        } catch (error) {
          console.log(error);
          setLoader(false);
          toast.error("Failed to Update Slide Image!");
          setEditField({
            title: "",
            description: "",
            url: "",
            id: "",
            fileName: "",
            cloudinaryUrl: "",
          });

          if (typeof window !== "undefined") {
            // browser code
            document.getElementById("file-upload").value = "";
          }
        }
      } else {
        try {
          await updateDoc(doc(firestore, folder, editField.id), {
            title: editField.title,
            description: editField.description,
          });
          if (folder === "slides") {
            let x = slideState.filter((el) => el.id === editField.id)[0];
            x.title = editField.title;
            x.description = editField.description;
            let y = slideState.filter((el) => el.id !== editField.id);
            y = [...y, x];
            setSlideState(y);
            setSlideUpdateTime(Date.now());
            const nextApi = `/api/updateSlide`;
            const response = await axios.post(nextApi, {
              title: editField.title,
              description: editField.description,
              id: editField.id,
            });
            const record = response.data;
            if (record.success) {
              toast.success(
                "Congrats! Slide Image added Successfully to MongoDB!"
              );
            } else {
              toast.error("Failed to Upload Image");
            }
          }
          toast.success("Congrats! File Uploaded Successfully!");

          setLoader(false);

          setInputField({
            title: "",
            description: "",
            url: "",
          });

          setData(false);
          setFile(null);
          getData();
          if (typeof window !== "undefined") {
            // browser code
            document.getElementById("file-upload").value = "";
            document.getElementById("progress-bar").style.width = 0;
          }
        } catch (e) {
          console.log(e);
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
    } else {
      toast.error("Please Fill All Fields or No Changes Detected!");
      console.log(validEditForm(), "Edit Field");
      console.log(!compareObjects(editField, orgEditField), "Compare Object");
      console.log(editFile !== null, "EditFile");
    }
  };
  const deleteImage = async (public_id) => {
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
    document.title = "WBTPTA AMTA WEST:Admin Upload Image";
    if (state !== "admin") {
      router.push("/login");
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // eslint-disable-next-line
  }, [inputField, progress, folder]);

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
      <AdminNavBar />
      <h3 className="text-center text-primary my-3">Admin Upload Images</h3>
      <div className="container my-3">
        <div className="mx-auto">
          {loader ? <Loader /> : null}

          <div className="col-md-6 mx-auto">
            <div className="mb-3">
              <h5 className="text-center text-primary mb-3">
                Select Folder Name
              </h5>
              <div className="col-md-6 mx-auto mb-3">
                <select
                  className="form-select"
                  defaultValue={folder}
                  onChange={(e) => {
                    setFolder(e.target.value);
                  }}
                  aria-label="Default select example"
                >
                  <option value="">Select Folder Name</option>
                  <option value="galaryimages">Galary Images</option>
                  <option value="slides">Homepage Slides</option>
                  <option value="profileImage">Profile Images</option>
                  <option value="images">Images</option>
                  <option value="otherimages">Other Images</option>
                </select>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Title"
                  value={inputField.title}
                  onChange={(e) =>
                    setInputField({ ...inputField, title: e.target.value })
                  }
                />
                {errInputField.errTitle.length > 0 && (
                  <span className="error">{errInputField.errTitle}</span>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Description"
                  value={inputField.description}
                  onChange={(e) =>
                    setInputField({
                      ...inputField,
                      description: e.target.value,
                    })
                  }
                />
                {errInputField.errDescription.length > 0 && (
                  <span className="error">{errInputField.errDescription}</span>
                )}
              </div>
              <h5 className="text-center text-primary mb-3">Select Image</h5>
              <input
                type="file"
                id="file-upload"
                className="form-control"
                placeholder="Upload Document"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            {file && (
              <img
                src={file ? URL.createObjectURL(file) : ""}
                alt="img"
                style={{ width: "40vw", height: "auto" }}
              />
            )}
            <div
              className="progress-bar my-3"
              id="progress-bar"
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
                className="btn btn-success my-3"
                onClick={uploadFiles}
              >
                Upload Image
              </button>
            </div>
          </div>
          <div className="container">
            {!data ? (
              <button
                type="button"
                className="btn btn-success mb-3"
                onClick={getData}
              >
                Get Uploaded Images
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-success mb-3"
                onClick={() => setData(false)}
              >
                Hide Uploaded Files
              </button>
            )}
            {data ? (
              <div className="container overflow-auto  d-flex">
                <table className="table table-responsive table-hover table-striped table-success">
                  <thead>
                    <tr>
                      <th>Sl</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Thumbnail</th>
                      <th>Download</th>
                      {folder === "slides" && <th>Edit Slide</th>}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datas.map((el, ind) => {
                      return (
                        <tr key={ind}>
                          <td>{ind + 1}</td>
                          <td>{el.title}</td>
                          <td>{el.description}</td>
                          <td>
                            <img
                              src={el.url}
                              alt="thumbnail"
                              style={{ width: "50px", height: "50px" }}
                            />
                          </td>
                          <td>
                            <a
                              href={el.url}
                              className="btn btn-success rounded text-decoration-none"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ fontSize: 10 }}
                            >
                              Download
                            </a>
                          </td>
                          {folder === "slides" && (
                            <td>
                              <button
                                type="button"
                                className="btn btn-warning"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                                onClick={() => {
                                  setEditField(el);
                                  setorgEditField(el);
                                  console.log(el);
                                }}
                                style={{ fontSize: 10 }}
                              >
                                Edit
                              </button>
                            </td>
                          )}
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => {
                                deleteFile(
                                  el.fileName,
                                  el.id,
                                  el.cloudinaryUrl
                                );
                              }}
                              style={{ fontSize: 10 }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Edit Slide Photos
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Title"
                  value={editField.title}
                  onChange={(e) =>
                    setEditField({ ...editField, title: e.target.value })
                  }
                />
              </div>
              {errEditField.errTitle.length > 0 && (
                <span className="error">{errEditField.errTitle}</span>
              )}
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Enter Description"
                  value={editField.description}
                  onChange={(e) =>
                    setEditField({ ...editField, description: e.target.value })
                  }
                  cols="30"
                  rows="5"
                ></textarea>
              </div>
              {errEditField.errDescription.length > 0 && (
                <span className="error">{errEditField.errDescription}</span>
              )}
              <div className="mb-3">
                <input
                  type="file"
                  id="edit_file_upload"
                  className="form-control"
                  placeholder="Upload Document"
                  onChange={(e) => setEditFile(e.target.files[0])}
                />
                <div className="m-2">
                  {editFile && (
                    <img
                      src={URL.createObjectURL(editFile)}
                      alt="thumbnail"
                      style={{ width: "100px", height: "100px" }}
                    />
                  )}
                  {!editFile && (
                    <img
                      src={orgEditField.url}
                      alt="thumbnail"
                      style={{ width: "200px", height: "100px" }}
                    />
                  )}
                </div>
              </div>
              {errEditField.errFile.length > 0 && (
                <span className="error">{errEditField.errFile}</span>
              )}
              <div
                className="progress-bar mb-3"
                style={{
                  width: progress + "%",
                  height: "15px",
                  backgroundColor: "purple",
                  borderRadius: "10px",
                  transformOrigin: "start",
                }}
              ></div>
              <div className="mb-3">
                <button
                  type="button"
                  className="btn btn-success m-2"
                  onClick={updateSlide}
                  data-bs-dismiss="modal"
                >
                  Update Image
                </button>
                <button
                  type="button"
                  className="btn btn-secondary m-2"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setEditField({
                      title: "",
                      url: "",
                      description: "",
                      id: "",
                      fileName: "",
                      cloudinaryUrl: "",
                    });
                    setorgEditField({
                      title: "",
                      url: "",
                      description: "",
                      id: "",
                      fileName: "",
                      cloudinaryUrl: "",
                    });
                    setEditFile(null);
                    setProgress(0);
                    if (document.getElementById("edit_file_upload")) {
                      document.getElementById("edit_file_upload").value = "";
                    }
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUploadImage;
