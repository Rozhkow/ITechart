import { gql, useQuery } from '@apollo/client';
import _ from 'lodash'
import React from 'react'
import { Table, Button, Container, Checkbox } from 'semantic-ui-react'
import { CSVLink } from 'react-csv';

import { Link } from 'react-router-dom';
import DeleteButton from '../components/DeleteButton';
import ReactPaginate from "react-paginate";

import './AdminProfile.css'



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

  const [userState, setUserState] = React.useState([data]);
  console.log(data)

  React.useEffect(() => {
    console.log(data)
    setUserState(data)
  }, []);


  // if({data} === {}){ 
  //   return (
  //     <div> loading</div>
  //   )
  // }


  const [state, dispatch] = React.useReducer(sortReducer, {
    checked: false,
    column: null,
    users: data ? data.users : [],
    direction: null,
  })



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


  const csvReport = {
    filename: 'Report.csv',
    data: users
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

      <Table sortable celled compact >
        <Table.Header>
          <Table.Row textAlign='center'>
            <Table.HeaderCell>
              <Checkbox
                // onChange={e =>{
                //   let checked = e.target.checked;
                //   setUserState(
                //     userState.map(d =>{
                //       d.select = checked;
                //       return d;
                //     })
                //   )
                // }}
                slider />
            </Table.HeaderCell>

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
          {/* {userState.map(() =>  */}
          {users.filter((val) => {
            if (searchTerm == "") {
              return val
            } else if (val.username.toLowerCase().includes(searchTerm.toLowerCase())) {
              return val
            }
          }).slice(pagesVisited, pagesVisited + usersPerPage).map(({ username, email, createdAt, id }) => (
            <Table.Row textAlign='center' key={username}>
              <Table.Cell collapsing><Checkbox
                // onChange={event => { 
                //   let checked = event.target.checked;
                //   setUserState(
                //     userState.map(dataa => {
                //       if(d.username === dataa.username) {
                //         dataa.select = checked;
                //       }
                //       return dataa;
                //     })
                //   )
                //   }} checked={d.select} 
                slider /> </Table.Cell>
              <Table.Cell><Table.Cell as={Link} to={`/users/${id}`} >{username}</Table.Cell></Table.Cell>
              <Table.Cell>{email}</Table.Cell>
              <Table.Cell>{createdAt}</Table.Cell>
              <Table.Cell>{id}</Table.Cell>
              <Table.Cell><DeleteButton userId={id} /></Table.Cell>
            </Table.Row>
          ))}
          {/* )}  */}
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
  )
}


export default AdminProfilePage;


