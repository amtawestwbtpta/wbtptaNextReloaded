"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import DataTable from "react-data-table-component";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { firestore } from "../../context/FirebaseContext";
import { storage } from "../../context/FirebaseContext";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import Loader from "../../components/Loader";
import { decryptObjData, getCookie } from "../../modules/encryption";
import {
  compareObjects,
  createDownloadLink,
  getCurrentDateInput,
  getSubmitDateInput,
} from "../../modules/calculatefunctions";
import bcrypt from "bcryptjs";
import { notifyAll } from "../../modules/notification";
import axios from "axios";
const TeacherDatabase = () => {
  const {
    state,
    teachersState,
    schoolState,
    setTeachersState,
    setStateObject,
    setTeacherUpdateTime,
    setStateArray,
    deductionState,
    setDeductionState,
  } = useGlobalContext();
  const router = useRouter();
  const [showTable, setShowTable] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showDeductionForm, setShowDeductionForm] = useState(false);
  useEffect(() => {
    if (state !== "admin") {
      localStorage.clear();
      router.push("/logout");
    }
    // eslint-disable-next-line
  }, []);
  let teacherdetails = {
    convenor: "",
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
  const [search, setSearch] = useState("");
  const [schSearch, setSchSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [allDelTeachers, setAllDelTeachers] = useState([]);
  const [filteredDelTeachers, setFilteredDelTeachers] = useState([]);
  const [delSearch, setDelSearch] = useState("");
  const [showDelTeachers, setShowDelTeachers] = useState(false);
  const [src, setSrc] = useState(null);
  const [file, setFile] = useState({});
  const [user, setUser] = useState({
    tname: "",
    tsname: "",
    school: "",
    pan: "",
    empid: "",
  });
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showPercent, setShowPercent] = useState(false);
  const [teacherDeduction, setTeacherDeduction] = useState({
    id: "",
    tname: "",
    hbLoanPrincipal: "",
    hbLoanInterest: "",
    lic: "",
    ulip: "",
    ppf: "",
    nsc: "",
    nscInterest: "",
    tutionFee: "",
    sukanya: "",
    stampDuty: "",
    mediclaim: "",
    terminalDisease: "",
    handicapTreatment: "",
    educationLoan: "",
    charity: "",
    disability: "",
    rgSaving: "",
    otherIncome: "",
    fd: "",
    tds: "",
  });
  const userData = async () => {
    setLoader(true);
    let newDatas = teachersState.sort(
      (a, b) => a.school.localeCompare(b.school) && b.rank > a.rank
    );
    setData(newDatas);
    setFilteredData(newDatas);
    setLoader(false);
    setShowTable(true);
  };

  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Teachers Database";
    userData();
    // eslint-disable-next-line
  }, []);

  const getDeletedTeachers = async () => {
    setLoader(true);
    const q = query(collection(firestore, "deletedTeachers"));
    const querySnapshot = await getDocs(q);
    const datas = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    let newDatas = datas.sort(function (a, b) {
      var nameA = a.tname.toLowerCase(),
        nameB = b.tname.toLowerCase();
      if (nameA < nameB)
        //sort string ascending
        return -1;
      if (nameA > nameB) return 1;
      return 0; //default return value (no sorting)
    });
    setAllDelTeachers(newDatas);
    setFilteredDelTeachers(newDatas);
    setLoader(false);
  };
  const getDeduction = async (id) => {
    if (deductionState.length === 0) {
      setLoader(true);
      const q = query(collection(firestore, "deduction"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        // doc.data() is never undefined for query doc snapshots
        ...doc.data(),
        id: doc.id,
      }));
      setDeductionState(data);
      setLoader(false);
      setShowDeductionForm(true);
      const filteredData = data.filter((d) => d.id === id)[0];
      setTeacherDeduction(filteredData);
    } else {
      const filteredData = deductionState.filter((d) => d.id === id)[0];
      setTeacherDeduction(filteredData);
      setShowDeductionForm(true);
      setLoader(false);
    }
  };

  const columns = [
    {
      name: "Sl",
      selector: (row, ind) => ind + 1,
      width: "2",
      center: +true,
    },
    {
      name: "Teacher Name",
      selector: (row) => row.tname,
      sortable: true,
      wrap: true,
      center: +true,
    },
    {
      name: "School Name",
      selector: (row) => row.school,
      sortable: true,
      wrap: true,
      center: +true,
    },
    {
      name: "View / Edit Details",
      cell: (row) => (
        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() => {
            setStateObject(row);
            router.push("/ViewDetails");
          }}
        >
          View / Edit Details
        </button>
      ),
    },

    {
      name: "Leave Proposal",
      cell: (row) => (
        <button
          type="button"
          className="btn btn-sm btn-success"
          onClick={() => {
            setStateObject(row);
            router.push("/LeaveProposalNew");
          }}
        >
          Leave Proposal
        </button>
      ),
    },
    {
      name: "Leave Proposal",
      cell: (row) => (
        <button
          type="button"
          className="btn btn-sm btn-dark"
          onClick={() => {
            setStateObject(row);
            router.push("/HRADeclaration");
          }}
        >
          HRA Declaration
        </button>
      ),
    },
    {
      name: "Payslip WBTPTA",
      cell: (row) => (
        <Link
          className="btn btn-sm btn-info"
          href={`/payslipwbtptaNew`}
          onClick={() => setStateObject(row)}
        >
          Payslip WBTPTA
        </Link>
      ),
    },

    {
      name: "Download Form 16",
      cell: (row) => {
        const { id, tname, school, pan, disability, desig, fname } = row;
        const data = {
          id,
          tname,
          school,
          pan,
          disability,
          desig,
          fname,
        };
        return (
          <Link
            className="btn btn-sm btn-success"
            href={`/Form16New?data=${JSON.stringify(data)}`}
          >
            Download Form 16
          </Link>
        );
      },
    },
    {
      name: "Generate Form 16 Previous Year",
      cell: (row) => (
        <Link
          className="btn btn-sm btn-info"
          href={`/Form16Prev`}
          onClick={() => setStateObject(row)}
        >
          Generate Form 16 Previous Year
        </Link>
      ),
    },

    {
      name: "Payslip OSMS",
      cell: (row) => (
        <Link
          className="btn btn-sm btn-primary"
          // href={`/techpaysliposmsNew?details=${JSON.stringify(row)}`}
          href={`/paysliposmsNew`}
          onClick={() => setStateObject(row)}
        >
          OSMS Payslip
        </Link>
      ),
    },
    {
      name: "Update Deduction",
      cell: (row) => (
        <button
          type="button"
          className="btn btn-sm btn-warning"
          onClick={() => {
            getDeduction(row?.id);
          }}
        >
          Update Deduction
        </button>
      ),
    },
    {
      name: "IT Statement",
      cell: (row) => {
        const { id, tname, school, pan, phone, disability, desig } = row;
        const data = {
          id,
          tname,
          school,
          pan,
          phone,
          disability,
          desig,
        };
        return (
          <Link
            className="btn btn-sm btn-success"
            href={`/incometaxOld?data=${JSON.stringify(data)}`}
          >
            IT Statement
          </Link>
        );
      },
      omit: deductionState.length === 0,
    },
    {
      name: "Delete Teacher",
      cell: (row) => (
        <button
          className="btn btn-sm btn-danger"
          onClick={() => {
            // eslint-disable-next-line
            let conf = confirm(
              `Are you sure you want to Delete Teacher ${row.tname}?`
            );
            if (conf) {
              deleteTeacher(row);
            } else {
              toast.success("Teacher Not Deleted!!!");
            }
          }}
        >
          Delete Teacher
        </button>
      ),
    },
    {
      name: "Register Teacher",
      cell: (row) =>
        !row.registered ? (
          <button
            className="btn btn-sm btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#regTeacher"
            onClick={() => {
              setUser(row);
            }}
          >
            Register Teacher
          </button>
        ) : (
          <h6 className="text-success">Teacher Registered</h6>
        ),
    },
  ];
  const delColumns = [
    {
      name: "Sl",
      selector: (row, ind) => ind + 1,
      width: "2",
    },
    {
      name: "Teacher Name",
      selector: (row) => row.tname,
      sortable: true,
      wrap: true,
    },
    {
      name: "School Name",
      selector: (row) => row.school,
      sortable: true,
      wrap: true,
    },
    {
      name: "View Details",
      cell: (row) => (
        <Link
          className="btn btn-sm btn-primary"
          href={`/ViewDetails`}
          onClick={() => setStateObject(row)}
        >
          View Details
        </Link>
      ),
    },

    {
      name: "Restore Teacher",
      cell: (row) => (
        <button
          className="btn btn-sm btn-success"
          onClick={() => {
            // eslint-disable-next-line
            let conf = confirm(
              `Are you sure you want to Restore Teacher ${row.tname}?`
            );
            if (conf) {
              restoreTeacher(row);
            } else {
              toast.success("Teacher Not Restored!!!");
            }
          }}
        >
          Restore Teacher
        </button>
      ),
    },
  ];

  const deleteTeacher = async (el) => {
    const url = `/api/delteacher`;
    let response = await axios.post(url, el);
    let record = response.data;
    if (record.success) {
      const docRef = doc(firestore, "teachers", el.id);
      await deleteDoc(docRef)
        .then(async () => {
          let x = teachersState.filter((elem) => elem.id !== el.id);
          const newData = x.sort((a, b) => {
            // First, compare the "school" keys
            if (a.school < b.school) {
              return -1;
            }
            if (a.school > b.school) {
              return 1;
            }
            // If "school" keys are equal, compare the "rank" keys
            return a.rank - b.rank;
          });
          setTeachersState(newData);
          setTeacherUpdateTime(Date.now());
          setFilteredData(newData);
          setData(newData);
          await setDoc(doc(firestore, "deletedTeachers", el.id), el)
            .then(async () => {
              toast.success("Congrats! Teacher Deleted Successfully!", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            })
            .catch((err) => {
              console.log(err);
              toast.error("Unable To Send Query!!!", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Unable To Send Query!!!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } else {
      toast.error("Unable To Send Query!!!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const restoreTeacher = async (el) => {
    const docRef = doc(firestore, "deletedTeachers", el.id);
    await deleteDoc(docRef)
      .then(async () => {
        const url = `/api/addTeacher`;
        let response = await axios.post(url, el);
        let record = response.data;
        if (record.success) {
          await setDoc(doc(firestore, "teachers", el.id), el)
            .then(async () => {
              let x = teachersState;
              x = [...x, el];
              const newData = x.sort((a, b) => {
                // First, compare the "school" keys
                if (a.school < b.school) {
                  return -1;
                }
                if (a.school > b.school) {
                  return 1;
                }
                // If "school" keys are equal, compare the "rank" keys
                return a.rank - b.rank;
              });
              setTeachersState(newData);
              setTeacherUpdateTime(Date.now());
              setFilteredData(newData);
              toast.success("Congrats! Teacher Restored Successfully!", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              // userData();
              getDeletedTeachers();
            })
            .catch((err) => {
              console.log(err);
              toast.error("Unable To Send Query!!!", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            });
        } else {
          toast.error("Unable To Send Query!!!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable To Send Query!!!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const registerUser = async () => {
    setLoader(true);
    const filestorageRef = ref(
      storage,
      `/profileImage/${user.id + "-" + file.name}`
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
          const techerData = {
            teachersID: user.id,
            tname: user.tname,
            school: user.school,
            desig: user.desig,
            pan: user.pan,
            udise: user.udise,
            circle: user.circle,
            showAccount: user.showAccount,
            empid: user.empid,
            question: user.question,
            email: user.email,
            phone: user.phone,
            id: user.id,
            username: user.empid.toLowerCase(),
            password: bcrypt.hashSync(user.pan.toLowerCase(), 10),
            createdAt: Date.now(),
            url: photourl,
            photoName: user.id + "-" + file.name,
          };
          const backendUrl = `https://awwbtpta.vercel.app/api/signup`;
          try {
            await axios
              .post(backendUrl, techerData)
              .then(async () => {
                await setDoc(
                  doc(firestore, "userteachers", techerData.id),
                  techerData
                );
                await setDoc(doc(firestore, "profileImage", techerData.id), {
                  title: techerData.tname,
                  description: techerData.school,
                  url: techerData.url,
                  fileName: techerData.photoName,
                  id: techerData.id,
                })
                  .then(async () => {
                    await updateDoc(doc(firestore, "teachers", techerData.id), {
                      registered: true,
                    });
                    let x = teachersState.filter(
                      (el) => el.id === techerData.id
                    )[0];
                    x.registered = true;
                    let y = teachersState.filter(
                      (el) => el.id !== techerData.id
                    );
                    y = [...y, x];
                    const newData = y.sort((a, b) => {
                      // First, compare the "school" keys
                      if (a.school < b.school) {
                        return -1;
                      }
                      if (a.school > b.school) {
                        return 1;
                      }
                      // If "school" keys are equal, compare the "rank" keys
                      return a.rank - b.rank;
                    });
                    setTeachersState(newData);
                    setTeacherUpdateTime(Date.now());
                    setData(newData);
                    let title = `${techerData.tname} is Registered To App Via Website`;
                    let body = `${
                      techerData.tname
                    } Has Just Registered By Admin ${
                      teacherdetails.tname
                    }. WBTPTA Amta West Welcome ${
                      techerData.gender === "male" ? "Him" : "Her"
                    }.`;
                    await notifyAll(title, body).then(async () => {
                      setLoader(false);
                      toast.success(
                        `Congratulation ${techerData.tname} Is Successfully Registered!`
                      );
                      setFile({});
                      setSrc(null);
                      setShowPercent(false);
                      setProgress(0);
                      userData();
                    });
                  })
                  .catch((e) => {
                    setLoader(false);
                    toast.error("Some Error Happened!");
                    console.log(e);
                  });
              })
              .catch((e) => {
                setLoader(false);
                toast.error("Some Error Happened!");
                console.log(e);
              });
          } catch (e) {
            setLoader(false);
            toast.error("Some Error Happened!");
            console.log(e.response.data.data);
          }
        });
      }
    );
  };
  const updateTeacherDeduction = async () => {
    const docRef = doc(firestore, "deduction", teacherDeduction.id);
    setLoader(true);
    await updateDoc(docRef, teacherDeduction)
      .then(() => {
        setLoader(false);
        let y = deductionState.filter((el) => el.id !== teacherDeduction.id);
        y = [...y, teacherDeduction];
        const newData = y.sort((a, b) => {
          if (a.tname < b.tname) {
            return -1;
          }
          if (a.tname > b.tname) {
            return 1;
          }
        });
        setDeductionState(newData);
        toast.success("Deduction Updated Successfully!");
      })
      .catch((e) => {
        setLoader(false);
        toast.error("Error Updating Deduction!");
        console.log(e);
      });
  };
  useEffect(() => {
    //eslint-disable-next-line
  }, [
    user,
    teachersState,
    filteredData,
    data,
    filteredDelTeachers,
    allDelTeachers,
  ]);

  return (
    <div className="container-fluid text-center my-3">
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
      {showTable && !showDelTeachers ? (
        <>
          <h3 className="text-center text-primary">Displaying Teachers Data</h3>

          <button
            type="button"
            className="btn btn-sm btn-info m-3"
            onClick={() => {
              router.push("/JulySalary");
              setStateArray(data);
            }}
          >
            July Salary Data
          </button>
          <Link className="btn btn-sm btn-success m-3" href="/AddTeacher">
            Add Teacher
          </Link>
          <button
            type="button"
            className="btn btn-sm m-3 btn-warning"
            onClick={() => {
              createDownloadLink(teachersState, "teachers");
            }}
          >
            Download Teacher Data
          </button>
          <button
            type="button"
            className="btn btn-sm m-3 btn-info"
            onClick={() => {
              createDownloadLink(schoolState, "schools");
            }}
          >
            Download School Data
          </button>

          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            paginationPerPage={30}
            highlightOnHover
            fixedHeader
            subHeader
            subHeaderComponent={
              <div>
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Search by Teacher"
                    className="form-control"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setFilteredData(
                        teachersState.filter((el) =>
                          el.tname
                            .toLowerCase()
                            .includes(e.target.value.toLowerCase())
                        )
                      );
                    }}
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Search by School"
                    className="form-control"
                    value={schSearch}
                    onChange={(e) => {
                      setSchSearch(e.target.value);
                      setFilteredData(
                        teachersState.filter((el) =>
                          el.school
                            .toLowerCase()
                            .includes(e.target.value.toLowerCase())
                        )
                      );
                    }}
                  />
                </div>
              </div>
            }
            subHeaderAlign="right"
          />
        </>
      ) : null}

      {loader && <Loader />}

      <button
        type="button"
        className={`btn btn-${showDelTeachers ? "warning" : "success"} my-3`}
        onClick={() => {
          if (!showDelTeachers) {
            getDeletedTeachers();
            setShowDelTeachers(true);
          } else {
            setShowDelTeachers(false);
          }
        }}
      >
        {showDelTeachers ? "Hide Deleted Teachers" : "Show Deleted Teachers"}
      </button>

      <div
        className="modal fade"
        id="regTeacher"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="regTeacherLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="regTeacherLabel">
                Upload User Image
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="my-3">
                <h6 className="text-primary">Teacher Name: {user.tname}</h6>
                <h6 className="text-primary">School Name: {user.school}</h6>
                <h6 className="text-primary">{`Username will be EMPID in Lower Case i.e.\n\n${user.empid.toLowerCase()}`}</h6>
                <h6 className="text-primary">{`Password will be PAN in Lower Case i.e.\n\n${user.pan.toLowerCase()}`}</h6>
              </div>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => {
                  if (e.target.files[0].type.startsWith("image/")) {
                    setFile(e.target.files[0]);
                    setSrc(URL.createObjectURL(e.target.files[0]));
                    setBtnDisabled(false);
                  } else {
                    setBtnDisabled(true);
                    setSrc(null);
                    toast.error("Please select an image file.");
                  }
                }}
              />
              {src !== null && (
                <img
                  src={src}
                  className="img-fluid my-3 rounded-2"
                  style={{ width: "200px", height: "200px" }}
                  alt="..."
                />
              )}
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
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => registerUser(user)}
                disabled={btnDisabled}
              >
                Register
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => {
                  setSrc(null);
                  setFile({});
                  if (typeof window !== undefined) {
                    document.getElementById("image").value = "";
                  }
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      {showDelTeachers && (
        <DataTable
          columns={delColumns}
          data={filteredDelTeachers}
          pagination
          highlightOnHover
          fixedHeader
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search"
              className="w-25 form-control"
              value={delSearch}
              onChange={(e) => setDelSearch(e.target.value)}
            />
          }
          subHeaderAlign="right"
        />
      )}
      {showDeductionForm && (
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
                  Set Deduction Data of {teacherDeduction.tname}
                </h1>
              </div>
              <div className="modal-body">
                <div className="col-md-6 row mx-auto justify-content-center align-items-baseline">
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      LIC
                    </label>
                    <input
                      type="number"
                      className="form-control col-md-4"
                      placeholder="LIC"
                      value={teacherDeduction.lic}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            lic: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            lic: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      PPF
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="PPF"
                      value={teacherDeduction.ppf}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            ppf: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            ppf: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      Homeloan Principal
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="Homeloan Principal"
                      value={teacherDeduction.hbLoanPrincipal}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            hbLoanPrincipal: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            hbLoanPrincipal: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      Homeloan Interest
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="Homeloan Interest"
                      value={teacherDeduction.hbLoanInterest}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            hbLoanInterest: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            hbLoanInterest: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      Mediclaim
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="Mediclaim"
                      value={teacherDeduction.mediclaim}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            mediclaim: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            mediclaim: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      Sukanya
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="Sukanya"
                      value={teacherDeduction.sukanya}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            sukanya: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            sukanya: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      NSC
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="NSC"
                      value={teacherDeduction.nsc}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            nsc: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            nsc: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      Interest on NSC
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="Interest on NSC"
                      value={teacherDeduction.nscInterest}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            nscInterest: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            nscInterest: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      Tution Fees
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="Tution Fees"
                      value={teacherDeduction.tutionFee}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            tutionFee: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            tutionFee: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      F.D. (5 Year)
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="Tution Fees"
                      value={teacherDeduction.fd}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            fd: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            fd: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      Disabled dependent Treatment
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="Disabled dependent Treatment"
                      value={teacherDeduction.handicapTreatment}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            handicapTreatment: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            handicapTreatment: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      Terminal Disease
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="terminal Disease"
                      value={teacherDeduction.terminalDisease}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            terminalDisease: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            terminalDisease: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      Education Loan Interest
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="Education Loan Interest"
                      value={teacherDeduction.educationLoan}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            educationLoan: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            educationLoan: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      Disabled Teacher
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="Disabled Teacher"
                      value={teacherDeduction.disability}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            disability: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            disability: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      Charity
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="Charity"
                      value={teacherDeduction.charity}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            charity: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            charity: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      ULIP /ELSS
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="ULIP /ELSS"
                      value={teacherDeduction.ulip}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            ulip: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            ulip: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      TDS Submitted
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="TDS Submitted"
                      value={teacherDeduction.tds}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            tds: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            tds: "",
                          });
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    setShowDeductionForm(false);
                    updateTeacherDeduction();
                  }}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    setShowDeductionForm(false);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDatabase;
