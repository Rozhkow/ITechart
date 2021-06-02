import React, { useContext } from "react";
import { Card, Icon, Image, Accordion } from "semantic-ui-react";

import { Link } from "react-router-dom";
import DeleteButton from "../../components/DeleteButton";
import "./GoodCard.css";
import { AuthContext } from "../../context/auth";

function GoodCard({ good: { title, description, price, id } }) {
  const { user } = useContext(AuthContext);

  const [toggle, handleClick] = React.useState(0);

  const GoodCard = (
    <Card>
      <Card.Content>
        <Image
          centered
          size="medium"
          src="https://react.semantic-ui.com/images/wireframe/image.png"
        />
        <Card.Header as={Link} to={`/goods/${id}`}>
          {title}
        </Card.Header>
        <Accordion>
          <Accordion.Title
            active={toggle === false}
            onClick={() => handleClick(toggle === false ? true : false)}
          >
            <Icon name="dropdown" />
            Description
          </Accordion.Title>
          <Accordion.Content active={toggle === false}>
            <p>{description}</p>
          </Accordion.Content>
        </Accordion>
      </Card.Content>
      <Card.Content extra>
        <Card.Meta>{price}$</Card.Meta>
        <br />
        {user && user.admin === true ? <DeleteButton id={id} /> : null}
      </Card.Content>
    </Card>
  );
  return GoodCard;
}

export default GoodCard;
