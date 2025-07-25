"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import DataTable from "react-data-table-component";
import { useRouter } from "next/navigation";
const FindTeacher = () => {
  const { state, teachersState } = useGlobalContext();
  const router = useRouter();
  useEffect(() => {
    if (!state) {
      router.push("/login");
    }
  });

  const [search, setSearch] = useState("");

  const [filteredData, setFilteredData] = useState(
    teachersState.sort((a, b) => a.school.localeCompare(b.school))
  );

  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Teachers Database";
  }, []);
  useEffect(() => {
    // console.log(data);
    const result = teachersState.filter((el) => {
      return el.tname?.toLowerCase().match(search.toLowerCase());
    });
    setFilteredData(result);
  }, [search]);

  const columns = [
    {
      name: "Sl",
      selector: (row, ind) => ind + 1,
      width: "5",
    },
    {
      name: "Teacher Name",
      selector: (row) => row.tname,
      sortable: true,
      wrap: true,
      center: +true,
    },
    {
      name: "School Name",
      selector: (row) => row.school,
      sortable: true,
      wrap: true,
      center: +true,
    },
    {
      name: "Mobile",
      selector: (row) =>
        state === "admin" ? (
          <a
            href={`tel: +91${row.phone}`}
            className="d-inline-block mb-2 text-decoration-none text-dark"
          >
            <i className="bi bi-telephone-fill"></i>
            {"  "}
            +91{row.phone}
          </a>
        ) : row.gender === "male" ? (
          <a
            href={`tel: +91${row.phone}`}
            className="d-inline-block mb-2 text-decoration-none text-dark"
          >
            <i className="bi bi-telephone-fill"></i>
            {"  "}
            +91{row.phone}
          </a>
        ) : (
          "CONTACT US"
        ),
      sortable: true,
      wrap: true,
      center: +true,
    },
  ];

  return (
    <div className="container text-center my-5">
      <h3 className="text-center text-primary">Displaying Teachers Data</h3>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        paginationPerPage={30}
        highlightOnHover
        fixedHeader
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search"
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        }
        subHeaderAlign="right"
      />
    </div>
  );
};

export default FindTeacher;
