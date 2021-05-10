import React from 'react'
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function GoodCard({ good: { id, title, description, price } }){
    

    return (
       <Card>
           <Card.Content>
               <Image floated='top' size='medium' src='https://react.semantic-ui.com/images/wireframe/image.png' />
               <Card.Header>{title}</Card.Header>
               <Card.Description>{description}</Card.Description>
               <Card.Meta>{price}</Card.Meta>
           </Card.Content>
           <Card.Content extra>
           
           </Card.Content>
       </Card> 
    )

}

export default GoodCard;