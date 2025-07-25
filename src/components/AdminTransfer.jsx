import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { firestore } from "../context/FirebaseContext";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import Loader from "./Loader";

const AdminTransfer = ({ data, total, myData, getAccount, refresh }) => {
  const adminName = localStorage.getItem("tname");
  const [showLoader, setShowLoader] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [receivingIsSelected, setReceivingIsSelected] = useState(false);
  const [receivingAdmin, setReceivingAdmin] = useState([]);
  const [transferingAmount, setTransferingAmount] = useState("");
  const [showTransferInput, setShowTransferInput] = useState(false);
  const [excludeMyData, setExcludeMyData] = useState([]);
  const [
    transferingAmountAfterTransaction,
    setTransferingAmountAfterTransaction,
  ] = useState(0);
  const [
    receivingAdminsToatalAfterTransaction,
    setReceivingAdminsToatalAfterTransaction,
  ] = useState(0);

  const changeReceivingAdmin = (e) => {
    setReceivingAdmin(data.filter((el) => el.name.match(e.target.value))[0]);
    setReceivingIsSelected(true);
    setIsSelected(true);
    e.target.value
      ? setReceivingIsSelected(true)
      : setReceivingIsSelected(false);
    e.target.value ? setShowTransferInput(true) : setShowTransferInput(false);
  };

  const docId = uuid();
  const submitData = async () => {
    try {
      setShowLoader(true);
      const docRefTransfer = doc(firestore, "accounts", myData.id);
      await updateDoc(docRefTransfer, {
        cash: transferingAmountAfterTransaction,
        transactBy: myData.name,
        recentOn: Date.now(),
        recentTransactionAmount: parseInt(transferingAmount),
      });
      const docRefReceive = doc(firestore, "accounts", receivingAdmin.id);
      await updateDoc(docRefReceive, {
        cash: receivingAdminsToatalAfterTransaction,
        transactBy: myData.name,
        recentOn: Date.now(),
        recentTransactionAmount: parseInt(transferingAmount),
      });
      await setDoc(doc(firestore, "ledgers", docId), {
        cashTransfered: parseInt(transferingAmount),
        trnsferersCash: transferingAmountAfterTransaction,
        transferFrom: myData.name,
        receiveTo: receivingAdmin.name,
        transactBy: myData.name,
        receiversCash: receivingAdminsToatalAfterTransaction,
        totalCash: total,
        transactOn: Date.now(),
      });
      getAccount();
      refresh();
      setShowLoader(false);
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
      setShowLoader(false);
      console.log(e);
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
  };
  useEffect(() => {
    setExcludeMyData(data.filter((el) => el.name !== myData.name));
  }, [
    transferingAmount,
    receivingAdmin,
    transferingAmountAfterTransaction,
    receivingAdminsToatalAfterTransaction,
  ]);
  return (
    <div className="container">
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
      {showLoader ? (
        <Loader />
      ) : (
        <>
          <div className="row mx-auto">
            <div className="col-md-6 mx-auto">
              <h6 className="text-center text-primary mb-3">
                Transfer To Which Admin?
              </h6>
              <div className=" mx-auto mb-3">
                <select
                  className="form-select"
                  defaultValue={""}
                  onChange={changeReceivingAdmin}
                  aria-label="Default select example"
                >
                  <option value="">Select Admin Name</option>
                  {excludeMyData.map((el, ind) => (
                    <option value={el.name} key={ind}>
                      {el.name}
                    </option>
                  ))}
                </select>
              </div>
              {receivingIsSelected ? (
                <>
                  <div className="mb-3">
                    <h6 className="text-center text-primary mb-3">
                      {receivingAdmin.name}'s Total Amount
                    </h6>
                    <h6 className="text-center text-success mb-3">
                      {receivingAdmin.cash}
                    </h6>
                  </div>
                  <div className="mb-3">
                    <h6 className="text-center text-primary mb-3">
                      {receivingAdmin.name}'s Total Amount After Transfer
                    </h6>
                    <h6 className="text-center text-success mb-3">
                      {transferingAmount
                        ? receivingAdmin.cash + parseInt(transferingAmount)
                        : receivingAdmin.cash}
                    </h6>
                  </div>
                </>
              ) : null}
              <h6 className="text-center text-primary mb-3">
                This Transaction is doing by {myData.name}
              </h6>
            </div>
            <div className="col-md-6 mx-auto">
              {isSelected ? (
                <>
                  <div className="mb-3">
                    <h6 className="text-center text-primary mb-3">
                      {`${myData.name}'s Total Amount`}
                    </h6>
                    <h6 className="text-center text-success mb-3">
                      {myData.cash}
                    </h6>
                  </div>
                  {showTransferInput ? (
                    <div className="mb-3">
                      <h6 className="text-center text-primary mb-3">
                        Amount To Transfer
                      </h6>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Amount to Transfer"
                        value={transferingAmount}
                        onChange={(e) => {
                          setTransferingAmount(e.target.value);
                          setTransferingAmountAfterTransaction(
                            e.target.value > 0
                              ? myData.cash - parseInt(e.target.value)
                              : 0
                          );
                          setReceivingAdminsToatalAfterTransaction(
                            e.target.value
                              ? receivingAdmin.cash + parseInt(e.target.value)
                              : receivingAdmin.cash
                          );
                        }}
                      />
                    </div>
                  ) : null}
                  {transferingAmount ? (
                    parseInt(transferingAmount) > myData.cash ? (
                      <div className="mb-3">
                        <h6 className="text-center text-danger mb-3">
                          Transfering More Than Balance
                        </h6>
                      </div>
                    ) : (
                      <div className="mb-3">
                        <h6 className="text-center text-primary mb-3">
                          Transefering Admin's Total Amount After Transfer
                        </h6>
                        <h6 className="text-center text-success mb-3">
                          {transferingAmountAfterTransaction}
                        </h6>
                      </div>
                    )
                  ) : null}
                </>
              ) : null}
            </div>
          </div>
          {receivingIsSelected ? (
            <button
              type="button"
              className="btn btn-success mb-3"
              onClick={() => {
                if (parseInt(transferingAmount) > myData.cash) {
                  alert(
                    "Transfering Amount Can Not Be Greater Than Available Cash"
                  );
                  setTransferingAmount("");
                  setTransferingAmountAfterTransaction(myData.cash);
                  setReceivingAdminsToatalAfterTransaction(receivingAdmin.cash);
                } else if (transferingAmount) {
                  submitData();
                } else {
                  alert("Please Enter Transfering Amount");
                }
              }}
            >
              Transfer Now
            </button>
          ) : null}
        </>
      )}
    </div>
  );
};

export default AdminTransfer;
