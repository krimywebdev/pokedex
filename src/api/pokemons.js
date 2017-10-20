/**
 * Api pokemons static class
 */
export default class ApiPokemons {
  /**
   * Get a list of pokemons (slow because only fetches maximum 20 at a time
   */
//  static getList(actionObj) {
//    let url;
//    let offset = 0;
//    if (!actionObj.page) {
//      url = 'https://cors.now.sh/https://pokeapi.co/api/v2/pokemon/?limit=10';
//      actionObj.page = 1;
//    } else {
//      // calculate offset from page if page = 2, offset = 10
//      offset = (actionObj.page - 1) * 10;
//      url = ('https://cors.now.sh/https://pokeapi.co/api/v2/pokemon/?limit=10&offset=').concat(offset);
//    }
//    // url = 'http://pokeapi.salestock.net/api/v2/type/1';
//    return fetch(url)
//      .then((response) => {
//        return response.json()
//          .then(function(respJson){
//              const pokemons = actionObj.pokemons && actionObj.pokemons.length > 0 ? JSON.parse(JSON.stringify(actionObj.pokemons)): [] ;
//              let respIterator = 0;
//              for(let x=offset + 1; x<=(721-offset); x++, respIterator++) {
//
//                if(actionObj.page == 1 && x>10) {
//                  pokemons.push({
//                    id: x,
//                    pname: 'pokemon',
//                    avatar: 'pokemon/' + x + '.png',
//                    ptypes: []
//                  })
//                } else if(x <= actionObj.page*10) { //11 20
//                  if(pokemons[x-1]) {
//                    pokemons[x-1] = {
//                      id: x,
//                      pname: respJson.results[respIterator].name,
//                      avatar: 'pokemon/' + x + '.png',
//                      ptypes: [],
//                      purl: respJson.results[respIterator].url
//                    }
//                  } else {
//                    pokemons.push({
//                      id: x,
//                      pname: respJson.results[x-1].name,
//                      avatar: 'pokemon/' + x + '.png',
//                      ptypes: [],
//                      purl: respJson.results[x-1].url
//                    })
//                  }
//                } else {
//                  break;
//                }
//
//              }
//            return pokemons;
//          });
//      })
//      .catch(error => {
//      throw error;
//    });
//
//  }

  static getPokemonById(actionObj) {
    const url = actionObj.purl;
    /* eslint-disable no-undef */
    return fetch(url)
    /* eslint-enable no-undef */
      .then(response => response.json()
        .then((respJson) => {
          const pokemon = actionObj.pokemon;
          pokemon.ptypes = (respJson.types).map(typeEntry => typeEntry.type.name);
          const height = respJson.height ? respJson.height / 10 + ' m' : 'Not specified';
          const order = respJson.order ? respJson.order : 'Not specified';
          const weight = respJson.weight ? respJson.weight / 10 + ' kg' : 'Not specified';
          pokemon.attributes = {
            height,
            order,
            weight,
          };
          return pokemon;
        })).catch(error => ({ error: true, message: error.message }));
  }

  // get pokemons by state,
  static getPokemonsByState(actionObj) {
    // build the pokemons list
    let pokemons = actionObj.pokemons && actionObj.pokemons.length > 0 ?
      JSON.parse(JSON.stringify(actionObj.pokemons)) : [];
    const pokemonsMap = new Map();
    const promises = [];
    for (let i = 1; i <= 18; i += 1) {
      /* eslint-disable no-use-before-define */
      promises.push(getPokemonsByStateId(i));
      /* eslint-enable no-use-before-define */
    }

    return Promise.all(promises).then(() => {
      // make array out of this map
      pokemons = Array.from(pokemonsMap.values());
      pokemons.sort((a, b) => a.id - b.id);
      return pokemons;
    }, () => [{ error: true }]);

    function getPokemonsByStateId(stateId) {
      /* eslint-disable no-undef */
      const jsPromise = Promise.resolve($.ajax('https://pokeapi.co/api/v2/type/' + stateId + '/'));
      /* eslint-enable no-undef */

      // let jsPromise = Promise.resolve($.ajax('https://cors.now.sh/https://pokeapi.co/api/v2/type/' + stateId + '/'));
      jsPromise.then(
        /* eslint-disable no-use-before-define */
        response => buildMapFromResponse(response)
        /* eslint-enable no-use-before-define */
        , xhrObj => false,
      );
      return jsPromise;
    }

    function buildMapFromResponse(responseArray) {
      for (let i = 0; i < responseArray.pokemon.length; i += 1) {
        const listOfPokemons = responseArray.pokemon;
        const key = listOfPokemons[i].pokemon.name;
        if (pokemonsMap.has(key)) {
          const entry = pokemonsMap.get(key);
          entry.ptypes.push(responseArray.name);
        } else {
          const url = listOfPokemons[i].pokemon.url;
          const arr = url.split('/');
          const id = Number(arr[arr.length - 2]);

          pokemonsMap.set(key, {
            purl: url,
            pname: listOfPokemons[i].pokemon.name,
            ptypes: new Array(responseArray.name),
            id,
            avatar: 'pokemon/' + id + '.png',
            attributes: 'Coming Soon...',
          });
        }
      }
    }
  }
}
