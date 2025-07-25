"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { firestore } from "../../context/FirebaseContext";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
  where,
} from "firebase/firestore";

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-cube";
import { EffectCube } from "swiper";
import { ImSwitch } from "react-icons/im";
import { decryptObjData, getCookie } from "../../modules/encryption";
import { v4 as uuid } from "uuid";
import {
  compareObjects,
  createDownloadLink,
  round2dec,
  round5,
} from "../../modules/calculatefunctions";
import { notifyAll } from "../../modules/notification";
import Loader from "../../components/Loader";
function QuestionSec() {
  const router = useRouter();
  const {
    state,
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
  const [docId, setDocId] = useState(uuid().split("-")[0]);
  const [serial, setSerial] = useState(0);
  let details = getCookie("tid");
  if (details) {
    details = decryptObjData("tid");
  }
  const questionadmin = details?.question;
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [isAccepting, setIsAccepting] = useState(true);
  const [showSlide, setShowSlide] = useState(false);

  const [selectedSchool, setSelectedSchool] = useState({});
  const [inputField, setInputField] = useState({});
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
  const [questionInputField, setQuestionInputField] = useState({
    pp_rate: 0,
    i_rate: 0,
    ii_rate: 0,
    iii_rate: 0,
    iv_rate: 0,
    v_rate: 0,
    term: "1st",
    year: 2024,
    isAccepting: false,
  });
  const userData = async () => {
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
    setShowSlide(true);
    setData(data);
    const q2 = query(collection(firestore, "question_rate"));

    const querySnapshot2 = await getDocs(q2);
    const data2 = querySnapshot2.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    setQuestionRateState(data2[0]);
    setQuestionInputField({
      id: data2[0].id,
      pp_rate: data2[0].pp_rate,
      i_rate: data2[0].i_rate,
      ii_rate: data2[0].ii_rate,
      iii_rate: data2[0].iii_rate,
      iv_rate: data2[0].iv_rate,
      v_rate: data2[0].v_rate,
      term: data2[0].term,
      year: data2[0].year,
      isAccepting: data2[0].isAccepting,
    });
  };
  const changeData = (e) => {
    setSelectedSchool(
      questionState.filter((el) => el.udise.match(e.target.value))[0]
    );
    setInputField(
      questionState.filter((el) => el.udise.match(e.target.value))[0]
    );
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
            setQuestionState(
              [...questionState, addInputField].sort((a, b) => {
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
              })
            );
            setQuestionUpdateTime(Date.now());
            toast.success("School Successfully Added!!!", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setAddInputField({
              id: docId,
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
            if (typeof window !== undefined) {
              document.getElementById("school").value = "";
            }
          })
          .catch((err) => {
            console.log(err);
            setLoader(false);
            toast.error("Something Went Wrong in Server!", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      } catch (e) {
        setLoader(false);
        toast.error("Something Went Wrong in Server!", {
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
      toast.error("School Question Requisition Already Submitted!", {
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
  const updateQuestionStudentValue = async () => {
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
          toast.success("Data Successfully Updated!!!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((e) => {
          console.log(e);
          toast.error("Something Went Wrong in Server!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });

      toast.success("Data Successfully Updated!!!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
      toast.error("Something Went Wrong in Server!", {
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
  const updateQrateData = async () => {
    try {
      const docRef = doc(firestore, "question_rate", questionInputField.id);
      await updateDoc(docRef, questionInputField);
      setQuestionRateState(questionInputField);
      toast.success("Data Successfully Updated!!!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
      toast.error("Something Went Wrong in Server!", {
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
  const getQuestionData = async () => {
    const difference = (Date.now() - questionUpdateTime) / 1000 / 60 / 15;
    if (questionState.length === 0 || difference >= 1) {
      userData();
    } else {
      const data = questionState.sort((a, b) => {
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
      setDocId(`questions${data.length + 101}-${uuid().split("-")[0]}`);
      setSerial(data.length + 1);
      setShowSlide(true);
      setData(data);
      setQuestionInputField({
        id: questionRateState.id,
        pp_rate: questionRateState.pp_rate,
        i_rate: questionRateState.i_rate,
        ii_rate: questionRateState.ii_rate,
        iii_rate: questionRateState.iii_rate,
        iv_rate: questionRateState.iv_rate,
        v_rate: questionRateState.v_rate,
        term: questionRateState.term,
        year: questionRateState.year,
        isAccepting: questionRateState.isAccepting,
      });
    }
    const questionRateDifference =
      (Date.now() - questionRateUpdateTime) / 1000 / 60 / 15;
    if (questionRateDifference >= 1 || questionRateState.length === 0) {
      getAcceptingData();
    } else {
      setQuestionInputField(questionRateState);
      setIsAccepting(questionRateState.isAccepting);
    }
  };

  const closeAccepting = async () => {
    const docRef = doc(firestore, "question_rate", questionRateState.id);
    await updateDoc(docRef, {
      isAccepting: false,
    })
      .then(async () => {
        let title = `Question Requisition Closed!`;
        let body = "Question Requisition Accepting Status has been Closed!";
        await notifyAll(title, body)
          .then(async () => {
            setQuestionRateState({ ...questionRateState, isAccepting: false });
            setQuestionRateUpdateTime(Date.now());
            setIsAccepting(false);
            toast.success("Accepting Status Set Closed Successfully!", {
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
          .catch((e) => {
            console.log(e);
            setLoader(false);
            toast.error("Error Sending Notification");
          });
      })
      .catch((e) => {
        toast.error("Something Went Wrong in Server!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log(e);
      });
  };
  const openAccepting = async () => {
    const docRef = doc(firestore, "question_rate", questionRateState.id);
    await updateDoc(docRef, {
      isAccepting: true,
    })
      .then(async () => {
        let title = `Question Requisition Opened!`;
        let body = "Question Requisition Accepting Status has been Opened!";
        await notifyAll(title, body)
          .then(async () => {
            setQuestionRateState({ ...questionRateState, isAccepting: true });
            setQuestionRateUpdateTime(Date.now());
            setIsAccepting(true);
            toast.success(
              "Question Accepting Status Set Opened Successfully!",
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
          })
          .catch((e) => {
            console.log(e);
            setLoader(false);
            toast.error("Error Sending Notification");
          });
      })
      .catch((e) => {
        toast.error("Something Went Wrong in Server!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log(e);
      });
  };
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Question Section";
    if (!state && questionadmin !== "admin") {
      router.push("/login");
    }
    getQuestionData();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {}, [selectedSchool, questionInputField, addInputField]);
  return (
    <div className="container my-5">
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
      {loader ? <Loader /> : null}
      <div className="col-md-6 mx-auto">
        {showSlide ? (
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
            {data.map((el, ind) => {
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
                      TOTAL AMOUNT: {el.total_rate}
                    </h6>
                    <h6 className="text-primary">
                      PAYMENT STATUS: {el.payment}
                    </h6>
                    <h6 className="text-primary">PAID AMOUNT: {el.paid}</h6>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : null}
      </div>
      <div className="col-md-6 mx-auto mb-3">
        {/* Add School Button trigger modal */}
        <button
          type="button"
          className="btn btn-primary m-2"
          data-bs-toggle="modal"
          data-bs-target="#myModal3"
        >
          Add School
        </button>
        <button
          type="button"
          className="btn btn-warning m-2"
          data-bs-toggle="modal"
          data-bs-target="#myModal4"
          onClick={() =>
            setTimeout(() => {
              document.getElementById("term").value = questionInputField.term;
            }, 300)
          }
        >
          Update Rate
        </button>
        <button type="button" className="btn">
          {
            <ImSwitch
              color={showSlide ? "red" : "green"}
              onClick={() => setShowSlide(!showSlide)}
            />
          }
        </button>
        {/* Add School modal */}
        <Link
          className="btn btn-sm btn-success m-2"
          href={`/PrintQuestionAll`}
          onClick={() => {
            setStateObject(data);
          }}
        >
          Print All Invoice
        </Link>
        <Link
          className="btn btn-sm btn-info "
          href={`/PrintQuestionAllCompact`}
          onClick={() => {
            setStateObject(data);
          }}
        >
          Print Question All Compact
        </Link>
        {state === "admin" && (
          <div>
            <button
              type="button"
              className="btn btn-sm m-3 btn-warning"
              onClick={() => {
                createDownloadLink(questionState, "questions");
              }}
            >
              Download Question Data
            </button>
            <button
              type="button"
              className="btn btn-sm m-3 btn-warning"
              onClick={() => {
                createDownloadLink(questionRateState, "question_rate");
              }}
            >
              Download Question Rate Data
            </button>
            <div>
              <p className="text-center text-primary">Question Requisition</p>

              <div className="d-flex justify-content-center align-items-center form-check form-switch mx-auto text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckChecked"
                  checked={isAccepting}
                  onChange={() => {
                    setIsAccepting(!isAccepting);
                    if (isAccepting) {
                      closeAccepting();
                    } else {
                      openAccepting();
                    }
                  }}
                />
                <label
                  className={`form-check-label mx-2 ${
                    isAccepting ? "text-success" : "text-danger"
                  }`}
                  htmlFor="flexSwitchCheckChecked"
                >
                  {isAccepting
                    ? "Question Requisition Accepting Allowed"
                    : "Question Requisition Accepting Closed"}
                </label>
              </div>
            </div>
          </div>
        )}
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
                  Add School:
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setAddInputField({
                      id: docId,
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
                        defaultValue={inputField.school}
                        name="school"
                        id="school"
                        onChange={handleSelection}
                      >
                        <option value="">Select School Name</option>
                        {schoolState.length > 0
                          ? schoolState.map((el) => {
                              return (
                                <option key={el.id} value={JSON.stringify(el)}>
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
        <div
          className="modal fade"
          id="myModal4"
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
                  Update Question Rate
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body text-dark text-center">
                <div className="container-fluid p-0 row text-dark text-center">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">PP Rate</label>
                    <input
                      type="number"
                      className="form-control"
                      name="pp_rate"
                      value={questionInputField.pp_rate}
                      onChange={(e) => {
                        if (e.target.value) {
                          setQuestionInputField({
                            ...questionInputField,
                            pp_rate: parseFloat(e.target.value),
                          });
                        } else {
                          setQuestionInputField({
                            ...questionInputField,
                            pp_rate: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Class I Rate</label>
                    <input
                      type="number"
                      className="form-control"
                      name="i_rate"
                      value={questionInputField.i_rate}
                      onChange={(e) => {
                        if (e.target.value) {
                          setQuestionInputField({
                            ...questionInputField,
                            i_rate: parseFloat(e.target.value),
                          });
                        } else {
                          setQuestionInputField({
                            ...questionInputField,
                            i_rate: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Class II Rate</label>
                    <input
                      type="number"
                      className="form-control"
                      name="i_rate"
                      value={questionInputField.ii_rate}
                      onChange={(e) => {
                        if (e.target.value) {
                          setQuestionInputField({
                            ...questionInputField,
                            ii_rate: parseFloat(e.target.value),
                          });
                        } else {
                          setQuestionInputField({
                            ...questionInputField,
                            ii_rate: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Class III Rate</label>
                    <input
                      type="number"
                      className="form-control"
                      name="i_rate"
                      value={questionInputField.iii_rate}
                      onChange={(e) => {
                        if (e.target.value) {
                          setQuestionInputField({
                            ...questionInputField,
                            iii_rate: parseFloat(e.target.value),
                          });
                        } else {
                          setQuestionInputField({
                            ...questionInputField,
                            iii_rate: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Class IV Rate</label>
                    <input
                      type="number"
                      className="form-control"
                      name="i_rate"
                      value={questionInputField.iv_rate}
                      onChange={(e) => {
                        if (e.target.value) {
                          setQuestionInputField({
                            ...questionInputField,
                            iv_rate: parseFloat(e.target.value),
                          });
                        } else {
                          setQuestionInputField({
                            ...questionInputField,
                            iv_rate: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Class V Rate</label>
                    <input
                      type="number"
                      className="form-control"
                      name="i_rate"
                      value={questionInputField.v_rate}
                      onChange={(e) => {
                        if (e.target.value) {
                          setQuestionInputField({
                            ...questionInputField,
                            v_rate: parseFloat(e.target.value),
                          });
                        } else {
                          setQuestionInputField({
                            ...questionInputField,
                            v_rate: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Year</label>
                    <input
                      type="number"
                      className="form-control"
                      name="year"
                      value={questionInputField.year}
                      onChange={(e) => {
                        if (e.target.value) {
                          setQuestionInputField({
                            ...questionInputField,
                            year: e.target.value,
                          });
                        } else {
                          setQuestionInputField({
                            ...questionInputField,
                            year: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <h6 className="form-label">
                      Current Term: {questionRateState.term}
                    </h6>
                    <h6 className="form-label">
                      Selected Term: {questionInputField.term}
                    </h6>
                  </div>
                  <div className="col-md-6 mx-auto mb-3">
                    <label className="form-label">Select Term</label>
                    <select
                      className="form-select"
                      id="term"
                      defaultValue={""}
                      onChange={(e) => {
                        setQuestionInputField({
                          ...questionInputField,
                          term: e.target.value,
                        });
                      }}
                      aria-label="Default select example"
                    >
                      <option value="">Select Term</option>

                      <option value="1st">1st</option>
                      <option value="2nd">2nd</option>
                      <option value="3rd">3rd</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setQuestionInputField(questionRateState);
                  }}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  name="submit"
                  onClick={updateQrateData}
                  data-bs-dismiss="modal"
                >
                  Update Rate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 mx-auto mb-3">
        <select
          className="form-select"
          id="selectForm"
          defaultValue={""}
          onChange={changeData}
          aria-label="Default select example"
        >
          <option value="">Select School Name</option>
          {questionState.length > 0
            ? questionState.map((el) => {
                return (
                  <option key={el.id} value={el.udise}>
                    {el.school}
                  </option>
                );
              })
            : null}
        </select>
      </div>
      {Object.keys(selectedSchool).length > 0 ? (
        <div className="col-md-6 mx-auto p-2 my-3">
          <table className="container mx-auto">
            <tr>
              <th colSpan="2" className="text-center fs-4">
                Amta West Circle, {questionRateState.term} Summative Exam,{" "}
                {questionRateState.year}
              </th>
            </tr>
            <tr>
              <th className="text-center">School Name</th>
              <th className="text-center">
                <span>{selectedSchool.school}</span>
              </th>
            </tr>
            <tr>
              <th className="text-center">Gram Panchayet</th>
              <th className="text-center">
                <span id="gp">{selectedSchool.gp}</span>
              </th>
            </tr>
            <tr>
              <th className="text-center">PP Students</th>
              <th className="text-center">
                <span id="pp">{selectedSchool.cl_pp_student}</span>
              </th>
            </tr>
            <tr>
              <th className="text-center">I Students</th>
              <th className="text-center">
                <span id="i">{selectedSchool.cl_1_student}</span>
              </th>
            </tr>
            <tr>
              <th className="text-center">II Students</th>
              <th className="text-center">
                <span id="ii">{selectedSchool.cl_2_student}</span>
              </th>
            </tr>
            <tr>
              <th className="text-center">III Students</th>
              <th className="text-center">
                <span id="iii">{selectedSchool.cl_3_student}</span>
              </th>
            </tr>
            <tr>
              <th className="text-center">IV Students</th>
              <th className="text-center">
                <span id="iv">{selectedSchool.cl_4_student}</span>
              </th>
            </tr>
            {selectedSchool.cl_5_student > 0 ? (
              <tr className="v_hide text-center">
                <th className="v_hide text-center">V Students</th>
                <th className="v_hide text-center">
                  <span id="v">{selectedSchool.cl_5_student}</span>
                </th>
              </tr>
            ) : null}
            <tr>
              <th className="text-center">Total</th>
              <th className="text-center">
                <span id="total">{selectedSchool.total_student}</span>
              </th>
            </tr>
            <tr>
              <th className="text-center">PP Cost</th>
              <th className="text-center">
                <span id="pp_rate">
                  {round2dec(
                    selectedSchool.cl_pp_student * questionRateState.pp_rate
                  )}
                </span>
              </th>
            </tr>
            <tr>
              <th className="text-center">I Cost</th>
              <th className="text-center">
                <span id="i_rate">
                  {round2dec(
                    selectedSchool.cl_1_student * questionRateState.i_rate
                  )}
                </span>
              </th>
            </tr>
            <tr>
              <th className="text-center">II Cost</th>
              <th className="text-center">
                <span id="ii_rate">
                  {round2dec(
                    selectedSchool.cl_2_student * questionRateState.ii_rate
                  )}
                </span>
              </th>
            </tr>
            <tr>
              <th className="text-center">III Cost</th>
              <th className="text-center">
                <span id="iii_rate">
                  {round2dec(
                    selectedSchool.cl_3_student * questionRateState.iii_rate
                  )}
                </span>
              </th>
            </tr>
            <tr>
              <th className="text-center">IV Cost</th>
              <th className="text-center">
                <span id="iv_rate">
                  {round2dec(
                    selectedSchool.cl_4_student * questionRateState.iv_rate
                  )}
                </span>
              </th>
            </tr>

            {selectedSchool.cl_5_rate > 0 ? (
              <tr className="v_hide text-center">
                <th className="v_hide text-center">V Cost</th>
                <th className="v_hide text-center">
                  <span id="v_rate">
                    {round2dec(
                      selectedSchool.cl_5_student * questionRateState.v_rate
                    )}
                  </span>
                </th>
              </tr>
            ) : null}
            <tr>
              <th className="text-center">Total Cost</th>
              <th className="text-center">
                <span id="total_rate">
                  {round5(
                    selectedSchool.cl_pp_student * questionRateState.pp_rate +
                      selectedSchool.cl_1_student * questionRateState.i_rate +
                      selectedSchool.cl_2_student * questionRateState.ii_rate +
                      selectedSchool.cl_3_student * questionRateState.iii_rate +
                      selectedSchool.cl_4_student * questionRateState.iv_rate +
                      selectedSchool.cl_5_student * questionRateState.v_rate
                  )}
                </span>
              </th>
            </tr>
            <tr>
              <th className="text-center">Payment Status</th>
              <th className="text-center">
                <span id="payment">{selectedSchool.payment}</span>
              </th>
            </tr>
            <tr>
              <td className="text-center">
                <Link
                  className="btn btn-sm m-1 btn-info"
                  href={`/printquestioninvoice`}
                  onClick={() => setStateObject(selectedSchool)}
                >
                  Print Invoice
                </Link>
                <button
                  type="button"
                  id={selectedSchool.id}
                  className="btn btn-sm px-2 rounded btn-danger"
                  onClick={async (e) => {
                    let schId = selectedSchool.id;
                    // eslint-disable-next-line no-restricted-globals
                    let confmessage = confirm(
                      `Are You Sure To Delete ${selectedSchool.school}`
                    );
                    if (confmessage) {
                      try {
                        await deleteDoc(doc(firestore, "questions", schId));
                        setQuestionState(
                          questionState.filter((q) => q.id !== schId)
                        );
                        setQuestionUpdateTime(Date.now());
                        toast.success("Successfully Deleted School!!!", {
                          position: "top-right",
                          autoClose: 1500,
                          hideProgressBar: false,
                          closeOnClick: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                        });
                        if (typeof window !== undefined) {
                          document.getElementById("selectForm").value = "";
                        }
                        setSelectedSchool({});
                      } catch (e) {
                        toast.error("Something Went Wrong in Server!", {
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
                  }}
                >
                  Delete
                </button>
              </td>
              <td className="text-center">
                {/* <!-- Button trigger modal --> */}
                <button
                  type="button"
                  className="btn btn-primary m-2"
                  data-bs-toggle="modal"
                  data-bs-target="#myModal2"
                >
                  Update School Data
                </button>
              </td>
            </tr>
          </table>
          <div className="text-center ">
            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="myModal2"
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
                      Update Student Number
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body text-dark text-center">
                    <div className="container-fluid p-0 row text-dark text-center">
                      <div className="mb-3 mx-auto">
                        <p className="text-primary">
                          School Name: {inputField.school}
                        </p>

                        <p className="text-primary">GP Name: {inputField.gp}</p>

                        <p className="text-primary">
                          UDISE:
                          {inputField.udise}
                        </p>
                      </div>

                      <div className="mb-3 mx-auto row">
                        <div className="mb-3 col-lg-6 w-50">
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

                        <div className="mb-3 col-lg-6 w-50">
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

                        <div className="mb-3 col-lg-6 w-50">
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

                        <div className="mb-3 col-lg-6 w-50">
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

                        <div className="mb-3 col-lg-6 w-50">
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

                        <div className="mb-3 col-lg-6 w-50">
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
                          <div className="mb-3 col-lg-6 mx-auto">
                            <p className="text-primary">
                              Total Student: {inputField.total_student}
                            </p>

                            <p className="text-success">
                              Total Estimated Amount: ₹{inputField.total_rate}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="mb-3 col-md-6 w-50">
                        <label className="form-label fw-bold">Payment</label>
                        <select
                          name="payment"
                          id="payment_inp"
                          className="form-select"
                          aria-label="Default select example"
                          value={inputField.payment}
                          onChange={(e) =>
                            setInputField({
                              ...inputField,
                              payment: e.target.value,
                            })
                          }
                        >
                          <option value="">Select From Below</option>
                          <option value="DUE">DUE</option>
                          <option value="PAID">PAID</option>
                        </select>
                      </div>
                      <div className="mb-3 col-lg-6 w-50">
                        <label className="form-label fw-bold">
                          Paid Amount
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="paid_inp"
                          name="paid"
                          value={inputField.paid}
                          onChange={(e) =>
                            setInputField({
                              ...inputField,
                              paid: parseInt(e.target.value),
                            })
                          }
                        />
                      </div>
                      <div className="mb-3 col-lg-6 w-50">
                        <label className="form-label fw-bold">
                          Net Bill(Rs.)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="total_rate_inp"
                          name="total_rate"
                          value={inputField.total_rate}
                          readOnly
                        />
                        <p>{inputField.total_rate}</p>
                      </div>
                      <div className="mb-3 col-lg-6 w-50">
                        <label className="form-label fw-bold">ID</label>
                        <input
                          type="text"
                          className="form-control"
                          name="id"
                          value={inputField.id}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={(e) => {
                        document.getElementById("selectForm").selectedIndex = 0;
                        setSelectedSchool({});
                        setInputField({});
                      }}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      id="submit"
                      name="submit"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        if (!compareObjects(inputField, selectedSchool)) {
                          if (inputField.total_student > 0) {
                            updateQuestionStudentValue();
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
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default QuestionSec;
