/**
 * Api pokemons static class
 */
export default class ApiPokemons
{
  /**
   * Get a list of users
   */
  static getList (actionObj) {
    let url;
    let offset = 0;
    if(!actionObj.page) {https://cors.now.sh/https://pokeapi.co/api/v2/pokemon/1/
      url = 'https://cors.now.sh/https://pokeapi.co/api/v2/pokemon/?limit=10';
      actionObj.page = 1;
    } else {
      //calculate offset from page if page = 2, offset = 10
      offset = (actionObj.page - 1) * 10;
      url = 'https://cors.now.sh/https://pokeapi.co/api/v2/pokemon/?limit=10&offset=' + offset;
    }
//    url = 'http://pokeapi.salestock.net/api/v2/type/1';
    return fetch(url)
      .then(response => {
        return response.json()
          .then(function(respJson){
              let pokemons = actionObj.pokemons && actionObj.pokemons.length > 0 ? JSON.parse(JSON.stringify(actionObj.pokemons)): [] ;
              let respIterator = 0;
              for(let x=offset + 1; x<=(721-offset); x++, respIterator++) {

                if(actionObj.page == 1 && x>10) {
                  pokemons.push({
                    id: x,
                    pname: 'pokemon',
                    avatar: 'pokemon/' + x + '.png',
                    ptypes: []
                  })
                } else if(x <= actionObj.page*10) { //11 20
                  if(pokemons[x-1]) {
                    pokemons[x-1] = {
                      id: x,
                      pname: respJson.results[respIterator].name,
                      avatar: 'pokemon/' + x + '.png',
                      ptypes: [],
                      purl: respJson.results[respIterator].url
                    }
                  } else {
                    pokemons.push({
                      id: x,
                      pname: respJson.results[x-1].name,
                      avatar: 'pokemon/' + x + '.png',
                      ptypes: [],
                      purl: respJson.results[x-1].url
                    })
                  }
                } else {
                  break;
                }

              }
            return pokemons;
          });
      })
      .catch(error => {
      throw error;
    });

  }

  static getPokemonById (actionObj) {
    const url = actionObj.pokemon.purl;
    return fetch(url)
      .then(response => {
        return response.json()
          .then(function(respJson){
            console.log(respJson.toString());
            let pokemon = actionObj.pokemon;
            pokemon.ptypes = (respJson.types).map(function(typeEntry){
              return typeEntry.type.name;
            });
            let height = respJson.height ? respJson.height: 'Not specified';
            let order = respJson.order? respJson.order: "Not specified";
            let weight = respJson.weight? respJson.weight: "Not specified";
            pokemon.attributes = {
              height: height,
              order: order,
              weight: weight
            };
            return pokemon;
          })
      })
      .catch(error => {
          throw error;

    });
  }

  static sendBackPokemons(pokemons) {
    return pokemons;
  }
  // get pokemons by state,
  static getPokemonsByState(actionObj) {
    //build the pokemons list
    let pokemons = actionObj.pokemons && actionObj.pokemons.length > 0 ? JSON.parse(JSON.stringify(actionObj.pokemons)): [] ;
    let pokemonsMap = new Map();
//    $.when(getPokemonsByStateId(1), getPokemonsByStateId(2),
//        getPokemonsByStateId(3), getPokemonsByStateId(4), getPokemonsByStateId(5),
//        getPokemonsByStateId(6), getPokemonsByStateId(7),
//        getPokemonsByStateId(8), getPokemonsByStateId(9), getPokemonsByStateId(10),
//        getPokemonsByStateId(11), getPokemonsByStateId(12),
//        getPokemonsByStateId(13), getPokemonsByStateId(14), getPokemonsByStateId(15),
//        getPokemonsByStateId(16), getPokemonsByStateId(17),
//        getPokemonsByStateId(18)).done(function(r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15, r16, r17, r18){
//      // the code here will be executed when all four ajax requests resolve.
//      // a1, a2, a3 and a4 are lists of length 3 containing the response text,
//      // status, and jqXHR object for each of the four ajax calls respectively.
////        $.when(getPokemonsByStateId(1)).done(function(a1, a2, a3, a4){
//
//
//
//        buildMapFromResponse(pokemonsMap, r1);
//        buildMapFromResponse(pokemonsMap, r2);
//        buildMapFromResponse(pokemonsMap, r3);
//        buildMapFromResponse(pokemonsMap, r4);
//        buildMapFromResponse(pokemonsMap, r5);
//        buildMapFromResponse(pokemonsMap, r6);
//        buildMapFromResponse(pokemonsMap, r7);
//        buildMapFromResponse(pokemonsMap, r8);
//        buildMapFromResponse(pokemonsMap, r9);
//        buildMapFromResponse(pokemonsMap, r10);
//        buildMapFromResponse(pokemonsMap, r11);
//        buildMapFromResponse(pokemonsMap, r12);
//        buildMapFromResponse(pokemonsMap, r13);
//        buildMapFromResponse(pokemonsMap, r14);
//        buildMapFromResponse(pokemonsMap, r15);
//        buildMapFromResponse(pokemonsMap, r16);
//        buildMapFromResponse(pokemonsMap, r17);
//        buildMapFromResponse(pokemonsMap, r18);
//
//        //make array out of this map
//        pokemons = Array.from(pokemonsMap.values());
//        debugger;
//        return pokemons;
////        actionObj.pokemons = pokemons;
////        sendResponse(pokemons);
//    });
    let promises = [];
    for (let i=1; i<=18; i++) {
      promises.push(getPokemonsByStateId(i));
    }

    return Promise.all(promises).then(function(result){
      //make array out of this map
      pokemons = Array.from(pokemonsMap.values());
      pokemons.sort(function(a, b) {
        return a.id - b.id;
      });
      return pokemons;
    });

    function sendResponse(pokemons) {
      ApiPokemons.sendBackPokemons(pokemons);
    }
//
//    function buildMapFromResponse(pokemonsMap, responseArray) {
//      for(let i=0; i<responseArray[0].pokemon.length; i++) {
//        let listOfPokemons = responseArray[0].pokemon;
//        let key = listOfPokemons[i].pokemon.name;
//        if(pokemonsMap.has(key)) {
//          let entry = pokemonsMap.get(key);
//          entry.ptypes.push(responseArray[0].name);
//        } else {
//          pokemonsMap.set(key, {
//            purl: listOfPokemons[i].pokemon.url,
//            pname: listOfPokemons[i].pokemon.name,
//            ptypes: new Array(responseArray[0].name)
//          });
//        }
//
//      }
//    }


    function buildMapFromResponse(responseArray) {
      for(let i=0; i<responseArray.pokemon.length; i++) {
        let listOfPokemons = responseArray.pokemon;
        let key = listOfPokemons[i].pokemon.name;
        if(pokemonsMap.has(key)) {
          let entry = pokemonsMap.get(key);
          entry.ptypes.push(responseArray.name);
        } else {

          let url = listOfPokemons[i].pokemon.url;
          let arr = url.split('/');
          let id = parseInt(arr[arr.length-2]);

          pokemonsMap.set(key, {
            purl: url,
            pname: listOfPokemons[i].pokemon.name,
            ptypes: new Array(responseArray.name),
            id: id,
            avatar: 'pokemon/' + id + '.png',
            attributes: 'Coming Soon...'
          });
        }

      }
    }

    function getPokemonsByStateId(stateId) {
//      return Promise.resolve($.ajax({
//        url: 'https://cors.now.sh/https://pokeapi.co/api/v2/type/' + stateId + '/',
//        dataType: 'json',
//        type: 'GET',
//        success: function(result, status) {
//          buildMapFromResponse(pokemonsMap, result);
//        },
//        error: function(xhr, status, error){
//          return null;
//        }
//
//      }));
      let jsPromise = Promise.resolve($.ajax('https://pokeapi.co/api/v2/type/' + stateId + '/'));
//      let jsPromise = Promise.resolve($.ajax('https://cors.now.sh/https://pokeapi.co/api/v2/type/' + stateId + '/'));
      jsPromise.then(function(response){
        buildMapFromResponse(response);
      }, function(xhrObj){
        //error handling;
      });
      return jsPromise;
    }





  }






}