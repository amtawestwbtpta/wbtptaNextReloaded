"use client";
import React, { useEffect, useState } from "react";
import { firestore } from "../../context/FirebaseContext";
import { doc, setDoc, getDocs, query, collection } from "firebase/firestore";
import axios from "axios";
import { useGlobalContext } from "../../context/Store";
import Loader from "../../components/Loader";
import {
  getCurrentDateInput,
  getSubmitDateInput,
  todayInString,
  IndianFormat,
  createDownloadLink,
} from "../../modules/calculatefunctions";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
export default function FloodRelief() {
  const {
    state,
    floodReliefState,
    setfloodReliefState,
    floodReliefUpdateTime,
    setfloodReliefUpdateTime,
  } = useGlobalContext();
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [bSearch, setBSearch] = useState("");
  const [sbiSearch, setSbiSearch] = useState("");
  const [pSearch, setPSearch] = useState("");
  const [dSearch, setDSearch] = useState("");
  const [addDonation, setAddDonation] = useState(false);
  const [amount, setAmount] = useState(0);
  const [bandhanAmount, setBandhanAmount] = useState(0);
  const [sbiAmount, setSbiAmount] = useState(0);
  const [parthaAmount, setParthaAmount] = useState(0);
  const [debaAmount, setDebaAmount] = useState(0);
  const [bandhan, setBandhan] = useState([]);
  const [sbi, setSbi] = useState([]);
  const [partha, setPartha] = useState([]);
  const [deba, setDeba] = useState([]);
  const [showAllCollection, setShowAllCollection] = useState(false);
  const [showBandhanCollection, setShowBandhanCollection] = useState(false);
  const [showSbiCollection, setShowSbiCollection] = useState(false);
  const [showParthaCollection, setShowParthaCollection] = useState(false);
  const [showDebaCollection, setShowDebaCollection] = useState(false);
  const [showTotal, setShowTotal] = useState(false);
  const [inputField, setInputField] = useState({
    id: `donor${floodReliefState.length + 101}-${uuid().split("-")[0]}`,
    name: "",
    amount: "",
    date: todayInString(),
    bank: "PARTHA",
    sl: floodReliefState.length + 101,
  });
  const [editField, setEditField] = useState({
    id: "",
    name: "",
    amount: "",
    date: todayInString(),
    bank: "PARTHA",
    sl: floodReliefState.length + 101,
  });

  const [showEditForm, setShowEditForm] = useState(false);

  const getData = async () => {
    try {
      setShowLoader(true);
      // const querySnapshot = await getDocs(
      //   query(collection(firestore, "floodrelief"))
      // );
      // const data = querySnapshot.docs.map((doc) => ({
      //   // doc.data() is never undefined for query doc snapshots
      //   ...doc.data(),
      //   id: doc.id,
      // }));
      const url = `/api/getRelief`;
      const response = await axios.post(url);
      const data = response.data.data;
      updateComp(data);
    } catch (error) {
      console.error("Error getting documents: ", error);
      setShowLoader(false);
    }
  };

  const submitData = async () => {
    setShowLoader(true);
    try {
      // await setDoc(doc(firestore, "floodrelief", inputField.id), inputField);
      setAddDonation(false);
      const url = `/api/addRelief`;
      const response = await axios.post(url, inputField);
      const record = response.data;
      if (record.success) {
        let x = floodReliefState;
        x = [...x, inputField];
        updateComp(x);
        setShowLoader(false);
        toast.success("Flood Relief Data Added Successfully");
      } else {
        toast.error("Error in Adding Flood Relief Data");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
      setShowLoader(false);
      toast.error("Error in Adding Flood Relief Data");
    }
  };

  const updateComp = (data) => {
    const newData = data.sort((a, b) => a.sl - b.sl);
    setAllData(newData);
    setFilteredData(newData);
    setfloodReliefState(newData);

    setInputField({
      id: `donor${newData.length + 101}-${uuid().split("-")[0]}`,
      name: "",
      amount: "",
      date: todayInString(),
      bank: "PARTHA",
      sl: newData.length + 101,
    });
    setfloodReliefUpdateTime(Date.now());
    let x = 0;
    newData.map((doc) => (x = x + doc.amount));
    const bandhanData = newData.filter((doc) => doc.bank === "BANDHAN");
    const sbiData = newData.filter((doc) => doc.bank === "SBI");
    const parthaData = newData.filter((doc) => doc.bank === "PARTHA");
    const debaData = newData.filter((doc) => doc.bank === "DEBASHISH");
    let b = 0;
    bandhanData.map((doc) => (b = b + doc.amount));
    let s = 0;
    sbiData.map((doc) => (s = s + doc.amount));
    let p = 0;
    parthaData.map((doc) => (p = p + doc.amount));
    let d = 0;
    debaData.map((doc) => (d = d + doc.amount));
    setBandhanAmount(b);
    setSbiAmount(s);
    setParthaAmount(p);
    setDebaAmount(d);
    setBandhan(bandhanData);
    setSbi(sbiData);
    setPartha(parthaData);
    setDeba(debaData);
    setAmount(x);
    setShowLoader(false);
    setShowAllCollection(true);
    setShowTotal(true);
  };

  const updateData = async () => {
    setShowLoader(true);
    try {
      // await setDoc(doc(firestore, "floodrelief", editField.id), editField);
      const url = `/api/updateRelief`;
      const response = await axios.post(url, editField);
      const record = response.data;
      if (record.success) {
        let x = floodReliefState;
        let index = x.findIndex((doc) => doc.id === editField.id);
        x[index] = editField;
        updateComp([...x]);
        // getData();
        setShowLoader(false);
        setShowEditForm(false);
        toast.success("Flood Relief Data Updated Successfully");
      } else {
        toast.error("Error in Updating Flood Relief Data");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
      setShowLoader(false);
      toast.error("Error in Updating Flood Relief Data");
    }
  };
  const deleteData = async (id) => {
    setShowLoader(true);
    try {
      // await deleteDoc(doc(firestore, "floodrelief", id));
      const url = `/api/delRelief`;
      const response = await axios.post(url, { id });
      const record = response.data;
      if (record.success) {
        let x = floodReliefState;
        let index = x.findIndex((doc) => doc.id === id);
        x.splice(index, 1);
        updateComp([...x]);

        // getData();
        toast.success("Flood Relief Data Deleted Successfully");
      } else {
        toast.error("Error in Deleting Flood Relief Data");
      }
    } catch (error) {
      console.error("Error deleting document: ", error);
      setShowLoader(false);
      toast.error("Error in Deleting Flood Relief Data");
    }
  };

  useEffect(() => {
    const difference = (Date.now() - floodReliefUpdateTime) / 1000 / 60 / 15;
    if (floodReliefState.length === 0 || difference >= 1) {
      getData();
    } else {
      updateComp(floodReliefState);
    }

    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // eslint-disable-next-line
  }, [
    floodReliefState,
    allData,
    filteredData,
    bandhan,
    sbi,
    partha,
    inputField,
    editField,
  ]);
  return (
    <div className="container my-3">
      {showLoader && <Loader />}
      {state === "admin" && (
        <div className="mb-3 noprint">
          <button
            type="button"
            className={`btn m-1 btn-${addDonation ? `primary` : `success`}`}
            onClick={() => setAddDonation(!addDonation)}
          >
            {addDonation ? "Hide Donation" : "Add New Donation"}
          </button>
          <button
            type="button"
            className="btn btn-sm m-3 btn-warning"
            onClick={() => {
              createDownloadLink(floodReliefState, "floodrelief");
            }}
          >
            Download Donation Data
          </button>
        </div>
      )}
      <h3 className="mb-3">Flood Relief Fund Raiser for Flood Disaster 2024</h3>
      {!showLoader && (
        <div className="mb-3 noprint">
          <button
            type="button"
            className={`btn m-1 btn-${
              showAllCollection ? `primary` : `success`
            }`}
            onClick={() => {
              setShowAllCollection(!showAllCollection);
              setShowBandhanCollection(false);
              setShowSbiCollection(false);
              setShowParthaCollection(false);
              setShowDebaCollection(false);
            }}
          >
            {showAllCollection ? "Hide All Collection" : "Show All Collection"}
          </button>
          <button
            type="button"
            className={`btn m-1 btn-${
              showBandhanCollection ? `primary` : `success`
            }`}
            onClick={() => {
              setShowAllCollection(false);
              setShowBandhanCollection(!showBandhanCollection);
              setShowSbiCollection(false);
              setShowParthaCollection(false);
              setShowDebaCollection(false);
            }}
          >
            {showBandhanCollection
              ? "Hide Bandhan Collection"
              : "Show Bandhan Collection"}
          </button>
          <button
            type="button"
            className={`btn m-1 btn-${
              showSbiCollection ? `primary` : `success`
            }`}
            onClick={() => {
              setShowAllCollection(false);
              setShowBandhanCollection(false);
              setShowSbiCollection(!showSbiCollection);
              setShowParthaCollection(false);
              setShowDebaCollection(false);
            }}
          >
            {showSbiCollection ? "Hide SBI Collection" : "Show SBI Collection"}
          </button>
          <button
            type="button"
            className={`btn m-1 btn-${
              showParthaCollection ? `primary` : `success`
            }`}
            onClick={() => {
              setShowAllCollection(false);
              setShowBandhanCollection(false);
              setShowSbiCollection(false);
              setShowParthaCollection(!showParthaCollection);
              setShowDebaCollection(false);
            }}
          >
            {showParthaCollection
              ? "Hide PARTHA Collection"
              : "Show PARTHA Collection"}
          </button>
          <button
            type="button"
            className={`btn m-1 btn-${
              showDebaCollection ? `primary` : `success`
            }`}
            onClick={() => {
              setShowAllCollection(false);
              setShowBandhanCollection(false);
              setShowSbiCollection(false);
              setShowParthaCollection(false);
              setShowDebaCollection(!showDebaCollection);
            }}
          >
            {showDebaCollection
              ? "Hide DEBASHISH Collection"
              : "Show DEBASHISH Collection"}
          </button>
        </div>
      )}

      {state === "admin" && addDonation && !showEditForm && (
        <div className="mb-3 row col-md-6 mx-auto justify-content-center align-items-center noprint">
          <form action="" method="post" autoComplete="off">
            <div className="mb-3">
              <label htmlFor="name">Teacher's Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Enter Teacher's name"
                value={inputField.name}
                onChange={(e) =>
                  setInputField({
                    ...inputField,
                    name: e.target.value.toUpperCase(),
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                id="amount"
                name="amount"
                placeholder="Enter Amount"
                className="form-control"
                value={inputField.amount}
                onChange={(e) =>
                  setInputField({
                    ...inputField,
                    amount: parseInt(e.target.value),
                  })
                }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="bank" className="form-label">
                Bank:
              </label>
              <select
                className="form-select"
                aria-label=".form-select-sm example"
                required
                id="bank"
                defaultValue={inputField.bank}
                onChange={(e) => {
                  setInputField({
                    ...inputField,
                    bank: e.target.value,
                  });
                }}
              >
                <option value="">Select Bank</option>
                <option value={"PARTHA"}>PARTHA</option>
                <option value={"DEBASHISH"}>DEBASHISH</option>
                <option value={"BANDHAN"}>BANDHAN</option>
                <option value={"SBI"}>SBI</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                className="form-control"
                defaultValue={getCurrentDateInput(inputField.date)}
                onChange={(e) =>
                  setInputField({
                    ...inputField,
                    date: getSubmitDateInput(e.target.value),
                  })
                }
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                if (
                  inputField.name !== "" &&
                  inputField.amount !== "" &&
                  inputField.bank !== ""
                ) {
                  submitData();
                } else {
                  toast.error("All fields are required");
                }
              }}
            >
              Add
            </button>
            <button
              type="button"
              className="btn btn-danger m-1"
              onClick={() => {
                setInputField({
                  id: `donor${floodReliefState.length + 101}`,
                  name: "",
                  amount: "",
                  date: todayInString(),
                  bank: "BANDHAN",
                });
              }}
            >
              Clear
            </button>
          </form>
        </div>
      )}
      {state === "admin" && !addDonation && showEditForm && (
        <div className="noprint">
          <form action="" method="post" autoComplete="off">
            <div className="mb-3">
              <label htmlFor="editName">Teacher's Name:</label>
              <input
                type="text"
                id="editName"
                name="editName"
                className="form-control"
                placeholder="Enter Teacher's name"
                value={editField.name}
                onChange={(e) =>
                  setEditField({
                    ...editField,
                    name: e.target.value.toUpperCase(),
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="editAmount">Amount:</label>
              <input
                type="number"
                id="editAmount"
                name="editAmount"
                placeholder="Enter Amount"
                className="form-control"
                value={editField.amount}
                onChange={(e) => {
                  setEditField({
                    ...editField,
                    amount: parseInt(e.target.value),
                  });
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="editBank" className="form-label">
                Bank:
              </label>
              <select
                className="form-select"
                aria-label=".form-select-sm example"
                required
                id="editBank"
                defaultValue={editField.bank}
                onChange={(e) => {
                  setEditField({
                    ...editField,
                    bank: e.target.value,
                  });
                }}
              >
                <option value="">Select Bank</option>
                <option value={"PARTHA"}>PARTHA</option>
                <option value={"DEBASHISH"}>DEBASHISH</option>
                <option value={"BANDHAN"}>BANDHAN</option>
                <option value={"SBI"}>SBI</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="editDate">Date:</label>
              <input
                type="date"
                id="editdate"
                name="editdate"
                className="form-control"
                defaultValue={getCurrentDateInput(editField.date)}
                onChange={(e) =>
                  setEditField({
                    ...editField,
                    date: getSubmitDateInput(e.target.value),
                  })
                }
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                if (
                  editField.name !== "" &&
                  editField.amount !== "" &&
                  editField.bank !== ""
                ) {
                  updateData();
                } else {
                  toast.error("All fields are required");
                }
              }}
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-danger m-1"
              onClick={() => setShowEditForm(false)}
            >
              Close
            </button>
          </form>
        </div>
      )}
      {showTotal && (
        <div className="mb-3">
          <h5>
            Total Amount Collected By Maidul&#8217;s Bandhan Account ₹{" "}
            {IndianFormat(bandhanAmount)}
          </h5>
          <h5>
            Total Amount Collected By Maidul&#8217;s SBI Account ₹{" "}
            {IndianFormat(sbiAmount)}
          </h5>
          <h5>
            Maidul&#8217;s Total Collection ₹{" "}
            {IndianFormat(bandhanAmount + sbiAmount)}
          </h5>
          <h5>
            Total Amount Collected By Partha ₹ {IndianFormat(parthaAmount)}
          </h5>
          <h5>
            Total Amount Collected By Debashish ₹ {IndianFormat(debaAmount)}
          </h5>
          <h5 className="mb-3">
            Total Amount Collected is ₹ {IndianFormat(amount)}
          </h5>
          {showAllCollection && (
            <h5 className="text-success">Showing Total Collection</h5>
          )}
          {showBandhanCollection && (
            <h5 className="text-success">
              Showing Maidul&#8217;s Bandhan Account Collection
            </h5>
          )}
          {showSbiCollection && (
            <h5 className="text-success">
              Showing Maidul&#8217;s SBI Account Collection
            </h5>
          )}
          {showParthaCollection && (
            <h5 className="text-success">
              Showing Partha&#8217;s Account Collection
            </h5>
          )}
          {showDebaCollection && (
            <h5 className="text-success">
              Showing Debashish&#8217;s Account Collection
            </h5>
          )}
        </div>
      )}

      {showTotal &&
        !showLoader &&
        (showAllCollection ||
          showBandhanCollection ||
          showSbiCollection ||
          showParthaCollection ||
          showDebaCollection) && (
          <button
            type="button"
            className="btn btn-primary m-1 noprint"
            style={{ fontSize: 14 }}
            onClick={() => {
              if (typeof window !== "undefined") {
                window.print();
              }
            }}
          >
            Print
          </button>
        )}

      {/* {!showLoader && !showEditForm && (
        <div>
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            highlightOnHover
            fixedHeader
            subHeader
            subHeaderComponent={
              <input
                type="text"
                placeholder="Search Teacher's Name"
                className="col-md-4 mb-3 form-control noprint"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (e.target.value) {
                    const filtered = allData.filter((item) =>
                      item.name
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    );
                    setFilteredData(filtered);
                  } else {
                    setFilteredData(allData);
                  }
                }}
              />
            }
            subHeaderAlign="right"
          />
        </div>
      )}
      {!showEditForm && (
        <div className="mb-3">
          <DataTable
            columns={columns}
            data={bandhan}
            pagination
            highlightOnHover
            fixedHeader
            subHeader
            subHeaderComponent={
              <input
                type="text"
                placeholder="Search Teacher's Name"
                className="col-md-4 mb-3 form-control noprint"
                value={bSearch}
                onChange={(e) => {
                  setBSearch(e.target.value);
                  if (e.target.value) {
                    let x = allData.filter((entry) => entry.bank === "BANDHAN");
                    x = x.filter((entry) =>
                      entry.name
                        .toLowerCase()
                        .match(e.target.value.toLowerCase())
                    );
                    setFilteredData(x);
                  } else {
                    setFilteredData(
                      allData.filter((entry) => entry.bank === "BANDHAN")
                    );
                  }
                }}
              />
            }
            subHeaderAlign="right"
          />
        </div>
      )}
      {!showEditForm && (
        <div className="mb-3">
          <DataTable
            columns={columns}
            data={sbi}
            pagination
            highlightOnHover
            fixedHeader
            subHeader
            subHeaderComponent={
              <input
                type="text"
                placeholder="Search Teacher's Name"
                className="col-md-4 mb-3 form-control noprint"
                value={sbiSearch}
                onChange={(e) => {
                  setSbiSearch(e.target.value);
                  if (e.target.value) {
                    let x = allData.filter((entry) => entry.bank === "SBI");
                    x = x.filter((entry) =>
                      entry.name
                        .toLowerCase()
                        .match(e.target.value.toLowerCase())
                    );
                    setFilteredData(x);
                  } else {
                    setFilteredData(
                      allData.filter((entry) => entry.bank === "SBI")
                    );
                  }
                }}
              />
            }
            subHeaderAlign="right"
          />
        </div>
      )}
      {!showEditForm && (
        <div className="mb-3">
          <DataTable
            columns={columns}
            data={partha}
            pagination
            highlightOnHover
            fixedHeader
            subHeader
            subHeaderComponent={
              <input
                type="text"
                placeholder="Search Teacher's Name"
                className="col-md-4 mb-3 form-control noprint"
                value={pSearch}
                onChange={(e) => {
                  setPSearch(e.target.value);
                  if (e.target.value) {
                    let x = allData.filter((entry) => entry.bank === "PARTHA");
                    x = x.filter((entry) =>
                      entry.name
                        .toLowerCase()
                        .match(e.target.value.toLowerCase())
                    );
                    setFilteredData(x);
                  } else {
                    setFilteredData(
                      allData.filter((entry) => entry.bank === "PARTHA")
                    );
                  }
                }}
              />
            }
            subHeaderAlign="right"
          />
        </div>
      )} */}

      {showAllCollection && !showEditForm && (
        <div>
          <input
            type="text"
            placeholder="Search Teacher's Name"
            className="col-md-4 mb-3 form-control noprint"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (e.target.value) {
                const filtered = allData.filter((item) =>
                  item.name.toLowerCase().includes(e.target.value.toLowerCase())
                );
                setFilteredData(filtered);
              } else {
                setFilteredData(allData);
              }
            }}
          />
          {filteredData.length > 0 ? (
            <table
              style={{
                width: "100%",
                overflowX: "scroll",
                marginBottom: "20px",
                border: "1px solid",
                verticalAlign: "middle",
              }}
              className="table table-responsive table-hover table-striped rounded-4 container px-lg-3 py-lg-2"
            >
              <thead>
                <tr
                  style={{
                    border: "1px solid",
                  }}
                  className="text-center p-1"
                >
                  <th
                    style={{
                      border: "1px solid",
                    }}
                    className="text-center p-1"
                  >
                    Sl
                  </th>
                  <th
                    style={{
                      border: "1px solid",
                    }}
                    className="text-center p-1"
                  >
                    Name
                  </th>
                  <th
                    style={{
                      border: "1px solid",
                    }}
                    className="text-center p-1"
                  >
                    Amount
                  </th>
                  <th
                    style={{
                      border: "1px solid",
                    }}
                    className="text-center p-1"
                  >
                    Date
                  </th>
                  <th
                    style={{
                      border: "1px solid",
                    }}
                    className="text-center p-1"
                  >
                    Bank
                  </th>
                  {state === "admin" && (
                    <th
                      style={{
                        border: "1px solid",
                      }}
                      className="text-center p-1 noprint"
                    >
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((data, index) => (
                  <tr key={index} className="teacher-tr">
                    <td
                      className="text-center nobreak"
                      style={{ border: "1px solid" }}
                    >
                      {index + 1}
                    </td>
                    <td
                      className="text-center nobreak"
                      style={{ border: "1px solid" }}
                    >
                      {data.name}
                    </td>
                    <td
                      className="text-center nobreak"
                      style={{ border: "1px solid" }}
                    >
                      ₹ {IndianFormat(data.amount)}
                    </td>
                    <td
                      className="text-center nobreak"
                      style={{ border: "1px solid" }}
                    >
                      {data.date}
                    </td>
                    <td
                      className="text-center nobreak"
                      style={{ border: "1px solid" }}
                    >
                      {data.bank}
                    </td>
                    {state === "admin" && (
                      <td
                        className="text-center noprint nobreak"
                        style={{ border: "1px solid" }}
                      >
                        <button
                          type="button"
                          className="btn btn-primary m-1 btn-sm"
                          style={{ fontSize: 8 }}
                          onClick={() => {
                            setEditField(data);
                            setShowEditForm(true);
                            setTimeout(() => {
                              document.getElementById("editdate").value =
                                getCurrentDateInput(data.date);
                            }, 200);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger m-1 btn-sm"
                          style={{ fontSize: 8 }}
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this Transaction?"
                              )
                            ) {
                              deleteData(data.id);
                            } else {
                              // Do nothing!
                              toast.error("No Changes");
                            }
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h5>No Data</h5>
          )}
        </div>
      )}
      {showBandhanCollection && !showEditForm && (
        <div>
          <input
            type="text"
            placeholder="Search Teacher's Name"
            className="col-md-4 mb-3 form-control noprint"
            value={bSearch}
            onChange={(e) => {
              setBSearch(e.target.value);
              if (e.target.value) {
                let x = allData.filter((entry) => entry.bank === "BANDHAN");
                x = x.filter((entry) =>
                  entry.name.toLowerCase().match(e.target.value.toLowerCase())
                );
                setBandhan(x);
              } else {
                setBandhan(allData.filter((entry) => entry.bank === "BANDHAN"));
              }
            }}
          />
          {bandhan.length > 0 ? (
            <table
              style={{
                width: "100%",
                overflowX: "scroll",
                marginBottom: "20px",
                border: "1px solid",
                verticalAlign: "middle",
              }}
              className="table table-responsive table-hover table-striped rounded-4 container px-lg-3 py-lg-2"
            >
              <thead>
                <tr
                  style={{
                    border: "1px solid",
                  }}
                  className="text-center p-1"
                >
                  <th
                    style={{
                      border: "1px solid",
                    }}
                    className="text-center p-1"
                  >
                    Sl
                  </th>
                  <th
                    style={{
                      border: "1px solid",
                    }}
                    className="text-center p-1"
                  >
                    Name
                  </th>
                  <th
                    style={{
                      border: "1px solid",
                    }}
                    className="text-center p-1"
                  >
                    Amount
                  </th>
                  <th
                    style={{
                      border: "1px solid",
                    }}
                    className="text-center p-1"
                  >
                    Date
                  </th>
                  <th
                    style={{
                      border: "1px solid",
                    }}
                    className="text-center p-1"
                  >
                    Bank
                  </th>
                  {state === "admin" && (
                    <th
                      style={{
                        border: "1px solid",
                      }}
                      className="text-center p-1 noprint"
                    >
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {bandhan.map((data, index) => (
                  <tr key={index} className="teacher-tr">
                    <td
                      className="text-center nobreak"
                      style={{ border: "1px solid" }}
                    >
                      {index + 1}
                    </td>
                    <td
                      className="text-center nobreak"
                      style={{ border: "1px solid" }}
                    >
                      {data.name}
                    </td>
                    <td
                      className="text-center nobreak"
                      style={{ border: "1px solid" }}
                    >
                      ₹ {IndianFormat(data.amount)}
                    </td>
                    <td
                      className="text-center nobreak"
                      style={{ border: "1px solid" }}
                    >
                      {data.date}
                    </td>
                    <td
                      className="text-center nobreak"
                      style={{ border: "1px solid" }}
                    >
                      {data.bank}
                    </td>
                    {state === "admin" && (
                      <td
                        className="text-center noprint nobreak"
                        style={{ border: "1px solid" }}
                      >
                        <button
                          type="button"
                          className="btn btn-primary m-1 btn-sm"
                          style={{ fontSize: 8 }}
                          onClick={() => {
                            setEditField(data);
                            setShowEditForm(true);
                            setTimeout(() => {
                              document.getElementById("editdate").value =
                                getCurrentDateInput(data.date);
                            }, 200);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger m-1 btn-sm"
                          style={{ fontSize: 8 }}
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this Transaction?"
                              )
                            ) {
                              deleteData(data.id);
                            } else {
                              // Do nothing!
                              toast.error("No Changes");
                            }
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h5>No Data</h5>
          )}
        </div>
      )}
      {showSbiCollection && !showEditForm && (
        <div>
          <input
            type="text"
            placeholder="Search Teacher's Name"
            className="col-md-4 mb-3 form-control noprint"
            value={sbiSearch}
            onChange={(e) => {
              setSbiSearch(e.target.value);
              if (e.target.value) {
                let x = allData.filter((entry) => entry.bank === "SBI");
                x = x.filter((entry) =>
                  entry.name.toLowerCase().match(e.target.value.toLowerCase())
                );
                setSbi(x);
              } else {
                setSbi(allData.filter((entry) => entry.bank === "SBI"));
              }
            }}
          />
          {sbi.length > 0 ? (
            <table
              style={{
                width: "100%",
                overflowX: "scroll",
                marginBottom: "20px",
                border: "1px solid",
                verticalAlign: "middle",
              }}
              className="table table-responsive table-hover table-striped rounded-4 container px-lg-3 py-lg-2"
            >
              <thead>
                <tr
                  style={{
                    border: "1px solid",
                  }}
                  className="text-center p-1"
                >
                  <th
                    style={{
                      border: "1px solid",
                    }}
                    className="text-center p-1"
                  >
                    Sl
                  </th>
                  <th
                    style={{
                      border: "1px solid",
                    }}
                    className="text-center p-1"
                  >
                    Name
                  </th>
                  <th
                    style={{
                      border: "1px solid",
                    }}
                    className="text-center p-1"
                  >
                    Amount
                  </th>
                  <th
                    style={{
                      border: "1px solid",
                    }}
                    className="text-center p-1"
                  >
                    Date
                  </th>
                  <th
                    style={{
                      border: "1px solid",
                    }}
                    className="text-center p-1"
                  >
                    Bank
                  </th>
                  {state === "admin" && (
                    <th
                      style={{
                        border: "1px solid",
                      }}
                      className="text-center p-1 noprint"
                    >
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {sbi.map((data, index) => (
                  <tr key={index} className="teacher-tr">
                    <td
                      className="text-center nobreak"
                      style={{ border: "1px solid" }}
                    >
                      {index + 1}
                    </td>
                    <td
                      className="text-center nobreak"
                      style={{ border: "1px solid" }}
                    >
                      {data.name}
                    </td>
                    <td
                      className="text-center nobreak"
                      style={{ border: "1px solid" }}
                    >
                      ₹ {IndianFormat(data.amount)}
                    </td>
                    <td
                      className="text-center nobreak"
                      style={{ border: "1px solid" }}
                    >
                      {data.date}
                    </td>
                    <td
                      className="text-center nobreak"
                      style={{ border: "1px solid" }}
                    >
                      {data.bank}
                    </td>
                    {state === "admin" && (
                      <td
                        className="text-center noprint nobreak"
                        style={{ border: "1px solid" }}
                      >
                        <button
                          type="button"
                          className="btn btn-primary m-1 btn-sm"
                          style={{ fontSize: 8 }}
                          onClick={() => {
                            setEditField(data);
                            setShowEditForm(true);
                            setTimeout(() => {
                              document.getElementById("editdate").value =
                                getCurrentDateInput(data.date);
                            }, 200);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger m-1 btn-sm"
                          style={{ fontSize: 8 }}
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this Transaction?"
                              )
                            ) {
                              deleteData(data.id);
                            } else {
                              // Do nothing!
                              toast.error("No Changes");
                            }
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h5>No Data</h5>
          )}
        </div>
      )}
      {showParthaCollection && !showEditForm && (
        <div>
          <input
            type="text"
            placeholder="Search Teacher's Name"
            className="col-md-4 mb-3 form-control noprint"
            value={pSearch}
            onChange={(e) => {
              setPSearch(e.target.value);
              if (e.target.value) {
                let x = allData.filter((entry) => entry.bank === "PARTHA");
                x = x.filter((entry) =>
                  entry.name.toLowerCase().match(e.target.value.toLowerCase())
                );
                setPartha(x);
              } else {
                setPartha(allData.filter((entry) => entry.bank === "PARTHA"));
              }
            }}
          />
          {partha.length > 0 ? (
            <table
              style={{
                width: "100%",
                overflowX: "scroll",
                marginBottom: "20px",
                border: "1px solid",
                verticalAlign: "middle",
              }}
              className="table table-responsive table-hover table-striped rounded-4 container px-lg-3 py-lg-2"
            >
              <thead>
                <tr
                  style={{
                    border: "1px solid",
                  }}
                  className="text-center p-1"
                >
                  <th
                    style={{
                      border: "1px solid",
                    }}
                    className="text-center p-1"
                  >
                    Sl
                  </th>
                  <th
                    style={{
                      border: "1px solid",
                    }}
                    className="text-center p-1"
                  >
                    Name
                  </th>
                  <th
                    style={{
                      border: "1px solid",
                    }}
                    className="text-center p-1"
                  >
                    Amount
                  </th>
                  <th
                    style={{
                      border: "1px solid",
                    }}
                    className="text-center p-1"
                  >
                    Date
                  </th>
                  <th
                    style={{
                      border: "1px solid",
                    }}
                    className="text-center p-1"
                  >
                    Bank
                  </th>
                  {state === "admin" && (
                    <th
                      style={{
                        border: "1px solid",
                      }}
                      className="text-center p-1 noprint"
                    >
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {partha.map((data, index) => (
                  <tr key={index} className="teacher-tr">
                    <td
                      className="text-center nobreak"
                      style={{ border: "1px solid" }}
                    >
                      {index + 1}
                    </td>
                    <td
                      className="text-center nobreak"
                      style={{ border: "1px solid" }}
                    >
                      {data.name}
                    </td>
                    <td
                      className="text-center nobreak"
                      style={{ border: "1px solid" }}
                    >
                      ₹ {IndianFormat(data.amount)}
                    </td>
                    <td
                      className="text-center nobreak"
                      style={{ border: "1px solid" }}
                    >
                      {data.date}
                    </td>
                    <td
                      className="text-center nobreak"
                      style={{ border: "1px solid" }}
                    >
                      {data.bank}
                    </td>
                    {state === "admin" && (
                      <td
                        className="text-center noprint nobreak"
                        style={{ border: "1px solid" }}
                      >
                        <button
                          type="button"
                          className="btn btn-primary m-1 btn-sm"
                          style={{ fontSize: 8 }}
                          onClick={() => {
                            setEditField(data);
                            setShowEditForm(true);
                            setTimeout(() => {
                              document.getElementById("editdate").value =
                                getCurrentDateInput(data.date);
                            }, 200);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger m-1 btn-sm"
                          style={{ fontSize: 8 }}
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this Transaction?"
                              )
                            ) {
                              deleteData(data.id);
                            } else {
                              // Do nothing!
                              toast.error("No Changes");
                            }
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h5>No Data</h5>
          )}
        </div>
      )}
      {showDebaCollection && !showEditForm && (
        <div>
          <input
            type="text"
            placeholder="Search Teacher's Name"
            className="col-md-4 mb-3 form-control noprint"
            value={dSearch}
            onChange={(e) => {
              setDSearch(e.target.value);
              if (e.target.value) {
                let x = allData.filter((entry) => entry.bank === "DEBASHISH");
                x = x.filter((entry) =>
                  entry.name.toLowerCase().match(e.target.value.toLowerCase())
                );
                setDeba(x);
              } else {
                setDeba(allData.filter((entry) => entry.bank === "DEBASHISH"));
              }
            }}
          />
          {deba.length > 0 ? (
            <table
              style={{
                width: "100%",
                overflowX: "scroll",
                marginBottom: "20px",
                border: "1px solid",
                verticalAlign: "middle",
              }}
              className="table table-responsive table-hover table-striped rounded-4 container px-lg-3 py-lg-2"
            >
              <thead>
                <tr
                  style={{
                    border: "1px solid",
                  }}
                  className="text-center p-1"
                >
                  <th
                    style={{
                      border: "1px solid",
                    }}
                    className="text-center p-1"
                  >
                    Sl
                  </th>
                  <th
                    style={{
                      border: "1px solid",
                    }}
                    className="text-center p-1"
                  >
                    Name
                  </th>
                  <th
                    style={{
                      border: "1px solid",
                    }}
                    className="text-center p-1"
                  >
                    Amount
                  </th>
                  <th
                    style={{
                      border: "1px solid",
                    }}
                    className="text-center p-1"
                  >
                    Date
                  </th>
                  <th
                    style={{
                      border: "1px solid",
                    }}
                    className="text-center p-1"
                  >
                    Bank
                  </th>
                  {state === "admin" && (
                    <th
                      style={{
                        border: "1px solid",
                      }}
                      className="text-center p-1 noprint"
                    >
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {deba.map((data, index) => (
                  <tr key={index} className="teacher-tr">
                    <td
                      className="text-center nobreak"
                      style={{ border: "1px solid" }}
                    >
                      {index + 1}
                    </td>
                    <td
                      className="text-center nobreak"
                      style={{ border: "1px solid" }}
                    >
                      {data.name}
                    </td>
                    <td
                      className="text-center nobreak"
                      style={{ border: "1px solid" }}
                    >
                      ₹ {IndianFormat(data.amount)}
                    </td>
                    <td
                      className="text-center nobreak"
                      style={{ border: "1px solid" }}
                    >
                      {data.date}
                    </td>
                    <td
                      className="text-center nobreak"
                      style={{ border: "1px solid" }}
                    >
                      {data.bank}
                    </td>
                    {state === "admin" && (
                      <td
                        className="text-center noprint nobreak"
                        style={{ border: "1px solid" }}
                      >
                        <button
                          type="button"
                          className="btn btn-primary m-1 btn-sm"
                          style={{ fontSize: 8 }}
                          onClick={() => {
                            setEditField(data);
                            setShowEditForm(true);
                            setTimeout(() => {
                              document.getElementById("editdate").value =
                                getCurrentDateInput(data.date);
                            }, 200);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger m-1 btn-sm"
                          style={{ fontSize: 8 }}
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this Transaction?"
                              )
                            ) {
                              deleteData(data.id);
                            } else {
                              // Do nothing!
                              toast.error("No Changes");
                            }
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h5>No Data</h5>
          )}
        </div>
      )}

      {showTotal &&
        !showLoader &&
        (showAllCollection ||
          showBandhanCollection ||
          showSbiCollection ||
          showParthaCollection) && (
          <button
            type="button"
            className="btn btn-primary m-1 noprint"
            style={{ fontSize: 14 }}
            onClick={() => {
              if (typeof window !== "undefined") {
                window.print();
              }
            }}
          >
            Print
          </button>
        )}
    </div>
  );
}
