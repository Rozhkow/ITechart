import { useQuery, useMutation } from "@apollo/client";
import _ from "lodash";
import React, { useState, useReducer } from "react";
import { Table, Button, Container, Checkbox } from "semantic-ui-react";
import { CSVLink } from "react-csv";

import { Link } from "react-router-dom";
import DeleteButton from "../../components/DeleteButton";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import Spinner from "../../components/Spinner";

import "./AdminProfile.css";
import { ALL_USERS } from "../../util/graphql";
import { DELETE_USER_MUTATION } from "../../util/graphql";

function sortReducer(state, action) {
  switch (action.type) {
    case "CHANGE_SORT":
      debugger;
      if (state.column === action.column) {
        return {
          ...state,
          users: state.users.slice().reverse(),
          direction:
            state.direction === "ascending" ? "descending" : "ascending",
        };
      }

      return {
        column: action.column,
        users: _.sortBy(state.users, [action.column]),
        direction: "ascending",
      };
    default:
      throw new Error();
  }
}

function AdminProfilePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const { loading, data } = useQuery(ALL_USERS);

  const [selectedUsers, setSelectedUsers] = useState([]);

  const [state, dispatch] = useReducer(sortReducer, {
    column: null,
    direction: null,
  });

  const users = (!loading && data && data?.users) || [];

  // Pagination

  const { column } = state;

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(users.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    update(proxy) {
      // TODO: remove users from cache

      const data = proxy.readQuery({
        query: ALL_USERS,
      });

      const newData = { users: data.users.filter((p) => p.id !== users.id) };
      proxy.writeQuery({
        query: ALL_USERS,
        data: {
          ...data,
          users: {
            newData,
          },
        },
      });
    },
  });

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container className="AdminBlock">
      <Search setSearchTerm={setSearchTerm} />

      <Table sortable celled compact>
        <Table.Header>
          <Table.Row
            textAlign="center"
            sorted={column === "username" && "email" && "createdAt" && "id"}
          >
            <Table.HeaderCell>
              <Checkbox
                checked={selectedUsers.length > 0}
                onClick={() =>
                  selectedUsers.length > 0
                    ? setSelectedUsers([])
                    : setSelectedUsers([...users.map((user) => user.id)])
                }
                slider
              />
            </Table.HeaderCell>
            <Table.HeaderCell
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "username" })
              }
            >
              username
            </Table.HeaderCell>
            <Table.HeaderCell
              onClick={() => dispatch({ type: "CHANGE_SORT", column: "email" })}
            >
              email
            </Table.HeaderCell>
            <Table.HeaderCell
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "createdAt" })
              }
            >
              createdAt
            </Table.HeaderCell>
            <Table.HeaderCell
              onClick={() => dispatch({ type: "CHANGE_SORT", column: "id" })}
            >
              id
            </Table.HeaderCell>
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
                    <Checkbox
                      checked={selectedUsers.includes(id)}
                      onClick={() =>
                        selectedUsers.includes(id)
                          ? setSelectedUsers((set) =>
                              set.filter((selectedId) => selectedId !== id)
                            )
                          : setSelectedUsers([...selectedUsers, id])
                      }
                      slider
                    />{" "}
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
                    <DeleteButton
                      onConfirm={() => {
                        deleteUser({ variables: { id } });
                      }}
                    />
                  </Table.Cell>
                </Table.Row>
              ))
          )}
        </Table.Body>
      </Table>

      <Pagination pageCount={pageCount} changePage={changePage} />

      <CSVLink
        filename="Report.csv"
        data={users.filter((user) => selectedUsers.includes(user.id))}
      >
        <Button className="exportData">Export data</Button>
      </CSVLink>

      <Button className="exportData" as={Link} to={`/orders`}>
        Check user's orders
      </Button>
    </Container>
  );
}

export default AdminProfilePage;
