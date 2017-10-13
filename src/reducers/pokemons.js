export default function pokemons(state = {}, action) { //first init app, state is empty, we don't want that, so empty obj
  let new_state;
  switch (action.type) {
    case 'pokemons.modalDetailShow':
      new_state = JSON.parse(JSON.stringify(state));
      new_state.modal = new_state.modal? new_state.modal: {}; //needed to prevent undefined error when modal does not exist
      new_state.modal.see_detail = {
        show: true,
        id: action.id,
        pname: action.pname,
      }

      return new_state;

    case 'pokemons.modalHide':
      new_state = JSON.parse(JSON.stringify(state));
      new_state.modal.see_detail = {
        show: false,
        id: 0,
        pname: ''
      }

      return new_state;

    case 'pokemons.fetchListSuccess':
      new_state = JSON.parse(JSON.stringify(state));
      new_state.list = action.pokemons;
      debugger;
      return new_state;

    case 'pokemons.fetchPageSuccess':
      new_state = JSON.parse(JSON.stringify(state));
      new_state.list = action.pokemons;
      return new_state;

    case 'pokemons.resetStateOnPageChangeSuccess':
      new_state = JSON.parse(JSON.stringify(state));
      new_state.list = action.pokemons;
      return new_state;

    case 'pokemons.fetchTypeOfPokemonSuccess':
      new_state = JSON.parse(JSON.stringify(state));
      new_state.pokemon = action.pokemon;
      return new_state;

    default:
      //no action passed so lets show initial state
      return state;
  }
}