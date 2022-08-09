import axios from "axios";
import React, { useEffect, useState } from "react";
const ToDo = () => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const getApi = async () => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
      setList(res.data);
      console.log(data);
    });
  };

  useEffect(() => {
    getApi();
  });

  const viewPerticularProduct = async (uid) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${uid}`)
      .then((res) => {
        setData(res.data);
      });
  };

  return (
    <>
      <div className="container">
        {/* ******SEARCH******** */}
        <div>
          <label
            style={{ position: "relative", top: "2.5rem", fontSize: "2rem" }}
          >
            TOdos
          </label>
          <input
            type="search"
            className="form-control"
            style={{
              width: "30%",
              marginBottom: "15px",
              borderRadius: "12px",
              marginLeft: "17rem",
            }}
            placeholder="search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-7">
              <div
                style={{
                  maxHeight: "65vh",
                  overflowY: "scroll",
                }}
              >
                <table className="table table-bordered">
                  <thead className="position-sticky">
                    <tr className="thead">
                      <th
                        style={{
                          textAlign: "center",
                          padding: "1rem",
                          display: "flex",
                        }}
                      >
                        ID
                        {/* <FcNumericalSorting12
                          style={{ marginTop: "5px", marginLeft: "2px" }}
                        /> */}
                      </th>
                      <th style={{ textAlign: "center", padding: "1rem" }}>
                        Title
                      </th>
                      <th style={{ textAlign: "center", padding: "1rem" }}>
                        Status
                      </th>
                      <th style={{ textAlign: "center", padding: "1rem" }}>
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {list
                      .filter((val) => {
                        if (search === "") {
                          return val;
                        } else if (
                          val.title.toLowerCase().includes(search.toLowerCase())
                        ) {
                          return val;
                        }
                      })
                      // .sort((a, b) => b.userId - a.userId)
                      .map((lists) => (
                        <tr key={lists.id}>
                          <td>{lists.userId} </td>
                          <td>{lists.title}</td>
                          <td>{lists.completed ? "true" : "false"}</td>
                          <td>
                            <button
                              style={{ border: "none" }}
                              onClick={() => {
                                viewPerticularProduct(lists.userId);
                              }}
                            >
                              View User
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* **********DISPLAY LIST******** */}
            <div className="col-5">
              <div className="form-control">
                <ul style={{ listStyleType: "none", padding: "1rem" }}>
                  <li style={{ margin: "0.7rem" }}>
                    <label>ToDoID : {data?.id}</label>
                  </li>
                  <li style={{ margin: "0.7rem" }}>
                    <label>ToDO Title: {data?.company?.name}</label>
                  </li>
                  <li style={{ margin: "0.7rem" }}>
                    <label>User ID: {data?.id}</label>
                  </li>
                  <li style={{ margin: "0.7rem" }}>
                    <label>Name: {data?.username}</label>
                  </li>
                  <li style={{ margin: "0.7rem" }}>
                    <label>Email: {data?.email}</label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDo;
