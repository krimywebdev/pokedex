import React from 'react';

/**
 * App component
 */

export default class App extends React.Component {
  render() {
    // render
    return (
      <div className="container">
        <div className="row">
          {this.props.children}
        </div>
      </div>
    );
  }
}
