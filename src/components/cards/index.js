import React, { Component } from "react";
import PropTypes from "prop-types";

import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => {
    const { allResults, detailsResult } = this.props;
    const cardItems = allResults?.map((singlePokemon, index) => {
      const pokemonDetails = detailsResult?.filter((x) => {
        return singlePokemon.name === x.name;
      });
      return (
        <li key={singlePokemon.url}>
          <Card>
            <Card.Img variant="top" src={pokemonDetails[0].imageURL} />
            <Card.Body>
              <Card.Title>{singlePokemon.name}</Card.Title>
              <Card.Text>{`${"Height is: "}${
                pokemonDetails[0].height
              }`}</Card.Text>
              <Card.Text>{`${"Weight is: "}${
                pokemonDetails[0].weight
              }`}</Card.Text>
            </Card.Body>
          </Card>
        </li>
      );
    });
    return <CardGroup>{cardItems}</CardGroup>;
  };
}

Cards.propTypes = {
  allResults: PropTypes.array.isRequired,
  detailsResult: PropTypes.array.isRequired,
};

export default Cards;
