import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FormGroup, Input, Table } from "reactstrap";
import { addInitData } from "../actions/data-actions";
import axios from "axios";

const DataTable = ({ addInitData, data }) => {
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    const res = await axios.get("/v2/tickers?symbols=ALL");
    addInitData(res.data);
  };

  const handleSearch = () => {
    if (search === "") {
      fetchData();
    } else {
      const searchResult = data.filter((searchItem) =>
        searchItem[0].toLowerCase().includes(search.toLowerCase())
      );
      addInitData(searchResult);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [search]);

  return (
    <div>
      <div className="mt-5" style={{ marginLeft: "20px" }}>
        <FormGroup style={{ width: "10rem" }}>
          <Input
            placeholder="Search...."
            onChange={(e) => setSearch(e.target.value)}
          />
        </FormGroup>
      </div>
      <Table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Last</td>
            <td>24H</td>
            <td>VOL USD</td>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="4">
                <div className="text-center">No Data Found</div>
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item[0]}>
                <td>
                  <a href={`/${item[0]}`}>{String(item[0]).substr(1, 3)} </a>
                </td>
                <td>
                  <a href={`/${item[0]}`}>{item[7].toFixed(1)}</a>
                </td>
                <td>
                  <a href={`/${item[0]}`}>
                    <span
                      style={{
                        color: (item[6] * 100).toFixed(2).startsWith("-")
                          ? "red"
                          : "green",
                      }}
                    >
                      {(item[6] * 100).toFixed(2).split("-")[1]}%
                    </span>
                  </a>
                </td>
                <td>
                  <a href={`/${item[0]}`}>{item[8].toFixed(2)}</a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.reducer.data,
});

const mapDispatchToProps = (dispatch) => ({
  addInitData: (data) => {
    dispatch(addInitData(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
