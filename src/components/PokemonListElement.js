import React from 'react';
import { Button, Glyphicon, ProgressBar } from 'react-bootstrap';
import { connect } from 'react-redux';
/**
 * Pokemon List Element Component
 */

class PokemonListElement extends React.Component
{
  /**
   * Constructor
   */

  constructor(props)
  {
    super(props);

    //when we don't have the type of the pokemon, update the state with the type
    //got from the API result
    if(!this.props.pokemon.ptype) {
      this.getPokemonTypeById();
    }
    //bind this to event methods
    this.modalDetailShow = this.modalDetailShow.bind(this);
  }


  render()
  {
    const pokemon = this.props.pokemon;

    if(this.props.pokemon.ptypes.length) {
      return (
        <tr>
          <td className="img-cell">
            <img src={pokemon.avatar} className='img-responsive'/>
          </td>
          <td>{pokemon.pname}</td>
          <td>{(pokemon.ptypes).toString()}</td>
          <td>


          </td>
        </tr>
      );
    } else {

      return (
        <tr>
          <td className="img-cell">
            <img src={pokemon.avatar} className='img-responsive'/>
          </td>
          <td>{pokemon.pname}</td>
          <td><ProgressBar active now={100}/></td>
          <td>
            <Button bsSize="xsmall" data-id={pokemon.id} data-pname={pokemon.pname}
              onClick={this.modalDetailShow}>
              View Details <Glyphicon glyph="eye-open"/>
            </Button>
          </td>
        </tr>
      );
    }
  }
  /**
   * prompt to see details of pokemon
   */
  modalDetailShow(event)
  {
    const pokemon_id = Number(event.target.dataset.id);
    const pname = event.target.dataset.pname;
    this.props.dispatch({
      type: 'pokemons.modalDetailShow',
      id: pokemon_id,
      pname: pname,

    });
  }

  getPokemonTypeById()
  {
    this.props.dispatch({
      type: 'pokemonsFetchTypeOfPokemon',
      pokemon: this.props.pokemon
    })
  }

}

PokemonListElement.propTypes = {
  pokemon: React.PropTypes.object.isRequired
}

//export the connected class
export default connect() (PokemonListElement);
