import { gql, useQuery } from '@apollo/client';
import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Button, Pagination, Container, Grid } from 'semantic-ui-react'
import axios from 'axios';

import UserCard from '../components/UserCard';
import { Link } from 'react-router-dom';
import DeleteButton from '../components/DeleteButton';

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

  

function exampleReducer(state, action) {
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
    default:
      throw new Error()
  }
};

const ALL_USERS = gql`
  {
    users {
      username
      email
      createdAt
      id
    }
  }
`;


function AdminProfilePage() {
  const { data: { users: users } } = useQuery(ALL_USERS);



  // if (data) {
  //   console.log(data)
  // }

  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: users,
    direction: null,
  })

  const { column, data, direction } = state


 


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

      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
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
          {data.map(({ username, email, createdAt, id }) => (
            <Table.Row key={username}>
              <Table.Cell as={Link} to={`/users/${id}`} style={{ margin: 0, padding: 0 }}>{username}</Table.Cell>
              <Table.Cell>{email}</Table.Cell>
              <Table.Cell>{createdAt}</Table.Cell>
              <Table.Cell>{id}</Table.Cell>
              <Table.Cell><DeleteButton userId={id} /></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>


      <Pagination
        defaultActivePage={1}
        firstItem={null}
        lastItem={null}
        pointing
        secondary

        totalPages={Math.ceil(data.length) / 5}
      />

    </Container>

  )


}











export default AdminProfilePage;


