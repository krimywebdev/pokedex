import React from 'react';
import { Nav, NavItem } from 'react-bootstrap' ;
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap' ;


/**
 * Menu Component
 */
export default class Menu extends React.Component
{
  /**
   * Render
   */
  render()
  {
    return(
      <Nav bsStyle="pills">
        <IndexLinkContainer to="/">
          <NavItem>Home</NavItem>
        </IndexLinkContainer>
      </Nav>
    )
  }
}