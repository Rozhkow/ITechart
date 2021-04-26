import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const Querys = gql`
query {
    events {
      id
      title
      description
      price
    }
  }
 `;

 export class Launches extends Component {
    render() {
        return (
            <div> </div>
        )
    }
 };

 export default Launches