import NextLink from 'next/link';
import { Link, Container, Button, Box, Heading, Image, List, ListItem, Icon, useColorModeValue } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Section from '../components/section';
import Paragraph from '../components/paragraph';
import { BioSection, BioYear } from '../components/bio';
import { IoLogoTwitter, IoLogoInstagram, IoLogoGithub } from 'react-icons/io5';


const Page = () => {
	return (
		<Container>
			<Box borderRadius="lg" bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')} p={3} mb={6} align="center">
				Hello, I&apos;m a full-stack developer based in Estonia!
			</Box>

			<Box display={{ md: 'flex' }}>
				<Box flexGrow={1}>
				<Heading as="h2" variant="page-title">
					Vladislav Šikirjavõi
				</Heading>
				<p>Tech Magician ( Developer / SysAdmin / Architect )</p>
				</Box>
				<Box
					flexShrink={0}
					mt={{ base: 4, md: 0 }}
					ml={{ md: 6 }}
					textAlign="center"
				>
					<Image
						borderColor="whiteAlpha.800"
						borderWidth={2}
						borderStyle="solid"
						maxWidth="100px"
						display="inline-block"
						borderRadius="full"
						src="/images/vlad_narrow.jpg"
						alt="Profile image"
					/>
				</Box>
			</Box>

			<Section delay={0.1}>
				<Heading as="h3" variant="section-title">
					Work
				</Heading>
				<Paragraph>
					Proficient in agile and accurate software development with a deep knowledge of Natural Language Processing and experienced in working with Artificial Intelligence.
				</Paragraph>
			</Section>

			<Section delay={0.2}>
				<Heading as="h3" variant="section-title">
				Bio
				</Heading>
				<BioSection>
				<BioYear>1994</BioYear>
				Born in Haapsalu, Estonia.
				</BioSection>
				<BioSection>
				<BioYear>2016</BioYear>
				Completed the Bachelor&apos;s Program in the Tallinn University of Technology
				</BioSection>
				<BioSection>
				<BioYear>2018</BioYear>
				Completed the Master&apos;s Program in the Tallinn University of Technology
				</BioSection>
				<BioSection>
				<BioYear>2018 to present</BioYear>
				Working at Feelingstream
				</BioSection>
			</Section>

			<Section delay={0.3}>
				<Heading as="h3" variant="section-title">
				I ♥
				</Heading>
				<Paragraph>
				Music, Football, Programming
				</Paragraph>
			</Section>

			<Section delay={0.3}>
				<Heading as="h3" variant="section-title">
				On the web
				</Heading>
				<List>
				<ListItem>
					<Link href="https://github.com/shiki009" target="_blank">
					<Button
						variant="ghost"
						colorScheme="teal"
						leftIcon={<Icon as={IoLogoGithub} />}
					>
						@shiki009
					</Button>
					</Link>
				</ListItem>
				<ListItem>
					<Link href="https://twitter.com/sikirjavoi" target="_blank">
					<Button
						variant="ghost"
						colorScheme="teal"
						leftIcon={<Icon as={IoLogoTwitter} />}
					>
						@sikirjavoi
					</Button>
					</Link>
				</ListItem>
				<ListItem>
					<Link href="https://instagram.com/v_shiki" target="_blank">
					<Button
						variant="ghost"
						colorScheme="teal"
						leftIcon={<Icon as={IoLogoInstagram} />}
					>
						@v_shiki
					</Button>
					</Link>
				</ListItem>
				</List>
				
			</Section>
		</Container>
	)
}

export default Page;
