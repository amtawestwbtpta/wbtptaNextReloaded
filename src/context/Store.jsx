"use client";

import React, { createContext, useContext, useState } from "react";

import { FirebaseProvider } from "./FirebaseContext";

const GlobalContext = createContext({
  state: null,
  setState: () => null,
  USER: {
    circle: "",
    desig: "",
    disabled: "",
    email: "",
    empid: "",
    id: "",
    pan: "",
    password: "",
    phone: "",
    photoName: "",
    question: "",
    school: "",
    showAccount: "",
    teachersID: "",
    tname: "",
    udise: "",
    url: "",
    username: "",
  },
  setUSER: () => {},
  stateArray: [],
  setStateArray: () => [],
  stateObject: {},
  setStateObject: () => {},
  teachersState: [],
  setTeachersState: () => [],
  schoolState: [],
  setSchoolState: () => [],
  slideState: [],
  setSlideState: () => [],
  userState: [],
  setUserState: () => [],
  userUpdateTime: "",
  setUserUpdateTime: () => "",
  noticeState: [],
  setNoticeState: () => [],
  memoState: [],
  setMemoState: () => [],
  teacherUpdateTime: "",
  setTeacherUpdateTime: () => "",
  schoolUpdateTime: "",
  setSchoolUpdateTime: () => "",
  slideUpdateTime: "",
  setSlideUpdateTime: () => "",
  noticeUpdateTime: "",
  setNoticeUpdateTime: () => "",
  memoUpdateTime: "",
  setMemoUpdateTime: () => "",
  questionState: [],
  setQuestionState: () => [],
  questionUpdateTime: "",
  setQuestionUpdateTime: () => "",
  questionRateState: {
    id: "",
    pp_rate: "",
    i_rate: "",
    ii_rate: "",
    iii_rate: "",
    iv_rate: "",
    v_rate: "",
    term: "1st",
    year: new Date().getFullYear(),
    isAccepting: false,
  },
  setQuestionRateState: () => {},
  questionRateUpdateTime: "",
  setQuestionRateUpdateTime: () => {},
  floodReliefState: [],
  setfloodReliefState: () => [],
  floodReliefUpdateTime: "",
  setfloodReliefUpdateTime: () => "",
  deductionState: [],
  setDeductionState: () => [],
  salaryState: [],
  setSalaryState: () => [],
  indSalaryState: {
    march: [],
    april: [],
    may: [],
    june: [],
    july: [],
    august: [],
    september: [],
    october: [],
    november: [],
    december: [],
    january: [],
    february: [],
  },
  setIndSalaryState: () => {},
  leaveState: [],
  setLeaveState: () => [],
});

export const GlobalContextProvider = ({ children }) => {
  const [state, setState] = useState("");
  const [USER, setUSER] = useState({
    circle: "",
    desig: "",
    disabled: "",
    email: "",
    empid: "",
    id: "",
    pan: "",
    password: "",
    phone: "",
    photoName: "",
    question: "",
    school: "",
    showAccount: "",
    teachersID: "",
    tname: "",
    udise: "",
    url: "",
    username: "",
  });
  const [stateArray, setStateArray] = useState([]);
  const [stateObject, setStateObject] = useState({});
  const [teachersState, setTeachersState] = useState([]);
  const [userState, setUserState] = useState([]);
  const [schoolState, setSchoolState] = useState([]);
  const [slideState, setSlideState] = useState([]);
  const [noticeState, setNoticeState] = useState([]);
  const [memoState, setMemoState] = useState([]);
  const [teacherUpdateTime, setTeacherUpdateTime] = useState(Date.now() - 1000);
  const [schoolUpdateTime, setSchoolUpdateTime] = useState(Date.now() - 1000);
  const [slideUpdateTime, setSlideUpdateTime] = useState(Date.now() - 1000);
  const [noticeUpdateTime, setNoticeUpdateTime] = useState(Date.now() - 1000);
  const [memoUpdateTime, setMemoUpdateTime] = useState(Date.now() - 1000);
  const [questionState, setQuestionState] = useState([]);
  const [questionUpdateTime, setQuestionUpdateTime] = useState(
    Date.now() - 1000
  );
  const [questionRateState, setQuestionRateState] = useState({
    id: "",
    pp_rate: "",
    i_rate: "",
    ii_rate: "",
    iii_rate: "",
    iv_rate: "",
    v_rate: "",
    term: "1st",
    year: new Date().getFullYear(),
    isAccepting: false,
  });
  const [questionRateUpdateTime, setQuestionRateUpdateTime] = useState("");
  const [userUpdateTime, setUserUpdateTime] = useState(Date.now() - 1000);
  const [floodReliefState, setfloodReliefState] = useState([]);
  const [floodReliefUpdateTime, setfloodReliefUpdateTime] = useState(
    Date.now() - 1000
  );
  const [deductionState, setDeductionState] = useState([]);
  const [salaryState, setSalaryState] = useState([]);
  const [indSalaryState, setIndSalaryState] = useState({
    march: [],
    april: [],
    may: [],
    june: [],
    july: [],
    august: [],
    september: [],
    october: [],
    november: [],
    december: [],
    january: [],
    february: [],
  });
  const [leaveState, setLeaveState] = useState([]);
  return (
    <GlobalContext.Provider
      value={{
        state,
        setState,
        USER,
        setUSER,
        stateArray,
        setStateArray,
        stateObject,
        setStateObject,
        teachersState,
        setTeachersState,
        userState,
        setUserState,
        schoolState,
        setSchoolState,
        slideState,
        setSlideState,
        noticeState,
        setNoticeState,
        memoState,
        setMemoState,
        teacherUpdateTime,
        setTeacherUpdateTime,
        schoolUpdateTime,
        setSchoolUpdateTime,
        slideUpdateTime,
        setSlideUpdateTime,
        noticeUpdateTime,
        setNoticeUpdateTime,
        memoUpdateTime,
        setMemoUpdateTime,
        questionState,
        setQuestionState,
        questionUpdateTime,
        setQuestionUpdateTime,
        questionRateState,
        setQuestionRateState,
        questionRateUpdateTime,
        setQuestionRateUpdateTime,
        userUpdateTime,
        setUserUpdateTime,
        floodReliefState,
        setfloodReliefState,
        floodReliefUpdateTime,
        setfloodReliefUpdateTime,
        deductionState,
        setDeductionState,
        salaryState,
        setSalaryState,
        indSalaryState,
        setIndSalaryState,
        leaveState,
        setLeaveState,
      }}
    >
      <FirebaseProvider>{children}</FirebaseProvider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
