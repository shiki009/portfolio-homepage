import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Box,
  Heading,
  Link,
  Badge,
  VStack,
  HStack,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react'
import { gameContent } from '../content/gameContent'

const ExperienceContent = ({ data }) => {
  const cardBg = useColorModeValue('orange.50', 'whiteAlpha.100')
  const linkColor = useColorModeValue('#3d7aed', '#ff63c3')
  const borderColor = useColorModeValue('orange.100', 'whiteAlpha.200')

  return (
    <VStack spacing={4} align="stretch">
      {data.sections.map((s, i) => (
        <Box key={i} p={4} borderRadius="lg" bg={cardBg} borderWidth={1} borderColor={borderColor}>
          <HStack justify="space-between" wrap="wrap" mb={1}>
            <Heading size="sm" fontFamily="'Rationale'">{s.role}</Heading>
            <Badge colorScheme="purple" fontSize="xs">{s.period}</Badge>
          </HStack>
          <Link href={s.url} isExternal color={linkColor} fontSize="sm" textUnderlineOffset={3}>
            {s.company}
          </Link>
          <Box mt={2}>
            {s.bullets.map((b, j) => (
              <Text key={j} fontSize="sm" mb={1} lineHeight="tall">- {b}</Text>
            ))}
          </Box>
        </Box>
      ))}
    </VStack>
  )
}

const ProjectsContent = ({ data }) => {
  const cardBg = useColorModeValue('orange.50', 'whiteAlpha.100')
  const linkColor = useColorModeValue('#3d7aed', '#ff63c3')
  const borderColor = useColorModeValue('orange.100', 'whiteAlpha.200')

  return (
    <VStack spacing={4} align="stretch">
      {data.sections.map((p, i) => (
        <Box key={i} p={4} borderRadius="lg" bg={cardBg} borderWidth={1} borderColor={borderColor}>
          <Heading size="sm" fontFamily="'Rationale'">
            <Link href={p.url} isExternal color={linkColor} textUnderlineOffset={3}>
              {p.name}
            </Link>
          </Heading>
          <Text fontSize="sm" mt={2} lineHeight="tall">{p.description}</Text>
        </Box>
      ))}
    </VStack>
  )
}

const SkillsContent = ({ data }) => {
  const cardBg = useColorModeValue('orange.50', 'whiteAlpha.100')

  return (
    <VStack spacing={3} align="stretch">
      {data.sections.map((s, i) => (
        <HStack key={i} align="start" spacing={3} p={3} borderRadius="lg" bg={cardBg}>
          <Text fontSize="xl">{s.icon}</Text>
          <Box>
            <Text fontWeight="bold" fontSize="sm" fontFamily="'Rationale'">{s.label}</Text>
            <Text fontSize="sm" opacity={0.85} lineHeight="tall">{s.items}</Text>
          </Box>
        </HStack>
      ))}
    </VStack>
  )
}

const AboutContent = ({ data }) => {
  const linkColor = useColorModeValue('#3d7aed', '#ff63c3')
  const sectionBg = useColorModeValue('orange.50', 'whiteAlpha.100')

  return (
    <VStack spacing={4} align="stretch">
      <Text lineHeight="tall">{data.bio}</Text>
      <Divider />
      <Box p={3} borderRadius="lg" bg={sectionBg}>
        <Heading size="sm" mb={3} fontFamily="'Rationale'">Education</Heading>
        {data.education.map((e, i) => (
          <Text key={i} fontSize="sm" mb={2} lineHeight="tall">
            <Badge mr={2} colorScheme="purple">{e.year}</Badge>{e.text}
          </Text>
        ))}
      </Box>
      <Box p={3} borderRadius="lg" bg={sectionBg}>
        <Heading size="sm" mb={2} fontFamily="'Rationale'">Interests</Heading>
        <Text fontSize="sm" lineHeight="tall">{data.interests}</Text>
      </Box>
      <Box p={3} borderRadius="lg" bg={sectionBg}>
        <Heading size="sm" mb={3} fontFamily="'Rationale'">On the Web</Heading>
        {data.links.map((l, i) => (
          <Text key={i} fontSize="sm" mb={2}>
            <Badge mr={2} colorScheme="teal">{l.platform}</Badge>
            <Link href={l.url} isExternal color={linkColor} textUnderlineOffset={3}>
              {l.label}
            </Link>
          </Text>
        ))}
      </Box>
    </VStack>
  )
}

const contentRenderers = {
  experience: ExperienceContent,
  projects: ProjectsContent,
  skills: SkillsContent,
  about: AboutContent,
}

const PortalOverlay = ({ portalId, isOpen, onClose }) => {
  const data = portalId ? gameContent[portalId] : null
  const ContentComponent = portalId ? contentRenderers[portalId] : null
  const modalBg = useColorModeValue('#f0e7db', '#202023')
  const headerBorder = useColorModeValue('orange.200', 'whiteAlpha.200')

  if (!data || !ContentComponent) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.700" />
      <ModalContent bg={modalBg} maxH="80vh" borderRadius="xl">
        <ModalHeader
          fontFamily="'Rationale'"
          fontSize="2xl"
          borderBottomWidth={1}
          borderColor={headerBorder}
        >
          {data.title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} pt={4}>
          <ContentComponent data={data} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default PortalOverlay
