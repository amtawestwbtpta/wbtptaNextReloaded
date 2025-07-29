"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";

import { toast } from "react-toastify";
import { firestore } from "../../context/FirebaseContext";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  doc,
  setDoc,
  where,
} from "firebase/firestore";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectCube,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-cube";

import { v4 as uuid } from "uuid";
import Loader from "../../components/Loader";
import { BsClipboard, BsClipboard2Check } from "react-icons/bs";
import { compareObjects } from "../../modules/calculatefunctions";
import { decryptObjData, getCookie } from "../../modules/encryption";
import { useRouter } from "next/navigation";
const QuestionRequisition = () => {
  const {
    questionState,
    setQuestionState,
    questionUpdateTime,
    setQuestionUpdateTime,
    questionRateState,
    setQuestionRateState,
    schoolState,
    setStateObject,
    questionRateUpdateTime,
    setQuestionRateUpdateTime,
  } = useGlobalContext();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const [docId, setDocId] = useState(uuid().split("-")[0]);
  const [serial, setSerial] = useState(0);
  const [loader, setLoader] = useState(false);
  const [isAccepting, setIsAccepting] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState("");
  const [udise, setUdise] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showErrorText, setShowErrorText] = useState(false);
  const [schData, setSchData] = useState([]);
  const [enteryDone, setEnteryDone] = useState(false);
  const [addInputField, setAddInputField] = useState({
    id: docId,
    sl: serial,
    school: "",
    gp: "",
    udise: "",
    cl_pp_student: 0,
    cl_1_student: 0,
    cl_2_student: 0,
    cl_3_student: 0,
    cl_4_student: 0,
    cl_5_student: 0,
    payment: "Due",
    paid: 0,
    total_student: 0,
    total_rate: 0,
  });
  const [inputField, setInputField] = useState({
    id: docId,
    sl: serial,
    school: "",
    gp: "",
    udise: "",
    cl_pp_student: 0,
    cl_1_student: 0,
    cl_2_student: 0,
    cl_3_student: 0,
    cl_4_student: 0,
    cl_5_student: 0,
    payment: "Due",
    paid: 0,
    total_student: 0,
    total_rate: 0,
  });
  const [editInputField, setEditInputField] = useState({
    id: docId,
    sl: serial,
    school: "",
    gp: "",
    udise: "",
    cl_pp_student: 0,
    cl_1_student: 0,
    cl_2_student: 0,
    cl_3_student: 0,
    cl_4_student: 0,
    cl_5_student: 0,
    payment: "Due",
    paid: 0,
    total_student: 0,
    total_rate: 0,
  });

  const userData = async () => {
    setLoader(true);
    const q = query(collection(firestore, "questions"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs
      .map((doc) => ({
        // doc.data() is never undefined for query doc snapshots
        ...doc.data(),
        id: doc.id,
      }))
      .sort((a, b) => {
        // Compare by 'gp'
        if (a.gp < b.gp) {
          return -1; // a comes first
        }
        if (a.gp > b.gp) {
          return 1; // b comes first
        }

        // If 'gp' is the same, compare by 'school'
        if (a.school < b.school) {
          return -1; // a comes first
        }
        if (a.school > b.school) {
          return 1; // b comes first
        }

        return 0; // They are equal
      });
    setQuestionState(data);
    setQuestionUpdateTime(Date.now());
    setDocId(`questions${data.length + 101}-${uuid().split("-")[0]}`);
    setSerial(data.length + 1);
    const q2 = query(collection(firestore, "question_rate"));

    const querySnapshot2 = await getDocs(q2);
    const data2 = querySnapshot2.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    setQuestionRateState(data2[0]);

    setLoader(false);
  };

  const getQuestionData = async () => {
    const difference = (Date.now() - questionUpdateTime) / 1000 / 60 / 15;
    if (questionState.length === 0 || difference >= 1) {
      userData();
    } else {
      setLoader(true);
      const data = questionState;
      setDocId(`questions${data.length + 101}-${uuid().split("-")[0]}`);
      setSerial(data.length + 1);

      setLoader(false);
    }

    const questionRateDifference =
      (Date.now() - questionRateUpdateTime) / 1000 / 60 / 15;
    if (questionRateDifference >= 1 || questionRateState.length === 0) {
      getAcceptingData();
    } else {
      setIsAccepting(questionRateState.isAccepting);
    }
  };
  const addSchool = async () => {
    setLoader(true);
    const collectionRef = collection(firestore, "questions");
    const q = query(collectionRef, where("udise", "==", addInputField.udise));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length === 0) {
      try {
        await setDoc(doc(firestore, "questions", docId), addInputField)
          .then(() => {
            setSubmitted(true);
            const qState = [...questionState, addInputField].sort((a, b) => {
              // Compare by 'gp'
              if (a.gp < b.gp) {
                return -1; // a comes first
              }
              if (a.gp > b.gp) {
                return 1; // b comes first
              }

              // If 'gp' is the same, compare by 'school'
              if (a.school < b.school) {
                return -1; // a comes first
              }
              if (a.school > b.school) {
                return 1; // b comes first
              }

              return 0; // They are equal
            });
            setQuestionState(qState);
            setQuestionUpdateTime(Date.now());
            toast.success("School Successfully Added!!!");
            setDocId(`questions${qState.length + 101}-${uuid().split("-")[0]}`);
            setAddInputField({
              id: `questions${qState.length + 101}-${uuid().split("-")[0]}`,
              school: "",
              gp: "",
              udise: "",
              cl_pp_student: 0,
              cl_1_student: 0,
              cl_2_student: 0,
              cl_3_student: 0,
              cl_4_student: 0,
              cl_5_student: 0,
              payment: "Due",
              paid: 0,
              total_student: 0,
              total_rate: 0,
            });
            setLoader(false);
          })
          .catch((err) => {
            console.log(err);
            setLoader(false);
            toast.error("Something Went Wrong in Server!");
          });
      } catch (e) {
        setLoader(false);
        toast.error("Something Went Wrong in Server!");
      }
    } else {
      setLoader(false);
      toast.error("School Question Requisition Already Submitted!");
    }
  };

  const handleSelection = (e) => {
    let selectedData;
    if (e.target.value) {
      selectedData = JSON.parse(e.target.value);
      setAddInputField({
        ...addInputField,
        school: selectedData.school,
        udise: selectedData.udise,
        gp: selectedData.gp,
        id: docId,
        sl: serial,
        cl_pp_student: selectedData.pp,
        cl_1_student: selectedData.i,
        cl_2_student: selectedData.ii,
        cl_3_student: selectedData.iii,
        cl_4_student: selectedData.iv,
        cl_5_student: selectedData.v,
        total_student: selectedData.total_student,
        total_rate: Math.floor(
          selectedData.pp * questionRateState.pp_rate +
            selectedData.i * questionRateState.i_rate +
            selectedData.ii * questionRateState.ii_rate +
            selectedData.iii * questionRateState.iii_rate +
            selectedData.iv * questionRateState.iv_rate +
            selectedData.v * questionRateState.v_rate
        ),
        payment: "Due",
        paid: 0,
      });
      const findSch = questionState.filter(
        (sch) => sch.udise === selectedData.udise
      );
      if (findSch.length > 0) {
        setEnteryDone(true);
      } else {
        setEnteryDone(false);
      }
    } else {
      setAddInputField({
        id: docId,
        sl: serial,
        school: "",
        gp: "",
        udise: "",
        cl_pp_student: 0,
        cl_1_student: 0,
        cl_2_student: 0,
        cl_3_student: 0,
        cl_4_student: 0,
        cl_5_student: 0,
        payment: "Due",
        paid: 0,
        total_student: 0,
        total_rate: 0,
      });
    }
  };
  const updateData = async () => {
    try {
      const docRef = doc(firestore, "questions", inputField.id);
      await updateDoc(docRef, inputField)
        .then(() => {
          setQuestionState(
            questionState.map((el) => {
              if (el.id === inputField.id) {
                return inputField;
              }
              return el;
            })
          );
          setQuestionUpdateTime(Date.now());
          toast.success("Data Successfully Updated!!!");
          setToken("");
          setUdise("");
          setInputField({
            id: docId,
            sl: serial,
            school: "",
            gp: "",
            udise: "",
            cl_pp_student: 0,
            cl_1_student: 0,
            cl_2_student: 0,
            cl_3_student: 0,
            cl_4_student: 0,
            cl_5_student: 0,
            payment: "Due",
            paid: 0,
            total_student: 0,
            total_rate: 0,
          });
          setEditInputField({
            id: docId,
            sl: serial,
            school: "",
            gp: "",
            udise: "",
            cl_pp_student: 0,
            cl_1_student: 0,
            cl_2_student: 0,
            cl_3_student: 0,
            cl_4_student: 0,
            cl_5_student: 0,
            payment: "Due",
            paid: 0,
            total_student: 0,
            total_rate: 0,
          });
          setShowResult(false);
        })
        .catch((e) => {
          console.log(e);
          toast.error("Something Went Wrong in Server!");
        });
    } catch (e) {
      toast.error("Something Went Wrong in Server!");
    }
  };

  const getAcceptingData = async () => {
    const q = query(collection(firestore, "question_rate"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }))[0];
    setQuestionRateState(data);
    setQuestionRateUpdateTime(Date.now());
    setIsAccepting(data.isAccepting);
  };

  const settleQuestionData = () => {
    const tdata = decryptObjData("tid");
    if (tdata?.circle === "admin") {
      setSchData(schoolState);
    } else if (tdata?.circle !== "admin" && tdata?.question === "admin") {
      setSchData(schoolState.filter((school) => school.gp === tdata?.gp));
    } else {
      setSchData(schoolState.filter((school) => school.udise === tdata?.udise));
    }
  };

  useEffect(() => {
    // Set mounted to true on client side
    setMounted(true);

    // Client-side only operations
    document.title = "WBTPTA AMTA WEST:Question Requisition Section";
    const tid = getCookie("tid");

    if (!tid) {
      router.push("/logout");
    } else {
      settleQuestionData();
      getQuestionData();
      getAcceptingData();
    }
    // eslint-disable-next-line
  }, [router]); // Add dependencies as needed

  useEffect(() => {
    // eslint-disable-next-line
  }, [addInputField, inputField, schData]);
  // Return null during SSR
  if (!mounted) {
    return null;
  }
  return (
    <div className="container my-5 text-center">
      {loader ? <Loader /> : null}
      <div className="col-md-6 mx-auto">
        <Swiper
          modules={[
            Navigation,
            Pagination,
            Scrollbar,
            A11y,
            EffectCube,
            Autoplay,
          ]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          effect={"cube"}
          cubeEffect={{
            slideShadows: true,
            shadowOffset: 7,
            shadowScale: 0.74,
          }}
          // pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          {questionState.map((el, ind) => {
            return (
              <SwiperSlide key={ind}>
                <div
                  className="mb-5 bg-light p-2"
                  style={{
                    borderRadius: "20px",
                  }}
                >
                  <h6 className="text-success">{el.school}</h6>
                  <h6 className="text-primary">UDISE: {el.udise}</h6>
                  <h6 className="text-primary">GP: {el.gp}</h6>
                  <h6 className="text-primary">PP: {el.cl_pp_student}</h6>
                  <h6 className="text-primary">I: {el.cl_1_student}</h6>
                  <h6 className="text-primary">II: {el.cl_2_student}</h6>
                  <h6 className="text-primary">III: {el.cl_3_student}</h6>
                  <h6 className="text-primary">IV: {el.cl_4_student}</h6>
                  <h6 className="text-primary">V: {el.cl_5_student}</h6>
                  <h6 className="text-primary">
                    TOTAL STUDENT: {el.total_student}
                  </h6>
                  <h6 className="text-primary">
                    TOTAL ESTIMATED AMOUNT: ₹{el.total_rate}
                  </h6>
                  <h6 className="text-primary">PAYMENT STATUS: {el.paid}</h6>
                  <h6 className="text-primary">PAID AMOUNT: ₹{el.payment}</h6>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      {isAccepting ? (
        <>
          <div className="col-md-6 mx-auto mb-3">
            {/* Add School Button trigger modal */}
            <button
              type="button"
              className="btn btn-primary m-2"
              data-bs-toggle="modal"
              data-bs-target="#myModal3"
            >
              Enter School Requisition
            </button>
            {/* Button trigger modal */}
            <button
              type="button"
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Edit/ View/ Print Submitted Data
            </button>

            {/* <!-- Modal --> */}
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
                      Edit/ View/ Print Submitted Data
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={() => {
                        setToken("");
                        setUdise("");
                        setInputField({
                          id: docId,
                          sl: serial,
                          school: "",
                          gp: "",
                          udise: "",
                          cl_pp_student: 0,
                          cl_1_student: 0,
                          cl_2_student: 0,
                          cl_3_student: 0,
                          cl_4_student: 0,
                          cl_5_student: 0,
                          payment: "Due",
                          paid: 0,
                          total_student: 0,
                          total_rate: 0,
                        });
                        setEditInputField({
                          id: docId,
                          sl: serial,
                          school: "",
                          gp: "",
                          udise: "",
                          cl_pp_student: 0,
                          cl_1_student: 0,
                          cl_2_student: 0,
                          cl_3_student: 0,
                          cl_4_student: 0,
                          cl_5_student: 0,
                          payment: "Due",
                          paid: 0,
                          total_student: 0,
                          total_rate: 0,
                        });
                        setShowResult(false);
                        setShowErrorText(false);
                      }}
                    ></button>
                  </div>
                  <div className="modal-body">
                    {!showResult ? (
                      <div>
                        <form className="row" autoComplete="off">
                          <div className="mb-3 col-md-6  mx-auto">
                            <label className="form-label">
                              Enter Token Number:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="token"
                              name="token"
                              placeholder="Enter Token Number"
                              value={token}
                              onChange={(e) => setToken(e.target.value)}
                              required
                            />
                          </div>
                          <div className="mb-3 col-md-6  mx-auto">
                            <label className="form-label">Enter UDISE:</label>
                            <input
                              type="text"
                              className="form-control"
                              id="udise"
                              name="udise"
                              placeholder="Enter UDISE CODE"
                              value={udise}
                              onChange={(e) => setUdise(e.target.value)}
                              required
                            />
                          </div>
                        </form>
                        <div className="mb-3">
                          <button
                            type="button"
                            disabled={token === "" || udise === ""}
                            className="btn btn-primary m-2"
                            onClick={() => {
                              let searchedSchool = questionState.filter(
                                (school) =>
                                  school.id === token && school.udise === udise
                              );
                              if (searchedSchool.length > 0) {
                                setShowResult(true);
                                setInputField(searchedSchool[0]);
                                setEditInputField(searchedSchool[0]);
                              } else {
                                setShowResult(false);
                                setShowErrorText(true);
                                toast.error(
                                  "Data Entered is Incorrect. Please Check Your Data!",
                                  {
                                    position: "top-right",
                                    autoClose: 1500,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                  }
                                );
                              }
                            }}
                          >
                            Search
                          </button>
                          <button
                            type="button"
                            disabled={token === "" && udise === ""}
                            className="btn btn-danger m-2"
                            onClick={() => {
                              setToken("");
                              setUdise("");
                              setShowResult(false);
                              setShowErrorText(false);
                              toast.success("Form cleared!", {
                                position: "top-right",
                                autoClose: 1500,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                              });
                              setInputField({
                                id: docId,
                                sl: serial,
                                school: "",
                                gp: "",
                                udise: "",
                                cl_pp_student: 0,
                                cl_1_student: 0,
                                cl_2_student: 0,
                                cl_3_student: 0,
                                cl_4_student: 0,
                                cl_5_student: 0,
                                payment: "Due",
                                paid: 0,
                                total_student: 0,
                                total_rate: 0,
                              });
                            }}
                          >
                            Clear
                          </button>
                          {showErrorText && (
                            <p className="text-danger text-center">
                              Data Entered is Incorrect. Please Check Your Data!
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="mb-3 col-md-6 mx-auto">
                        <div className="mb-3 mx-auto">
                          <p className="text-primary">
                            School Name: {inputField.school}
                          </p>

                          <p className="text-primary">
                            GP Name: {inputField.gp}
                          </p>

                          <p className="text-primary">
                            UDISE:
                            {inputField.udise}
                          </p>
                        </div>
                        <div className="mb-3 mx-auto row">
                          <div className="mb-3 col-lg-6">
                            <label className="form-label">PP</label>
                            <input
                              type="number"
                              className="form-control"
                              name="cl_pp_student"
                              value={inputField.cl_pp_student}
                              onChange={(e) => {
                                if (e.target.value !== "") {
                                  setInputField({
                                    ...inputField,
                                    cl_pp_student: parseInt(e.target.value),
                                    total_student:
                                      parseInt(e.target.value) +
                                      inputField.cl_1_student +
                                      inputField.cl_2_student +
                                      inputField.cl_3_student +
                                      inputField.cl_4_student +
                                      inputField.cl_5_student,
                                    total_rate: Math.floor(
                                      parseInt(e.target.value) *
                                        questionRateState.pp_rate +
                                        inputField.cl_1_student *
                                          questionRateState.i_rate +
                                        inputField.cl_2_student *
                                          questionRateState.ii_rate +
                                        inputField.cl_3_student *
                                          questionRateState.iii_rate +
                                        inputField.cl_4_student *
                                          questionRateState.iv_rate +
                                        inputField.cl_5_student *
                                          questionRateState.v_rate
                                    ),
                                  });
                                } else {
                                  setInputField({
                                    ...inputField,
                                    cl_pp_student: "",
                                  });
                                }
                              }}
                            />
                          </div>

                          <div className="mb-3 col-lg-6">
                            <label className="form-label">Class I</label>
                            <input
                              type="number"
                              className="form-control"
                              name="cl_1_student"
                              value={inputField.cl_1_student}
                              onChange={(e) => {
                                if (e.target.value !== "") {
                                  setInputField({
                                    ...inputField,
                                    cl_1_student: parseInt(e.target.value),
                                    total_student:
                                      parseInt(e.target.value) +
                                      inputField.cl_pp_student +
                                      inputField.cl_2_student +
                                      inputField.cl_3_student +
                                      inputField.cl_4_student +
                                      inputField.cl_5_student,
                                    total_rate: Math.floor(
                                      parseInt(e.target.value) *
                                        questionRateState.i_rate +
                                        inputField.cl_pp_student *
                                          questionRateState.pp_rate +
                                        inputField.cl_2_student *
                                          questionRateState.ii_rate +
                                        inputField.cl_3_student *
                                          questionRateState.iii_rate +
                                        inputField.cl_4_student *
                                          questionRateState.iv_rate +
                                        inputField.cl_5_student *
                                          questionRateState.v_rate
                                    ),
                                  });
                                } else {
                                  setInputField({
                                    ...inputField,
                                    cl_1_student: "",
                                  });
                                }
                              }}
                            />
                          </div>

                          <div className="mb-3 col-lg-6">
                            <label className="form-label">Class II</label>
                            <input
                              type="number"
                              className="form-control"
                              name="cl_2_student"
                              value={inputField.cl_2_student}
                              onChange={(e) => {
                                if (e.target.value !== "") {
                                  setInputField({
                                    ...inputField,
                                    cl_2_student: parseInt(e.target.value),
                                    total_student:
                                      parseInt(e.target.value) +
                                      inputField.cl_pp_student +
                                      inputField.cl_1_student +
                                      inputField.cl_3_student +
                                      inputField.cl_4_student +
                                      inputField.cl_5_student,
                                    total_rate: Math.floor(
                                      parseInt(e.target.value) *
                                        questionRateState.ii_rate +
                                        inputField.cl_pp_student *
                                          questionRateState.pp_rate +
                                        inputField.cl_1_student *
                                          questionRateState.i_rate +
                                        inputField.cl_3_student *
                                          questionRateState.iii_rate +
                                        inputField.cl_4_student *
                                          questionRateState.iv_rate +
                                        inputField.cl_5_student *
                                          questionRateState.v_rate
                                    ),
                                  });
                                } else {
                                  setInputField({
                                    ...inputField,
                                    cl_2_student: "",
                                  });
                                }
                              }}
                            />
                          </div>

                          <div className="mb-3 col-lg-6">
                            <label className="form-label">Class III</label>
                            <input
                              type="number"
                              className="form-control"
                              name="cl_3_student"
                              value={inputField.cl_3_student}
                              onChange={(e) => {
                                if (e.target.value !== "") {
                                  setInputField({
                                    ...inputField,
                                    cl_3_student: parseInt(e.target.value),
                                    total_student:
                                      parseInt(e.target.value) +
                                      inputField.cl_pp_student +
                                      inputField.cl_2_student +
                                      inputField.cl_1_student +
                                      inputField.cl_4_student +
                                      inputField.cl_5_student,
                                    total_rate: Math.floor(
                                      parseInt(e.target.value) *
                                        questionRateState.iii_rate +
                                        inputField.cl_pp_student *
                                          questionRateState.pp_rate +
                                        inputField.cl_2_student *
                                          questionRateState.ii_rate +
                                        inputField.cl_1_student *
                                          questionRateState.i_rate +
                                        inputField.cl_4_student *
                                          questionRateState.iv_rate +
                                        inputField.cl_5_student *
                                          questionRateState.v_rate
                                    ),
                                  });
                                } else {
                                  setInputField({
                                    ...inputField,
                                    cl_3_student: "",
                                  });
                                }
                              }}
                            />
                          </div>

                          <div className="mb-3 col-lg-6">
                            <label className="form-label">Class IV</label>
                            <input
                              type="number"
                              className="form-control"
                              name="cl_4_student"
                              value={inputField.cl_4_student}
                              onChange={(e) => {
                                if (e.target.value !== "") {
                                  setInputField({
                                    ...inputField,
                                    cl_4_student: parseInt(e.target.value),
                                    total_student:
                                      parseInt(e.target.value) +
                                      inputField.cl_pp_student +
                                      inputField.cl_2_student +
                                      inputField.cl_3_student +
                                      inputField.cl_1_student +
                                      inputField.cl_5_student,
                                    total_rate: Math.floor(
                                      parseInt(e.target.value) *
                                        questionRateState.iv_rate +
                                        inputField.cl_pp_student *
                                          questionRateState.pp_rate +
                                        inputField.cl_2_student *
                                          questionRateState.ii_rate +
                                        inputField.cl_3_student *
                                          questionRateState.iii_rate +
                                        inputField.cl_1_student *
                                          questionRateState.i_rate +
                                        inputField.cl_5_student *
                                          questionRateState.v_rate
                                    ),
                                  });
                                } else {
                                  setInputField({
                                    ...inputField,
                                    cl_4_student: "",
                                  });
                                }
                              }}
                            />
                          </div>

                          <div className="mb-3 col-lg-6">
                            <label className="form-label">Class V</label>
                            <input
                              type="number"
                              className="form-control"
                              name="cl_5_student"
                              value={inputField.cl_5_student}
                              onChange={(e) => {
                                if (e.target.value !== "") {
                                  setInputField({
                                    ...inputField,
                                    cl_5_student: parseInt(e.target.value),
                                    total_student:
                                      parseInt(e.target.value) +
                                      inputField.cl_pp_student +
                                      inputField.cl_2_student +
                                      inputField.cl_3_student +
                                      inputField.cl_4_student +
                                      inputField.cl_1_student,
                                    total_rate: Math.floor(
                                      parseInt(e.target.value) *
                                        questionRateState.v_rate +
                                        inputField.cl_pp_student *
                                          questionRateState.pp_rate +
                                        inputField.cl_2_student *
                                          questionRateState.ii_rate +
                                        inputField.cl_3_student *
                                          questionRateState.iii_rate +
                                        inputField.cl_4_student *
                                          questionRateState.iv_rate +
                                        inputField.cl_1_student *
                                          questionRateState.i_rate
                                    ),
                                  });
                                } else {
                                  setInputField({
                                    ...inputField,
                                    cl_5_student: "",
                                  });
                                }
                              }}
                            />
                          </div>

                          {inputField.total_student > 0 && (
                            <div className="mb-3 col-lg-6">
                              <p className="text-primary">
                                Total Student: {inputField.total_student}
                              </p>

                              <p className="text-success">
                                Total Estimated Amount: ₹{inputField.total_rate}
                              </p>
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          className="btn btn-danger m-2"
                          onClick={() => {
                            setToken("");
                            setUdise("");
                            setShowResult(false);
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          data-bs-dismiss="modal"
                          className="btn btn-success m-2"
                          onClick={() => {
                            if (!compareObjects(inputField, editInputField)) {
                              if (inputField.total_student > 0) {
                                updateData();
                              } else {
                                toast.error(
                                  "Total Students should be greater than 0"
                                );
                              }
                            } else {
                              toast.error("No Changes Detected!!!");
                            }
                          }}
                        >
                          Update Data
                        </button>
                        <button
                          type="button"
                          data-bs-dismiss="modal"
                          className="btn btn-info m-1"
                          onClick={() => {
                            setStateObject(inputField);
                            router.push("/printquestioninvoice");
                          }}
                        >
                          Print Invoice
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        setToken("");
                        setUdise("");
                        setInputField({
                          id: docId,
                          sl: serial,
                          school: "",
                          gp: "",
                          udise: "",
                          cl_pp_student: 0,
                          cl_1_student: 0,
                          cl_2_student: 0,
                          cl_3_student: 0,
                          cl_4_student: 0,
                          cl_5_student: 0,
                          payment: "Due",
                          paid: 0,
                          total_student: 0,
                          total_rate: 0,
                        });
                        setEditInputField({
                          id: docId,
                          sl: serial,
                          school: "",
                          gp: "",
                          udise: "",
                          cl_pp_student: 0,
                          cl_1_student: 0,
                          cl_2_student: 0,
                          cl_3_student: 0,
                          cl_4_student: 0,
                          cl_5_student: 0,
                          payment: "Due",
                          paid: 0,
                          total_student: 0,
                          total_rate: 0,
                        });
                        setShowResult(false);
                        setShowErrorText(false);
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
              id="myModal3"
              tabIndex="-1"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              aria-labelledby="myModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-md">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1
                      className="modal-title fs-5 text-dark text-center"
                      id="myModalLabel"
                    >
                      Enter Your Question Requisition:
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={() => {
                        setAddInputField({
                          id: docId,
                          sl: serial,
                          school: "",
                          gp: "",
                          udise: "",
                          cl_pp_student: 0,
                          cl_1_student: 0,
                          cl_2_student: 0,
                          cl_3_student: 0,
                          cl_4_student: 0,
                          cl_5_student: 0,
                          payment: "Due",
                          paid: 0,
                          total_student: 0,
                          total_rate: 0,
                        });
                        if (typeof window !== undefined) {
                          document.getElementById("school").value = "";
                        }
                      }}
                    ></button>
                  </div>
                  <div className="modal-body modal-lg text-dark text-center">
                    <div className="container-fluid p-0 row text-dark text-center">
                      <div className="mb-3 col-md-6">
                        <label className="form-label">School Name</label>
                        <div className="mx-auto mb-3">
                          <select
                            className="form-select"
                            defaultValue={""}
                            name="school"
                            id="school"
                            onChange={handleSelection}
                          >
                            <option value="">Select School Name</option>
                            {schData.length > 0
                              ? schData.map((el) => {
                                  return (
                                    <option
                                      key={el.id}
                                      value={JSON.stringify(el)}
                                    >
                                      {el.school}
                                    </option>
                                  );
                                })
                              : null}
                          </select>
                        </div>
                      </div>
                      {addInputField.school && (
                        <div className="mb-3 col-lg-6">
                          <p className="text-primary">
                            School Name: {addInputField.school}
                          </p>

                          <p className="text-primary">
                            GP Name: {addInputField.gp}
                          </p>

                          <p className="text-primary">
                            UDISE:
                            {addInputField.udise}
                          </p>
                          {enteryDone ? (
                            <p className="text-danger">
                              School Requisition Submitted
                            </p>
                          ) : (
                            <p className="text-success">
                              School Requisition Not Submitted
                            </p>
                          )}
                        </div>
                      )}

                      <div className="mb-3 col-lg-6">
                        <label className="form-label">PP</label>
                        <input
                          type="number"
                          className="form-control"
                          name="cl_pp_student"
                          value={addInputField.cl_pp_student}
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              setAddInputField({
                                ...addInputField,
                                cl_pp_student: parseInt(e.target.value),
                                total_student:
                                  parseInt(e.target.value) +
                                  addInputField.cl_1_student +
                                  addInputField.cl_2_student +
                                  addInputField.cl_3_student +
                                  addInputField.cl_4_student +
                                  addInputField.cl_5_student,
                                total_rate: Math.floor(
                                  parseInt(e.target.value) *
                                    questionRateState.pp_rate +
                                    addInputField.cl_1_student *
                                      questionRateState.i_rate +
                                    addInputField.cl_2_student *
                                      questionRateState.ii_rate +
                                    addInputField.cl_3_student *
                                      questionRateState.iii_rate +
                                    addInputField.cl_4_student *
                                      questionRateState.iv_rate +
                                    addInputField.cl_5_student *
                                      questionRateState.v_rate
                                ),
                              });
                            } else {
                              setAddInputField({
                                ...addInputField,
                                cl_pp_student: "",
                              });
                            }
                          }}
                        />
                      </div>

                      <div className="mb-3 col-lg-6">
                        <label className="form-label">Class I</label>
                        <input
                          type="number"
                          className="form-control"
                          name="cl_1_student"
                          value={addInputField.cl_1_student}
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              setAddInputField({
                                ...addInputField,
                                cl_1_student: parseInt(e.target.value),
                                total_student:
                                  parseInt(e.target.value) +
                                  addInputField.cl_pp_student +
                                  addInputField.cl_2_student +
                                  addInputField.cl_3_student +
                                  addInputField.cl_4_student +
                                  addInputField.cl_5_student,
                                total_rate: Math.floor(
                                  parseInt(e.target.value) *
                                    questionRateState.i_rate +
                                    addInputField.cl_pp_student *
                                      questionRateState.pp_rate +
                                    addInputField.cl_2_student *
                                      questionRateState.ii_rate +
                                    addInputField.cl_3_student *
                                      questionRateState.iii_rate +
                                    addInputField.cl_4_student *
                                      questionRateState.iv_rate +
                                    addInputField.cl_5_student *
                                      questionRateState.v_rate
                                ),
                              });
                            } else {
                              setAddInputField({
                                ...addInputField,
                                cl_1_student: "",
                              });
                            }
                          }}
                        />
                      </div>

                      <div className="mb-3 col-lg-6">
                        <label className="form-label">Class II</label>
                        <input
                          type="number"
                          className="form-control"
                          name="cl_2_student"
                          value={addInputField.cl_2_student}
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              setAddInputField({
                                ...addInputField,
                                cl_2_student: parseInt(e.target.value),
                                total_student:
                                  parseInt(e.target.value) +
                                  addInputField.cl_pp_student +
                                  addInputField.cl_1_student +
                                  addInputField.cl_3_student +
                                  addInputField.cl_4_student +
                                  addInputField.cl_5_student,
                                total_rate: Math.floor(
                                  parseInt(e.target.value) *
                                    questionRateState.ii_rate +
                                    addInputField.cl_pp_student *
                                      questionRateState.pp_rate +
                                    addInputField.cl_1_student *
                                      questionRateState.i_rate +
                                    addInputField.cl_3_student *
                                      questionRateState.iii_rate +
                                    addInputField.cl_4_student *
                                      questionRateState.iv_rate +
                                    addInputField.cl_5_student *
                                      questionRateState.v_rate
                                ),
                              });
                            } else {
                              setAddInputField({
                                ...addInputField,
                                cl_2_student: "",
                              });
                            }
                          }}
                        />
                      </div>

                      <div className="mb-3 col-lg-6">
                        <label className="form-label">Class III</label>
                        <input
                          type="number"
                          className="form-control"
                          name="cl_3_student"
                          value={addInputField.cl_3_student}
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              setAddInputField({
                                ...addInputField,
                                cl_3_student: parseInt(e.target.value),
                                total_student:
                                  parseInt(e.target.value) +
                                  addInputField.cl_pp_student +
                                  addInputField.cl_2_student +
                                  addInputField.cl_1_student +
                                  addInputField.cl_4_student +
                                  addInputField.cl_5_student,
                                total_rate: Math.floor(
                                  parseInt(e.target.value) *
                                    questionRateState.iii_rate +
                                    addInputField.cl_pp_student *
                                      questionRateState.pp_rate +
                                    addInputField.cl_2_student *
                                      questionRateState.ii_rate +
                                    addInputField.cl_1_student *
                                      questionRateState.i_rate +
                                    addInputField.cl_4_student *
                                      questionRateState.iv_rate +
                                    addInputField.cl_5_student *
                                      questionRateState.v_rate
                                ),
                              });
                            } else {
                              setAddInputField({
                                ...addInputField,
                                cl_3_student: "",
                              });
                            }
                          }}
                        />
                      </div>

                      <div className="mb-3 col-lg-6">
                        <label className="form-label">Class IV</label>
                        <input
                          type="number"
                          className="form-control"
                          name="cl_4_student"
                          value={addInputField.cl_4_student}
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              setAddInputField({
                                ...addInputField,
                                cl_4_student: parseInt(e.target.value),
                                total_student:
                                  parseInt(e.target.value) +
                                  addInputField.cl_pp_student +
                                  addInputField.cl_2_student +
                                  addInputField.cl_3_student +
                                  addInputField.cl_1_student +
                                  addInputField.cl_5_student,
                                total_rate: Math.floor(
                                  parseInt(e.target.value) *
                                    questionRateState.iv_rate +
                                    addInputField.cl_pp_student *
                                      questionRateState.pp_rate +
                                    addInputField.cl_2_student *
                                      questionRateState.ii_rate +
                                    addInputField.cl_3_student *
                                      questionRateState.iii_rate +
                                    addInputField.cl_1_student *
                                      questionRateState.i_rate +
                                    addInputField.cl_5_student *
                                      questionRateState.v_rate
                                ),
                              });
                            } else {
                              setAddInputField({
                                ...addInputField,
                                cl_4_student: "",
                              });
                            }
                          }}
                        />
                      </div>

                      <div className="mb-3 col-lg-6">
                        <label className="form-label">Class V</label>
                        <input
                          type="number"
                          className="form-control"
                          name="cl_5_student"
                          value={addInputField.cl_5_student}
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              setAddInputField({
                                ...addInputField,
                                cl_5_student: parseInt(e.target.value),
                                total_student:
                                  parseInt(e.target.value) +
                                  addInputField.cl_pp_student +
                                  addInputField.cl_2_student +
                                  addInputField.cl_3_student +
                                  addInputField.cl_4_student +
                                  addInputField.cl_1_student,
                                total_rate: Math.floor(
                                  parseInt(e.target.value) *
                                    questionRateState.v_rate +
                                    addInputField.cl_pp_student *
                                      questionRateState.pp_rate +
                                    addInputField.cl_2_student *
                                      questionRateState.ii_rate +
                                    addInputField.cl_3_student *
                                      questionRateState.iii_rate +
                                    addInputField.cl_4_student *
                                      questionRateState.iv_rate +
                                    addInputField.cl_1_student *
                                      questionRateState.i_rate
                                ),
                              });
                            } else {
                              setAddInputField({
                                ...addInputField,
                                cl_5_student: "",
                              });
                            }
                          }}
                        />
                      </div>

                      {addInputField.total_student > 0 && (
                        <div className="mb-3 col-lg-6">
                          <p className="text-primary">
                            Total Student: {addInputField.total_student}
                          </p>

                          <p className="text-success">
                            Total Estimated Amount: ₹{addInputField.total_rate}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        setAddInputField({
                          id: docId,
                          sl: serial,
                          school: "",
                          gp: "",
                          udise: "",
                          cl_pp_student: 0,
                          cl_1_student: 0,
                          cl_2_student: 0,
                          cl_3_student: 0,
                          cl_4_student: 0,
                          cl_5_student: 0,
                          payment: "Due",
                          paid: 0,
                          total_student: 0,
                          total_rate: 0,
                        });
                        if (typeof window !== undefined) {
                          document.getElementById("school").value = "";
                        }
                      }}
                    >
                      Close
                    </button>
                    {addInputField.total_rate > 0 && (
                      <button
                        type="button"
                        disabled={addInputField.total_rate === 0}
                        className="btn btn-primary"
                        name="submit"
                        onClick={addSchool}
                        data-bs-dismiss="modal"
                      >
                        Add School
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {submitted && (
              <div>
                <h3 className="text-success">
                  Your Question Requisition is Successfully Submitted
                </h3>
                <h3 className="text-primary text-center mb-3">
                  Kindly Note Your Token Number:
                </h3>
                <div className="bg-light  mx-auto p-4 rounded">
                  <div className="float-end">
                    {!success ? (
                      <BsClipboard
                        onClick={() => {
                          navigator.clipboard.writeText(docId);
                          setSuccess(true);
                          setTimeout(() => setSuccess(false), 1500);
                        }}
                        size={30}
                        color="skyblue"
                      />
                    ) : (
                      <BsClipboard2Check
                        onClick={() => {
                          navigator.clipboard.writeText(docId);
                          setSuccess(true);
                          setTimeout(() => setSuccess(false), 1500);
                        }}
                        size={30}
                        color="skyblue"
                      />
                    )}
                  </div>
                  <h3 className="text-primary text-center">{docId}</h3>
                  {success ? (
                    <h6 className="text-success">Token Coppied to Clipboard</h6>
                  ) : null}
                  <div className="mx-auto mt-2">
                    <button
                      className="btn btn-success"
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setSuccess(false);
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <h3 className="text-danger text-center my-3">
          Currently We Are Not Acceping Any Question Reqisition or Question
          Reqisition Period is Over
        </h3>
      )}
    </div>
  );
};

export default QuestionRequisition;
