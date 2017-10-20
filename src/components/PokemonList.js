import React from 'react';
import { connect } from 'react-redux';
import { Table, ProgressBar, Button, Modal } from 'react-bootstrap';
import { push } from 'react-router-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import PokemonListElement from './PokemonListElement';
import PokemonSeeDetail from './PokemonSeeDetail';

/**
 * Pokemon List Component
 */

export class PokemonList extends React.Component {
  /**
   * constructor
   */
  constructor(props) {
    super(props);

    // when we don't have any pokemons, update the state with the pokemons
    // list taken from the API

    if (this.props.pokemons.length === 0) {
      this.props.dispatch({
        type: 'pokemonsFetchList',
      });
    }

    // bind this to all event methods
    this.modalAttributesShow = this.modalAttributesShow.bind(this);
  }

  modalAttributesShow(event) {
    const id = Number(event.target.dataset.id);

    // dispatch action
    this.props.dispatch({
      type: 'pokemons.modalAttributesShow',
      id,
      pname: event.target.dataset.pname,
    });

    this.props.dispatch({
      type: 'pokemonsFetchTypeOfPokemon',
      purl: event.target.dataset.purl,
      pokemon: this.props.pokemons[id - 1],
    });
  }

  render() {
    /* eslint-disable prefer-destructuring */
    const pokemons = this.props.pokemons;
    /* eslint-enable prefer-destructuring */
    const that = this;

    const options = {
      paginationSize: 5,
      paginationShowsTotal: false, // Enable showing total text
      clearSearch: true,
    };

    function formatAvatar(cell, row) {
      return (
        <img src={cell} className="img-responsive"/>
      );
    }

    function formatTypes(cell, row) {
      return (
        <div><bold>{cell[0]}</bold>
          <br/>
          <bold>{cell[1]}</bold></div>
      );
    }

    function formatAttributes(cell, row) {
      return (
        <Button bsSize='small' data-id={row.id} data-pname={row.pname} data-purl={row.purl}
        onClick={that.modalAttributesShow}>Details</Button>
      );
    }

    if (this.props.pokemons.length) {
      return (
        <div>
          <h2>Pokedex</h2>
          <BootstrapTable data={ pokemons } striped hover condensed options={ options } pagination search>
            <TableHeaderColumn dataField='id' isKey dataSort>ID</TableHeaderColumn>
            <TableHeaderColumn dataField='avatar' dataFormat={formatAvatar}>Avatar</TableHeaderColumn>
            <TableHeaderColumn dataField='pname' dataSort>Name</TableHeaderColumn>
            <TableHeaderColumn dataField='ptypes' dataFormat={formatTypes} filter={ { type: 'TextFilter' } }>
              Types</TableHeaderColumn>
            <TableHeaderColumn dataField='' dataFormat={formatAttributes}>Attributes</TableHeaderColumn>
          </BootstrapTable>
          <PokemonSeeDetail/>
        </div>
      );
    }

    // else show the loading state
    return (
      <div>
        <h2>Welcome to my Pokedex!</h2>
        <ProgressBar active now={100}/>
      </div>
    );
  }
}

PokemonList.PropTypes = {
  pokemons: React.PropTypes.array,
};

// export the connected class
function mapStateToProps(state) {
  return ({
    pokemons: state.pokemons.list || [],
    page: Number(state.routing.locationBeforeTransitions.query.page) || 1,
  });
}

// need to fetch state
export default connect(mapStateToProps)(PokemonList);

