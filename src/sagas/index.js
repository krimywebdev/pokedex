import { takeLatest } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import { pokemonsFetchList, pokemonsFetchPage,
  pokemonsResetStateOnPageChange, pokemonsFetchTypeOfPokemon } from './pokemons';

/* eslint-disable import/prefer-default-export */
export function* sagas() {
  yield [
    fork(takeLatest, 'pokemonsFetchList', pokemonsFetchList),
    fork(takeLatest, 'pokemonsFetchPage', pokemonsFetchPage),
    fork(takeLatest, 'pokemonsResetStateOnPageChange', pokemonsResetStateOnPageChange),
    fork(takeLatest, 'pokemonsFetchTypeOfPokemon', pokemonsFetchTypeOfPokemon),
  ];
}
/* eslint-enable import/prefer-default-export */
