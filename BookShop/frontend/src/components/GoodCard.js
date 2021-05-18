import React from "react";
import { Card, Icon, Image, Accordion } from "semantic-ui-react";

function GoodCard({ good: { title, description, price } }) {
  const [activeIndex, handleClick] = React.useState(0);

  return (
    <Card>
      <Card.Content>
        <Image
          floated="left"
          size="medium"
          src="https://react.semantic-ui.com/images/wireframe/image.png"
        />
        <Card.Header>{title}</Card.Header>
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
  );
}

export default GoodCard;
