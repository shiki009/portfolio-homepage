import React, { useState, useEffect } from 'react'
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
  Collapse,
  Textarea,
  Tooltip,
  Text
} from '@chakra-ui/react'
import Section from '../components/section'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import { IoLogoInstagram, IoLogoGithub, IoChatbubbles } from 'react-icons/io5'

const Page = () => {
  const [showMore, setShowMore] = useState(false)
  const [showMoreHead, setShowMoreHead] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatInput, setChatInput] = useState('')
  // const [chatHistory, setChatHistory] = useState([])

  const [showHint, setShowHint] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 3000) // Hide after 3 seconds
    return () => clearTimeout(timer)
  }, [])

  return (
    <Container>
      <Box
        borderRadius="lg"
        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
        p={3}
        mb={6}
        align="center"
      >
        🥑 Hello, I&apos;m a Head of Product based in Estonia! 🥑
      </Box>
      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Vladislav Šikirjavõi
          </Heading>
          <p>Head of Product with a strong technical background</p>
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

      {/* Chatbot Floating Button */}
      <Tooltip
        isOpen={showHint}
        placement="left"
        hasArrow
        bg="white"
        color="black"
        boxShadow="lg"
        p={3}
        borderRadius="md"
        fontSize="lg"
        label={
          <Box display="flex" alignItems="center" gap={2}>
            <Text fontWeight="bold">Check here!</Text>
            🥑🥑🥑
          </Box>
        }
      >
        <Button
          position="fixed"
          bottom="20px"
          right="20px"
          colorScheme="teal"
          borderRadius="full"
          p={6}
          width="60px"
          height="60px"
          onClick={() => setChatOpen(prev => !prev)}
        >
          <Icon as={IoChatbubbles} w={8} h={8} /> {/* Increased icon size */}
        </Button>
      </Tooltip>

      {/* Chatbot Window */}
      {chatOpen && (
        <Box
          position="fixed"
          bottom="80px"
          right="20px"
          // bg={useColorModeValue('gray.100', 'gray.700')}
          p={4}
          borderRadius="lg"
          boxShadow="lg"
          width="300px"
        >
          <Box height="200px" overflowY="auto" mb={2}>
            {/*{chatHistory.map((msg, index) => (*/}
            {/*  <Box*/}
            {/*    key={index}*/}
            {/*    bg={msg.sender === 'user' ? 'blue.200' : 'gray.300'}*/}
            {/*    p={2}*/}
            {/*    borderRadius="md"*/}
            {/*    mb={1}*/}
            {/*  >*/}
            {/*    <strong>{msg.sender === 'user' ? 'You:' : 'Bot:'}</strong>{' '}*/}
            {/*    {msg.text}*/}
            {/*  </Box>*/}
            {/*))}*/}
          </Box>
          <Textarea
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            placeholder="Ask about me..."
            size="sm"
          />
          <Button mt={2} width="100%" colorScheme="teal">
            Send
          </Button>
        </Box>
      )}
      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Summary
        </Heading>
        <Paragraph>
          I am an experienced Head of Product with a strong technical
          background. I specialize in architecting scalable AI-driven platforms,
          leading cross-functional engineering teams, and driving technical
          strategy aligned with business objectives. I have successfully built
          and deployed AI-powered automation tools, such as Quality Score and
          Automatic Summary, enhancing operational efficiency and customer
          insights. I ensure high security and compliance standards (ISO27001)
          while optimizing infrastructure for scalability. With a deep
          understanding of enterprise software development, DevOps, and
          multilingual NLP systems, I focus on transforming complex technical
          challenges into business opportunities. I excel at leading engineering
          teams, fostering innovation, and aligning technology with long-term
          growth strategies. My expertise extends to product roadmaps,
          stakeholder management, and technical leadership to drive sustained
          success.
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
          Completed the Bachelor&apos;s Program in the Tallinn University of
          Technology
        </BioSection>
        <BioSection>
          <BioYear>2018</BioYear>
          Completed the Master&apos;s Program in the Tallinn University of
          Technology
        </BioSection>
        <BioSection>
          <BioYear>2018 to 2024</BioYear>
          Working at Feelingstream as Lead Developer
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
                <br />
                🥑 <strong>Spearheaded</strong> multiple software development
                projects, overseeing the full lifecycle from design to
                deployment.
                <br />
                🥑 <strong>Architected</strong> and developed an{' '}
                <strong>automated analytics platform</strong> from scratch using{' '}
                <strong>Flask/Django</strong>, PostgreSQL, Elasticsearch, React,
                and TypeScript, laying the foundation for Feelingstream’s core
                product.
                <br />
                🥑 <strong>Developed, implemented, and maintained</strong>{' '}
                microservices as part of Feelingstream's application system,
                integrating with platforms like{' '}
                <strong>Genesys, Kafka, and Zendesk</strong>.
                <br />
                🥑 <strong>Designed</strong> real-time AI-driven insights
                delivery based on customer conversations, automating task
                assignments and notifications.
                <br />
                🥑 <strong>Led</strong> Kubernetes-based deployment strategies
                with <strong>ArgoCD</strong> and Helm charts for scalable and
                reliable cloud infrastructure.
                <br />
                🥑 <strong>Played a key role</strong> in architectural
                decisions, continuously improving system{' '}
                <strong>efficiency and reliability</strong>.
              </Paragraph>
            </Box>
          </Collapse>
        </BioSection>
        <BioSection>
          <BioYear>2024 to present</BioYear>
          Working at Feelingstream as Head of Product
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
                <br />
                🥑 <strong>Leading</strong> the development and evolution of
                Feelingstream’s{' '}
                <strong>AI-powered conversation analytics</strong> tool for
                enterprise clients.
                <br />
                🥑 <strong>Planned and designed</strong> new tools,{' '}
                <strong>Quality Score</strong> and{' '}
                <strong>Automatic Summary</strong>, which were the first
                solutions to utilize{' '}
                <strong>Large Language Models (LLMs)</strong>.{' '}
                <strong>Conducted in-depth market research</strong>
                before <strong>successfully implementing</strong> these
                innovations with the team.
                <br />
                🥑 <strong>Driving innovation</strong> in multilingual
                speech-to-text transcriptions, <strong>AI automation</strong>,
                and <strong>real-time insights</strong> for customer
                conversations.
                <br />
                🥑 <strong>Collaborating</strong> with large Scandinavian banks
                and telecom companies to{' '}
                <strong>enhance customer service operations</strong> through
                automation and analytics.
                <br />
                🥑 <strong>Ensuring product security and compliance</strong>,
                including <strong>ISO27001 certification</strong> for data
                security and information management.
                <br />
                🥑 <strong>Overseeing a cross-functional team</strong>,{' '}
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
            Python, Flask, Django, Elasticsearch, React, TypeScript, Redux, Redis, Celery, PostgreSQL, RabbitMQ, REST API, Kafka
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
            Scalable microservices, event-driven architectures, high-availability systems
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
      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          I ♥
        </Heading>
        <Paragraph>Football, Padel</Paragraph>
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
