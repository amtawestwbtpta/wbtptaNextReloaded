"use client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import axios from "axios";
import DataTable from "react-data-table-component";
import { storage, firestore } from "../../context/FirebaseContext";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { ref, deleteObject } from "firebase/storage";
import { Bounce, ToastContainer, toast } from "react-toastify";
import bcrypt from "bcryptjs";
import Loader from "../../components/Loader";
import { createDownloadLink } from "../../modules/calculatefunctions";
import Image from "next/image";
const DisplayDatabase = () => {
  const {
    state,
    userState,
    setUserState,
    userUpdateTime,
    setUserUpdateTime,
    teachersState,
    setTeachersState,
    setTeacherUpdateTime,
    setStateObject,
  } = useGlobalContext();
  const router = useRouter();

  const [showTable, setShowTable] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [userField, setUserField] = useState({
    teachersID: "",
    photoName: "",
    disabled: false,
    school: "",
    circle: "",
    pan: "",
    udise: "",
    question: "",
    showAccount: false,
    id: "",
    tname: "",
    password: "",
    empid: "",
    desig: "",
    email: "",
    username: "",
    phone: "",
    url: "",
    createdAt: "",
  });
  const [showUserData, setShowUserData] = useState(false);
  const userData = async () => {
    const querySnapshot = await getDocs(
      query(collection(firestore, "userteachers"))
    );
    const data = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    let newData = data.sort((a, b) => a.createdAt - b.createdAt);
    setData(newData);
    setFilteredData(newData);
    setUserState(newData);
    setShowTable(true);
    setUserUpdateTime(Date.now());
  };

  useEffect(() => {
    const result = data.filter((el) => {
      return el.tname.toLowerCase().match(search.toLowerCase());
    });
    setFilteredData(result);
  }, [search, data]);
  useEffect(() => {}, [data]);
  const columns = [
    {
      name: "Sl",
      selector: (row, index) => data.findIndex((i) => i.id === row.id) + 1,
      sortable: true,
      wrap: +true,
      center: +true,
    },
    {
      name: "View",
      cell: (row) => (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setUserField(row);
            setShowUserData(true);
          }}
        >
          View
        </button>
      ),
      wrap: +true,
      center: +true,
    },

    {
      name: "Teacher Name",
      selector: (row) => row.tname,
      sortable: true,
      wrap: +true,
      center: +true,
    },

    {
      name: "Username",
      selector: (row) => row.username,

      wrap: +true,
      center: +true,
    },
    {
      name: "ID",
      selector: (row, index) => row.id,
      sortable: true,
      wrap: +true,
      center: +true,
    },
  ];
  const deleteUser = async (user) => {
    const url = `/api/delteacher`;
    try {
      setLoader(true);
      let response = await axios.post(url, {
        id: user.id,
      });
      let record = response.data;
      if (record.success) {
        await deleteDoc(doc(firestore, "userteachers", user.id));
        await deleteDoc(doc(firestore, "profileImage", user.id));
        await updateDoc(doc(firestore, "teachers", user.id), {
          registered: false,
        });
        setUserState(userState.filter((el) => el.id !== user.id));
        let x = teachersState.filter((el) => el.id === user.id)[0];
        let y = teachersState.filter((el) => el.id !== user.id);
        x.registered = false;
        y = [...y, x];
        let c = y.sort((a, b) => {
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
        setTeachersState(c);
        setUserUpdateTime(Date.now());
        setTeacherUpdateTime(Date.now());
        const desertRef = ref(storage, `profileImage/${user.photoName}`);
        await deleteObject(desertRef);
        await delTokens(user);

        setLoader(false);
        toast.success(`User Deleted Successfully`);
      } else {
        setLoader(false);
        toast.error("Something Went Wrong!");
      }
    } catch (e) {
      setLoader(false);
      toast.error("Something Went Wrong!");
    }
  };

  const delTokens = async (user) => {
    const querySnapshot = await getDocs(
      query(
        collection(firestore, "tokens"),
        where("username", "==", user.username)
      )
    );
    const data = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    data.map(async (el) => {
      await deleteDoc(doc(firestore, "tokens", el.id));
    });
  };

  const disableUser = async (id) => {
    const docRef = doc(firestore, "userteachers", id);
    await updateDoc(docRef, {
      disabled: true,
    })
      .then(async () => {
        const url = `/api/disableUser`;
        const response = await axios.post(url, {
          id,
          disabled: true,
        });
        const record = response.data;
        if (record.success) {
          let x = userState.filter((el) => el.id === id)[0];
          let y = userState.filter((el) => el.id !== id);
          x.disabled = true;
          y = [...y, x];
          let newData = y.sort((a, b) => a.createdAt - b.createdAt);
          setUserState(newData);
          setUserUpdateTime(Date.now());
          toast.success("Congrats! User Login is Disabled Successfully!");
        } else {
          toast.error("User Login Disable Updation Failed!");
        }
      })
      .catch((e) => {
        toast.error("User Login Disable Updation Failed!");
      });
  };
  const restoreUser = async (id) => {
    const docRef = doc(firestore, "userteachers", id);
    await updateDoc(docRef, {
      disabled: false,
    })
      .then(async () => {
        const url = `/api/disableUser`;
        const response = await axios.post(url, {
          id,
          disabled: false,
        });
        const record = response.data;
        if (record.success) {
          let x = userState.filter((el) => el.id === id)[0];
          let y = userState.filter((el) => el.id !== id);
          x.disabled = false;
          y = [...y, x];
          let newData = y.sort((a, b) => a.createdAt - b.createdAt);
          setUserState(newData);
          setUserUpdateTime(Date.now());
          toast.success("Congrats! User Login is Enabled Successfully!");
        } else {
          toast.error("User Login Enable Updation Failed!");
        }
      })
      .catch((e) => {
        toast.error("User Login Enable Updation Failed!");
      });
  };
  const resetPassword = async (user) => {
    const docRef = doc(firestore, "userteachers", user.id);
    await updateDoc(docRef, {
      password: bcrypt.hashSync(user.pan.toLowerCase(), 10),
    })
      .then(async () => {
        const url = `/api/resetPassword`;
        const response = await axios.post(url, {
          id,
          password: bcrypt.hashSync(user.pan.toLowerCase(), 10),
        });
        const record = response.data;
        if (record.success) {
          let x = userState.filter((el) => el.id === user.id)[0];
          let y = userState.filter((el) => el.id !== user.id);
          x.password = bcrypt.hashSync(user.pan.toLowerCase(), 10);
          y = [...y, x];
          let newData = y.sort((a, b) => a.createdAt - b.createdAt);
          setUserState(newData);
          setUserUpdateTime(Date.now());
          toast.success("Congrats! User Password Reset was Successful!");
        }
      })
      .catch((e) => {
        toast.success("Congrats! User Password Reset Failed!");
      });
  };
  const makeAdmin = async (id) => {
    setLoader(true);
    const docRef = doc(firestore, "teachers", id);
    await updateDoc(docRef, {
      circle: "admin",
    })
      .then(async () => {
        const docRef2 = doc(firestore, "userteachers", id);
        await updateDoc(docRef2, {
          circle: "admin",
        })
          .then(() => {
            let x = userState.filter((el) => el.id === id)[0];
            let y = userState.filter((el) => el.id !== id);
            x.circle = "admin";
            y = [...y, x];
            let newData = y.sort((a, b) => a.createdAt - b.createdAt);
            setUserState(newData);
            setUserUpdateTime(Date.now());
            toast.success("Congrats! User is Now Admin!");
            setLoader(false);
          })
          .catch((e) => {
            toast.error("User Admin Updation Failed!");
            console.log(e);
            setLoader(false);
          });
      })
      .catch((e) => {
        toast.error("User Admin Updation Failed!");
        console.log(e);
        setLoader(false);
      });
  };
  const removeAdmin = async (id) => {
    setLoader(true);
    const docRef = doc(firestore, "teachers", id);
    await updateDoc(docRef, {
      circle: "taw",
    })
      .then(async () => {
        const docRef2 = doc(firestore, "userteachers", id);
        await updateDoc(docRef2, {
          circle: "taw",
        })
          .then(() => {
            let x = userState.filter((el) => el.id === id)[0];
            let y = userState.filter((el) => el.id !== id);
            x.circle = "taw";
            y = [...y, x];
            let newData = y.sort((a, b) => a.createdAt - b.createdAt);
            setUserState(newData);
            setUserUpdateTime(Date.now());
            toast.success("Congrats! User is No Longer Admin!");
            setLoader(false);
          })
          .catch((e) => {
            toast.error("User Admin Updation Failed!");
            console.log(e);
            setLoader(false);
          });
      })
      .catch((e) => {
        toast.error("User Admin Updation Failed!");
        console.log(e);
        setLoader(false);
      });
  };
  const getUserData = () => {
    const userDifference = (Date.now() - userUpdateTime) / 1000 / 60 / 3;
    if (userState.length === 0 || userDifference >= 1) {
      userData();
    } else {
      setData(userState);
      setFilteredData(userState);
      setShowTable(true);
    }
  };
  const compare = (userPassword, serverPassword) => {
    let match = bcrypt.compareSync(userPassword, serverPassword);

    return match;
  };
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:User Databse";
    getUserData();
    //eslint-disable-next-line
  }, []);
  useEffect(() => {}, [userState]);
  useEffect(() => {
    if (state !== "admin") {
      router.push("/login");
    }
  }, []);
  return (
    <div className="container-fluid text-center my-5">
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
      {loader ? <Loader /> : null}
      {showTable ? (
        <>
          <h3 className="text-center text-primary">
            Displaying Users Database
          </h3>
          <button
            type="button"
            className="btn m-3 btn-sm m-3 btn-warning"
            onClick={() => {
              createDownloadLink(data, "userteachers");
            }}
          >
            Download User Data
          </button>
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
                placeholder="Search"
                className="w-25 form-control"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            }
            subHeaderAlign="right"
          />
          {showUserData && (
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
                      Viewing User Data of {userField?.tname}
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => {
                        setShowUserData(false);
                      }}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <Image
                      src={userField?.url}
                      alt="profilephoto"
                      width={200}
                      height={200}
                      style={{
                        width: 200,
                        height: 200,
                        borderRadius: 10,
                        cursor: "pointer",
                        objectFit: "cover",
                      }}
                      onMouseEnter={() => setTooltip(true)}
                      onMouseLeave={() => setTooltip(false)}
                      onClick={() => {
                        setStateObject(userField);
                        router.push("/ChangeUserImage");
                      }}
                    />
                    <div className="mx-auto">
                      {tooltip && (
                        <div>
                          <span className="text-success">
                            Change Profile Photo
                          </span>
                          <p className="text-success">
                            Photo Name: {userField?.photoName}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="mt-5">
                      <h5 className="text-primary">User ID: {userField?.id}</h5>
                      <h5 className="text-primary">
                        Teacher Name: {userField?.tname}
                      </h5>
                      <h5 className="text-primary">
                        Username: {userField?.username}
                      </h5>
                      <h5 className="text-primary">
                        Email: {userField?.email}
                      </h5>
                      <h5 className="text-primary">
                        Phone: {userField?.phone}
                      </h5>
                      <h5 className="text-primary">
                        School: {userField?.school}
                      </h5>
                      <h5 className="text-primary">
                        Access:{" "}
                        {userField?.circle === "admin" ? "Admin" : "User"}
                      </h5>
                      <h5 className="text-primary">
                        UDISE: {userField?.udise}
                      </h5>
                      <h5 className="text-primary">
                        Designation: {userField?.desig}
                      </h5>
                      <h5 className="text-primary">PAN: {userField?.pan}</h5>
                      <h5 className="text-primary">
                        EmpID: {userField?.empid}
                      </h5>
                      {userField?.createdAt && (
                        <h5 className="text-primary">
                          Registered On:{" "}
                          {new Date(userField?.createdAt)
                            .toISOString()
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("-")}
                        </h5>
                      )}
                      <button
                        type="button"
                        className="btn m-3 btn-danger"
                        onClick={() => {
                          // eslint-disable-next-line
                          let message = confirm(
                            `Are You Sure To Delete User ${userField.tname}`
                          );
                          message
                            ? deleteUser(userField)
                            : alert("Teacher Not Deleted");
                        }}
                      >
                        Delete
                      </button>
                      {userField.disabled ? (
                        <button
                          type="button"
                          className="btn m-3 btn-sm btn-success"
                          onClick={() => {
                            // eslint-disable-next-line
                            let message = confirm(
                              `Are You Sure To Restore User ${userField.tname}'s Login? `
                            );
                            message
                              ? restoreUser(userField.id)
                              : alert("User Login Not Restored!");
                          }}
                        >
                          Unlock User
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn m-3 btn-sm btn-warning"
                          onClick={() => {
                            // eslint-disable-next-line
                            let message = confirm(
                              `Are You Sure To Disable User ${userField.tname}'s Login? `
                            );
                            message
                              ? disableUser(userField.id)
                              : alert("User Login Not Disabled!");
                          }}
                        >
                          Lock User
                        </button>
                      )}
                      {userField.circle === "admin" ? (
                        <button
                          type="button"
                          className="btn m-3 btn-sm btn-danger"
                          onClick={() => {
                            // eslint-disable-next-line
                            let message = confirm(
                              `Are You Sure To Remove User ${userField.tname}'s from Admin? `
                            );
                            message
                              ? removeAdmin(userField.id)
                              : toast.error("User Not Removed from Admin!");
                          }}
                        >
                          Remove Admin
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn m-3 btn-sm btn-success"
                          onClick={() => {
                            // eslint-disable-next-line
                            let message = confirm(
                              `Are You Sure To Make User ${userField.tname}'s Admin? `
                            );
                            message
                              ? makeAdmin(userField.id)
                              : toast.error("User Not Made Admin!");
                          }}
                        >
                          Make Admin
                        </button>
                      )}
                      {!compare(
                        userField.pan.toLowerCase(),
                        userField.password
                      ) ? (
                        <button
                          type="button"
                          className="btn m-3 btn-sm btn-warning"
                          onClick={() => {
                            // eslint-disable-next-line
                            let message = confirm(
                              `Are You Sure To Reset Password of ${userField.tname}? `
                            );
                            message
                              ? resetPassword(row)
                              : alert("User Password Not Rested!");
                          }}
                        >
                          Reset Password
                        </button>
                      ) : (
                        <h6 className="text-primary">
                          Password Need not to be Reset
                        </h6>
                      )}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn m-3 btn-sm btn-danger"
                      onClick={() => {
                        setShowUserData(false);
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default DisplayDatabase;
