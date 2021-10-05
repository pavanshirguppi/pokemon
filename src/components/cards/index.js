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
    const cardItems = allResults?.map((poki, index) => {
      const test = detailsResult?.filter((x) => {
        return poki.name === x.name;
      });
      console.warn("TEST :", test);
      return (
        <li key={poki.url}>
          <Card>
            <Card.Img variant="top" src={test[0].imageURL} />
            <Card.Body>
              <Card.Title>{poki?.name}</Card.Title>
              <Card.Text>{`${"Height is: "}${test[0].height}`}</Card.Text>
              <Card.Text>{`${"Weight is: "}${test[0].weight}`}</Card.Text>
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
