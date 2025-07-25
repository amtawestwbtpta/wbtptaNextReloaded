"use client";
import React, { useEffect, useState, useContext } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../context/FirebaseContext";
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

import AdminNavBar from "../../components/AdminNavBar";
import Loader from "../../components/Loader";
import { v4 as uuid } from "uuid";
import { decryptObjData, getCookie } from "../../modules/encryption";

const AdminUploadFile = () => {
  const { state, setState } = useGlobalContext();
  const router = useRouter();
  const [folder, setFolder] = useState("files");
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState({});
  const [fileName, setFileName] = useState("");
  const [editFileName, setEditFileName] = useState("");
  const [editFileId, setEditFileId] = useState("");
  const docId = uuid();
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  let details = getCookie("uid");
  let userdetails = {
    circle: "",
    createdAt: "",
    desig: "",
    disabled: "",
    dpsc: "",
    dpsc1: "",
    dpsc2: "",
    dpsc3: "",
    dpsc4: "",
    dpscst: "",
    email: "",
    empid: "",
    id: "",
    pan: "",
    password: "",
    phone: "",
    photoName: "",
    question: "",
    school: "",
    showAccount: "",
    sis: "",
    tan: "",
    teachersID: "",
    tname: "",
    tsname: "",
    udise: "",
    url: "",
    username: "",
  };
  if (details) {
    userdetails = decryptObjData("uid");
  }
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Admin Upload Files";

    if (state !== "admin") {
      router.push("/login");
    }
    // eslint-disable-next-line
  }, [folder]);

  const [data, setData] = useState(false);
  const [allData, setAllData] = useState([]);
  const getData = async () => {
    setData(true);
    let datas = [];
    try {
      const q = query(collection(firestore, "downloads"));

      const querySnapshot = await getDocs(q);
      datas = querySnapshot.docs.map((doc) => ({
        // doc.data() is never undefined for query doc snapshots
        ...doc.data(),
        id: doc.id,
      }));
    } catch (error) {
      const url = `/api/getDownloads`;
      const response = await axios.post(url);
      datas = response.data.data;
      console.log(error);
    }
    setAllData(datas);
  };

  const uploadFiles = () => {
    if (file == null) {
      return;
    } else {
      setLoader(true);
      const filestorageRef = ref(storage, `/${folder}/${file.name}`);
      const uploadTask = uploadBytesResumable(filestorageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // const percent = Math.round(
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // );
          console.log(snapshot);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then(async (fburl) => {
            // console.log(url);
            try {
              const data = new FormData();
              data.append("file", file);
              data.append("upload_preset", "myfiles");
              data.append("cloud_name", cloudName);
              data.append("public_id", file.name);
              const cldUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

              await axios
                .post(cldUrl, data)
                .then(async (data) => {
                  const cdurl = data.data.secure_url;
                  toast.success(
                    "Congrats! File Uploaded Successfully to Clodinary!"
                  );
                  try {
                    await setDoc(doc(firestore, "downloads", docId), {
                      id: docId,
                      date: Date.now(),
                      addedBy: userdetails.tname,
                      url: fburl,
                      fileName: fileName,
                      originalFileName: file.name,
                      fileType: file.type,
                      cloudinaryUrl: cdurl,
                    });
                    const url = `/api/addDownload`;
                    const response = await axios.post(url, {
                      id: docId,
                      date: Date.now(),
                      addedBy: userdetails.tname,
                      url: fburl,
                      fileName: fileName,
                      originalFileName: file.name,
                      fileType: file.type,
                      cloudinaryUrl: cdurl,
                    });
                    const record = response.data;
                    if (record.success) {
                      toast.success("Congrats! File Uploaded Successfully!");
                      setLoader(false);
                      getData();
                      setFile(null);
                    } else {
                      toast.error("File Upload Failed!");
                    }
                  } catch (e) {
                    console.log(e);
                    toast.error("File Upload Failed!");
                    setLoader(false);
                  }
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
  };
  const updateFileName = async () => {
    const docRef = doc(firestore, "downloads", editFileId);
    await updateDoc(docRef, {
      fileName: editFileName,
    });
    const url = `/api/updateDownload`;
    const response = await axios.post(url, {
      fileName: editFileName,
      id: editFileId,
    });
    const record = response.data;
    if (record.success) {
      toast.success("Congrats! File Name Changed Successfully!");
      setLoader(false);
      getData();
    } else {
      toast.error("File Name Change Failed!");
    }
  };
  const deleteFile = (name, id, cloudinaryUrl) => {
    setLoader(true);
    const desertRef = ref(storage, `${folder}/${name}`);
    deleteObject(desertRef)
      .then(async () => {
        await deleteDoc(doc(firestore, "downloads", id));
        // File deleted successfully
        const url = `/api/delDownload`;
        const response = await axios.post(url, { id });
        const record = response.data;
        if (cloudinaryUrl) {
          try {
            deleteImage(name);
          } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to Delete Image From Cloudinary");
          }
        }
        if (record.success) {
          toast.success("Congrats! File Deleted Successfully!");
          setLoader(false);
          getData();
        } else {
          toast.error("File Delete Failed!");
        }
      })
      .catch((error) => {
        setLoader(false);
        // Uh-oh, an error occurred!
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
  };

  const deleteImage = async (public_id) => {
    try {
      await axios
        .post("/api/delFromCloudinary", { public_id })
        .then(() => toast.success("File deleted successfully"))
        .catch((e) => {
          toast.error("Failed to delete File");
          console.log(e);
        });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error deleting File");
    }
  };

  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Admin Upload File";
    if (state !== "admin") {
      localStorage.clear();
      router.push("/logout");
    }
  }, []);
  return (
    <>
      <AdminNavBar />
      <h3 className="text-center text-primary my-3">
        Admin Upload Downloadable Files
      </h3>
      <div className="container my-3">
        <div className="col-md-6 mx-auto">
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
          <div className="col-md-6 mx-auto mb-3">
            <h5 className="text-center text-primary mb-3">
              Select Folder Location
            </h5>
            <select
              className="form-select"
              defaultValue={folder}
              onChange={(e) => {
                setFolder(e.target.value);
              }}
              aria-label="Default select example"
            >
              <option value="">Select Foder Name</option>
              <option value="files">Files</option>
              <option value="databases">Databases</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="mb-3">
            <h5 className="text-center text-primary">Upload File</h5>
            <input
              type="file"
              className="form-control"
              placeholder="Upload Document"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter File Name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>
          <div className="my-3">
            <button
              type="button"
              className="btn btn-success my-3"
              onClick={() => {
                if (fileName !== "") {
                  uploadFiles();
                } else {
                  toast.error("Please Enter File Name!", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,

                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }
              }}
            >
              Upload File
            </button>
          </div>
        </div>
        <div className="container-fluid">
          {!data ? (
            <button
              type="button"
              className="btn btn-success mb-3"
              onClick={getData}
            >
              Get Uploaded Files
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
            <div className="container overflow-auto d-flex">
              <table className="table table-responsive table-hover table-striped table-success  px-lg-3 py-lg-2 ">
                <thead>
                  <tr>
                    <th>Sl</th>
                    <th>Format</th>
                    <th>File Name</th>
                    <th>Download</th>
                    <th>Edit File Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allData.map((el, ind) => {
                    return (
                      <>
                        <tr key={ind}>
                          <td>{ind + 1}</td>
                          <td>
                            {el.fileType === "application/pdf"
                              ? "PDF"
                              : el.fileType === "application/msword"
                              ? "WORD"
                              : el.fileType ===
                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              ? "WORD"
                              : el.fileType ===
                                "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                              ? "POWERPOINT"
                              : el.fileType === "application/vnd.ms-excel"
                              ? "EXCEL"
                              : el.fileType ===
                                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                              ? "EXCEL"
                              : el.fileType ===
                                "application/vnd.ms-excel.sheet.macroEnabled.12"
                              ? "EXCEL"
                              : el.fileType === "application/vnd.ms-powerpoint"
                              ? "EXCEL"
                              : el.fileType === "application/zip"
                              ? "ZIP"
                              : el.fileType === "application/vnd.rar"
                              ? "RAR"
                              : el.fileType === "text/csv"
                              ? "CSV"
                              : el.fileType ===
                                "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                              ? "POWERPOINT"
                              : ""}
                          </td>
                          <td>{el.fileName}</td>
                          <td>
                            <a
                              href={el.url}
                              className="btn btn-success rounded text-decoration-none"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Download
                            </a>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-warning "
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop"
                              onClick={() => {
                                setEditFileId(el.id);
                                setEditFileName(el.fileName);
                              }}
                            >
                              Edit File Name
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger "
                              onClick={() =>
                                deleteFile(
                                  el.originalFileName,
                                  el.id,
                                  el.cloudinaryUrl
                                )
                              }
                            >
                              Delete Uploaded Files
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : null}

          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 ClassName="modal-title fs-5" id="staticBackdropLabel">
                    Edit File Name
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      setEditFileId("");
                      setEditFileName("");
                    }}
                  ></button>
                </div>
                <div className="modal-body">
                  <div ClassName="modal-body">
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter File Name"
                        value={editFileName}
                        onChange={(e) => setEditFileName(e.target.value)}
                      />
                    </div>
                    <div className="my-3">
                      <button
                        type="button"
                        className="btn btn-success m-3"
                        data-bs-dismiss="modal"
                        onClick={() => {
                          if (editFileName !== "") {
                            updateFileName();
                          } else {
                            toast.error("Please Enter File Name!", {
                              position: "top-right",
                              autoClose: 1500,
                              hideProgressBar: false,
                              closeOnClick: true,

                              draggable: true,
                              progress: undefined,
                              theme: "light",
                            });
                          }
                        }}
                      >
                        Update File Name
                      </button>

                      <button
                        type="button"
                        className="btn btn-danger m-3"
                        data-bs-dismiss="modal"
                        onClick={() => {
                          setEditFileId("");
                          setEditFileName("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUploadFile;
