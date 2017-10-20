import React from 'react';

import PokemonList from '../components/PokemonList';

/**
 * Home Page Component
 */
export default class Home extends React.Component {
  /**
   * Render
   */
  /* eslint-disable class-methods-use-this */
  render() {
    return (
      <div>
        <PokemonList/>
      </div>
    );
  }
  /* eslint-enable class-methods-use-this */
}
