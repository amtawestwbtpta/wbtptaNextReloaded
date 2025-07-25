"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";
import "react-toastify/dist/ReactToastify.css";
import { firestore } from "../context/FirebaseContext";
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import Loader from "./Loader";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CustomInput from "./CustomInput";
const PasswordForm = (props) => {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [inputField, setInputField] = useState({
    otpCode: "",
    password: "",
    cpassword: "",
  });
  const [errField, setErrField] = useState({
    otpCodeErr: "",
    passwordErr: "",
    cpasswordErr: "",
  });
  const inputHandler = (e) => {
    // console.log(e.target.name, "==", e.target.value);
    setInputField({ ...inputField, [e.target.name]: e.target.value });
    // console.log(inputField);
  };
  document.title = "WBTPTA AMTA WEST:Forgot Password";
  const validForm = () => {
    let formIsValid = true;
    // const validEmailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    setErrField({
      otpCodeErr: "",
      passwordErr: "",
      cpasswordErr: "",
    });
    if (inputField.otpCode === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        otpCodeErr: "Please Enter OTP",
      }));
    }
    if (inputField.password === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        passwordErr: "Please Enter Password",
      }));
    }

    if (
      inputField.cpassword === "" ||
      inputField.password !== inputField.cpassword
    ) {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        cpasswordErr: "Password and Confirm Password Are Not Same",
      }));
    }

    return formIsValid;
  };

  const submitBtn = async (e) => {
    e.preventDefault();
    // console.log(inputField);
    if (validForm()) {
      Object.assign(inputField, props);

      try {
        setLoader(true);
        // let response = await axios(url, options);
        let response = await axios.post("/api/verifyotp", {
          code: inputField.otpCode,
          email: inputField.email,
          password: bcrypt.hashSync(inputField.password, 10),
        });
        const record = response.data;
        if (record.success) {
          const q = query(
            collection(firestore, "userteachers"),
            where("email", "==", inputField.email)
          );
          const querySnapshot = await getDocs(q);
          // console.log(querySnapshot.docs[0].data().id);
          let id = querySnapshot.docs[0].data().id;
          const docRef = doc(firestore, "userteachers", id);
          await updateDoc(docRef, {
            password: bcrypt.hashSync(inputField.password, 10),
          });

          setLoader(false);
          toast.success("Congrats! You are Password Reset is Successfull!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,

            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setTimeout(() => {
            router.push("/logout");
          }, 1500);
        } else {
          setLoader(false);
          toast.error(record.message, {
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
        setLoader(false);
        toast.error(e, {
          position: "top-right",
          autoClose: 1500,
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
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="container p-2">
      {loader ? <Loader /> : null}
      <div className="row m-auto login p-2">
        <form autoComplete="off" method="post">
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              OTP Code
            </label>
            <input
              type="text"
              name="otpCode"
              id="otpCode"
              className="form-control"
              value={inputField.otpCode}
              onChange={inputHandler}
              maxLength={6}
              placeholder="Enter Your 6-digit OTP"
              autoComplete="off"
            />
            {errField.otpCodeErr.length > 0 && (
              <span className="error">{errField.otpErr}</span>
            )}
          </div>
          <div className="mb-3">
            <CustomInput
              title={"Password"}
              type={"password"}
              placeholder={"Enter Password"}
              value={inputField.password}
              onChange={(e) => {
                setInputField({
                  ...inputField,
                  password: e.target.value,
                });
              }}
            />
            {errField.passwordErr.length > 0 && (
              <span className="error">{errField.passwordErr}</span>
            )}
          </div>

          <div className="mb-3">
            <CustomInput
              title={"Confirm Password"}
              type={"password"}
              placeholder={"Enter Confirm Password"}
              value={inputField.cpassword}
              onChange={(e) => {
                setInputField({
                  ...inputField,
                  cpassword: e.target.value,
                });
              }}
            />

            {errField.cpasswordErr.length > 0 && (
              <span className="error">{errField.cpasswordErr}</span>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-primary m-1"
              onClick={submitBtn}
            >
              Submit <i className="bi bi-box-arrow-in-left"></i>
            </button>
            <Link href="/login">
              <button className="btn btn-danger m-1 px-4">Back</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordForm;
