import { GetStaticProps, GetStaticPaths } from 'next';
import { FC, useState } from 'react';
import { pokeApi } from '../../api';
import { Pokemon, PokemonListResponse } from '../../interfaces';
import { Layout } from '../../components/layouts';
import { Button, Card, Grid, Text, Container } from '@nextui-org/react';
import Image from 'next/image';
import { localFavorites, getPokemons } from '../../utils';
import confetti from 'canvas-confetti';


interface Props {
  pokemon: Pokemon
}

const PokemonByNamePAge:FC<Props> = ({ pokemon }) => {

  const [ isInFavorites, setIsInFavorites ] = useState( localFavorites.existPokemonFavorites(pokemon.id))  

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite( pokemon.id )
    setIsInFavorites(prev => !prev )

    if( isInFavorites ) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      }
    })
    

  }

  return (
    <Layout title={pokemon.name}>
    <Grid.Container css={{ marginTop: '5px'}} gap={ 2 }>
      <Grid  xs={ 12 } sm={ 4 } >
        <Card hoverable css={{ padding: "30px"}}>
          <Card.Body>
            <Card.Image
            src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
            alt={ pokemon.name }
            width='100%'
            height={ 200 }
            />
          </Card.Body>
        </Card>
      </Grid>

      <Grid xs={ 12 } sm={ 8 }>
        <Card>
          <Card.Header css={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}> 
            <Text h1 transform='capitalize' >{pokemon.name}</Text>
            <Button
              color='gradient'
              ghost={ !isInFavorites }
              onClick={ onToggleFavorite }
            >
              { isInFavorites? 'En favoritos' : 'Guardar en favoritos' }
            </Button>
          </Card.Header>
          <Card.Body>
            <Text size={30}>Sprites:</Text>
            <Container direction='row' display='flex' gap={ 0 } justify='space-between'>
              <Image
                src={ pokemon.sprites.front_default }
                alt={ pokemon.name }
                 width={ 100 }
                 height= { 100 }
              />
              <Image 
                src={ pokemon.sprites.back_default }
                alt={ pokemon.name }
                 width={ 100 }
                 height= { 100 }
              />
              <Image 
                src={ pokemon.sprites.front_shiny }
                alt={ pokemon.name }
                 width={ 100 }
                 height= { 100 }
              />
              <Image 
                src={ pokemon.sprites.back_shiny }
                alt={ pokemon.name }
                 width={ 100 }
                 height= { 100 }
              />
            </Container>
          </Card.Body>
        </Card>

      </Grid>

    </Grid.Container>
  </Layout>
  )
}



export const getStaticPaths: GetStaticPaths = async (ctx) => {

 const { data } = await pokeApi.get<PokemonListResponse>('/pokemon/?offset=0&limit=151');
 const arrayNames:string[] = data.results.map( x => x.name )

  return {
    paths: arrayNames.map( name => ({
      params: { name }
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async({ params }) => {

  const { name } = params as { name: string }
   
  const pokemon = await getPokemons(name);

  if(!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      pokemon, 
    }
  }
}


export default PokemonByNamePAge


