"use client";
import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";

import Link from "next/link";
import Registration from "./Registration";
import { firestore } from "../context/FirebaseContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const [showSignupForm, setShowSignupForm] = useState(true);
  const [data, setData] = useState({});

  const [inputField, setInputField] = useState({
    empid: "",
  });
  const [errField, setErrField] = useState({
    empidErr: "",
  });
  const inputHandler = (e) => {
    // console.log(e.target.name, "==", e.target.value);
    setInputField({
      ...inputField,
      [e.target.name]: e.target.value.toUpperCase(),
    });
    // console.log(inputField);
  };
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Sign Up";
  }, [inputField]);
  const submitBtn = async (e) => {
    e.preventDefault();
    // console.log(inputField);
    if (validForm()) {
      try {
        const collectionRef = collection(firestore, "userteachers");
        const q = query(
          collectionRef,
          where("empid", "==", inputField.empid.toUpperCase())
        );
        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot.docs[0].data().pan);
        if (querySnapshot.docs.length > 0) {
          let fdata = querySnapshot.docs[0].data();
          toast.error(
            `Dear ${fdata.tname}, ${fdata.desig} OF ${fdata.school}! You are Already Registered,Please Log In.`,
            {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,

              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } else {
          const collectionRef2 = collection(firestore, "teachers");
          const q = query(
            collectionRef2,
            where("empid", "==", inputField.empid.toUpperCase())
          );
          const querySnapshot = await getDocs(q);
          // console.log(querySnapshot.docs[0].data());
          if (querySnapshot.docs.length > 0) {
            setData(querySnapshot.docs[0].data());
            let fdata2 = querySnapshot.docs[0].data();
            if (fdata2.association === "WBTPTA") {
              toast.success(
                `Congrats! ${fdata2.tname}, ${fdata2.desig} OF ${fdata2.school}! Please Review And Register Yourself.`,
                {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,

                  draggable: true,
                  progress: undefined,
                  theme: "light",
                }
              );
              setShowSignupForm(false);
            } else {
              toast.error(
                "Only WBTPTA Members Are Allowed, Join Us Today To get All Advatage.",
                {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,

                  draggable: true,
                  progress: undefined,
                  theme: "light",
                }
              );
            }
          } else {
            toast.error("EMPID Not Found.", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,

              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
      } catch (e) {
        toast.error("Something Went Wrong.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,

          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      toast.error("Form Is Invalid", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const validForm = () => {
    let formIsValid = true;
    setErrField({
      empidErr: "",
    });
    if (inputField.empid === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        empidErr: "Please Enter Employee ID",
      }));
    }
    return formIsValid;
  };
  const setSignUpTrue = () => {
    setInputField({ ...inputField, empid: "" });
    setShowSignupForm(true);
  };
  return (
    <div className="container text-black p-2">
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

      {showSignupForm ? (
        <div className="row login m-auto col-md-6 p-2">
          <h3 className="heading">Add Registration</h3>
          <br />
          <form autoComplete="off" onSubmit={submitBtn}>
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Enter Employee ID
              </label>
              <input
                type="text"
                name="empid"
                placeholder="Enter Employee ID"
                className="form-control"
                value={inputField.empid}
                onChange={inputHandler}
                maxLength={10}
              />
              {errField.empidErr.length > 0 && (
                <span className="error">{errField.empidErr}</span>
              )}
            </div>
          </form>
          <div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={submitBtn}
            >
              Check
            </button>
            <Link href="/login">
              <button className="btn btn-danger m-1 px-4">Back</button>
            </Link>
          </div>
        </div>
      ) : (
        <Registration data={data} setSignUpTrue={setSignUpTrue} />
      )}
    </div>
  );
};

export default SignUp;
