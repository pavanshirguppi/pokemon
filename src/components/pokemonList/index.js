import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { PureComponent } from "react";

// import { Col, Container, Dropdown, Row } from "react-bootstrap";
// import CardGroup from "react-bootstrap/CardGroup";

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
                  abilities,
                } = res;
                const test = other["official-artwork"];
                dPoki.imageURL = test?.front_default;
                dPoki.height = height;
                dPoki.weight = weight;
                dPoki.name = name;
                dPoki.abilities = abilities;

                detailsOfPokimon.push(dPoki);
              })
              .then(() => {
                if (detailsOfPokimon.length === this.state.setResults.length) {
                  // const last = detailsOfPokimon.filter(
                  //   (item, index) => detailsOfPokimon.indexOf(item) === index
                  // );
                  // console.warn("PK 0 :", detailsOfPokimon);
                  // console.warn("PK 1 :", last);
                  this.setState({ detailsOfALLPokimon: detailsOfPokimon });
                }
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
    const { detailsOfALLPokimon } = this.state;
    return detailsOfALLPokimon.length > 0 ? (
      <>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            // onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "space-around",
            alignItems: "center",
          }}
        >
          <Cards detailsResult={detailsOfALLPokimon} />
        </div>
      </>
    ) : (
      <p>Loading...</p>
    );
  };
}

PokemonList.propTypes = {};

export default PokemonList;
