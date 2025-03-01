import Head from 'next/head';
import dynamic from 'next/dynamic';
import NavBar from '../navbar';
import { Box, Container } from '@chakra-ui/react';
import Footer from '../footer';
import DonutLoader from '../donut-loader';

const LazyDonut = dynamic(() => import('../donut'), {
	ssr: false,
	loading: () => <DonutLoader />
});

const Main = ({ children, router }) => {
	return (
		<Box as="main" pb={8}>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="Vlad's homepage" />
				<link rel="icon" href="/images/favicon.ico" />
				<link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
			</Head>

			<NavBar path={router.asPath} />

			<Container maxW="container.md" pt={14}>
				<LazyDonut />
				{children}
				<Footer />
			</Container>
		</Box>
	);
};

export default Main;
