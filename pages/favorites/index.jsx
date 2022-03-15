import { useEffect, useState } from 'react'
import { Layout } from '../../components/layouts'
import { FavoritePokemon, NoFavorites } from '../../components/ui'
import { localFavorites } from '../../utils'
 
const FavoritesPage = () => {

  
  const [favoritePokemons, setFavoritePokemons ] = useState([]);

  useEffect(()=>{

    setFavoritePokemons( localFavorites.pokemons() );

  },[])



  return (
    <Layout title='Pokemones Favoritos'>
     
    {
      favoritePokemons.length === 0 
      ? ( <NoFavorites />)
      : ( <FavoritePokemon pokemons={favoritePokemons} /> )
    }

    

    </Layout>
  )
}

export default FavoritesPage
