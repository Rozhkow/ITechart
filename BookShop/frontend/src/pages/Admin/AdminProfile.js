import { useQuery, useMutation } from "@apollo/client";
import _ from "lodash";
import React, { useState, useReducer, useEffect } from "react";
import { Table, Button, Container, Checkbox } from "semantic-ui-react";
import { CSVLink } from "react-csv";

import { Link } from "react-router-dom";
import DeleteButton from "../../components/DeleteButton";
import ReactPaginate from "react-paginate";

import "./AdminProfile.css";
import { ALL_USERS } from "../../util/graphql";
import { DELETE_USER_MUTATION } from "../../util/graphql";

function sortReducer(state, action) {
  switch (action.type) {
    // case "CHANGE_SORT":
    //   if (state.column === action.column) {
    //     return {
    //       ...state,
    //       users: state.users.slice().reverse(),
    //       direction:
    //         state.direction === "ascending" ? "descending" : "ascending",
    //     };
    //   }

    //   return {
    //     column: action.column,
    //     users: _.sortBy(state.users, [action.column]),
    //     direction: "ascending",
    //   };
    case "UPDATE_USERS":
      return {
        ...state,
        users: action.payload,
      };
    default:
      throw new Error();
  }
}

function setSortedColumn(state, action) {
  if (action.type) {
    if (state.sortedColumn === action.sortedColumn) {
      return {
        ...state,
        users: state.users.slice().reverse(),
        direction: state.direction === "ascending" ? "descending" : "ascending",
      };
    }

    return {
      sortedColumn: action.sortedColumn,
      users: _.sortBy(state.users, [action.sortedColumn]),
      direction: "ascending",
    };
  }
}

function AdminProfilePage({ id }) {
  const [searchTerm, setSearchTerm] = useState("");

  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    update(proxy, result) {
      // TODO: remove users from cache
      if (id) {
        const data = proxy.readQuery({
          query: ALL_USERS,
        });
        let newData = [...data.users];
        newData = [result.data.users, ...newData];
        proxy.writeQuery({
          query: ALL_USERS,
          data: {
            ...data,
            users: {
              newData,
            },
          },
        });
      }
    },
    variables: {
      id,
    },
  });

  const [sortedColumn, setSortedColumn] = useState({
    sortedColumn: null,
    direction: null,
  });

  function FFF(value) {
    return () => {
      setSortedColumn(value);
    };
  }

  const { loading, data } = useQuery(ALL_USERS);

  const [state, dispatch] = useReducer(sortReducer, {
    checked: false,
    column: null,
    users: data ? data.users : [],
    direction: null,
  });

  useEffect(() => {
    if (!loading && data && data.users) {
      dispatch({ type: "UPDATE_USERS", payload: data.users });
    }
  }, [data, loading]); // restart hook if our second argument has changed

  // Pagination

  const { column, users, direction } = state;

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(users.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const csvReport = {
    filename: "Report.csv",
    data: users,
  };

  return (
    <Container className="AdminBlock">
      <div className="Search">
        <input
          type="text"
          placeholder="Search.."
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>

      <Table sortable celled compact>
        <Table.Header>
          <Table.Row textAlign="center" sorted={sortedColumn}>
            <Table.HeaderCell>
              <Checkbox slider />
            </Table.HeaderCell>
            <Table.HeaderCell onClick={FFF("username")}>
              username
            </Table.HeaderCell>
            <Table.HeaderCell onClick={FFF("email")}>email</Table.HeaderCell>
            <Table.HeaderCell onClick={FFF("createdAt")}>
              createdAt
            </Table.HeaderCell>
            <Table.HeaderCell onClick={FFF("id")}>id</Table.HeaderCell>
            <Table.HeaderCell>delete user</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {loading ? (
            <h1>Loading goods..</h1>
          ) : (
            users &&
            users
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.username.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return val;
                }
              })
              .slice(pagesVisited, pagesVisited + usersPerPage)
              .map(({ username, email, createdAt, id }) => (
                <Table.Row textAlign="center" key={username}>
                  <Table.Cell collapsing>
                    <Checkbox slider />{" "}
                  </Table.Cell>
                  <Table.Cell>
                    <Table.Cell as={Link} to={`/users/${id}`}>
                      {username}
                    </Table.Cell>
                  </Table.Cell>
                  <Table.Cell>{email}</Table.Cell>
                  <Table.Cell>{createdAt}</Table.Cell>
                  <Table.Cell>{id}</Table.Cell>
                  <Table.Cell>
                    <DeleteButton userId={id} onConfirm={() => deleteUser} />
                  </Table.Cell>
                </Table.Row>
              ))
          )}
        </Table.Body>
      </Table>

      <div className="App">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>

      <Button className="exportData">
        <CSVLink {...csvReport}>Export data</CSVLink>
      </Button>
    </Container>
  );
}

export default AdminProfilePage;
