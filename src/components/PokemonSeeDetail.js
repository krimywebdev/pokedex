import React from 'react';
import { Modal, Button, ProgressBar, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

class PokemonSeeDetail extends React.Component {
  /**
   * constructor
   */
  constructor(props) {
    super(props);

    // bind this to the event methods
    this.modalHide = this.modalHide.bind(this);
  }

  render() {

    if (this.props.modal_see_attributes.pokemon && this.props.modal_see_attributes.pokemon.error) {
      return (
        <Modal show={this.props.modal_see_attributes.show}>
          <Modal.Header>
            <Modal.Title>
            Details about Pokemon&nbsp;
              <strong>{this.props.modal_see_attributes.pname}</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Alert bsStyle="danger">
              <h4>There was an error fetching the details of this pokemon.</h4>
              <p>{this.props.modal_see_attributes.pokemon.message}</p>
            </Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.modalHide} bsStyle='primary'>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    } else if (this.props.modal_see_attributes.pokemon
      && this.props.modal_see_attributes.pokemon.attributes
      && this.props.modal_see_attributes.pokemon.attributes.height) {
      return (
        <Modal show={this.props.modal_see_attributes.show}>
          <Modal.Header>
            <Modal.Title>
              Details about Pokemon&nbsp;
              <strong>{this.props.modal_see_attributes.pokemon.pname}</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="img-center">
                <img className='img-responsive' src={this.props.modal_see_attributes.pokemon.avatar}/>
              </div>
              <div className="center">
                <strong>Height</strong>&nbsp;
                <span>{this.props.modal_see_attributes.pokemon.attributes.height}</span>
              </div>
              <div className="center">
                <strong>Weight</strong>&nbsp;
                <span>{this.props.modal_see_attributes.pokemon.attributes.weight}</span>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.modalHide} bsStyle='primary'>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }

    return (
      <Modal show={this.props.modal_see_attributes.show}>
        <Modal.Header>
          <Modal.Title>
          Details about Pokemon&nbsp;
            <strong>{this.props.modal_see_attributes.pname}</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProgressBar active now={100}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.modalHide} bsStyle='primary'>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  /**
   * close the details modal
   */
  modalHide(event) {
    // dispatch an action
    this.props.dispatch({
      type: 'pokemons.modalHide',
    });
  }
}

// export the connected class
function mapStateToProps(state) {
  // Set the data fro the pokemon see detail modal
  let modal_see_attributes;
  if (state.pokemons.modal && state.pokemons.modal.see_attributes) {
    modal_see_attributes = state.pokemons.modal.see_attributes;
  } else {
    modal_see_attributes = {
      show: false,
      id: 0,
      pname: '',
      pokemon: {},
    };
  }

  // return
  return {
    modal_see_attributes,
  };
}
export default connect(mapStateToProps)(PokemonSeeDetail);
