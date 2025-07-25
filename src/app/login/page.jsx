"use client";
import React, { useState, useContext, useEffect } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { firestore, firebaseAuth } from "../../context/FirebaseContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import bcrypt from "bcryptjs";
import Loader from "../../components/Loader";
import {
  decryptAuthCookie,
  decryptObjData,
  encryptObjData,
  getCookie,
  setCookie,
} from "../../modules/encryption";
import Link from "next/link";
import CustomInput from "../../components/CustomInput";
const page = () => {
  const router = useRouter();
  const { state, setState, setUSER } = useGlobalContext();
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const CheckAuth = process.env.NEXT_PUBLIC_AUTHKEY;
  const [inputField, setInputField] = useState({
    username: "",
    password: "",
  });
  const [errField, setErrField] = useState({
    usernameErr: "",
    passwordErr: "",
  });
  const inputHandler = (e) => {
    // console.log(e.target.name, "==", e.target.value);
    setInputField({ ...inputField, [e.target.name]: e.target.value });
    // console.log(inputField);
  };

  const validForm = () => {
    let formIsValid = true;
    setErrField({
      usernameErr: "",
      passwordErr: "",
    });
    if (inputField.username === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        usernameErr: "Please Enter Valid username",
      }));
    }
    if (inputField.password === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        passwordErr: "Please Enter Password",
      }));
    }

    return formIsValid;
  };
  const compare = (userPassword, serverPassword) => {
    let match = bcrypt.compareSync(userPassword, serverPassword);

    return match;
  };
  const signInUser = (email, password) => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((res) => console.log("Log In Successfull"))
      .catch((e) => console.log(e));
  };
  const submitBtn = async (e) => {
    e.preventDefault();
    // console.log(inputField);
    if (validForm()) {
      setLoader(true);
      try {
        const username = inputField.username.replace(/\s/g, "").toLowerCase();
        const collectionRef = collection(firestore, "userteachers");
        const q = query(collectionRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot.docs[0].data().pan);
        if (querySnapshot.docs.length > 0) {
          const userData = querySnapshot.docs[0].data();

          if (compare(inputField.password, userData.password)) {
            if (!userData.disabled) {
              setLoader(false);
              toast.success("Congrats! You are Logined Successfully!");
              signInUser(userData.email, inputField.password);
              const collectionRef2 = collection(firestore, "teachers");
              const q2 = query(
                collectionRef2,
                where("pan", "==", userData.pan)
              );
              const querySnapshot2 = await getDocs(q2);
              const teacherData = querySnapshot2.docs[0].data();
              setState(teacherData.circle);
              setUSER(userData);
              encryptObjData("uid", userData, 10080);
              encryptObjData("tid", teacherData, 10080);
              encryptObjData("CheckAuth", CheckAuth, 10080);
              setCookie("t", teacherData.tname, 10080);
              setCookie("loggedAt", Date.now(), 10080);
              router.push("/dashboard");
            } else {
              setLoader(false);
              toast.error("Your Account is Disabled!");
            }
          } else {
            setLoader(false);
            toast.error("Wrong Password!");
          }
        } else {
          setLoader(false);
          toast.error("Invalid Username!");
        }
      } catch (error) {
        console.log(error);

        const url = `/api/login`;
        const username = inputField.username.replace(/\s/g, "").toLowerCase();
        inputField.username = username;
        const response = await axios.post(url, inputField);
        const record = response.data;
        const userData = record.data;
        if (record.success) {
          if (compare(inputField.password, userData.password)) {
            if (!userData.disabled) {
              setLoader(false);
              toast.success("Congrats! You are Logined Successfully!");

              const url2 = `/api/getTeacher`;
              const response2 = await axios.post(url2, { pan: userData.pan });
              const record2 = response2.data;
              const teacherData = record2.data;
              if (record2.success) {
                setState(teacherData.circle);
                setUSER(teacherData);
                encryptObjData("uid", userData, 10080);
                encryptObjData("tid", teacherData, 10080);
                encryptObjData("CheckAuth", CheckAuth, 10080);
                setCookie("t", teacherData.tname, 10080);
                setCookie("loggedAt", Date.now(), 10080);
                router.push("/dashboard");
              } else {
                setLoader(false);
                toast.error("Invalid Username or Password!");
              }
            } else {
              setLoader(false);
              toast.error("Your Account is Disabled!", {
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
            setLoader(false);
            toast.error("Wrong Password!", {
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
          setLoader(false);
          toast.error("Invalid Username!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,

            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
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

  const addUser = () => {
    router.push("/signup");
  };
  function removeSpaces(inputString) {
    // Use a regular expression to match all spaces (whitespace characters) and replace them with an empty string
    return inputString.replace(/\s/g, "");
  }

  const processSignIn = () => {
    const isCookies = getCookie("t");
    if (isCookies) {
      const userData = decryptObjData("uid");
      const teacherData = decryptObjData("tid");
      const access = teacherData?.circle;
      setUSER(userData);
      setState(access);
      router.push("/dashboard");
    } else {
      console.log("No Cookie");
    }
  };
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Login Page";
    processSignIn();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container text-black p-2 ">
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
      <div className="row mx-auto col-md-6 login p-2">
        <h3 className="heading text-center">User Login</h3>
        <br />

        <form
          autoComplete="off"
          method="post"
          className="mx-auto text-center"
          onSubmit={submitBtn}
        >
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter Username"
              className="form-control"
              value={inputField.username}
              onChange={(e) =>
                setInputField({
                  ...inputField,
                  username: removeSpaces(e.target.value),
                })
              }
            />
            {errField.usernameErr.length > 0 && (
              <span className="error">{errField.usernameErr}</span>
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
            <Link style={{ textDecoration: "none" }} href={"/forgotPassword"}>
              Forgot Username or Password?
            </Link>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-primary m-1"
              onClick={submitBtn}
            >
              Login <i className="bi bi-box-arrow-in-left"></i>
            </button>
            <button
              type="button"
              id="addUserBtn"
              className="btn btn-success m-1"
              onClick={addUser}
            >
              Register Now <i className="bi bi-person-add"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
