import React, { useContext } from "react";
import { Card, Icon, Image, Accordion } from "semantic-ui-react";

import { Link } from "react-router-dom";
import DeleteButton from "../components/DeleteButton";
import './GoodCard.css';
import { AuthContext } from "../context/auth";



function GoodCard({ good: { title, description, price, id } }) {
  const { user } = useContext(AuthContext);

  const [activeIndex, handleClick] = React.useState(0);

  const GoodCard = 
  user && user.admin === true ? (
    <Card>
      <Card.Content>
        <Image
          centered
          size="medium"
          src="https://react.semantic-ui.com/images/wireframe/image.png"
        />
        <Card.Header as={Link} to={`/goods/${id}`}>{title}</Card.Header>
        <Accordion>
          <Accordion.Title
            active={activeIndex === 0} 
            onClick={() =>
              handleClick(activeIndex === 0 ? activeIndex + 1 : activeIndex - 1)
            }
          >
            <Icon name="dropdown" />
            Description
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <p>{description}</p>
          </Accordion.Content>
        </Accordion>
      </Card.Content>
      <Card.Content extra>
        <Card.Meta>{price}$</Card.Meta>
        <br/>
        <DeleteButton id={id} />
      </Card.Content>
    </Card>
  ) : (
    <Card>
      <Card.Content>
        <Image
          centered
          size="medium"
          src="https://react.semantic-ui.com/images/wireframe/image.png"
        />
        <Card.Header as={Link} to={`/goods/${id}`}>{title}</Card.Header>
        <Accordion>
          <Accordion.Title
            active={activeIndex === 0} 
            onClick={() =>
              handleClick(activeIndex === 0 ? activeIndex + 1 : activeIndex - 1)
            }
          >
            <Icon name="dropdown" />
            Description
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <p>{description}</p>
          </Accordion.Content>
        </Accordion>
      </Card.Content>
      <Card.Content extra>
        <Card.Meta>{price}$</Card.Meta>
      </Card.Content>
    </Card>
  )
  return GoodCard;
}

export default GoodCard;
