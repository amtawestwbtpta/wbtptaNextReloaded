"use client";
import React, { useEffect, useState, useContext } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";

import DataTable from "react-data-table-component";
import { firestore } from "../../context/FirebaseContext";
import {
  query,
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../components/Loader";
import axios from "axios";
const DisplayComplain = () => {
  const { state, setState } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (state !== "admin") {
      router.push("/login");
    }
  }, []);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [complainId, setComplainId] = useState("");
  const [notice, setNotice] = useState(false);
  const [remark, setRemark] = useState("");
  const [showTable, setShowTable] = useState(false);

  const columns = [
    {
      name: "Sl",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Id",
      selector: (row) => row.id,
    },
    {
      name: "Teacher Name",
      selector: (row) => row.tname,
      sortable: true,
    },
    {
      name: "School",
      selector: (row) => row.school,
      sortable: true,
    },
    {
      name: "Circle",
      selector: (row) => row.sis,
      sortable: true,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "View Complain",
      selector: (row) => (
        <button
          type="button"
          className="btn btn-sm btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          onClick={(e) => {
            setComplainId(row.id);

            row.status === "Not Solved" ? setNotice(true) : setNotice(false);
            let date = new Date(row.complainTime);

            let date2 = new Date(row.solvedOn);
            if (typeof window !== "undefined") {
              document.getElementById(
                "staticBackdropLabel"
              ).innerHTML = `Complain of Visitor ${row.tname}`;
              document.getElementById(
                "name"
              ).innerHTML = `Complain of Visitor:-<br/> ${row.tname}`;
              document.getElementById(
                "school"
              ).innerHTML = `School of Visitor:-<br/> ${row.school}`;
              document.getElementById(
                "sis"
              ).innerHTML = `Circle of Visitor:-<br/> ${row.sis}`;
              document.getElementById(
                "email"
              ).innerHTML = `Email of Visitor:-<br/> ${row.email}`;
              document.getElementById(
                "mobile"
              ).innerHTML = `Mobile No. of Visitor:-<br/> ${row.mobile}`;
              document.getElementById(
                "complain"
              ).innerHTML = `Complain  of Visitor:-<br/> ${row.complain}`;
              document.getElementById("remark").value = row.remarks;

              if (row.status !== "Not Solved") {
                document.getElementById(
                  "noticed"
                ).innerHTML = `Status of Complain:-<br/> ${
                  row.status
                } at ${date2.getDate()}-${date2.getMonth()}-${date2.getFullYear()} At ${
                  date2.getHours() > 12
                    ? date2.getHours() - 12
                    : date2.getHours()
                }:${date2.getMinutes()}:${date2.getSeconds()} ${
                  date2.getHours() > 12 ? "PM" : "AM"
                }`;
              } else {
                document.getElementById("noticed").innerHTML = "Not Solved";
              }
              document.getElementById(
                "reg"
              ).innerHTML = `Complain Registered On:-<br/> ${date.getDate()}-${date.getMonth()}-${date.getFullYear()} At ${
                date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
              }:${date.getMinutes()}:${date.getSeconds()} ${
                date.getHours() > 12 ? "PM" : "AM"
              }`;
            }
          }}
        >
          Show Complain
        </button>
      ),

      sortable: true,
    },

    {
      name: "Registered On",
      selector: (row) => {
        let date = new Date(row.complainTime);
        return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
      },
      sortable: true,
    },
    {
      name: "Delete",
      selector: (row) => (
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => {
            let conf = confirm("Are You Sure to Delete This Complain?"); //eslint-disable-line
            if (conf) {
              deleteComplain(row.id);
            }
          }}
        >
          Delete
        </button>
      ),
    },
  ];
  const noticed = async () => {
    const docRef = doc(firestore, "complains", complainId);
    await updateDoc(docRef, {
      status: "Solved",
      solvedOn: Date.now(),
      remarks: remark,
    });
    const url = `/api/updateComplain`;
    const response = await axios.post(url, {
      id,
      status: "Solved",
      solvedOn: Date.now(),
      remarks: remark,
    });
    const record = response.data;
    if (record.success) {
      toast.success("Complain Noticed!");
      userData();
    } else {
      toast.error("Failed to Notice Complain!");
    }
  };

  const userData = async () => {
    const q = query(collection(firestore, "complains"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    setData(data);
    setShowTable(true);
  };

  const deleteComplain = async (id) => {
    // console.log(id);
    await deleteDoc(doc(firestore, "complains", id));
    const url = `/api/delComplain`;
    const response = await axios.post(url, {
      id,
    });
    const record = response.data;
    if (record.success) {
      toast.success("Complain Deleted Successfully!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "light",
      });
      userData();
    }
    // console.log(user.teachersID);
    // console.log(res);
  };

  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Requests";
    userData();
  }, []);

  useEffect(() => {
    const result = data.filter((el) => {
      return el.tname.toLowerCase().match(search.toLowerCase());
    });
    setFilteredData(result);
  }, [search, complainId, remark, data]);

  return (
    <div className="container my-5">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
      {showTable ? (
        <>
          <h3 className="text-center text-primary mb-3">
            Displaying Complains
          </h3>

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
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    Modal title
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
                    <h5 className="text-center" id="name"></h5>
                  </div>
                  <div className="mb-3">
                    <h5 className="text-center" id="school"></h5>
                  </div>
                  <div className="mb-3">
                    <h5 className="text-center" id="sis"></h5>
                  </div>
                  <div className="mb-3">
                    <h5 className="text-center" id="email"></h5>
                  </div>
                  <div className="mb-3">
                    <h5 className="text-center" id="mobile"></h5>
                  </div>
                  <div className="mb-3">
                    <h5 className="text-center" id="complain"></h5>
                  </div>
                  <div className="mb-3">
                    <h5 className="text-center" id="reg"></h5>
                  </div>
                  <div className="mb-3">
                    <h5 className="text-center" id="noticed"></h5>
                  </div>
                  <div className="mb-3">
                    <textarea
                      name="remark"
                      id="remark"
                      cols="5"
                      rows="5"
                      className="form-control"
                      placeholder="Give Response to this complain"
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
                    ></textarea>
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
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={noticed}
                  >
                    Request Noticed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default DisplayComplain;
