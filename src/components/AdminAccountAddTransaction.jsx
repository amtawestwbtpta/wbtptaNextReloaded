import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { firestore } from "../context/FirebaseContext";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import Loader from "./Loader";
import { decryptObjData, getCookie } from "../modules/encryption";
const AdminAccountAddTransaction = ({ getAccount, refresh, myData, total }) => {
  const docId = uuid();
  const router = useRouter();
  let name;
  let details = getCookie("tid");
  if (details) {
    name = decryptObjData("tid").tname;
  }
  const [inputField, setInputField] = useState({
    id: docId,
    name: "",
    cash: "",
    recentTransactionAmount: "",
    transactBy: name,
    transactOn: Date.now(),
    recentOn: Date.now(),
  });
  const [errInputField, setErrInputField] = useState({
    errName: "",
    errCash: "",
    errTransactBy: "",
  });
  const [loader, setLoader] = useState(false);
  const submitTransaction = async () => {
    if (formIsValid()) {
      try {
        setLoader(true);
        await setDoc(doc(firestore, "accounts", docId), inputField);
        await setDoc(doc(firestore, "ledgers", docId), {
          id: docId,
          name: inputField.name,
          cash: inputField.cash,
          recentTransactionAmount: inputField.recentTransactionAmount,
          transactBy: name,
          amountTransfered: inputField.cash,
          trnsferersCash: myData.cash,
          receiversCash: inputField.cash,
          transferFrom: name,
          receiveTo: inputField.name,
          totalCash: total,
          transactOn: Date.now(),
          recentOn: Date.now(),
        });

        setLoader(false);
        getAccount();
        refresh();
        toast.success("Congrats! Transaction Successful!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,

          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (e) {
        setLoader(false);
        toast.error("Something went Wrong", {
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
  };
  const formIsValid = () => {
    let validForm = true;
    setErrInputField({
      errName: "",
      errCash: "",
      errTransactBy: "",
    });
    if (inputField.name === "") {
      validForm = false;
      setErrInputField((prevState) => ({
        ...prevState,
        errName: "Please Enter Name",
      }));
    }
    if (inputField.cash === "") {
      validForm = false;
      setErrInputField((prevState) => ({
        ...prevState,
        errCash: "Please Enter Amount",
      }));
    }
    if (inputField.transactBy === "") {
      validForm = false;
      setErrInputField((prevState) => ({
        ...prevState,
        errTransactBy: "Please Enter Transaction By",
      }));
    }
    return validForm;
  };

  return (
    <div className="container text-black">
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
      <form autoComplete="off" className="my-3 mx-auto">
        <div className="input-group mb-3 col-md-6">
          <label className="input-group-text">Name</label>
          <input
            onChange={(e) =>
              setInputField({ ...inputField, name: e.target.value })
            }
            type="text"
            className="form-control"
            placeholder="Enter Name"
            value={inputField.name}
          />
          <br />
          {errInputField.errName.length > 0 && (
            <span className="error">{errInputField.errName}</span>
          )}
        </div>
        <div className="input-group mb-3 col-md-6">
          <label className="input-group-text">Amount</label>
          <input
            onChange={(e) =>
              setInputField({
                ...inputField,
                cash: parseInt(e.target.value),
                recentTransactionAmount: parseInt(e.target.value),
              })
            }
            type="text"
            className="form-control"
            placeholder="Enter Amount"
            value={inputField.cash}
          />
          <br />
          {errInputField.errCash.length > 0 && (
            <span className="error">{errInputField.errCash}</span>
          )}
        </div>
        <div className="input-group mb-3 col-md-6">
          <label className="input-group-text">Transaction By</label>
          <input
            onChange={(e) =>
              setInputField({ ...inputField, transactBy: e.target.value })
            }
            type="text"
            className="form-control"
            placeholder="Enter Transaction By"
            value={inputField.transactBy}
          />
          <br />
          {errInputField.errTransactBy.length > 0 && (
            <span className="error">{errInputField.errTransactBy}</span>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary m-1"
          onClick={(e) => {
            e.preventDefault();
            submitTransaction();
          }}
        >
          Submit
        </button>
        <button
          type="button"
          className="btn btn-danger m-1"
          onClick={() => router.push("/AdminAccounts")}
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default AdminAccountAddTransaction;
