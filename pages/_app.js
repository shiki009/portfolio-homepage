import { ChakraProvider } from "@chakra-ui/provider";
import Fonts from '../components/fonts';
import Layout from '../components/layouts/main';

const Website = ({ Component, pageProps, router }) => {
    return (
      <ChakraProvider>
          <Fonts />
          <Layout router={router}>
              <Component {...pageProps} key={router.route}>

              </Component>
          </Layout>
      </ChakraProvider>
    )
  }
  
export default Website;
