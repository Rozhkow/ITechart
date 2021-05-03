import React, { Component } from 'react';
import { Table, Button, Card, Icon, Label } from 'semantic-ui-react'

function UserField({ user: { email, username, createdAt } }){
    

    return (
      <table class="ui celled table">
      <thead user={ email, username, createdAt }>
        <tr><th>username</th>
        <th>email</th>
        <th>createdAt</th>
      </tr></thead>
      
    </table>
    )

}

export default UserField;