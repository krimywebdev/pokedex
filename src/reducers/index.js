import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import pokemons from './pokemons';

/**
 * Reducers
 */

/* eslint-disable import/prefer-default-export */
export const reducers = combineReducers({
  routing: routerReducer,
  pokemons,
});
/* eslint-enable import/prefer-default-export */
