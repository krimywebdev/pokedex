import React from 'react';

import PokemonList from '../components/PokemonList';

/**
 * Home Page Component
 */
export default class Home extends React.Component
{
  /**
   * Render
   */
  render()
  {
    return(
      <div>
        <PokemonList/>
      </div>
    );
  }
}