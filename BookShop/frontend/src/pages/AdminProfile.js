import { gql, useQuery } from '@apollo/client';
import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Button, Pagination, Container, Grid, Checkbox, Search } from 'semantic-ui-react'
import axios from 'axios';
import { CSVLink } from 'react-csv';

import UserCard from '../components/UserCard';
import { Link } from 'react-router-dom';
import DeleteButton from '../components/DeleteButton';
import ReactPaginate from "react-paginate";

import './AdminProfile.css'

// import UserForm from '../components/UserForm';




/* <Grid columns={3}>
  <GridRow >
  <h1>Users</h1>
  </GridRow>
  <GridRow>
  {loading ? (
  <h1>Loading users..</h1>
  ) : (
  users && users.map(user => (
  <Grid.Column key={user.email} style={{ marginBottom: 20 }}>
  <UserCard user={user} />
  </Grid.Column>
  ))
  )}
  </GridRow>
  </Grid> */



function sortReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_SORT':
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === 'ascending' ? 'descending' : 'ascending',
        }
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: 'ascending',
      }
    case 'Dispatch':

      return {


      }
    default:
      throw new Error()
  }
};


const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

const ALL_USERS = gql`
  query users{
    users {
      username
      email
      createdAt
      id
    }
  }
`;


function AdminProfilePage() {

  const [searchTerm, setSearchTerm] = React.useState("");

  const { data } = useQuery(ALL_USERS);

  // state = { checked: false }
  
  // const [data, setUserState] = React.useState([]);

  // React.useEffect(() => {
  //   data.map(d => {
  //     return {
  //       select: false,
  //       username:d.username,
  //       email:d.email,
  //       createdAt:d.createdAt,
  //       id:d.id
  //     }
  //   })
  // })


  // if({data} === {}){ 
  //   return (
  //     <div> loading</div>
  //   )
  // }

  // if (data) {
  //   console.log(data)
  // }

  const [state, dispatch] = React.useReducer(sortReducer, {
    checked: false,
    column: null,
    users: data ? data.users : [],
    direction: null,
  })

  
  // const headers = [
  //   {label: Username, key: username},
  //   {label: Email, key: email},
  //   {label: createdAt, key: createdAt},
  //   {label: ID, key: id}
  // ];
  
  
  // React.useEffect(() => {
  //   dispatch({ users: data ? data.users : [] })

  // }, [!data]);



  
  // Pagination
  const { column, users, direction } = state

  const [userss] = React.useState(users.slice(0, 10));
  const [pageNumber, setPageNumber] = React.useState(0);
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(userss.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  //
const csvReport = {
    filename: 'Report.csv',
    // headers: headers,
    data: users
  };


  return (

    <Container>
     
      {/* <Grid>
        <UserForm/>
      </Grid> */}

      {/* <div class="ui large buttons">
        <button class="ui button active" id="Table">Table</button>
        <div class="or"></div>
        <button class="ui button" id="Cards">Cards</button>
      </div> */}
      <div className="Search">
        <input
          type="text"
          placeholder="Search.."
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />

      </div>
      <Table sortable celled compact definition>
        <Table.Header>
          <Table.Row textAlign='center'>
            <Table.HeaderCell />
              
            <Table.HeaderCell
              sorted={column === 'username' ? direction : null}
              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'username' })}
            >
              username
    </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'email' ? direction : null}
              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'email' })}
            >
              email
    </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'createdAt' ? direction : null}
              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'createdAt' })}
            >
              createdAt
    </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'id' ? direction : null}
              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'id' })}
            >
              id
    </Table.HeaderCell>
            <Table.HeaderCell

            >
              delete user
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.filter((val) => {
            if (searchTerm == "") {
              return val
            } else if (val.username.toLowerCase().includes(searchTerm.toLowerCase())) {
              return val
            }
          }).slice(pagesVisited, pagesVisited + usersPerPage).map(({ username, email, createdAt, id }) => (
            <Table.Row textAlign='center' key={username}>
              <Table.Cell  collapsing><Checkbox  slider /> </Table.Cell>
              <Table.Cell><Table.Cell as={Link} to={`/users/${id}`} >{username}</Table.Cell></Table.Cell>
              <Table.Cell>{email}</Table.Cell>
              <Table.Cell>{createdAt}</Table.Cell>
              <Table.Cell>{id}</Table.Cell>
              <Table.Cell><DeleteButton userId={id} /></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>


      {/* <Pagination
        defaultActivePage={1}
        firstItem={null}
        lastItem={null}
        pointing
        secondary

        totalPages={Math.ceil(users.length) / 5}
      /> */}

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

      <Button  className="exportData">
        <CSVLink {...csvReport}>Export data</CSVLink>
      </Button>


    </Container>

  )


}











export default AdminProfilePage;


