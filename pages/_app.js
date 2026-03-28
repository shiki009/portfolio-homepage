import { ChakraProvider } from '@chakra-ui/provider'
import { Analytics } from '@vercel/analytics/next'
import Layout from '../components/layouts/main'
import theme from '../lib/theme'
import { GameModeProvider } from '../lib/gameContext'

const Website = ({ Component, pageProps, router }) => {
  return (
    <ChakraProvider theme={theme}>
      <GameModeProvider>
        <Layout router={router}>
          <Component {...pageProps} key={router.route} />
        </Layout>
      </GameModeProvider>
      <Analytics />
    </ChakraProvider>
  )
}

export default Website
