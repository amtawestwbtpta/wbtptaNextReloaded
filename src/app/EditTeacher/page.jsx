"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { ToastContainer, toast } from "react-toastify";
import { firestore } from "../../context/FirebaseContext";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import Loader from "../../components/Loader";
import {
  compareObjects,
  getCurrentDateInput,
  getSubmitDateInput,
} from "../../modules/calculatefunctions";

import axios from "axios";
import { useRouter } from "next/navigation";

const EditTeacher = () => {
  const {
    state,
    teachersState,
    setTeachersState,
    setTeacherUpdateTime,
    stateObject,
    schoolState,
  } = useGlobalContext();

  const router = useRouter();
  const [inputField, setinputField] = useState(stateObject);
  const filteredTeachers = teachersState.filter(
    (teacher) => teacher.udise === stateObject.udise
  );
  const [loader, setLoader] = useState(false);
  const updateData = async () => {
    if (!compareObjects(stateObject, inputField)) {
      setLoader(true);
      try {
        const docRef = doc(firestore, "teachers", inputField.id);
        const url = `/api/updteacher`;
        let response = await axios.post(url, inputField);
        let record = response.data;
        if (record.success) {
          await updateDoc(docRef, inputField);
          let x = teachersState.filter((el) => el.id !== inputField.id);
          x = [...x, inputField];
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
          const collectionRefUser = collection(firestore, "userteachers");
          const qq = query(
            collectionRefUser,
            where("teachersID", "==", inputField.id)
          );
          try {
            const qSnap = await getDocs(qq);

            const docRefuser = doc(
              firestore,
              "userteachers",
              qSnap.docs[0].data().id
            );

            try {
              await updateDoc(docRefuser, {
                tname: inputField.tname,
                tsname: inputField.tsname,
                school: inputField.school,
                desig: inputField.desig,
                pan: inputField.pan,
                udise: inputField.udise,
                sis: inputField.sis,
                circle: inputField.circle,
                empid: inputField.empid,
                question: inputField.question,
                email: inputField.email,
                phone: inputField.phone,
              });
            } catch (e) {
              console.log(e);
              toast.error("UserTeachers Database Not Updated!!!", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,

                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          } catch (e) {
            toast.error("Teacher Not Registered Yet!!!", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,

              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
          setLoader(false);

          toast.success("Congrats! Teacher Details Updated Successfully!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,

            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          setLoader(false);
          toast.error("Unable To Update Teacher Details!!!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
          });
        }
      } catch (e) {
        setLoader(false);
        toast.error("Unable To Send Query!!!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,

          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log(e);
        // console.log(inputField);
      }
    } else {
      toast.error("No Changes Detected!!!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  useEffect(() => {
    if (state !== "admin") {
      router.push("/logout");
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    fetch(`https://ifsc.razorpay.com/${stateObject.ifsc}`)
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("bankdiv").innerHTML =
          "<p>Bank Details<br>Bank Name: " +
          data.BANK +
          "<br/>" +
          "Branch: " +
          data.BRANCH +
          "<br/>" +
          "Address: " +
          data.ADDRESS +
          "<br/>" +
          "IFSC: " +
          data.IFSC +
          "<br/>" +
          "MICR: " +
          data.MICR +
          "<br/></p>";
      })
      .catch((err) => console.log(err));
    //eslint-disable-next-line
  }, []);
  return (
    <div className="container">
      <ToastContainer
        limit={1}
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="light"
      />
      <h3 className="text-primary my-3">
        Update Datails of {stateObject?.tname} of {stateObject?.school}
      </h3>
      <div className="row align-items-end">
        <div className="mb-3 col-md-3">
          <label className="form-label">School Name</label>
          <select
            className="form-select"
            value={
              inputField?.school +
              "-" +
              inputField?.udise +
              "-" +
              inputField?.gp
            }
            id="school-name"
            onChange={(e) => {
              setinputField({
                ...inputField,
                school: e.target.value.split("-")[0],
                udise: e.target.value.split("-")[1],
                gp: e.target.value.split("-")[2],
              });
            }}
            aria-label="Default select example"
          >
            <option value="">Select School Name</option>
            {schoolState.map((el) => {
              return (
                <option
                  key={el.id}
                  value={el.school + "-" + el.udise + "-" + el.gp}
                >
                  {el.school}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-3 col-md-3">
          <label className="form-label">UDISE</label>
          <input
            type="text"
            className="form-control"
            id="udise"
            name="udise"
            placeholder="DISE CODE"
            value={inputField?.udise}
            onChange={(e) => {
              setinputField({
                ...inputField,
                udise: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-3 col-md-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="tname"
            name="tname"
            placeholder="Full Name"
            value={inputField?.tname}
            onChange={(e) => {
              setinputField({
                ...inputField,
                tname: e.target.value,
              });
            }}
          />
        </div>
        {/* <div className="mb-0 col-md-3">
          <label className="form-label">Teacher's Search Name</label>
          <input
            type="text"
            className="form-control"
            id="tsname"
            name=""
            placeholder="Full Name"
            value={inputField?.tsname}
            onChange={(e) => {
              setinputField({
                ...inputField,
                tsname: e.target.value,
              });
            }}
          />
        </div> */}
        <div className="mb-3 col-md-3">
          <label className="form-label">Father's Name</label>
          <input
            type="text"
            className="form-control"
            id="fname"
            name="fname"
            placeholder="Father's Name"
            value={inputField?.fname}
            onChange={(e) => {
              setinputField({
                ...inputField,
                fname: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-0 col-md-3">
          <label className="form-label">All Teacher's Of the School</label>
          <br />
          <select
            className="form-select form-select-sm mb-3"
            aria-label=".form-select-lg example"
          >
            {filteredTeachers.map((el, ind) => (
              <option key={ind} value={el.tname}>
                {el.tname}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-0 col-md-3">
          <label className="form-label">Is Physically Chalanged ?</label>
          <br />
          <select
            className="form-select form-select-sm mb-3"
            aria-label=".form-select-lg example"
            name="disability"
            id="disability"
            value={inputField?.disability}
            onChange={(e) => {
              setinputField({
                ...inputField,
                disability: e.target.value,
              });
            }}
          >
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
        </div>
        <div className="mb-0 col-md-3">
          <label className="form-label">Designation</label>
          <br />
          <select
            className="form-select form-select-sm mb-3"
            aria-label=".form-select-lg example"
            name="desig"
            id="desig"
            value={inputField?.desig}
            onChange={(e) => {
              setinputField({
                ...inputField,
                desig: e.target.value,
              });
            }}
          >
            <option value="HT">HT</option>
            <option value="AT">AT</option>
          </select>
        </div>
        <div className="mb-0 col-md-3">
          <label className="form-label">Gender</label>
          <br />
          <select
            className="form-select form-select-sm mb-3"
            aria-label=".form-select-lg example"
            name="gender"
            id="gender"
            value={inputField?.gender}
            onChange={(e) => {
              setinputField({
                ...inputField,
                gender: e.target.value,
              });
            }}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="mb-3 col-md-3">
          <label className="form-label">Is HOI?</label>
          <select
            className="form-select form-select-sm"
            name="hoi"
            id="hoi"
            aria-label=".form-select-sm example"
            value={inputField?.hoi}
            onChange={(e) => {
              setinputField({
                ...inputField,
                hoi: e.target.value,
              });
            }}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="mb-3 col-md-3">
          <label className="form-label">Teacher Rank</label>
          <br />
          <select
            className="form-select form-select-sm"
            name="rank"
            id="rank"
            aria-label=".form-select-sm example"
            defaultValue={inputField?.rank}
            onChange={(e) => {
              setinputField({
                ...inputField,
                rank: parseInt(e.target.value),
              });
            }}
          >
            <option value="">Select Teacher Rank</option>
            {filteredTeachers.map((teacher, ind) => (
              <option key={ind} value={teacher.rank}>
                {teacher.rank}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-0 col-md-3">
          <label className="form-label">User Access Type</label>
          <br />
          <select
            className="form-select form-select-sm mb-3"
            aria-label=".form-select-lg example"
            name="circle"
            id="circle"
            value={inputField?.circle}
            onChange={(e) => {
              setinputField({
                ...inputField,
                circle: e.target.value,
              });
            }}
          >
            <option value="taw">taw</option>
            <option value="admin">admin</option>
          </select>
        </div>
        <div className="mb-0 col-md-3">
          <label className="form-label">Show Account</label>
          <br />
          <select
            className="form-select form-select-sm mb-3"
            aria-label=".form-select-lg example"
            name="circle"
            id="circle"
            value={inputField?.showAccount}
            onChange={(e) => {
              if (e.target.value !== "") {
                setinputField({
                  ...inputField,
                  showAccount: Boolean(e.target.value),
                });
              } else {
                setinputField({
                  ...inputField,
                  showAccount: false,
                });
              }
            }}
          >
            <option value="">Select Account Visibility</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <div className="mb-0 col-md-3">
          <label className="form-label">Is Registered</label>
          <br />
          <select
            className="form-select form-select-sm mb-3"
            aria-label=".form-select-lg example"
            name="registered"
            id="registered"
            value={inputField?.registered}
            onChange={(e) => {
              if (e.target.value !== "") {
                setinputField({
                  ...inputField,
                  registered: Boolean(e.target.value),
                });
              } else {
                setinputField({
                  ...inputField,
                  registered: false,
                });
              }
            }}
          >
            <option value="taw">Select Registration Status</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <div className="mb-0 col-md-3">
          <label className="form-label">Question Access Type</label>
          <br />
          <select
            className="form-select form-select-sm mb-3"
            aria-label=".form-select-lg example"
            name="question"
            id="question"
            value={inputField?.question}
            onChange={(e) => {
              setinputField({
                ...inputField,
                question: e.target.value,
              });
            }}
          >
            <option value="taw">taw</option>
            <option value="admin">admin</option>
          </select>
        </div>
        <div className="mb-0 col-md-3">
          <label className="form-label">GRAM PANCHAYET</label>
          <br />
          <select
            className="form-select form-select-sm mb-3"
            aria-label=".form-select-lg example"
            name="gp"
            id="gp"
            value={inputField?.gp}
            onChange={(e) => {
              setinputField({
                ...inputField,
                gp: e.target.value,
              });
            }}
          >
            <option value="AMORAGORI">AMORAGORI</option>
            <option value="BKBATI">BKBATI</option>
            <option value="GAZIPUR">GAZIPUR</option>
            <option value="JHAMTIA">JHAMTIA</option>
            <option value="JHIKIRA">JHIKIRA</option>
            <option value="JOYPUR">JOYPUR</option>
            <option value="NOWPARA">NOWPARA</option>
            <option value="THALIA">THALIA</option>
          </select>
        </div>

        <div className="mb-3 col-md-3">
          <label className="form-label">Association</label>

          <select
            className="form-select form-select-sm mb-3"
            aria-label=".form-select-sm example"
            name="association"
            id="association"
            placeholder="Association"
            value={inputField?.association}
            onChange={(e) => {
              setinputField({
                ...inputField,
                association: e.target.value,
              });
            }}
          >
            <option value="">Select Association</option>
            <option value="WBTPTA">WBTPTA</option>
            <option value="NOT WBTPTA">NOT WBTPTA</option>
            <option value="ABPTA">ABPTA</option>
            <option value="WBPTA">WBPTA</option>
            <option value="BJP">BJP</option>
          </select>
        </div>
        <div className="mb-3 col-md-3">
          <label className="form-label">Mobile No.</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            placeholder="Mobile No."
            value={inputField?.phone}
            onChange={(e) => {
              setinputField({
                ...inputField,
                phone: e.target.value,
              });
            }}
          />
        </div>

        <div className="mb-3 col-md-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="Email"
            name="email"
            placeholder="Email"
            value={inputField?.email}
            onChange={(e) => {
              setinputField({
                ...inputField,
                email: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-3 col-md-3">
          <label className="form-label">Date Of Birth:</label>

          <input
            type="date"
            className="form-control"
            id="dob"
            name="dob"
            value={getCurrentDateInput(inputField?.dob)}
            onChange={(e) => {
              setinputField({
                ...inputField,
                dob: getSubmitDateInput(e.target.value),
              });
            }}
            required
          />
        </div>
        <div className="mb-3 col-md-3">
          <label className="form-label">Date Of Joining:</label>

          <input
            type="date"
            className="form-control"
            id="doj"
            name="doj"
            value={getCurrentDateInput(inputField?.doj)}
            onChange={(e) => {
              setinputField({
                ...inputField,
                doj: getSubmitDateInput(e.target.value),
              });
            }}
            required
          />
        </div>
        <div className="mb-3 col-md-3">
          <label className="form-label">
            Date Of Joining in Current School:
          </label>

          <input
            type="date"
            className="form-control"
            id="dojnow"
            name="dojnow"
            value={getCurrentDateInput(inputField?.dojnow)}
            onChange={(e) => {
              setinputField({
                ...inputField,
                dojnow: getSubmitDateInput(e.target.value),
              });
            }}
            required
          />
        </div>
        <div className="mb-3 col-md-3">
          <label className="form-label">Date Of Retirement:</label>

          <input
            type="date"
            className="form-control"
            id="dor"
            name="dor"
            value={getCurrentDateInput(inputField?.dor)}
            onChange={(e) => {
              setinputField({
                ...inputField,
                dor: getSubmitDateInput(e.target.value),
              });
            }}
            required
          />
        </div>
        <div className="mb-3 col-md-3">
          <label className="form-label">Bank Name</label>
          <input
            type="text"
            className="form-control"
            id="bank"
            name="bank"
            placeholder="Bank"
            value={inputField?.bank}
            onChange={(e) => {
              setinputField({
                ...inputField,
                bank: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-3 col-md-3">
          <label className="form-label">Salary Account No.</label>
          <input
            type="text"
            className="form-control"
            id="account"
            name="account"
            placeholder="Salary Account No."
            value={inputField?.account}
            onChange={(e) => {
              setinputField({
                ...inputField,
                account: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-3 col-md-3">
          <label className="form-label">IFSC CODE</label>
          <input
            type="text"
            className="form-control"
            id="ifsc_inp"
            name="ifsc"
            placeholder="IFSC CODE"
            value={inputField?.ifsc}
            onChange={(e) => {
              setinputField({
                ...inputField,
                ifsc: e.target.value,
              });
            }}
          />
        </div>
        <div
          className="mb-3 col-md-3 text-primary text-center"
          id="bankdiv"
          style={{ fontSize: "13px" }}
        ></div>
        <div className="mb-3 col-md-3">
          <label className="form-label">Employee ID</label>
          <input
            type="text"
            className="form-control"
            id="empid"
            name="empid"
            placeholder="Employee ID"
            value={inputField?.empid}
            onChange={(e) => {
              setinputField({
                ...inputField,
                empid: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-0 col-md-3">
          <label className="form-label">Training</label>
          <br />
          <select
            className="form-select form-select-sm mb-3"
            aria-label=".form-select-lg example"
            name="training"
            id="training"
            value={inputField?.training}
            onChange={(e) => {
              setinputField({
                ...inputField,
                training: e.target.value,
              });
            }}
          >
            <option value="D. EL. ED.">D. EL. ED.</option>
            <option value="ONGOING D. EL. ED.">ONGOING D. EL. ED.</option>
            <option value="B. ED.">B. ED.</option>
            <option value="NON TRAINED">NON TRAINED</option>
          </select>
        </div>
        <div className="mb-3 col-md-3">
          <label className="form-label">PAN No.</label>
          <input
            type="text"
            className="form-control"
            id="pan"
            name="pan"
            placeholder="PAN No."
            value={inputField?.pan}
            onChange={(e) => {
              setinputField({
                ...inputField,
                pan: e.target.value,
              });
            }}
          />
        </div>

        <div className="mb-3 col-md-3">
          <label className="form-label">Address:</label>
          <textarea
            name="address"
            id="address"
            cols="5"
            rows="3"
            className="form-control"
            placeholder="Address"
            style={{ resize: "none" }}
            value={inputField?.address}
            onChange={(e) => {
              setinputField({
                ...inputField,
                address: e.target.value,
              });
            }}
          ></textarea>
        </div>
        <div className="mb-3 col-md-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={updateData}
            disabled={compareObjects(stateObject, inputField)}
          >
            Update
          </button>
          <button
            type="button"
            className="btn btn-secondary mx-2"
            onClick={() => router.push("/teacherdatabase")}
          >
            Back
          </button>
        </div>
      </div>
      {loader && <Loader />}
    </div>
  );
};

export default EditTeacher;
