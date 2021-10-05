import { PureComponent } from "react";
// import { Col, Row } from "react-bootstrap";

import CardGroup from "react-bootstrap/CardGroup";

import Cards from "../cards";

const serviceURL = "https://pokeapi.co/api/v2/";
const getAllPokemon_URL = "pokemon/?limit=";
const offset_URL = "&offset=0";

class PokemonList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      limit: 20,
      setResults: [],
      detailsOfALLPokimon: [],
    };
  }

  componentDidMount = async () => {
    await this.getAllPokemons();
  };

  getAllPokemons = async () => {
    await fetch(
      `${serviceURL}${getAllPokemon_URL}${this.state.limit}${offset_URL}`
    )
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        // console.warn("PK API Res :", res?.results);
        this.setState({ setResults: res?.results }, () => {
          const detailsOfPokimon = [];
          this.state.setResults?.map(async (poki) => {
            let dPoki = {};
            await fetch(`${serviceURL}${"pokemon/"}${poki.name}`)
              .then((response) => {
                return response.json();
              })
              .then((res) => {
                // console.warn("PK single API Res :", res);
                const {
                  sprites: { other },
                  height,
                  weight,
                  name,
                } = res;
                const test = other["official-artwork"];
                dPoki.imageURL = test?.front_default;
                dPoki.height = height;
                dPoki.weight = weight;
                dPoki.name = name;

                detailsOfPokimon.push(dPoki);
              })
              .then(() => {
                if (detailsOfPokimon.length === this.state.setResults.length)
                  this.setState({ detailsOfALLPokimon: detailsOfPokimon });
              })
              .catch((err) => {
                console.warn("PK single API Err :", err);
                return "";
              });
          });
        });
      })
      .catch((err) => {
        console.warn("PK API Err :", err);
      });
  };

  render = () => {
    const { setResults, detailsOfALLPokimon, limit } = this.state;

    return detailsOfALLPokimon.length === setResults.length ? (
      // <Row xs={1} md={2} className="g-4">
      //   {Array.from({ length: limit }).map((_, idx) => (
      //     <Col>
      //       <Cards
      //         allResults={setResults}
      //         detailsResult={detailsOfALLPokimon}
      //       />
      //     </Col>
      //   ))}
      // </Row>
      <CardGroup>
        <Cards allResults={setResults} detailsResult={detailsOfALLPokimon} />
      </CardGroup>
    ) : (
      <p>Psst.. server down!</p>
    );
  };
}

PokemonList.propTypes = {};

export default PokemonList;
