import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import Card from "react-bootstrap/Card";
// import CardGroup from "react-bootstrap/CardGroup";

class Cards extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => {
    const { detailsResult } = this.props;
    const cardItems = detailsResult?.map((pokemonDetails, index) => {
      return (
        <div
          key={pokemonDetails.imageURL}
          style={{
            // borderColor: "blue",
            // border: "solid 1px",
            alignItems: "center",
          }}
        >
          <Card border="primary" style={{ width: "12rem" }}>
            <Card.Img
              style={{ width: "5rem" }}
              variant="top"
              src={pokemonDetails.imageURL}
            />
            <Card.Body>
              <Card.Title>{pokemonDetails.name.toUpperCase()}</Card.Title>
              <Card.Text>{`${"Height is: "}${
                pokemonDetails.height
              }`}</Card.Text>
              <Card.Text>{`${"Weight is: "}${
                pokemonDetails.weight
              }`}</Card.Text>
              {pokemonDetails.abilities.map((ab) => (
                <Card.Text>{`${"> "} ${ab.ability.name}`}</Card.Text>
              ))}
            </Card.Body>
          </Card>
        </div>
      );
    });
    return <>{cardItems}</>;
  };
}

Cards.propTypes = {
  detailsResult: PropTypes.array.isRequired,
};

export default Cards;
