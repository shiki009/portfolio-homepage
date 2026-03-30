import { ChakraProvider } from '@chakra-ui/provider'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
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
      <Script
        defer
        src="https://expandumami.duckdns.org/script.js"
        data-website-id="6d6c6f10-943a-40dc-8c4d-aecc178501fc"
        strategy="afterInteractive"
      />
      <Analytics />
    </ChakraProvider>
  )
}

export default Website
