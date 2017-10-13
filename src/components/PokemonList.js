import React from 'react';
import { connect } from 'react-redux';
import { Table, ProgressBar } from 'react-bootstrap';
import { push } from 'react-router-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import PokemonListElement from './PokemonListElement';
import PokemonSeeDetail from './PokemonSeeDetail';




/**
 * Pokemon List Component
 */

export class PokemonList extends React.Component
{

  /**
   * constructor
   */
  constructor(props)
  {
    super(props);

    //when we don't have any pokemons, update the state with the pokemons
    // list taken from the API

    if(0 === this.props.pokemons.length) {
      this.props.dispatch({
        type: 'pokemonsFetchList'
      });
    }


    //bind this to all event methods
    //this.changePage = this.changePage.bind(this);

  }


  render() {
    var pokemons = this.props.pokemons;

    const options = {
      paginationSize: 5,
      paginationShowsTotal: false  // Enable showing total text
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

    if(this.props.pokemons.length) {

      return(
        <BootstrapTable data={ pokemons } striped hover condensed options={ options } pagination search>
          <TableHeaderColumn dataField='id' isKey>ID</TableHeaderColumn>
          <TableHeaderColumn dataField='avatar' dataFormat={formatAvatar}>Avatar</TableHeaderColumn>
          <TableHeaderColumn dataField='pname'>Name</TableHeaderColumn>
          <TableHeaderColumn dataField='ptypes' dataFormat={formatTypes} filter={ { type: 'TextFilter' } }>Types</TableHeaderColumn>
          <TableHeaderColumn dataField='attributes'>Attributes</TableHeaderColumn>
        </BootstrapTable>
      );
    } else {
      //show the loading state
      return(
        <ProgressBar active now={100}/>
      );

    }

  }

//  render()
//  {
//
//    //pagination
//    const per_page = 10;
//    const pages = Math.ceil(this.props.pokemons.length / per_page);
//    const current_page = this.props.page;
//    const start_offset = (current_page - 1) * per_page;
//    let start_count = 0;
//
//    //render
//    if(this.props.pokemons.length) {
//      //show the list of users
//
//
//      return (
//        <div>
//          <Table bordered hover responsive striped>
//            <thead>
//              <tr>
//                <th>Avatar</th>
//                <th>Name</th>
//                <th>Type</th>
//                <th>Attributes</th>
//              </tr>
//            </thead>
//            <tbody>
//                {this.props.pokemons.map((pokemon, index) => {
//                  if (index >= start_offset && start_count < per_page) {
//                    start_count++;
//                    return (
//                      <PokemonListElement key={pokemon.id} pokemon={pokemon}/>
//                    );
//                  }
//                })}
//            </tbody>
//          </Table>
//
//          <Pagination className="pokemons-pagination pull-right" bsSize="medium"
//            maxButtons={10} first last next prev boundaryLinks
//            items={pages} activePage={current_page} onSelect={this.changePage} />
//
//          <PokemonSeeDetail/>
//        </div>
//      );
//    } else {
//      //show the loading state
//      return(
//        <ProgressBar active now={100}/>
//      );
//    }
//  }

  /**
   * Change the pokemons lists' current page
   */
  changePage(page)
  {

    this.props.dispatch({
      type: 'pokemonsResetStateOnPageChange',
      page: page,
      pokemons: this.props.pokemons
    });

    this.props.dispatch(push('/?page=' + page));

    this.props.dispatch({
      type: 'pokemonsFetchPage',
      page: page,
      pokemons: this.props.pokemons
    });

  }

}

PokemonList.PropTypes = {
  pokemons: React.PropTypes.array
};


//export the connected class
function mapStateToProps(state) {
  return ({
    pokemons: state.pokemons.list || [],
    page: Number(state.routing.locationBeforeTransitions.query.page) || 1
  });
}

//need to fetch state
export default connect(mapStateToProps) (PokemonList);

