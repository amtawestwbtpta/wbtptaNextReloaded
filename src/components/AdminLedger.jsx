import React, { useState, useEffect } from "react";
import { firestore } from "../context/FirebaseContext";
import { collection, getDocs, query } from "firebase/firestore";
import DataTable from "react-data-table-component";
import Loader from "./Loader";
const AdminLedger = () => {
  const [data, setData] = useState([]);
  const [showdata, setShowdata] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  const getLedgers = async () => {
    const q = query(collection(firestore, "ledgers"));

    const querySnapshot = await getDocs(q);
    const datas = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    let newDatas = datas.sort((a, b) => b.transactOn - a.transactOn);
    setData(newDatas);
    setShowdata(true);
  };
  const columns = [
    {
      name: "Sl",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "From",
      selector: (row) => row.transferFrom,
      sortable: true,
      wrap: true,
    },
    {
      name: "To",
      selector: (row) => row.receiveTo,
      sortable: true,
      wrap: true,
    },
    {
      name: "Amount",
      selector: (row) => row.cashTransfered,
      sortable: true,
    },
    {
      name: "Tansferer's\n Cash",
      selector: (row) => row.trnsferersCash,
      sortable: true,
      wrap: true,
    },
    {
      name: "Receiver's\n Cash",
      selector: (row) => row.receiversCash,
      sortable: true,
      wrap: true,
    },
    {
      name: "Date",
      selector: (row) => {
        let date = new Date(row.transactOn);
        return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
      },
      sortable: true,
      wrap: true,
    },
    {
      name: "Done By",
      selector: (row) => row.transactBy,
      sortable: true,
      wrap: true,
    },

    {
      name: "Total\n Cash",
      selector: (row) => row.totalCash,
      sortable: true,
    },
  ];
  useEffect(() => {
    getLedgers();
  }, []);
  useEffect(() => {
    const result = data.filter((el) => {
      return el.transferFrom.toLowerCase().match(search.toLowerCase());
    });
    setFilteredData(result);
  }, [data, search]);
  return (
    <div className="container">
      {showdata ? (
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
              placeholder="Search"
              className="w-25 form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
          subHeaderAlign="right"
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default AdminLedger;
