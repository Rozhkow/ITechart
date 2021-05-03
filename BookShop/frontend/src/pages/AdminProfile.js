import React, { Component } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Grid, GridRow, Table } from 'semantic-ui-react'

import UserCard from '../components/UserCard'
import UserField from '../components/UserField'

const ALL_USERS = gql`
  query getUsers {
    users {
      email
      username
      createdAt
    }
  }
`;



function AdminProfilePage() {
    const { loading, data: { getUsers: users }} = useQuery(ALL_USERS);
    
    

    return (
      <table class="ui celled table">
        
      <thead >
        <tr><th>username</th>
        <th>email</th>
        <th>createdAt</th>
      </tr></thead>
      <tbody ><tr >{loading ? (
              <h1>Loading users..</h1>
            ) : (  
            users && users.map(user => (
              user={user})))}</tr></tbody>
    </table>



        // <div>
        //     {loading ? (
        //       <h1>Loading users..</h1>
        //     ) : (  
        //     users && users.map(user => (
        //         <UserField user={user} />
                
            
        //     ))
            
        //     )}
        // </div>



      //   <Table singleLine>
      //   <Table.Header>
      //     <Table.Row>
      //       <Table.HeaderCell>username</Table.HeaderCell>
      //       <Table.HeaderCell>Registration Date</Table.HeaderCell>
      //       <Table.HeaderCell>E-mail address</Table.HeaderCell>
      //     </Table.Row>
      //   </Table.Header>
    
      //   <Table.Body>
      //       <Table.Row>
      //       {loading ? (
      //         <h1>Loading users..</h1>
      //       ) : (  
      //       users && users.map(user => (
      //       <Table.Cell user ={user.username} />
                
            
      //       ))
            
      //       )}
            
      //       </Table.Row>
      //     <Table.Row>
      //       <Table.Cell>Jamie Harington</Table.Cell>
            
      //     </Table.Row>
      //     <Table.Row>
      //       <Table.Cell>Jill Lewis</Table.Cell>
            
      //     </Table.Row>
      //   </Table.Body>
      // </Table>



        // <Grid columns={3}>
        //     <GridRow >
        //         <h1>Users</h1>
        //     </GridRow>
        //     <GridRow>
        //         {loading ? (
        //             <h1>Loading users..</h1>
        //         ) : (
        //             users && users.map(user => (
        //                 <Grid.Column key={user.email} style={{ marginBottom: 20 }}>
        //                     <UserCard user={user} />
        //                 </Grid.Column>
        //             ))
        //         )}
        //     </GridRow>
        // </Grid>
    )
}

export default AdminProfilePage;