"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { firestore, useFirebase } from "../context/FirebaseContext";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../context/FirebaseContext";
import bcrypt from "bcryptjs";
import Loader from "./Loader";
import ImageCropper from "./ImageCropper";
import { useRouter } from "next/navigation";

// Define types
type TeacherData = {
  id: string;
  email: string;
  tname: string;
  school: string;
  udise: string;
  desig: string;
  circle: string;
  empid: string;
  pan: string;
  question: string;
  phone: string;
};

type InputField = {
  teachersID: string;
  id: string;
  username: string;
  email: string;
  tname: string;
  school: string;
  udise: string;
  desig: string;
  circle: string;
  empid: string;
  pan: string;
  createdAt: number;
  question: string;
  phone: string;
  password: string;
  cpassword: string;
};

type ErrField = {
  usernameErr: string;
  emailErr: string;
  phoneErr: string;
  passwordErr: string;
  cpasswordErr: string;
  profilePhotoErr: string;
};

interface RegistrationProps {
  data: TeacherData;
  setSignUpTrue: () => void;
}

const Registration: React.FC<RegistrationProps> = ({ data, setSignUpTrue }) => {
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Register Now";
  }, []);

  const firebase = useFirebase();
  const router = useRouter();
  const docId = data.id;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State variables
  const [displayLoader, setDisplayLoader] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [src, setSrc] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
  const [croppedPreview, setCroppedPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [inputField, setInputField] = useState<InputField>({
    teachersID: data.id,
    id: docId,
    username: "",
    email: data.email,
    tname: data.tname,
    school: data.school,
    udise: data.udise,
    desig: data.desig,
    circle: data.circle,
    empid: data.empid,
    pan: data.pan,
    createdAt: Date.now(),
    question: data.question,
    phone: data.phone,
    password: "",
    cpassword: "",
  });

  const [errField, setErrField] = useState<ErrField>({
    usernameErr: "",
    emailErr: "",
    phoneErr: "",
    passwordErr: "",
    cpasswordErr: "",
    profilePhotoErr: "",
  });

  // Handle input changes
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputField({
      ...inputField,
      [e.target.name]: removeSpaces(e.target.value),
    });
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type.startsWith("image/")) {
        setFile(selectedFile);
        setSrc(URL.createObjectURL(selectedFile));
        setCroppedImage(null);
        setCroppedPreview(null);
      } else {
        toast.error("Please select an image file.");
      }
    }
  };

  // Handle cropped image from ImageCropper
  const handleCroppedImage = useCallback((blob: Blob) => {
    setCroppedImage(blob);
    setCroppedPreview(URL.createObjectURL(blob));
  }, []);

  // Handle cancel cropping
  const handleCancelCrop = useCallback(() => {
    setSrc(null);
    setFile(null);
    setCroppedImage(null);
    setCroppedPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  // Reset cropping and file input
  const resetCropping = useCallback(() => {
    setCroppedPreview(null);
    setCroppedImage(null);
    setSrc(null);
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  // Handle registration submission
  const submitBtn = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (validForm()) {
      try {
        const username = inputField.username.replace(/\s/g, "").toLowerCase();
        setDisplayLoader(true);
        const collectionRef = collection(firestore, "userteachers");
        const q = query(collectionRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length > 0) {
          toast.error(
            `Dear ${inputField.tname}, User ID Already Taken,Choose Another One.`
          );
          setTimeout(() => {
            setInputField({ ...inputField, username: "" });
          }, 2000);
        } else if (croppedImage) {
          const url = `/api/signup`;
          const response = await axios.post(url, {
            ...inputField,
            username,
            password: bcrypt.hashSync(inputField.password, 10),
          });

          if (response.status === 200) {
            const filestorageRef = ref(
              storage,
              `/profileImage/${inputField.teachersID}-${file?.name}`
            );
            const uploadTask = uploadBytesResumable(
              filestorageRef,
              croppedImage
            );

            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const percent = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(percent);
              },
              (err) => console.log(err),
              async () => {
                const photourl = await getDownloadURL(uploadTask.snapshot.ref);
                try {
                  await setDoc(doc(firestore, "userteachers", docId), {
                    ...inputField,
                    photoName: inputField.teachersID + "-" + file?.name,
                    url: photourl,
                    username: username,
                    password: bcrypt.hashSync(inputField.password, 10),
                    disabled: false,
                  });

                  await setDoc(doc(firestore, "profileImage", docId), {
                    title: inputField.tname,
                    description: inputField.school,
                    fileName: inputField.teachersID + "-" + file?.name,
                    url: photourl,
                    id: docId,
                  });

                  const docRef = doc(
                    firestore,
                    "teachers",
                    inputField.teachersID
                  );
                  await updateDoc(docRef, { registered: true });

                  try {
                    (firebase as any)?.signupUserWithEmailAndPass(
                      inputField.email,
                      inputField.password
                    );
                  } catch (e) {
                    console.log(e);
                  }

                  setDisplayLoader(false);
                  toast.success(
                    `Congratulation ${inputField.tname} You are Successfully Registered!`
                  );
                  setTimeout(() => router.push("/login"), 1500);
                } catch (e) {
                  toast.error("File Upload Failed!");
                  console.log(e);
                }
              }
            );
          }
        }
      } catch (e) {
        console.log(e);
        setDisplayLoader(false);
        toast.error("Registration Failed");
      }
    } else {
      toast.error("Form Is Invalid");
    }
  };

  // Form validation
  const validForm = (): boolean => {
    let formIsValid = true;
    const newErrors: ErrField = {
      usernameErr: "",
      emailErr: "",
      phoneErr: "",
      passwordErr: "",
      cpasswordErr: "",
      profilePhotoErr: "",
    };

    if (!inputField.username) {
      formIsValid = false;
      newErrors.usernameErr = "Please Enter Username";
    }
    if (!inputField.email || !validateEmail(inputField.email)) {
      formIsValid = false;
      newErrors.emailErr = "Please Enter Valid email";
    }
    if (!inputField.phone) {
      formIsValid = false;
      newErrors.phoneErr = "Please Enter Phone No.";
    }
    if (!inputField.password) {
      formIsValid = false;
      newErrors.passwordErr = "Please Enter Password";
    }
    if (inputField.password.length <= 5) {
      formIsValid = false;
      newErrors.passwordErr = "Password length must be minimum 6";
    }
    if (!inputField.cpassword || inputField.password !== inputField.cpassword) {
      formIsValid = false;
      newErrors.cpasswordErr = "Password and Confirm Password Are Not Same";
    }
    if (!croppedImage) {
      formIsValid = false;
      newErrors.profilePhotoErr = "Please upload and crop your profile picture";
    }

    setErrField(newErrors);
    return formIsValid;
  };

  // Email validation
  const validateEmail = (mail: string): boolean => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail);
  };

  // Remove spaces from string
  const removeSpaces = (inputString: string): string => {
    return inputString.replace(/\s/g, "");
  };

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (src) URL.revokeObjectURL(src);
      if (croppedPreview) URL.revokeObjectURL(croppedPreview);
    };
  }, [src, croppedPreview]);

  return (
    <div className="container my-5">
      <div className="row login text-black m-auto p-2">
        <h3 className="text-primary">
          HELLO {data.tname}, PLEASE COMPLETE YOUR REGISTRATION
        </h3>
        <br />

        {displayLoader && <Loader />}
        <form autoComplete="off" method="post" className="m-auto">
          <div className="col-md-6 m-auto">
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                User Name
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                className="form-control"
                value={inputField.username}
                onChange={(e) =>
                  setInputField({
                    ...inputField,
                    username: e.target.value.replace(/[^\w\s]/g, ""),
                  })
                }
              />
              {errField.usernameErr && (
                <span className="error">{errField.usernameErr}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="form-control"
                value={inputField.email}
                onChange={inputHandler}
              />
              {errField.emailErr && (
                <span className="error">{errField.emailErr}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Enter Mobile Number"
                className="form-control"
                value={inputField.phone}
                onChange={inputHandler}
              />
              {errField.phoneErr && (
                <span className="error">{errField.phoneErr}</span>
              )}
            </div>
            <div className="mb-3">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="password"
                placeholder="Enter Password"
                value={inputField.password}
                onChange={(e) =>
                  setInputField({ ...inputField, password: e.target.value })
                }
              />
              <button
                type="button"
                className="btn btn-warning btn-sm mt-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide Password" : "Show Password"}
              </button>
              <br />
              {errField.passwordErr && (
                <span className="error">{errField.passwordErr}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="cpassword"
                placeholder="Confirm Password"
                value={inputField.cpassword}
                onChange={(e) =>
                  setInputField({
                    ...inputField,
                    cpassword: e.target.value,
                  })
                }
              />
              {errField.cpasswordErr && (
                <span className="error">{errField.cpasswordErr}</span>
              )}
            </div>
          </div>
          <div className="mb-3">
            <div className="col-md-6 m-auto">
              <label htmlFor="" className="form-label">
                Press Choose File, Select Your Image File And Select Crop Area
                before pressing crop on Image As Shown in Picture
              </label>
              {!file && (
                <img
                  src="https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/Crop.gif"
                  alt="select"
                  className="mb-3 mx-auto w-25 img-fluid"
                  style={{
                    width: "25%",
                  }}
                />
              )}
              <input
                type="file"
                id="file-upload"
                className="form-control"
                placeholder="Upload Document"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              {errField.profilePhotoErr && (
                <span className="error">{errField.profilePhotoErr}</span>
              )}
            </div>

            {src && !croppedPreview && (
              <ImageCropper
                src={src}
                onCropComplete={handleCroppedImage}
                onCancel={handleCancelCrop}
              />
            )}

            {croppedPreview && (
              <div className="col-md-6 text-center m-auto">
                <p className="fw-bold">Profile Preview:</p>
                <img
                  src={croppedPreview}
                  alt="profilePhoto"
                  className="img-fluid rounded border p-1"
                  style={{ maxHeight: "200px" }}
                />
                <button
                  type="button"
                  className="btn btn-warning btn-sm m-2"
                  onClick={resetCropping}
                >
                  Re-crop Image
                </button>
              </div>
            )}
          </div>
          <div
            className="progress-bar"
            style={{
              width: progress + "%",
              height: "15px",
              backgroundColor: "purple",
              borderRadius: "10px",
              transformOrigin: "start",
            }}
          ></div>
          <div>
            {croppedPreview && (
              <button
                type="button"
                className="btn btn-primary m-1"
                onClick={submitBtn}
              >
                Register <i className="bi bi-box-arrow-in-right"></i>
              </button>
            )}

            <button
              className="btn btn-danger m-1 px-4"
              onClick={() => setSignUpTrue()}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
