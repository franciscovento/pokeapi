import pokeApi from '../api/pokeApi';
import { Pokemon } from '../interfaces';


export const getPokemons = async ( nameOrId:string ) => {

  try {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${ nameOrId }`);

    return {
      id: data.id,
      name: data.name,
      sprites: data.sprites
    }

  } catch (error) {

    return null;


  }


}