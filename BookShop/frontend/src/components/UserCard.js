import React from 'react'
import { Button, Card, Icon, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function UserCard({ user: { email, username, createdAt } }){
    

    return (
       <Card>
           <Card.Content>
               <Card.Header as={Link} to={`/AdminProfile/${username}`}>{username}</Card.Header>
               <Card.Description>{email}</Card.Description>
               <Card.Meta>{createdAt}</Card.Meta>
           </Card.Content>
           <Card.Content extra>
           <Button toggle>Сhange</Button>
           <Button negative>Delete</Button>
           </Card.Content>
       </Card> 
    )

}

export default UserCard;