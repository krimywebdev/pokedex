import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import pokemons from './pokemons';

/**
 * Reducers
 */

export const reducers = combineReducers({
  routing: routerReducer,
  pokemons: pokemons,
})