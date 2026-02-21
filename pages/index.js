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
import { IoLogoInstagram, IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5'

const Page = () => {
  const [showMore, setShowMore] = useState(false)
  const [showMoreFsHead, setShowMoreFsHead] = useState(false)
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
        Hello, I&apos;m a CTO based in Estonia!
      </Box>
      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Vladislav Šikirjavõi
          </Heading>
          <p>CTO · Planning, building and shipping software</p>
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
            alt="Vladislav Šikirjavõi"
          />
        </Box>
      </Box>

      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Summary
        </Heading>
        <Paragraph>
          CTO at{' '}
          <Link target="_blank" rel="noopener noreferrer" href="https://www.avokaado.io/">
            Avokaado
          </Link>
          . I plan, lead teams, write code, and deploy — across the full stack
          and infrastructure. Background in backend engineering, cloud
          infrastructure, and AI systems. I have been building software
          professionally since 2018.
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
          <Button size="xs" ml={2} aria-label="Show BSc thesis" aria-expanded={showMoreBsc} onClick={() => setShowMoreBsc(!showMoreBsc)}>
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
                  target="_blank" rel="noopener noreferrer"
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
          <Button size="xs" ml={2} aria-label="Show MSc thesis" aria-expanded={showMoreMsc} onClick={() => setShowMoreMsc(!showMoreMsc)}>
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
                  target="_blank" rel="noopener noreferrer"
                  href="https://digikogu.taltech.ee/et/Item/43135ad8-e53f-4a18-8f7b-077ba361f70d"
                >
                  Thesis: Topic patterns extraction from legal texts
                </Link>
              </Paragraph>
            </Box>
          </Collapse>
        </BioSection>
        <BioSection>
          <BioYear>2018 to April 2024</BioYear>
          Worked at{' '}
          <Link target="_blank" rel="noopener noreferrer" href="https://www.feelingstream.com/">
            Feelingstream
          </Link>{' '}
          as Lead Developer
          <Button size="xs" ml={2} aria-label="Show Lead Developer details" aria-expanded={showMore} onClick={() => setShowMore(!showMore)}>
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
                🛠 <strong>Built</strong> the core analytics platform from
                scratch using <strong>Flask/Django</strong>, PostgreSQL,
                Elasticsearch, React, and TypeScript.
                <br />
                🛠 <strong>Developed and maintained</strong> microservices
                integrating with{' '}
                <strong>Genesys, Kafka, and Zendesk</strong>.
                <br />
                🛠 <strong>Designed</strong> real-time AI-driven insights
                delivery based on customer conversations.
                <br />
                🛠 <strong>Led</strong> Kubernetes-based deployments with{' '}
                <strong>ArgoCD</strong> and Helm charts.
              </Paragraph>
            </Box>
          </Collapse>
        </BioSection>
        <BioSection>
          <BioYear>April 2024 to March 2025</BioYear>
          Worked at{' '}
          <Link target="_blank" rel="noopener noreferrer" href="https://www.feelingstream.com/">
            Feelingstream
          </Link>{' '}
          as Head of Product
          <Button size="xs" ml={2} aria-label="Show Head of Product details" aria-expanded={showMoreFsHead} onClick={() => setShowMoreFsHead(!showMoreFsHead)}>
            {showMoreFsHead ? '-' : '+'}
          </Button>
          <Collapse in={showMoreFsHead} animateOpacity>
            <Box
              mt={2}
              p={3}
              borderWidth={1}
              borderRadius="md"
              bg={useColorModeValue('gray.100', 'gray.700')}
            >
              <Paragraph>
                🛠 <strong>Led</strong> product strategy and roadmap for
                Feelingstream&apos;s conversation analytics platform.
                <br />
                🛠 <strong>Designed and shipped</strong>{' '}
                <strong>Automatic Quality Score</strong> and{' '}
                <strong>Automatic Summary</strong> — the first LLM-powered
                features in the product.
                <br />
                🛠 <strong>Collaborated</strong> with enterprise clients in
                banking and telecom to define requirements and validate
                solutions.
                <br />
                🛠 <strong>Oversaw</strong> ISO27001 certification process for
                data security and compliance.
              </Paragraph>
            </Box>
          </Collapse>
        </BioSection>
        <BioSection>
          <BioYear>April 2025 to present</BioYear>
          Working at{' '}
          <Link target="_blank" rel="noopener noreferrer" href="https://www.avokaado.io/">
            Avokaado
          </Link>{' '}
          as CTO
          <Button
            size="xs"
            ml={2}
            aria-label="Show CTO details"
            aria-expanded={showMoreHead}
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
                🛠 <strong>Planning</strong> the technical roadmap and
                architecture for Avokaado&apos;s contract lifecycle management
                platform.
                <br />
                👥 <strong>Leading</strong> the engineering team — hiring,
                code reviews, sprint planning, and day-to-day execution.
                <br />
                💻 <strong>Hands-on development</strong> across backend,
                frontend, and infrastructure.
                <br />
                🚢 <strong>Deploying and maintaining</strong> production
                systems, CI/CD pipelines, and cloud infrastructure.
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
          <BioYear>⚖️</BioYear>
          <Link target="_blank" rel="noopener noreferrer" href="https://avokaado.io/avo">
            Avo by Avokaado
          </Link>{' '}
          - Governed AI for legal teams. Turns contracts into AI agents that
          handle the full lifecycle — drafting, negotiating, approving, and
          archiving — within defined rules and with every decision explainable
          and auditable.
        </BioSection>
        <BioSection>
          <BioYear>🔍</BioYear>
          <Link
            target="_blank" rel="noopener noreferrer"
            href="https://www.feelingstream.com/product-overview/"
          >
            Vision
          </Link>{' '}
          - Conversation analytics platform for large enterprises. Built from
          scratch, including the core backend, microservices, and AI-powered
          insights layer.
        </BioSection>
        <BioSection>
          <BioYear>📊</BioYear>
          <Link
            target="_blank" rel="noopener noreferrer"
            href="https://www.feelingstream.com/automatic-quality-score-with-genai/"
          >
            Automatic Quality Score
          </Link>{' '}
          - LLM-based automated scoring of customer service calls. Designed and
          led the development end-to-end.
        </BioSection>
        <BioSection>
          <BioYear>📝</BioYear>
          <Link
            target="_blank" rel="noopener noreferrer"
            href="https://www.feelingstream.com/automatic-summary/"
          >
            Automatic Summary
          </Link>{' '}
          - Generative AI automation that summarises call conversations,
          reducing manual after-call work.
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
              <Link href="https://github.com/shiki009" target="_blank" rel="noopener noreferrer">
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
            <Link href="https://www.linkedin.com/in/vladislav-sikirjavoi/" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<Icon as={IoLogoLinkedin} />}
              >
                vladislav-sikirjavoi
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://instagram.com/v_shiki" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<Icon as={IoLogoInstagram} />}
              >
                @v_shiki
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="mailto:vladislav.sikirjavoi@gmail.com">
              <Button
                variant="ghost"
                colorScheme="teal"
              >
                vladislav.sikirjavoi@gmail.com
              </Button>
            </Link>
          </ListItem>
        </List>
      </Section>
    </Container>
  )
}

export default Page
