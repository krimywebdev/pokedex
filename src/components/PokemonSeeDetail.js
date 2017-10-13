import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class PokemonSeeDetail extends React.Component
{
  /**
   * constructor
   */
  constructor(props)
  {
    super(props);

    //bind this to the event methods
    this.modalHide = this.modalHide.bind(this);
  }

  render()
  {
    return (
      <Modal show={this.props.modal_see_detail.show}>
        <Modal.Header>
          <Modal.Title>
            Details about Pokemon &nbsp;
            <strong>{this.props.modal_see_detail.pname}</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={this.modalHide} bsStyle='primary'>OK</Button>
        </Modal.Footer>
      </Modal>
    )
  }
  /**
   * close the details modal
   */
  modalHide(event)
  {
    //dispatch an action
    this.props.dispatch({
      type: 'pokemons.modalHide'
    });
  }
}

//export the connected class
function mapStateToProps(state) {
  //Set the data fro the pokemon see detail modal
  let modal_see_detail;
  if(state.pokemons.modal && state.pokemons.modal.see_detail) {
    modal_see_detail = state.pokemons.modal.see_detail;
  } else {
    modal_see_detail = {
      show: false,
      id: 0,
      pname: '',
    }
  }

  //return
  return {
    modal_see_detail: modal_see_detail
  }
}
export default connect(mapStateToProps) (PokemonSeeDetail);