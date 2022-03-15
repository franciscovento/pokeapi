// Importación de react
import { FC } from "react"

//Importaciones de Next
import  Head  from "next/head"

//Importaciones propias
import { NavBar } from '../../components/ui'



interface Props {
  title?: string
}

const origin = ( typeof window === 'undefined'? '' : window.origin )

export const Layout:FC<Props> = ({ children, title }) => {

  

  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name='author' content="Francisco Vento" />
        <meta name='description' content="Información sobre pokemon xxxx"/>
        <meta name='keywords' content="XXX. pokemon, pokedex" />

        <meta property="og:title" content={`Información sobre ${title}`} />
        <meta property="og:description" content={`Esta es la página sobre ${title}`} />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>
    	<NavBar />
      <main style={{
        padding: '0 20px'
      }}>
        {children}
      </main>


    </>
  )
}


