import { call, put } from 'redux-saga/effects';

import ApiPokemons from '../api/pokemons';

/**
 * Fetch pokemon's list
 */
export function* pokemonsFetchList(actionObj) { //consists of action type and page
  // call the api to get the pokemons
  const pokemons = yield call(ApiPokemons.getPokemonsByState, actionObj);

  //dispatch the success action with the pokemons attached
  yield put({
    type: 'pokemons.fetchListSuccess',
    pokemons: pokemons
  });
}

export function* pokemonsFetchPage(actionObj) { //consists of type and page
  // call the api to get the pokemons
  const pokemons = yield call(ApiPokemons.getList, actionObj);

  //dispatch the success action with the pokemons attached
  yield put({
    type: 'pokemons.fetchPageSuccess',
    pokemons: pokemons
  });
}

export function* pokemonsResetStateOnPageChange(actionObj) {

  yield put({
    type: 'pokemons.resetStateOnPageChangeSuccess',
    pokemons: []
  });
}

export function* pokemonsFetchTypeOfPokemon(actionObj) { //consists of type and page
  // call the api to get the pokemons
  const pokemon = yield call(ApiPokemons.getPokemonById, actionObj);

  //dispatch the success action with the pokemons attached
  yield put({
    type: 'pokemons.fetchTypeOfPokemonSuccess',
    pokemon: pokemon
  });
}
