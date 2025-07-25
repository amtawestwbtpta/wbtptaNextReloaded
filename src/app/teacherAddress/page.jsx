"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";

import DataTable from "react-data-table-component";
import Loader from "../../components/Loader";
const TeacherAddress = () => {
  const { state, teachersState } = useGlobalContext();
  const router = useRouter();

  const [showTable, setShowTable] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const userData = async () => {
    setData(teachersState);
    setShowTable(true);
  };

  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Teacher's Address";
    if (!state) {
      router.push("/login");
    }
    userData();
    // eslint-disable-next-line
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

      center: +true,
    },
    {
      name: "Teacher Name",
      selector: (row) => row.tname,
      sortable: true,
      center: +true,
      wrap: true,
    },
    {
      name: "School Name",
      selector: (row) => row.school,
      sortable: true,
      center: +true,
      wrap: true,
    },
    {
      name: "UDISE NO.",
      selector: (row) => row.udise,

      center: +true,
    },
    {
      name: "Address",
      selector: (row) => row.address,

      center: +true,
      wrap: true,
    },
  ];

  return (
    <div className="container-fluid text-center my-5">
      {showTable ? (
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

export default TeacherAddress;
