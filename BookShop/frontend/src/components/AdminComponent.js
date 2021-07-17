import React from "react";
import { Table, Button, Container, Checkbox } from "semantic-ui-react";

import ReactPaginate from "react-paginate";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";

import DeleteButton from "./DeleteButton";

export const AdminComponent = ({
  setSearchTerm,
  sortedColumn,
  loading,
  users,
  searchTerm,
  pagesVisited,
  csvReport,
  changePage,
  pageCount,
  deleteUser,
  usersPerPage,
  dispatch,
}) => (
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
                  <DeleteButton onConfirm={deleteUser} />
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
