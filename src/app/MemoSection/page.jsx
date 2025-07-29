"use client";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

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
import Loader from "../../components/Loader";
import { v4 as uuid } from "uuid";
import { decryptObjData, getCookie } from "../../modules/encryption";

import {
  createDownloadLink,
  DateValueToSring,
  getCurrentDateInput,
  getSubmitDateInput,
  isFileEmpty,
  todayInString,
} from "../../modules/calculatefunctions";
import { notifyAll } from "../../modules/notification";
import DataTable from "react-data-table-component";
import { useGlobalContext } from "../../context/Store";
import axios from "axios";
import dynamic from "next/dynamic";

const MemoSection = () => {
  const PDFViewer = dynamic(() => import("../../components/PDFViewer"), {
    ssr: false,
    loading: () => <div>Loading PDF viewer...</div>,
  });
  const { memoState, memoUpdateTime, setMemoState, setMemoUpdateTime } =
    useGlobalContext();
  let teacherdetails = {
    question: "",
    gp: "",
    school: "",
    circle: "",
    tname: "",
    udise: "",
  };

  let details = getCookie("tid");
  if (details) {
    teacherdetails = decryptObjData("tid");
  }

  const [allData, setAllData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState({});
  const [showPercent, setShowPercent] = useState(false);
  const [memo, setMemo] = useState({});
  const [memoNumber, setMemoNumber] = useState("");
  const [memoDate, setMemoDate] = useState(todayInString());
  const [title, setTitle] = useState("");
  const [addImage, setAddImage] = useState(false);
  const fileRef = useRef();
  const [memoText, setmemoText] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editmemoText, setEditmemoText] = useState("");
  const [editMemoNumber, setEditMemoNumber] = useState("");
  const [editMemoDate, setEditMemoDate] = useState(todayInString());
  const [orgTitle, setOrgTitle] = useState("");
  const [orgmemoText, setOrgmemoText] = useState("");
  const [orgMemoNumber, setOrgMemoNumber] = useState("");
  const [orgMemoDate, setOrgMemoDate] = useState(todayInString());
  const [editID, setEditID] = useState("");
  const [src, setSrc] = useState(null);
  const docId = uuid().split("-")[0];
  const [progress, setProgress] = useState(0);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [editFileName, setEditFileName] = useState("");
  const [editFile, setEditFile] = useState({});
  const editFileRef = useRef();
  const [editAddImage, setEditAddImage] = useState(false);
  const getData = async () => {
    setLoader(true);
    const querySnapshot = await getDocs(query(collection(firestore, "memos")));
    const datas = querySnapshot.docs
      .map((doc) => ({
        // doc.data() is never undefined for query doc snapshots
        ...doc.data(),
        id: doc.id,
      }))
      .sort(
        (a, b) =>
          Date.parse(getCurrentDateInput(b.memoDate)) -
          Date.parse(getCurrentDateInput(a.memoDate))
      );
    setLoader(false);
    setAllData(datas);
    setFilteredData(datas);
    setMemoState(datas);
    setMemoUpdateTime(Date.now());
  };

  const addmemo = async () => {
    setLoader(true);
    if (addImage) {
      const filestorageRef = ref(
        storage,
        `/memoFiles/${docId + "-" + file.name}`
      );
      const uploadTask = uploadBytesResumable(filestorageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setShowPercent(true);
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // // update progress
          setProgress(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then(async (photourl) => {
            // console.log(url);

            try {
              await setDoc(doc(firestore, "memos", docId), {
                id: docId,
                date: Date.now(),
                addedBy: teacherdetails.tname,
                title: title,
                memoText: memoText,
                memoNumber: memoNumber,
                memoDate: memoDate,
                url: photourl,
                photoName: docId + "-" + file.name,
                type: file.type,
              })
                .then(async () => {
                  const url = `/api/addMemo`;
                  const response = await axios.post(url, {
                    id: docId,
                    date: Date.now(),
                    addedBy: teacherdetails.tname,
                    title: title,
                    memoText: memoText,
                    memoNumber: memoNumber,
                    memoDate: memoDate,
                    url: photourl,
                    photoName: docId + "-" + file.name,
                    type: file.type,
                  });
                  const record = response.data;
                  if (record.success) {
                    setMemoState(
                      [
                        ...memoState,
                        {
                          id: docId,
                          date: Date.now(),
                          addedBy: teacherdetails.tname,
                          title: title,
                          memoText: memoText,
                          memoNumber: memoNumber,
                          memoDate: memoDate,
                          url: photourl,
                          photoName: docId + "-" + file.name,
                          type: file.type,
                        },
                      ].sort(
                        (a, b) =>
                          Date.parse(getCurrentDateInput(b.memoDate)) -
                          Date.parse(getCurrentDateInput(a.memoDate))
                      )
                    );
                    setAllData(
                      [
                        ...memoState,
                        {
                          id: docId,
                          date: Date.now(),
                          addedBy: teacherdetails.tname,
                          title: title,
                          memoText: memoText,
                          memoNumber: memoNumber,
                          memoDate: memoDate,
                          url: photourl,
                          photoName: docId + "-" + file.name,
                          type: file.type,
                        },
                      ].sort(
                        (a, b) =>
                          Date.parse(getCurrentDateInput(b.memoDate)) -
                          Date.parse(getCurrentDateInput(a.memoDate))
                      )
                    );
                    setFilteredData(
                      [
                        ...memoState,
                        {
                          id: docId,
                          date: Date.now(),
                          addedBy: teacherdetails.tname,
                          title: title,
                          memoText: memoText,
                          memoNumber: memoNumber,
                          memoDate: memoDate,
                          url: photourl,
                          photoName: docId + "-" + file.name,
                          type: file.type,
                        },
                      ].sort(
                        (a, b) =>
                          Date.parse(getCurrentDateInput(b.memoDate)) -
                          Date.parse(getCurrentDateInput(a.memoDate))
                      )
                    );
                    setMemoUpdateTime(Date.now());
                    let memoTitle = `New memo added By ${teacherdetails.tname}`;
                    let body = memoText;
                    await notifyAll(memoTitle, body)
                      .then(async () => {
                        setmemoText("");
                        setTitle("");
                        setMemoNumber("");
                        setMemoDate(todayInString());
                        setLoader(false);
                        setAddImage(false);
                        toast.success("memo Added Successfully!");
                        // getData();
                        setFile({});
                        setSrc("");
                        setShowPercent(false);
                        setProgress(0);
                      })
                      .catch((e) => {
                        console.log(e);
                        setLoader(false);
                        toast.error("Error Sending Notification");
                      });
                  } else {
                    toast.error("Error Adding memo to Mongo");
                    setLoader(false);
                  }
                })
                .catch((e) => {
                  setLoader(false);
                  setAddImage(false);
                  toast.error("memo Addition Failed!");
                  console.log(e);
                });
            } catch (e) {
              toast.error("File Upload Failed!", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: +true,
                pauseOnHover: +true,
                draggable: +true,
                progress: undefined,
                theme: "light",
              });
              setLoader(false);
            }
          });
        }
      );
    } else {
      try {
        await setDoc(doc(firestore, "memos", docId), {
          id: docId,
          date: Date.now(),
          addedBy: teacherdetails.tname,
          title: title,
          memoText: memoText,
          memoNumber: memoNumber,
          memoDate: memoDate,
          url: "",
          photoName: "",
        })
          .then(async () => {
            const url = `/api/addMemo`;
            const response = await axios.post(url, {
              id: docId,
              date: Date.now(),
              addedBy: teacherdetails.tname,
              title: title,
              memoText: memoText,
              memoNumber: memoNumber,
              memoDate: memoDate,
              url: "",
              photoName: "",
            });
            const record = response.data;
            if (record.success) {
              setMemoState(
                [
                  ...memoState,
                  {
                    id: docId,
                    date: Date.now(),
                    addedBy: teacherdetails.tname,
                    title: title,
                    memoText: memoText,
                    memoNumber: memoNumber,
                    memoDate: memoDate,
                    url: "",
                    photoName: "",
                  },
                ].sort(
                  (a, b) =>
                    Date.parse(getCurrentDateInput(b.memoDate)) -
                    Date.parse(getCurrentDateInput(a.memoDate))
                )
              );
              setAllData(
                [
                  ...memoState,
                  {
                    id: docId,
                    date: Date.now(),
                    addedBy: teacherdetails.tname,
                    title: title,
                    memoText: memoText,
                    memoNumber: memoNumber,
                    memoDate: memoDate,
                    url: "",
                    photoName: "",
                  },
                ].sort(
                  (a, b) =>
                    Date.parse(getCurrentDateInput(b.memoDate)) -
                    Date.parse(getCurrentDateInput(a.memoDate))
                )
              );
              setFilteredData(
                [
                  ...memoState,
                  {
                    id: docId,
                    date: Date.now(),
                    addedBy: teacherdetails.tname,
                    title: title,
                    memoText: memoText,
                    memoNumber: memoNumber,
                    memoDate: memoDate,
                    url: "",
                    photoName: "",
                  },
                ].sort(
                  (a, b) =>
                    Date.parse(getCurrentDateInput(b.memoDate)) -
                    Date.parse(getCurrentDateInput(a.memoDate))
                )
              );
              setMemoUpdateTime(Date.now());
              let memoTitle = `New memo added By ${teacherdetails.tname}`;
              let body = memoText;
              await notifyAll(memoTitle, body)
                .then(async () => {
                  setmemoText("");
                  setTitle("");
                  setMemoNumber("");
                  setMemoDate(todayInString());
                  setLoader(false);
                  setAddImage(false);
                  toast.success("memo Added Successfully!");
                  // getData();
                  setFile({});
                  setSrc("");
                })
                .catch((e) => {
                  console.log(e);
                  setLoader(false);
                  toast.error("Error Sending Notification");
                });
            } else {
              toast.error("Error Adding memo to Mongo");
              setLoader(false);
            }
          })
          .catch((e) => {
            setLoader(false);
            setAddImage(false);
            toast.error("memo Addition Failed!");
            console.log(e);
          });
      } catch (e) {
        toast.error("File Upload Failed!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: +true,
          pauseOnHover: +true,
          draggable: +true,
          progress: undefined,
          theme: "light",
        });
        setLoader(false);
      }
    }
  };

  const updatememo = async () => {
    setLoader(true);

    if (editFile.name === undefined) {
      await updateDoc(doc(firestore, "memos", editID), {
        title: editTitle,
        memoText: editmemoText,
        memoNumber: editMemoNumber,
        memoDate: editMemoDate,
        date: Date.now(),
        addedBy: teacherdetails.tname,
      })
        .then(async () => {
          const url = `/api/updateMemo`;
          const response = await axios.post(url, {
            id: editID,
            title: editTitle,
            memoText: editmemoText,
            memoNumber: editMemoNumber,
            memoDate: editMemoDate,
            date: Date.now(),
            addedBy: teacherdetails.tname,
          });
          const record = response.data;
          if (record.success) {
            let x = memoState.filter((el) => el.id === editID)[0];
            let y = memoState.filter((el) => el.id !== editID);
            y = [
              ...y,
              {
                id: editID,
                date: Date.now(),
                addedBy: teacherdetails.tname,
                title: editTitle,
                memoText: editmemoText,
                memoNumber: editMemoNumber,
                memoDate: editMemoDate,
                url: x.url,
                photoName: x.photoName,
                type: x.type,
              },
            ];

            let newData = y.sort(
              (a, b) =>
                Date.parse(getCurrentDateInput(b.memoDate)) -
                Date.parse(getCurrentDateInput(a.memoDate))
            );
            setMemoState(newData);
            setAllData(newData);
            setFilteredData(newData);
            setMemoUpdateTime(Date.now());
            setLoader(false);
            setEditTitle("");
            setEditmemoText("");
            setEditMemoNumber("");
            setEditMemoDate(todayInString());
            setMemo({});
            setOrgTitle("");
            setOrgmemoText("");
            setOrgMemoNumber("");
            setOrgMemoDate(todayInString());
            toast.success("Details Updated Successfully");
          } else {
            toast.error("Error Updating memo in Mongo");
          }
        })
        .catch((err) => {
          toast.error("Memo Updation Failed!");
          console.log(err);
        });
    } else {
      try {
        const desertRef = ref(storage, `memoFiles/${editFileName}`);
        await deleteObject(desertRef);
        toast.success("File deleted successfully!");
      } catch (e) {
        console.log(e);
      }
      const uploadableFileName = docId + "-" + editFile.name;
      const filestorageRef = ref(storage, `/memoFiles/${uploadableFileName}`);
      const uploadTask = uploadBytesResumable(filestorageRef, editFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setShowPercent(true);
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // // update progress
          setProgress(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then(async (photourl) => {
            await updateDoc(doc(firestore, "memos", editID), {
              title: editTitle,
              memoText: editmemoText,
              memoNumber: editMemoNumber,
              memoDate: editMemoDate,
              url: photourl,
              photoName: uploadableFileName,
              date: Date.now(),
              addedBy: teacherdetails.tname,
              type: editFile.type,
            })
              .then(async () => {
                const url = `/api/updateMemo`;
                const response = await axios.post(url, {
                  id: editID,
                  title: editTitle,
                  memoText: editmemoText,
                  memoNumber: editMemoNumber,
                  memoDate: editMemoDate,
                  url: photourl,
                  photoName: uploadableFileName,
                  date: Date.now(),
                  addedBy: teacherdetails.tname,
                  type: editFile.type,
                });
                const record = response.data;
                if (record.success) {
                  let x = memoState.filter((el) => el.id === editID)[0];
                  let y = memoState.filter((el) => el.id !== editID);
                  y = [
                    ...y,
                    {
                      id: editID,
                      date: Date.now(),
                      addedBy: teacherdetails.tname,
                      title: editTitle,
                      memoText: editmemoText,
                      memoNumber: editMemoNumber,
                      memoDate: editMemoDate,
                      url: photourl,
                      photoName: uploadableFileName,
                      type: editFile.type,
                    },
                  ];

                  let newData = y.sort(
                    (a, b) =>
                      Date.parse(getCurrentDateInput(b.memoDate)) -
                      Date.parse(getCurrentDateInput(a.memoDate))
                  );
                  setMemoState(newData);
                  setAllData(newData);
                  setFilteredData(newData);
                  setMemoUpdateTime(Date.now());
                  setLoader(false);
                  setEditTitle("");
                  setEditmemoText("");
                  setEditMemoNumber("");
                  setEditMemoDate(todayInString());
                  setMemo({});
                  setOrgTitle("");
                  setOrgmemoText("");
                  setOrgMemoNumber("");
                  setOrgMemoDate(todayInString());
                  setProgress(0);
                  setEditAddImage(false);
                  setEditFile({});
                  setEditFileName("");
                  toast.success("Details Updated Successfully");
                } else {
                  toast.error("Error Updating memo in Mongo");
                }
              })
              .catch((err) => {
                toast.error("Memo Updation Failed!");
                console.log(err);
              });
          });
        }
      );
    }
  };

  const deletememo = async (el) => {
    await deleteDoc(doc(firestore, "memos", el.id))
      .then(async () => {
        setMemoState(memoState.filter((item) => item.id !== el.id));
        setAllData(memoState.filter((item) => item.id !== el.id));
        setFilteredData(memoState.filter((item) => item.id !== el.id));
        setMemoUpdateTime(Date.now());
        const url = `/api/delMemo`;
        const response = await axios.post(url, {
          id: el.id,
        });
        const record = response.data;
        if (record.success) {
          try {
            const desertRef = ref(storage, `memoFiles/${el.photoName}`);
            await deleteObject(desertRef);

            toast.success("File deleted successfully!");
          } catch (e) {
            console.log(e);
          }
          setLoader(false);
          toast.success("memo Deleted Successfully!");
        } else {
          toast.error("Error Deleting memo from Mongo");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      name: "Sl",
      selector: (row, index) => index + 1,
      sortable: +true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      center: +true,
      wrap: +true,
      width: width < 500 ? "30%" : "20%",
    },
    {
      name: "Memo No.",
      selector: (row) => row.memoNumber,
      center: +true,
      wrap: +true,
    },
    {
      name: "Date",
      selector: (row) => row.memoDate,
      center: +true,
    },
    {
      name: "File Type",
      selector: (row) => (
        <h6>
          {row.type === "application/pdf"
            ? "PDF"
            : row.type === "image/jpeg"
            ? "JPEG"
            : row.type === "image/png"
            ? "PNG"
            : row.type === "application/msword"
            ? "WORD"
            : row.type ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ? "WORD"
            : row.type ===
              "application/vnd.openxmlformats-officedocument.presentationml.presentation"
            ? "POWERPOINT"
            : row.type === "application/vnd.ms-excel"
            ? "EXCEL"
            : row.type ===
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            ? "EXCEL"
            : row.type === "application/vnd.ms-excel.sheet.macroEnabled.12"
            ? "EXCEL"
            : row.type === "application/vnd.ms-powerpoint"
            ? "EXCEL"
            : row.type === "application/zip"
            ? "ZIP"
            : row.type === "application/vnd.rar"
            ? "RAR"
            : row.type === "text/csv"
            ? "CSV"
            : row.type ===
              "application/vnd.openxmlformats-officedocument.presentationml.presentation"
            ? "POWERPOINT"
            : "No File"}
        </h6>
      ),
      center: +true,
    },
    {
      name: "Download",
      selector: (row) =>
        row.url !== "" ? (
          <a
            href={row.url}
            className="btn btn-success btn-sm my-3 rounded text-decoration-none"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download
          </a>
        ) : (
          "No File Available"
        ),
      center: +true,
      width: width < 500 ? "18%" : "10%",
    },
    {
      name: "Action",
      cell: (el) =>
        teacherdetails.circle === "admin" ||
        teacherdetails.question === "admin" ? (
          <div className="d-flex justify-content-center">
            <div
              className="btn-group"
              role="group"
              aria-label="Basic mixed styles example"
            >
              <button
                type="button"
                className="btn btn-sm m-1 btn-warning"
                data-bs-toggle="modal"
                data-bs-target="#editmemo"
                onClick={() => {
                  setEditID(el.id);
                  setEditTitle(el.title);
                  setEditmemoText(el.memoText);
                  setEditMemoDate(el.memoDate);
                  setEditMemoNumber(el.memoNumber);
                  setOrgTitle(el.title);
                  setOrgmemoText(el.memoText);
                  setOrgMemoDate(el.memoDate);
                  setOrgMemoNumber(el.memoNumber);
                  setEditFileName(el.photoName);
                  // if (typeof window !== "undefined") {
                  //   setTimeout(() => {
                  //     document.querySelector("#editDate").value =
                  //       getCurrentDateInput(el.memoDate);
                  //   }, 200);
                  // }
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-sm m-1 btn-danger"
                onClick={() => {
                  // eslint-disable-next-line
                  let conf = confirm(
                    "Are you sure you want to Delete this Memo?"
                  );
                  if (conf) {
                    deletememo(el);
                  } else {
                    toast.success("Memo Not Deleted!!!");
                  }
                }}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn btn-sm m-1 btn-success"
                data-bs-toggle="modal"
                data-bs-target="#viewMemo"
                onClick={() => {
                  setMemo(el);
                }}
              >
                View
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-sm m-1 btn-success"
            data-bs-toggle="modal"
            data-bs-target="#viewMemo"
            onClick={() => {
              setMemo(el);
            }}
          >
            View
          </button>
        ),
      center: +true,
      width: width < 500 ? "70%" : "20%",
    },
  ];

  const getMemoData = () => {
    const difference = (Date.now() - memoUpdateTime) / 1000 / 60 / 15;
    if (memoState.length === 0 || difference >= 1) {
      getData();
    } else {
      let newData = memoState.sort(
        (a, b) =>
          Date.parse(getCurrentDateInput(b.memoDate)) -
          Date.parse(getCurrentDateInput(a.memoDate))
      );
      setLoader(false);
      setAllData(newData);
      setFilteredData(newData);
    }
  };

  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Memo Section";
    setHeight(window.screen.height);
    setWidth(window.screen.width);
    getMemoData();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // eslint-disable-next-line
  }, [file, width, allData, filteredData, search, memo]);

  return (
    <div className="container my-3">
      {loader && <Loader />}
      <h3 className="text-primary text-center">Memo Number Section</h3>
      {(teacherdetails.circle === "admin" ||
        teacherdetails.question === "admin") && (
        <div className="my-3 mx-auto">
          <button
            type="button"
            className="btn btn-sm btn-info"
            data-bs-toggle="modal"
            data-bs-target="#addmemo"
          >
            Add Memo
          </button>
          <button
            type="button"
            className="btn btn-sm m-3 btn-warning"
            onClick={() => {
              createDownloadLink(memoState, "memos");
            }}
          >
            Download Memo Data
          </button>
        </div>
      )}
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        fixedHeader
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search By Name"
            className="w-25 form-control"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              const result = allData.filter((el) => {
                return el.title
                  .toLowerCase()
                  .match(e.target.value.toLowerCase());
              });
              setFilteredData(result);
            }}
          />
        }
        subHeaderAlign="right"
      />

      <div
        className="modal fade"
        id="viewMemo"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="viewMemoLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className={`modal-title fs-5 ${
                  !/^[a-zA-Z]+$/.test(memo.title?.split(" ")[0])
                    ? "ben"
                    : "timesFont"
                }`}
                id="viewMemoLabel"
              >
                {memo.title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {memo.type === "image/jpeg" || memo.type === "image/png" ? (
                <img src={memo.url} className="w-100" alt="..." />
              ) : memo.url !== "" && memo.type === "application/pdf" ? (
                <div>
                  <PDFViewer pdfUrl={memo.url} />
                </div>
              ) : memo.url !== "" ? (
                <object
                  data={memo.url}
                  type={memo.type}
                  // width={width}
                  height={height}
                  className="w-100"
                  aria-labelledby="Pdf"
                ></object>
              ) : (
                memo.url === "" && (
                  <h5 className={`card-title timesFont`}>No File Available</h5>
                )
              )}

              <div className="my-5">
                <h3
                  className={`text-primary text-center ${
                    !/^[a-zA-Z]+$/.test(memo.title?.split(" ")[0])
                      ? "ben"
                      : "timesFont"
                  }`}
                >
                  {memo.title}
                </h3>
                <h5 className={`card-title timesFont`}>
                  Memo No.: {memo.memoNumber}, Dated: {memo.memoDate}
                </h5>

                <p className="text-info timesFont">
                  Published On: {DateValueToSring(memo.date)}
                </p>
                <p
                  className={`text-primary ${
                    !/^[a-zA-Z]+$/.test(memo.memoText?.split(" ")[0])
                      ? "ben"
                      : "timesFont"
                  }`}
                >
                  {memo.memoText}
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="addmemo"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="addmemo"
        aria-hidden="true"
      >
        <div
          className={`modal-dialog modal-xl timesFont
          }`}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addmemoLabel">
                Add memo
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setTitle("");
                  setMemoNumber("");
                  setmemoText("");
                  setMemoDate(todayInString());
                  setAddImage(false);
                  setFile({});
                  setSrc("");
                  setShowPercent(false);
                  setProgress(0);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-3 w-75 mx-auto"
                value={title}
                placeholder="Add Title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="row d-flex justify-content-evenly align-items-center">
                <div className="col-md-6">
                  <h6 className="modal-title fs-5" id="addmemoLabel">
                    Memo Number
                  </h6>
                  <input
                    type="text"
                    className="form-control mb-3 w-50 mx-auto"
                    value={memoNumber}
                    placeholder="Add Memo Number"
                    onChange={(e) => setMemoNumber(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <h6 className="modal-title fs-5" id="addmemoLabel">
                    Memo Date
                  </h6>
                  <input
                    className="form-control mb-3 w-50 mx-auto"
                    onChange={(e) =>
                      setMemoDate(getSubmitDateInput(e.target.value))
                    }
                    type="date"
                    defaultValue={getCurrentDateInput(memoDate)}
                  />
                </div>
              </div>
              <textarea
                className="form-control mb-3 w-75 mx-auto"
                rows={5}
                placeholder="Memo Body"
                value={memoText}
                onChange={(e) => setmemoText(e.target.value)}
              />

              <div className="d-flex row mx-auto mb-3 justify-content-center align-items-center form-check form-switch">
                <h4 className="col-md-3 text-primary">Without Image/File</h4>
                <input
                  className="form-check-input mb-3 col-md-3"
                  type="checkbox"
                  id="checkbox"
                  role="switch"
                  checked={addImage}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setAddImage(e.target.checked);
                    } else {
                      setAddImage(e.target.checked);
                      setFile({});
                      setSrc(null);
                      fileRef.current.value = "";
                    }
                  }}
                  style={{ width: 60, height: 30 }}
                />
                <h4 className="col-md-3 text-success">With Image/File</h4>
              </div>
              {addImage && (
                <div className="my-2">
                  <input
                    type="file"
                    ref={fileRef}
                    id="img"
                    className="form-control mb-3 w-100 mx-auto"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      setSrc(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                  {src !== null && file.type?.split("/")[0] === "image" ? (
                    <div>
                      <img
                        src={src}
                        alt="uploadedImage"
                        width={150}
                        className="rounded-2"
                      />
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => {
                          setSrc(null);
                          setFile({});
                          fileRef.current.value = "";
                        }}
                      ></button>
                    </div>
                  ) : src !== null &&
                    file.type?.split("/")[0] === "application" ? (
                    <img
                      src={
                        "https://raw.githubusercontent.com/awwbtpta/data/main/pdf.png"
                      }
                      alt="uploadedImage"
                      width={150}
                      className="rounded-2"
                    />
                  ) : null}
                  {showPercent && (
                    <div
                      className="progress-bar my-2"
                      style={{
                        width: progress + "%",
                        height: "15px",
                        backgroundColor: "purple",
                        borderRadius: "10px",
                        transformOrigin: "start",
                      }}
                    ></div>
                  )}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => {
                  if (title !== "" && memoText !== "" && memoNumber !== "") {
                    addmemo();
                  } else {
                    toast.error("Please fill all the fields");
                  }
                }}
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  fileRef.current.value = "";
                  setTitle("");
                  setMemoNumber("");
                  setmemoText("");
                  setMemoDate(todayInString());
                  setAddImage(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="editmemo"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="editmemo"
        aria-hidden="true"
      >
        <div
          className={`modal-dialog modal-xl timesFont
          }`}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editmemoLabel">
                Edit Memo
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-3 w-50 mx-auto"
                value={editTitle}
                placeholder="Add Title"
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <div className="row d-flex justify-content-evenly align-items-center">
                <div className="col-md-6">
                  <h6 className="modal-title fs-5" id="addmemoLabel">
                    Memo Number
                  </h6>
                  <input
                    type="text"
                    className="form-control mb-3 w-50 mx-auto"
                    value={editMemoNumber}
                    placeholder="Add Memo Number"
                    onChange={(e) => setEditMemoNumber(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <h6 className="modal-title fs-5" id="addmemoLabel">
                    Memo Date
                  </h6>
                  <input
                    className="form-control mb-3 w-50 mx-auto"
                    id="editDate"
                    onChange={(e) =>
                      setEditMemoDate(getSubmitDateInput(e.target.value))
                    }
                    type="date"
                    defaultValue={getCurrentDateInput(editMemoDate)}
                  />
                </div>
              </div>
              <textarea
                className="form-control mb-3 w-75 mx-auto"
                rows={5}
                placeholder="Memo Body"
                value={editmemoText}
                onChange={(e) => setEditmemoText(e.target.value)}
              />
              <div className="d-flex row mx-auto mb-3 justify-content-center align-items-center form-check form-switch">
                <h4 className="col-md-3 text-primary">Without Image/File</h4>
                <input
                  className="form-check-input mb-3 col-md-3"
                  type="checkbox"
                  id="checkbox"
                  role="switch"
                  checked={editAddImage}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setEditAddImage(e.target.checked);
                    } else {
                      setEditAddImage(e.target.checked);
                      setEditFile({});
                      editFileRef.current.value = "";
                      setSrc(null);
                    }
                  }}
                  style={{ width: 60, height: 30 }}
                />
                <h4 className="col-md-3 text-success">With Image/File</h4>
              </div>
              {editAddImage ? (
                <div className="my-2">
                  <input
                    type="file"
                    ref={editFileRef}
                    id="img"
                    className="form-control mb-3 w-100 mx-auto"
                    onChange={(e) => {
                      setEditFile(e.target.files[0]);
                      setSrc(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                  {src !== null && editFile.type?.split("/")[0] === "image" ? (
                    <div>
                      <img
                        src={src}
                        alt="uploadedImage"
                        width={150}
                        className="rounded-2"
                      />
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => {
                          setSrc(null);
                          setEditFile({});
                          editFileRef.current.value = "";
                          setEditAddImage(false);
                        }}
                      ></button>
                    </div>
                  ) : src !== null &&
                    file.type?.split("/")[0] === "application" ? (
                    <img
                      src={
                        "https://raw.githubusercontent.com/awwbtpta/data/main/pdf.png"
                      }
                      alt="uploadedImage"
                      width={150}
                      className="rounded-2"
                    />
                  ) : null}
                  {showPercent && (
                    <div
                      className="progress-bar my-2"
                      style={{
                        width: progress + "%",
                        height: "15px",
                        backgroundColor: "purple",
                        borderRadius: "10px",
                        transformOrigin: "start",
                      }}
                    ></div>
                  )}
                </div>
              ) : editFileName || !isFileEmpty(editFile) ? (
                <h6>{editFileName}</h6>
              ) : null}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => {
                  if (
                    (editTitle !== "" && editmemoText !== "") ||
                    editFile.name
                  ) {
                    if (orgTitle !== editTitle) {
                      updatememo();
                    } else if (orgmemoText !== editmemoText) {
                      updatememo();
                    } else if (orgMemoNumber !== editMemoNumber) {
                      updatememo();
                    } else if (orgMemoDate !== editMemoDate) {
                      updatememo();
                    } else if (editFile.name) {
                      updatememo();
                    } else {
                      toast.error("Nothing to Update!!!");
                    }
                  } else {
                    toast.error("Please fill all the fields");
                  }
                }}
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  editFileRef.current.value = "";
                  setEditTitle("");
                  setEditmemoText("");
                  setEditMemoNumber("");
                  setEditMemoDate(todayInString());
                  setEditAddImage(false);
                  setSrc(null);
                  setEditFile({});
                  setShowPercent(false);
                  setProgress(0);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoSection;
