import { PureComponent } from "react";

// import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
// import Pagination from "react-bootstrap/Pagination";

import Cards from "../cards";

// https://pokeapi.co/api/v2/pokemon?limit=20&offset=0
const serviceURL = "https://pokeapi.co/api/v2/";
const getAllPokemon_URL = "pokemon/?limit=";
const offset_URL = "&offset=0";
const singlePoki_URL = "https://pokeapi.co/api/v2/pokemon/";

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

  // const paginationBasic = (
  //   <div>
  //     <Pagination>{items}</Pagination>
  //     <br />
  //   </div>
  // );

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
            await fetch(`${singlePoki_URL}${poki.name}`)
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
                // console.warn(
                //   "detailsOfPokimon :",
                //   detailsOfPokimon.length,
                //   detailsOfPokimon
                // );
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

  getDetailsOfPoki = (name) => {
    return new Promise(function (resolve, reject) {
      fetch(`${singlePoki_URL}${name}`)
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          // console.warn("PK single API Res :", res.name);
          const {
            sprites: { other },
            height,
            weight,
            name,
          } = res;
          const test = other["official-artwork"];
          // resolve({
          //   imageURL: test?.front_default,
          //   height: height,
          //   weight: weight,
          //   name: name,
          // });
          resolve([test?.front_default, height, weight, name]);
          // return {
          //   imageURL: test?.front_default,
          //   height: height,
          //   weight: weight,
          //   name: name,
          // };
        })
        .catch((err) => {
          console.warn("PK single API Err :", err);
          reject("");
        });
    });
  };

  render = () => {
    const { setResults, detailsOfALLPokimon } = this.state;
    console.log(
      "this.state.detailsOfALLPokimon ::::::::::",
      detailsOfALLPokimon.length
    );
    console.log(
      "this.state.detailsOfALLPokimon 2 ::::::::::",
      setResults.length
    );

    // const cardItems = setResults?.map((poki, index) => {
    //   // const result = this.getDetailsOfPoki(poki.name);
    //   // console.warn(
    //   //   "TEST :",
    //   //   result.then((res) => console.warn(res))
    //   // );

    //   const test = detailsOfALLPokimon?.filter((x) => {
    //     return poki.name === x.name;
    //   });

    //   return (
    //     detailsOfALLPokimon.length === limit && (
    //       <li key={poki.url}>
    //         <Card>
    //           <Card.Img variant="top" src={test.imageURL} />
    //           <Card.Body>
    //             <Card.Title>{poki?.name}</Card.Title>
    //             <Card.Text>{`${"Height is: "}${test.height}`}</Card.Text>
    //             <Card.Text>{`${"Weight is: "}${test.weight}`}</Card.Text>
    //           </Card.Body>
    //         </Card>
    //       </li>
    //     )
    //   );
    // });
    return detailsOfALLPokimon.length === setResults.length ? (
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
