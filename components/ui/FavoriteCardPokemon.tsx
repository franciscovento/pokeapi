import { Card, Grid } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
  id: number
}

export const FavoriteCardPokemon = ({ id }:Props) => {

  const router = useRouter();
  
  const onFavoriteClick = () => {
    router.push(`/pokemon/${id}`)
  }

  return (
    <Grid onClick={ onFavoriteClick } xs={6} sm={3} md={2} xl={1} key={id}>
        <Card hoverable clickable css={{ padding: 10 }}>
            <Card.Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
              width={'100%'}
              height={ 140 }
              />
      </Card>
    </Grid>
  )
}

