import React, { useState } from 'react'
import {
  Link,
  Container,
  Button,
  Box,
  Heading,
  Image,
  List,
  ListItem,
  Icon,
  useColorModeValue,
  Collapse, Tooltip
} from '@chakra-ui/react'
import Section from '../components/section'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import { IoLogoInstagram, IoLogoGithub } from 'react-icons/io5'

const Page = () => {
  const [showMore, setShowMore] = useState(false)
  const [showMoreHead, setShowMoreHead] = useState(false)
  const [showMoreBsc, setShowMoreBsc] = useState(false)
  const [showMoreMsc, setShowMoreMsc] = useState(false)

  return (
    <Container>
      <Box
        position="relative"
        zIndex="3" // Ensures it is above LazyDonut
        borderRadius="lg"
        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
        p={3}
        mb={6}
        align="center"
        transition="0.3s ease-in-out"
        _hover={{
          bgGradient: 'linear(to-r, red.500, orange.500, yellow.500)',
          backgroundSize: '200% 200%',
          animation: 'fireEffect 1s infinite alternate',
          color: 'white',
          boxShadow: '0 0 20px rgba(255, 69, 0, 0.8)'
        }}
        sx={{
          '@keyframes fireEffect': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' }
          }
        }}
      >
        Hello, I&apos;m a Head of Product based in Estonia!
      </Box>
      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Vladislav Šikirjavõi
          </Heading>
          <p>💻 AI-Powered Product Innovation | Technical Leadership</p>
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
            src="/images/logo.jpg"
            alt="Profile image"
          />
        </Box>
      </Box>

      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Summary
        </Heading>
        <Paragraph>
          I am an experienced Head of Product with a strong technical
          background. I specialize in architecting scalable AI-driven platforms,
          leading engineering teams, and driving technical strategy aligned with
          business objectives. I have successfully designed and built AI-powered
          automation tools, such as Quality Score and Automatic Summary,
          enhancing operational efficiency and customer insights. I ensure high
          security and compliance standards while optimizing infrastructure for
          scalability. With a deep understanding of enterprise software
          development, operations, and multilingual NLP systems, I focus on
          transforming complex technical challenges into business opportunities.
          I excel at leading engineering teams, fostering innovation, and
          aligning technology with long-term growth strategies. My expertise
          extends to product roadmaps, stakeholder management, and technical
          leadership to drive sustained success.
        </Paragraph>
      </Section>
      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Bio
        </Heading>
        <BioSection>
          <BioYear>1994</BioYear>
          Born in Haapsalu, Estonia
        </BioSection>
        <BioSection>
          <BioYear>2016</BioYear>
          Completed the Bachelor&apos;s Program in the Tallinn University of
          Technology
          <Button size="xs" ml={2} onClick={() => setShowMoreBsc(!showMoreBsc)}>
            {showMoreBsc ? '-' : '+'}
          </Button>
          <Collapse in={showMoreBsc} animateOpacity>
            <Box
              mt={2}
              p={3}
              borderWidth={1}
              borderRadius="md"
              bg={useColorModeValue('gray.100', 'gray.700')}
            >
              <Paragraph>
                <Link
                  target="_blank"
                  href="https://digikogu.taltech.ee/et/Item/7ab426de-79c9-4bab-a5ef-fc15f4cd738d"
                >
                  Thesis: Implementation of Scrumban in a small software
                  development company
                </Link>
              </Paragraph>
            </Box>
          </Collapse>
        </BioSection>
        <BioSection>
          <BioYear>2018</BioYear>
          Completed the Master&apos;s Program in the Tallinn University of
          Technology
          <Button size="xs" ml={2} onClick={() => setShowMoreMsc(!showMoreMsc)}>
            {showMoreMsc ? '-' : '+'}
          </Button>
          <Collapse in={showMoreMsc} animateOpacity>
            <Box
              mt={2}
              p={3}
              borderWidth={1}
              borderRadius="md"
              bg={useColorModeValue('gray.100', 'gray.700')}
            >
              <Paragraph>
                <Link
                  target="_blank"
                  href="https://digikogu.taltech.ee/et/Item/43135ad8-e53f-4a18-8f7b-077ba361f70d"
                >
                  Thesis: Topic patterns extraction from legal texts
                </Link>
              </Paragraph>
            </Box>
          </Collapse>
        </BioSection>
        <BioSection>
          <BioYear>2018 to 2024</BioYear>
          Worked at{' '}
          <Link target="_blank" href="https://www.feelingstream.com/">
            Feelingstream
          </Link>{' '}
          as Lead Developer
          <Button size="xs" ml={2} onClick={() => setShowMore(!showMore)}>
            {showMore ? '-' : '+'}
          </Button>
          <Collapse in={showMore} animateOpacity>
            <Box
              mt={2}
              p={3}
              borderWidth={1}
              borderRadius="md"
              bg={useColorModeValue('gray.100', 'gray.700')}
            >
              <Paragraph>
                🚀 <strong>Spearheaded</strong> multiple software development
                projects, overseeing the full lifecycle from design to
                deployment.
                <br />
                🚀 <strong>Architected</strong> and developed an{' '}
                <strong>automated analytics platform</strong> from scratch using{' '}
                <strong>Flask/Django</strong>, PostgreSQL, Elasticsearch, React,
                and TypeScript, laying the foundation for Feelingstream’s core
                product.
                <br />
                🚀 <strong>Developed, implemented, and maintained</strong>{' '}
                microservices as part of Feelingstream’s application system,
                integrating with platforms like{' '}
                <strong>Genesys, Kafka, and Zendesk</strong>.
                <br />
                🚀 <strong>Designed</strong> real-time AI-driven insights
                delivery based on customer conversations, automating task
                assignments and notifications.
                <br />
                🚀 <strong>Led</strong> Kubernetes-based deployment strategies
                with <strong>ArgoCD</strong> and Helm charts for scalable and
                reliable cloud infrastructure.
                <br />
                🚀 <strong>Played a key role</strong> in architectural
                decisions, continuously improving system{' '}
                <strong>efficiency and reliability</strong>.
              </Paragraph>
            </Box>
          </Collapse>
        </BioSection>
        <BioSection>
          <BioYear>2024 to present</BioYear>
          Working at{' '}
          <Link target="_blank" href="https://www.feelingstream.com/">
            Feelingstream
          </Link>{' '}
          as Head of Product
          <Button
            size="xs"
            ml={2}
            onClick={() => setShowMoreHead(!showMoreHead)}
          >
            {showMoreHead ? '-' : '+'}
          </Button>
          <Collapse in={showMoreHead} animateOpacity>
            <Box
              mt={2}
              p={3}
              borderWidth={1}
              borderRadius="md"
              bg={useColorModeValue('gray.100', 'gray.700')}
            >
              <Paragraph>
                🚀 <strong>Leading</strong> the development and evolution of
                Feelingstream’s{' '}
                <strong>AI-powered conversation analytics</strong> tool for
                enterprise clients.
                <br />
                🚀 <strong>Planned and designed</strong> new tools,{' '}
                <strong>Quality Score</strong> and{' '}
                <strong>Automatic Summary</strong>, which were the first
                solutions to utilize{' '}
                <strong>Large Language Models (LLMs)</strong>.{' '}
                <strong>Conducted in-depth market research</strong>
                before <strong>successfully implementing</strong> these
                innovations with the team.
                <br />
                🚀 <strong>Driving innovation</strong> in multilingual
                speech-to-text transcriptions, <strong>AI automation</strong>,
                and <strong>real-time insights</strong> for customer
                conversations.
                <br />
                🚀 <strong>Collaborating</strong> with large Scandinavian banks
                and telecom companies to{' '}
                <strong>enhance customer service operations</strong> through
                automation and analytics.
                <br />
                🚀 <strong>Ensuring product security and compliance</strong>,
                including <strong>ISO27001 certification</strong> for data
                security and information management.
                <br />
                🚀 <strong>Overseeing a cross-functional team</strong>,{' '}
                promoting a culture of efficiency, reliability, and continuous
                improvement.
              </Paragraph>
            </Box>
          </Collapse>
        </BioSection>
      </Section>
      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Skills
        </Heading>
        <BioSection>
          <BioYear>🐍</BioYear>
          Python, Flask, Django, Elasticsearch, React, TypeScript, Redux, Redis,
          Celery, PostgreSQL, RabbitMQ, REST API, Kafka
        </BioSection>
        <BioSection>
          <BioYear>🎯</BioYear>
          Aligning technology with business goals, long-term planning
        </BioSection>
        <BioSection>
          <BioYear>🤖</BioYear>
          LLMs, NLP, Speech Recognition (ASR), AI-powered automation
        </BioSection>
        <BioSection>
          <BioYear>☁️</BioYear>
          Docker, Kubernetes, ArgoCD, Helm
        </BioSection>
        <BioSection>
          <BioYear>🏗</BioYear>
          Scalable microservices, event-driven architectures, high-availability
          systems
        </BioSection>
        <BioSection>
          <BioYear>🏆</BioYear>
          Hiring, mentoring, building high-performance engineering teams
        </BioSection>
        <BioSection>
          <BioYear>⚡</BioYear>
          GitHub Copilot, OpenAI tools, Prompt Engineering
        </BioSection>
        <BioSection>
          <BioYear>🔄</BioYear>
          Scrum, Kanban, CI/CD Pipelines, stakeholder management
        </BioSection>
        <BioSection>
          <BioYear>🔒</BioYear>
          ISO27001, data governance, risk management
        </BioSection>
      </Section>
      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Projects
        </Heading>
        <BioSection>
          <BioYear>🔍</BioYear>
          <Link
            target="_blank"
            href="https://www.feelingstream.com/product-overview/"
          >
            Vision
          </Link>{' '}
          - The conversation analytics tool for large enterprises.
        </BioSection>
        <BioSection>
          <BioYear>📝</BioYear>
          <Link
            target="_blank"
            href="https://www.feelingstream.com/automatic-summary/"
          >
            Automatic Summary
          </Link>{' '}
          - the Generative AI based automation that helps reduce manual tasks,
          streamline processes, and save time.
        </BioSection>
        <BioSection>
          <BioYear>🔗</BioYear>
          <Link
            target="_blank"
            href="https://www.feelingstream.com/automatic-summary/"
          >
            Integrations
          </Link>{' '}
          - Connect the tool to the systems you already use.
        </BioSection>
        <BioSection>
          <BioYear>🛡️</BioYear>
          <Link target="_blank" href="https://www.feelingstream.com/security/">
            Security
          </Link>{' '}
          - Get full visibility with the needed security.
        </BioSection>
        <BioSection>
          <BioYear>📊</BioYear>
          <Link
            target="_blank"
            href="https://www.feelingstream.com/automatic-quality-score-with-genai/"
          >
            Automatic Quality Score
          </Link>{' '}
          - is a Large Language Model (LLM) based systematic automated
          assessment of call conversations. It evaluates customer service
          interactions in a simple and straightforward manner, focusing on key
          aspects of the conversation.
        </BioSection>
      </Section>
      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          I ♥
        </Heading>
        <Paragraph>
          Football, Padel, Film industry, Strategy board games, KotKot
        </Paragraph>
      </Section>
      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          On the web
        </Heading>
        <List>
          <ListItem>
            <Tooltip
              label="Most contributions are in private company repositories"
              aria-label="GitHub Info"
            >
              <Link href="https://github.com/shiki009" target="_blank">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<Icon as={IoLogoGithub} />}
                >
                  @shiki009 (1,000+ contributions/year)
                </Button>
              </Link>
            </Tooltip>
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

export default Page
