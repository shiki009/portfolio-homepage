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
				<meta name="description" content="Vladislav Šikirjavõi — CTO at Avokaado. Planning, building and shipping software." />
				<title>Vladislav Šikirjavõi — CTO</title>
				<meta property="og:title" content="Vladislav Šikirjavõi — CTO" />
				<meta property="og:description" content="CTO at Avokaado. Planning, building and shipping software." />
				<meta property="og:type" content="website" />
				<meta property="og:image" content="/images/og-image.png" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Vladislav Šikirjavõi — CTO" />
				<meta name="twitter:description" content="CTO at Avokaado. Planning, building and shipping software." />
				<meta name="twitter:image" content="/images/og-image.png" />
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
