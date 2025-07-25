"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  createDownloadLink,
  getCurrentDateInput,
  getSubmitDateInput,
  titleCase,
  todayInString,
} from "../../modules/calculatefunctions";
import LeaveProposal from "../../pdfs/LeaveProposal";
import dynamic from "next/dynamic";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { query } from "firebase/database";
import { firestore } from "../../context/FirebaseContext";
import Loader from "../../components/Loader";
import { v4 as uuid } from "uuid";
export default function Page() {
  const PDFDownloadLink = dynamic(
    async () =>
      await import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
      ssr: false,
      loading: () => <p>Please Wait...</p>,
    }
  );
  const router = useRouter();
  const { state, stateObject, leaveState, setLeaveState } = useGlobalContext();
  const { tname, desig, school, doj, phone, hoi, gender, id } = stateObject;
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [showDownloadBtn, setShowDownloadBtn] = useState(false);
  const [leaveNature, setLeaveNature] = useState("");
  const [startingDate, setStartingDate] = useState(todayInString());
  const [endingDate, setEndingDate] = useState(todayInString());
  const [leaveDays, setLeaveDays] = useState(0);
  const [childBirthDate, setChildBirthDate] = useState(todayInString());
  const [village, setVillage] = useState("");
  const [po, setPo] = useState("");
  const [serviceAge, setServiceAge] = useState("");
  const [earnedLeave, setEarnedLeave] = useState("");
  const [balanceLeave, setBalanceLeave] = useState("");
  const [showEditLeave, setShowEditLeave] = useState(false);
  const [selectedLeaveID, setSelectedLeaveID] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const [teachersPrevLeaves, setTeachersPrevLeaves] = useState([
    {
      id: "",
      teacherId: "",
      tname: "",
      leaveType: "",
      startDate: "",
      endDate: "",
      days: 30,
      year: 2022,
      childBirthDate: "",
      memoNumber: "",
      memoDate: "",
    },
  ]);
  const [uploadLeave, setUploadLeave] = useState([
    {
      id: "",
      teacherId: "",
      tname: "",
      leaveType: "",
      startDate: "",
      endDate: "",
      days: 30,
      year: 2022,
      childBirthDate: "",
      memoNumber: "",
      memoDate: "",
    },
  ]);
  const [editLeave, setEditLeave] = useState({
    id: "",
    teacherId: "",
    tname: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    days: 30,
    year: 2022,
    childBirthDate: "",
    memoNumber: "",
    memoDate: "",
  });
  const calculateDays = () => {
    const start = new Date(getCurrentDateInput(startingDate));
    const end = new Date(getCurrentDateInput(endingDate));
    const endingYear = new Date(getCurrentDateInput(endingDate)).getFullYear();
    const joiningYear = new Date(getCurrentDateInput(doj)).getFullYear();
    const sAge = endingYear - joiningYear;
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    setLeaveDays(diffDays);
    setServiceAge(sAge);
    setEarnedLeave(sAge * 30);
    setBalanceLeave(sAge * 30 - diffDays);
    return diffDays;
  };
  const calculateEditDays = () => {
    const start = new Date(getCurrentDateInput(editLeave.startDate));
    const end = new Date(getCurrentDateInput(editLeave.endDate));
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    setEditLeave({ ...editLeave, days: diffDays });
    return diffDays;
  };

  const getTeachersLeaves = async () => {
    setLoader(true);
    const querySnapshot = await getDocs(query(collection(firestore, "leaves")));
    const data = querySnapshot.docs
      .map((doc) => ({
        // doc.data() is never undefined for query doc snapshots
        ...doc.data(),
        id: doc.id,
      }))
      .sort((a, b) => {
        if (
          new Date(getCurrentDateInput(a.endDate)) <
          new Date(getCurrentDateInput(b.endDate))
        )
          return -1;
        if (
          new Date(getCurrentDateInput(a.endDate)) >
          new Date(getCurrentDateInput(b.endDate))
        )
          return 1;
        return 0;
      });
    setLeaveState(data);
    const teachersPrevLeave = data.filter((leave) => leave.teacherId === id);
    if (teachersPrevLeave.length > 0) {
      setTeachersPrevLeaves(teachersPrevLeave);
    }
    setLoader(false);
  };
  const docId = uuid().split("-")[0];
  const uploadDetails = async () => {
    setLoader(true);
    const leaveData = {
      id: docId,
      teacherId: id,
      tname: tname,
      leaveType: leaveNature,
      startDate: startingDate,
      endDate: endingDate,
      days: leaveDays,
      year: parseInt(endingDate.split("-")[2]),
      childBirthDate: leaveNature === "MATERNITY" ? childBirthDate : "",
    };
    await setDoc(doc(firestore, "leaves", docId), leaveData)
      .then(() => {
        toast.success("Leave Application Submitted Successfully");
        setShowModal(false);
        setLoader(false);
        setLeaveState([...leaveState, leaveData]);
      })
      .catch((err) => {
        toast.error("Leave Application Failed");
        setLoader(false);
      });
  };
  const updateLeave = async () => {
    setLoader(true);
    const docRef = doc(firestore, "leaves", editLeave?.id);
    await updateDoc(docRef, editLeave)
      .then(() => {
        toast.success("Leave Updated Successfully");
        setShowUpdate(false);
        setLoader(false);
        const updatedLeaves = leaveState.map((leave) =>
          leave.id === editLeave?.id ? editLeave : leave
        );
        setLeaveState(updatedLeaves);
      })
      .catch((err) => {
        toast.error("Leave Update Failed");
        setLoader(false);
      });
  };
  const deleteLeave = async (id) => {
    setLoader(true);
    const docRef = doc(firestore, "leaves", id);
    await deleteDoc(docRef)
      .then(() => {
        toast.success("Leave Deleted Successfully");
        setLoader(false);
        const updatedLeaves = leaveState.filter((leave) => leave.id !== id);
        setLeaveState(updatedLeaves);
      })
      .catch((err) => {
        toast.error("Leave Delete Failed");
        setLoader(false);
        console.log(err);
      });
  };
  useEffect(() => {
    if (state !== "admin") {
      router.push("/");
    }
    if (leaveState.length === 0) {
      getTeachersLeaves();
    } else {
      const teachersPrevLeave = leaveState.filter(
        (leave) => leave.teacherId === id
      );
      if (teachersPrevLeave.length > 0) {
        setTeachersPrevLeaves(teachersPrevLeave);
      }
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // eslint-disable-next-line
  }, [startingDate, endingDate, leaveDays]);
  return (
    <div className="container">
      <div
        className="d-flex flex-column justify-content-center align-items-center mx-auto"
        style={{ width: "50%" }}
      >
        <button
          type="button"
          className="btn btn-dark m-5"
          onClick={() => router.push("/teacherdatabase")}
        >
          Go Back
        </button>
        <button
          type="button"
          className="btn btn-sm m-3 btn-info"
          onClick={() => {
            createDownloadLink(leaveState, "leaves");
          }}
        >
          Download Leave Data
        </button>
        <button
          type="button"
          className="btn btn-primary m-5"
          onClick={() => {
            setShowModal(true);
            setShowDownloadBtn(false);
          }}
        >
          Enter Details
        </button>
      </div>
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
          aria-modal="true"
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Enter Leave Details of {titleCase(tname)}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => {
                    setShowModal(false);
                    setShowDownloadBtn(false);
                    setShowEditLeave(false);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="prevLeaves">
                  {teachersPrevLeaves[0].id !== "" ? (
                    <div>
                      <h5>Teacher's Previous Leaves</h5>
                      {teachersPrevLeaves.map((leave, index) => (
                        <div className="card m-2 col-md-3 mx-auto " key={index}>
                          <div className="card-body p-1">
                            <p className="card-text m-0 p-0">Sl: {index + 1}</p>
                            <h6 className="card-title m-0 p-0">
                              Leave Type: {leave.leaveType}
                            </h6>
                            <p className="card-text m-0 p-0">
                              Start Date: {leave.startDate} <br /> End Date:{" "}
                              {leave.endDate}
                            </p>
                            <p className="card-text m-0 p-0">
                              Days: {leave.days}
                            </p>
                            {leave.leaveType === "MATERNITY" && (
                              <p className="card-text m-0 p-0">
                                Child Birth Date: {leave.childBirthDate}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <h5>Teacher Has No Previous Leaves in Our Records</h5>
                  )}
                </div>
                <hr />

                <div className="currentLeave">
                  <h5 className="m-0 p-0">Details of Current Leave</h5>
                  <div className="mx-auto col-md-6 my-2">
                    <div className="mb-3">
                      <label htmlFor="purpose_type" className="form-label">
                        Nature of Leave
                      </label>
                      <select
                        className="form-select"
                        id="purpose_type"
                        defaultValue={leaveNature}
                        onChange={(e) => {
                          if (e.target.value !== "") {
                            setLeaveNature(e.target.value);
                            if (teachersPrevLeaves[0].id !== "") {
                              const checkLeave = teachersPrevLeaves.filter(
                                (el) => el.leaveType === e.target.value
                              );
                              if (checkLeave.length > 0) {
                                setSelectedLeaveID(
                                  checkLeave[checkLeave.length - 1].id
                                );
                                toast.success(
                                  "This leave type already exists in your previous leaves"
                                );
                              }
                            }
                          } else {
                            setLeaveNature("");
                            toast.error("Select Nature of Leave");
                          }
                        }}
                      >
                        <option value="">Select nature of Leave</option>
                        <option value="HPL">HPL</option>
                        <option value="COMMUTED">COMMUTED</option>
                        <option value="MATERNITY">MATERNITY</option>
                        <option value="MEDICAL">MEDICAL</option>
                        <option value="LWP">LWP</option>
                        <option value="CCL">CCL</option>
                        <option value="PATERNITY">PATERNITY</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="date" className="form-label">
                        Starting Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="date"
                        defaultValue={getCurrentDateInput(startingDate)}
                        onChange={(e) => {
                          setStartingDate(getSubmitDateInput(e.target.value));
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="date" className="form-label">
                        Ending Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="date"
                        defaultValue={getCurrentDateInput(endingDate)}
                        onChange={(e) => {
                          setEndingDate(getSubmitDateInput(e.target.value));
                        }}
                      />
                    </div>
                    <button
                      className="btn btn-success m-3"
                      onClick={() => {
                        calculateDays();
                        // accumulateEvents();
                      }}
                    >
                      Calculate Days
                    </button>
                    {leaveDays > 0 && (
                      <label htmlFor="date" className="form-label">
                        Total Leave Days : {leaveDays}
                      </label>
                    )}
                    {leaveNature === "MATERNITY" && (
                      <div className="mb-3">
                        <label htmlFor="date" className="form-label">
                          Child Birth Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="date"
                          defaultValue={getCurrentDateInput(childBirthDate)}
                          onChange={(e) => {
                            setChildBirthDate(
                              getSubmitDateInput(e.target.value)
                            );
                          }}
                        />
                      </div>
                    )}
                    <div className="mb-3">
                      <label className="form-label">School Village</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="School Village"
                        id="date"
                        value={village}
                        onChange={(e) => {
                          setVillage(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">School Post Office</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="School Post Office"
                        id="date"
                        value={po}
                        onChange={(e) => {
                          setPo(e.target.value);
                        }}
                      />
                    </div>
                    {showEditLeave && (
                      <div>
                        <div className="mb-3">
                          <label htmlFor="date" className="form-label">
                            Total Leave Days
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="date"
                            placeholder="Total Leave Days"
                            value={leaveDays}
                            onChange={(e) => {
                              if (e.target.value !== "") {
                                setLeaveDays(parseInt(e.target.value));
                              } else {
                                setLeaveDays("");
                              }
                            }}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="date" className="form-label">
                            Total Leaves Earned
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="date"
                            placeholder="Total Leaves Earned"
                            value={earnedLeave}
                            onChange={(e) => {
                              if (e.target.value !== "") {
                                setEarnedLeave(parseInt(e.target.value));
                              } else {
                                setEarnedLeave("");
                              }
                            }}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="date" className="form-label">
                            Balance of Leave
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="date"
                            placeholder="Balance of Leave"
                            value={balanceLeave}
                            onChange={(e) => {
                              if (e.target.value !== "") {
                                setBalanceLeave(parseInt(e.target.value));
                              } else {
                                setBalanceLeave("");
                              }
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex flex-column">
                <div>
                  <button
                    className="btn btn-primary m-2"
                    type="button"
                    disabled={
                      leaveNature === "" ||
                      village === "" ||
                      po === "" ||
                      leaveDays === 0
                    }
                    onClick={() => {
                      if (leaveNature !== "") {
                        setShowModal(false);
                        setShowDownloadBtn(true);
                      } else {
                        toast.error("Select Nature of Leave");
                      }
                    }}
                  >
                    Save
                  </button>

                  <button
                    className="btn btn-warning m-2"
                    type="button"
                    disabled={
                      leaveNature === "" ||
                      village === "" ||
                      po === "" ||
                      leaveDays === 0
                    }
                    onClick={() => {
                      setShowEditLeave(!showEditLeave);
                    }}
                  >
                    {showEditLeave ? "Hide Edit" : "Edit Leave"}
                  </button>
                  <button
                    className="btn btn-danger m-2"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setShowDownloadBtn(false);
                      setShowEditLeave(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>

                {teachersPrevLeaves[0].id !== "" && (
                  <div>
                    <p className="text-danger">
                      *** To Continue with Previous Leaves select Leave Nature,
                      Enter Village and PO, then click 'Continue'
                    </p>
                    <button
                      className="btn btn-success m-2"
                      type="button"
                      disabled={
                        leaveNature === "" || village === "" || po === ""
                      }
                      onClick={() => {
                        const prevLeave = leaveState.filter(
                          (leave) => leave.id === selectedLeaveID
                        )[0];
                        setStartingDate(prevLeave.startDate);
                        setEndingDate(prevLeave.endDate);
                        setLeaveDays(prevLeave.days);
                        setChildBirthDate(prevLeave?.childBirthDate);
                        setUploadLeave(prevLeave);
                        calculateDays();
                        setShowModal(false);
                        setShowDownloadBtn(true);
                      }}
                    >
                      Continue
                    </button>
                  </div>
                )}

                <div>
                  <p className="text-success">
                    *** To Upload To Database Click Upload Details
                  </p>
                  <button
                    className="btn btn-success m-2"
                    type="button"
                    disabled={
                      leaveNature === "" ||
                      village === "" ||
                      po === "" ||
                      leaveDays === 0
                    }
                    onClick={() => {
                      if (uploadLeave.id !== selectedLeaveID) {
                        // eslint-disable-next-line
                        let conf = confirm(
                          "Are you sure you want to Upload this Leave?"
                        );
                        if (conf) {
                          uploadDetails();
                        } else {
                          toast.success("Leave Not Uploaded!!!");
                        }
                      } else {
                        toast.error("Previous Leave Details Already Exists");
                      }
                    }}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDownloadBtn && (
        <div className="my-3">
          <PDFDownloadLink
            document={
              <LeaveProposal
                data={{
                  tname,
                  school,
                  desig,
                  doj,
                  leaveNature,
                  leaveDays,
                  startingDate,
                  endingDate,
                  childBirthDate,
                  phone,
                  village,
                  po,
                  hoi,
                  gender,
                  serviceAge,
                  teachersPrevLeaves,
                  earnedLeave,
                  balanceLeave,
                }}
              />
            }
            fileName={`Leave Proposal Format of ${tname} of ${school}.pdf`}
            style={{
              textDecoration: "none",
              padding: "10px",
              color: "#fff",
              backgroundColor: "navy",
              border: "1px solid #4a4a4a",
              width: "40%",
              borderRadius: 10,
            }}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Please Wait..." : "Download Leave Proposal Format"
            }
          </PDFDownloadLink>
        </div>
      )}

      {/* {showDownloadBtn && (
        <div className="mt-3">
          <LeaveProposal
            data={{
              tname,
              school,
              desig,
              doj,
              leaveNature,
              leaveDays,
              startingDate,
              endingDate,
              childBirthDate,
              phone,
              village,
              po,
              hoi,
              gender,
              serviceAge,
              teachersPrevLeaves,
              earnedLeave,
              balanceLeave,
            }}
          />
        </div>
      )} */}

      {!showDownloadBtn && !showModal && !loader && (
        <div
          style={{
            width: "100%",
            overflowX: "auto",
          }}
        >
          <table
            className="ttable-striped table-hover text-center"
            style={{
              verticalAlign: "middle",
              width: "100%",
              overflowX: "auto",
              border: "1px solid",
              padding: 2,
            }}
          >
            <thead>
              <tr>
                <th style={{ borderWidth: 1 }}>Sl</th>
                <th style={{ borderWidth: 1 }}>Name</th>
                <th style={{ borderWidth: 1 }}>Leave Type</th>
                <th style={{ borderWidth: 1 }}>Start Date</th>
                <th style={{ borderWidth: 1 }}>End Date</th>
                <th style={{ borderWidth: 1 }}>Leave Days</th>
                <th style={{ borderWidth: 1 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {leaveState.map((leave, index) => (
                <tr
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                    border: "1px solid",
                    padding: 2,
                    verticalAlign: "middle",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  key={index}
                >
                  <td style={{ borderWidth: 1, padding: 5 }}>{index + 1}</td>
                  <td style={{ borderWidth: 1, padding: 5 }}>{leave.tname}</td>
                  <td style={{ borderWidth: 1, padding: 5 }}>
                    {leave.leaveType}
                  </td>
                  <td style={{ borderWidth: 1, padding: 5 }}>
                    {leave.startDate}
                  </td>
                  <td style={{ borderWidth: 1, padding: 5 }}>
                    {leave.endDate}
                  </td>
                  <td style={{ borderWidth: 1, padding: 5 }}>{leave.days}</td>
                  <td
                    style={{ borderWidth: 1, padding: 5 }}
                    suppressHydrationWarning
                  >
                    <button
                      className="btn btn-warning m-1 btn-sm"
                      onClick={() => {
                        setEditLeave(leave);
                        setShowUpdate(true);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger m-1 btn-sm"
                      onClick={() => {
                        // eslint-disable-next-line
                        let conf = confirm(
                          "Are you sure you want to Delete this Leave?"
                        );
                        if (conf) {
                          deleteLeave(leave.id);
                        } else {
                          toast.success("Leave Not Deleted!!!");
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showUpdate && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
          aria-modal="true"
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Update Leave Data of {editLeave.tname}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => {
                    setShowUpdate(false);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <h5 className="m-0 p-0">Details of Current Leave</h5>
                <div className="mx-auto col-md-6 my-2">
                  <div className="mb-3">
                    <label htmlFor="purpose_type" className="form-label">
                      Nature of Leave
                    </label>
                    <select
                      className="form-select"
                      id="purpose_type"
                      defaultValue={editLeave?.leaveType}
                      onChange={(e) => {
                        setEditLeave({
                          ...editLeave,
                          leaveType: e.target.value,
                        });
                      }}
                    >
                      <option value="">Select nature of Leave</option>
                      <option value="HPL">HPL</option>
                      <option value="COMMUTED">COMMUTED</option>
                      <option value="MATERNITY">MATERNITY</option>
                      <option value="MEDICAL">MEDICAL</option>
                      <option value="LWP">LWP</option>
                      <option value="CCL">CCL</option>
                      <option value="PATERNITY">PATERNITY</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">
                      Starting Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      defaultValue={getCurrentDateInput(editLeave?.startDate)}
                      onChange={(e) => {
                        setEditLeave({
                          ...editLeave,
                          startDate: getSubmitDateInput(e.target.value),
                        });
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">
                      Ending Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      defaultValue={getCurrentDateInput(editLeave?.endDate)}
                      onChange={(e) => {
                        setEditLeave({
                          ...editLeave,
                          endDate: getSubmitDateInput(e.target.value),
                        });
                      }}
                    />
                  </div>
                  <button
                    className="btn btn-success m-3"
                    onClick={() => {
                      calculateEditDays();
                    }}
                  >
                    Calculate Days
                  </button>
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">
                      Total Leave Days
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="days"
                      placeholder="Total Leave Days"
                      value={editLeave?.days}
                      onChange={(e) => {
                        if (e.target.value !== "") {
                          setEditLeave({
                            ...editLeave,
                            days: parseInt(e.target.value),
                          });
                        } else {
                          setEditLeave({ ...editLeave, days: "" });
                        }
                      }}
                    />
                  </div>
                  {editLeave?.leaveType === "MATERNITY" && (
                    <div className="mb-3">
                      <label htmlFor="date" className="form-label">
                        Child Birth Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="date"
                        defaultValue={getCurrentDateInput(
                          editLeave?.childBirthDate
                        )}
                        onChange={(e) => {
                          setEditLeave({
                            ...editLeave,
                            childBirthDate: getSubmitDateInput(e.target.value),
                          });
                        }}
                      />
                    </div>
                  )}
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">
                      D. P. S. C Memo Number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="days"
                      placeholder="D. P. S. C Memo Number"
                      value={editLeave?.memoNumber}
                      onChange={(e) => {
                        setEditLeave({
                          ...editLeave,
                          memoNumber: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">
                      D. P. S. C Memo Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="memo_date"
                      defaultValue={
                        getCurrentDateInput(editLeave?.memoDate) ||
                        getCurrentDateInput(todayInString())
                      }
                      onChange={(e) => {
                        setEditLeave({
                          ...editLeave,
                          memoDate: getSubmitDateInput(e.target.value),
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex flex-column">
                <div>
                  <button
                    className="btn btn-primary m-2"
                    type="button"
                    onClick={() => {
                      setShowUpdate(false);
                      updateLeave();
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger m-2"
                    type="button"
                    onClick={() => {
                      setShowUpdate(false);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {loader && <Loader />}
    </div>
  );
}
