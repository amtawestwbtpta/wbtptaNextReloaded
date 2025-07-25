"use client";
import React, { useState, useEffect, useContext } from "react";
import AdminNavBar from "../../components/AdminNavBar";
import AdminTransfer from "../../components/AdminTransfer";
import AdminLedger from "../../components/AdminLedger";
import AdminUpdBalance from "../../components/AdminUpdBalance";
import AdminAccountAddTransaction from "../../components/AdminAccountAddTransaction";
import { firestore } from "../../context/FirebaseContext";
import { collection, getDocs, query } from "firebase/firestore";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import Loader from "../../components/Loader";
import { decryptObjData, getCookie } from "../../modules/encryption";
import { INR, IndianFormat } from "../../modules/calculatefunctions";
const AdminAccounts = () => {
  const { state, setState } = useGlobalContext();
  const router = useRouter();

  const [seletedTab, setSeletedTab] = useState(1);

  let adminName;
  let details = getCookie("tid");
  if (details) {
    adminName = decryptObjData("tid").tname;
  }
  const [data, setData] = useState([]);
  const [myData, setMyData] = useState([]);
  const [showdata, setShowdata] = useState(false);
  const [total, setTotal] = useState("");
  const [exclueOther, setExclueOther] = useState([]);
  const getAccount = async () => {
    const q = query(collection(firestore, "accounts"));

    const querySnapshot = await getDocs(q);
    const datas = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    setExclueOther(datas.filter((el) => el.name !== "OTHERS"));
    setData(datas);
    let cash = 0;
    datas
      .filter((el) => el.name !== "OTHERS")
      .map((el) => {
        cash = cash + el.cash;
        return cash;
      });
    setTotal(cash);
    setMyData(datas.filter((el) => el.name.match(adminName))[0]);
    setShowdata(true);
  };

  const refresh = () => {
    setSeletedTab(1);
  };

  useEffect(() => {
    getAccount();
    document.title = "WBTPTA AMTA WEST:Admin Accounts";
    if (state !== "admin") {
      router.push("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AdminNavBar />
      <div className="container">
        <h3 className="text-center text-primary mb-3">
          Admin Accounts Section
        </h3>
        <h4 className="text-primary text-center my-3">Welcome {adminName}!</h4>
        {showdata ? (
          <>
            <h4 className="text-primary text-center mb-3">
              You Have ₹{myData.amount}
            </h4>
            <div className="mb-3">
              <div
                className="col-md-9 mx-auto rounded text-center text-black"
                style={{ backgroundColor: "rgba(199, 110, 255,.5)" }}
              >
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Cash</th>
                      <th>Recent Transaction</th>
                      <th>Recent Transaction Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exclueOther.map((el, index) => {
                      let dateRecent = new Date(el.recentOn);
                      return (
                        <tr key={index}>
                          <td>{el.name}</td>
                          <td>₹{el.cash}</td>
                          <td>{`${dateRecent.getDate()}-${dateRecent.getMonth()}-${dateRecent.getFullYear()}`}</td>
                          <td>₹{el.recentTransactionAmount}</td>
                        </tr>
                      );
                    })}
                    <tr>
                      <th>Total</th>
                      <th>₹{IndianFormat(total)}</th>
                      <th colSpan={3}>{INR(total)}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-success m-2"
              onClick={() => setSeletedTab(1)}
            >
              Transfer
            </button>
            <button
              type="button"
              className="btn btn-info m-2"
              onClick={() => setSeletedTab(2)}
            >
              Ledger
            </button>
            <button
              type="button"
              className="btn btn-warning m-2"
              onClick={() => setSeletedTab(3)}
            >
              Add
            </button>
            <button
              type="button"
              className="btn btn-primary m-2"
              onClick={() => setSeletedTab(4)}
            >
              Update
            </button>
            <div className="my-3">
              {seletedTab === 1 ? (
                <AdminTransfer
                  data={data}
                  total={total}
                  myData={myData}
                  getAccount={getAccount}
                  refresh={refresh}
                />
              ) : seletedTab === 2 ? (
                <AdminLedger
                  data={data}
                  total={total}
                  myData={myData}
                  getAccount={getAccount}
                  refresh={refresh}
                />
              ) : seletedTab === 3 ? (
                <AdminAccountAddTransaction
                  data={data}
                  total={total}
                  myData={myData}
                  getAccount={getAccount}
                  refresh={refresh}
                />
              ) : (
                <AdminUpdBalance
                  data={data}
                  total={total}
                  myData={myData}
                  getAccount={getAccount}
                  refresh={refresh}
                />
              )}
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default AdminAccounts;
