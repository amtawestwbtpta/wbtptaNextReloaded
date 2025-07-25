"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Loader from "../../components/Loader";

const TeacherDatabaseUnlog = () => {
  const [showTable, setShowTable] = useState(false);

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);

  const userData = async () => {
    fetch(
      "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/allteachers.json"
    )
      .then((res) => res.json())
      .then((data) => {
        let newData = data.sort(function (a, b) {
          var nameA = a.school.toLowerCase(),
            nameB = b.school.toLowerCase();
          if (nameA < nameB)
            //sort string ascending
            return -1;
          if (nameA > nameB) return 1;
          return 0; //default return value (no sorting)
        });
        setData(newData);
        setShowTable(true);
      });
  };

  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Teachers Database";
    userData();
  }, []);
  useEffect(() => {
    const result = data.filter((el) => {
      return el.tname.toLowerCase().match(search.toLowerCase());
    });
    setFilteredData(result);
  }, [search, data]);

  const columns = [
    {
      name: "Sl",
      selector: (row, ind) => ind + 1,
      width: "2",
    },
    {
      name: "Teacher Name",
      selector: (row) => row.tname,
      sortable: true,
      wrap: true,
    },
    {
      name: "School Name",
      selector: (row) => row.school,
      sortable: true,
      wrap: true,
    },
    {
      name: "Mobile",
      selector: (row) =>
        row.gender === "female" || row.association !== "WBTPTA" ? (
          "CONTACT US"
        ) : (
          <a
            href={`tel: +91${row.phone}`}
            className="d-inline-block mb-2 text-decoration-none text-dark"
          >
            <i className="bi bi-telephone-fill"></i>
            {"  "}
            +91{row.phone}
          </a>
        ),
      sortable: false,
      wrap: true,
    },
  ];

  return (
    <div className="container text-center my-3">
      {showTable ? (
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
        <Loader center content="loading" size="lg" />
      )}
    </div>
  );
};

export default TeacherDatabaseUnlog;
