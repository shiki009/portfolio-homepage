# Portfolio Homepage -- Project Instructions

> Personal portfolio & CV site with interactive 3D donut model and a hidden Konami-code game mode. Next.js 15 (Pages Router) + Three.js + Chakra UI.

## Tech Stack

- **Framework**: Next.js 15 (Pages Router, React 18, SSR-capable)
- **3D**: Three.js (vanilla, via `GLTFLoader` + `OrbitControls`) -- no React Three Fiber
- **UI Library**: Chakra UI v1 (`@chakra-ui/react` + `@chakra-ui/icons`)
- **Styling**: Emotion (`@emotion/react`, `@emotion/styled`) -- used for Chakra internals + custom styled components
- **Animation**: Framer Motion v5 (`motion.div`, `AnimatePresence`)
- **Icons**: React Icons (`react-icons/io5` -- Ionicons 5)
- **Theming**: Chakra `extendTheme` with dark mode default, custom component variants
- **Font**: Google Fonts `Rationale` (headings)
- **Linting**: ESLint (flat config) + Prettier
- **Language**: JavaScript (`.js` files, no TypeScript)

## Project Structure

```
portfolio-homepage/
  pages/
    _app.js              -- ChakraProvider + GameModeProvider + Layout wrapper
    _document.js         -- HTML skeleton, ColorModeScript, Google Fonts
    index.js             -- Main content page (bio, skills, projects, links)
  components/
    layouts/
      main.js            -- Main layout: NavBar, LazyDonut/LazyGameMode, Footer
    navbar.js            -- Fixed top nav with Logo + ThemeToggleButton
    footer.js            -- Copyright + Konami hint
    logo.js              -- Next/Image logo + site name link
    theme-toggle-button.js -- Dark/light toggle with AnimatePresence
    donut.js             -- Three.js scene: loads GLTF model, OrbitControls, camera animation
    donut-loader.js      -- Spinner + container shown while donut loads
    bio.js               -- BioSection + BioYear styled components
    section.js           -- Animated section wrapper (Framer Motion + Chakra)
    paragraph.js         -- Styled paragraph with text-indent
    game/
      GameMode.js        -- Game mode container: canvas + overlay + touch controls
      engine/
        GameEngine.js    -- Main game loop: input -> update -> render
        Renderer.js      -- Canvas 2D renderer: room tiles, portals, player, HUD
        Player.js        -- Player entity: position, movement, sprite selection
        Room.js          -- Tile map + wall collision + portal definitions
        Portal.js        -- Portal entity: position, glow animation, hitbox
        InputManager.js  -- Keyboard + touch direction input
        SpriteSheet.js   -- Procedural pixel-art sprite generation (Crash Bandicoot style)
        constants.js     -- Canvas size, tile size, colors, portal definitions, directions
      content/
        gameContent.js   -- Data for portal overlays (experience, projects, skills, about)
      controls/
        TouchControls.js -- Mobile D-pad overlay using Chakra IconButton
      overlay/
        PortalOverlay.js -- Modal overlay showing content when player enters portal
  lib/
    theme.js             -- Chakra theme: dark mode, custom heading/link variants, colors
    model.js             -- GLTFLoader wrapper: loadGLTFModel(scene, path, options)
    gameContext.js       -- React Context + Konami code listener for game mode toggle
  public/
    scene.glb            -- 3D donut model (GLTF binary)
    images/              -- Logo, favicons, OG image
```

## Naming Conventions

- **Files**: `camelCase.js` for components and modules (e.g., `GameMode.js`, `gameContext.js`)
  - Engine classes use `PascalCase.js` (e.g., `GameEngine.js`, `Player.js`)
  - Utility/config files use `camelCase.js` (e.g., `theme.js`, `model.js`)
- **Components**: `PascalCase` function names (e.g., `const Footer = ()`, `export default class Player`)
- **Exports**: Default exports for all components and classes
- **Named exports**: Used for sub-components (e.g., `export const BioSection`, `export const DonutSpinner`)
- **Imports**: Relative paths (`../components/section`, `../../lib/gameContext`)
- **CSS-in-JS**: Emotion `styled()` for custom styled components, Chakra props for inline styling

## Component Patterns

### Page Component (Pages Router)

```javascript
import React, { useState } from 'react'
import { Container, Box, Heading, useColorModeValue } from '@chakra-ui/react'
import Section from '../components/section'
import Paragraph from '../components/paragraph'

const Page = () => {
  const [showMore, setShowMore] = useState(false)

  return (
    <Container>
      <Box
        borderRadius="lg"
        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
        p={3}
        mb={6}
        align="center"
      >
        Content here
      </Box>
      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Title
        </Heading>
        <Paragraph>Text content</Paragraph>
      </Section>
    </Container>
  )
}

export default Page
```

### Layout Component

```javascript
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Box, Container } from '@chakra-ui/react'

// Heavy components loaded dynamically with SSR disabled
const LazyDonut = dynamic(() => import('../donut'), {
  ssr: false,
  loading: () => <DonutLoader />
})

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Page Title</title>
      </Head>
      <NavBar path={router.asPath} />
      <Container maxW="container.md" pt={14}>
        <LazyDonut />
        {children}
        <Footer />
      </Container>
    </Box>
  )
}

export default Main
```

### Styled Component (Emotion)

```javascript
import { Box } from '@chakra-ui/react'
import styled from '@emotion/styled'

export const BioSection = styled(Box)`
  padding-left: 3.4em;
  text-indent: -3.4em;
`

export const BioYear = styled.span`
  font-weight: bold;
  margin-right: 1em;
`
```

### Animated Section (Framer Motion + Chakra)

```javascript
import { motion } from 'framer-motion'
import { chakra, shouldForwardProp } from '@chakra-ui/react'

const StyledDiv = chakra(motion.div, {
  shouldForwardProp: prop => {
    return shouldForwardProp(prop) || prop === 'transition'
  }
})

const Section = ({ children, delay = 0 }) => (
  <StyledDiv
    initial={{ y: 10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, delay }}
    mb={6}
  >
    {children}
  </StyledDiv>
)

export default Section
```

## Three.js Patterns

### GLTF Model Loading

```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export function loadGLTFModel(scene, glbPath, options = { receiveShadow: true, castShadow: true }) {
  const { receiveShadow, castShadow } = options
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader()
    loader.load(
      glbPath,
      gltf => {
        const obj = gltf.scene
        obj.name = 'donut'
        obj.position.y = 0
        obj.position.x = 0
        obj.receiveShadow = receiveShadow
        obj.castShadow = castShadow
        scene.add(obj)
        obj.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = castShadow
            child.receiveShadow = receiveShadow
          }
        })
        resolve(obj)
      },
      undefined,
      function (error) { reject(error) }
    )
  })
}
```

### Three.js Scene Setup (in React component)

```javascript
import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const ThreeScene = () => {
  const refContainer = useRef()
  const [loading, setLoading] = useState(true)
  const [renderer, setRenderer] = useState()

  useEffect(() => {
    const { current: container } = refContainer
    if (container && !renderer) {
      const scW = container.clientWidth
      const scH = container.clientHeight
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(scW, scH)
      container.appendChild(renderer.domElement)
      setRenderer(renderer)

      const camera = new THREE.OrthographicCamera(-scale, scale, scale, -scale, 0.01, 50000)
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.autoRotate = true

      // Animation loop
      let req = null
      const animate = () => {
        req = requestAnimationFrame(animate)
        controls.update()
        renderer.render(scene, camera)
      }
      animate()

      return () => {
        cancelAnimationFrame(req)
        renderer.dispose()
      }
    }
  }, [])

  return <div ref={refContainer}>{loading && <Spinner />}</div>
}
```

## Game Engine Patterns

### Canvas 2D Game Loop

```javascript
export default class GameEngine {
  constructor(canvas, callbacks = {}) {
    this.callbacks = callbacks
    this.input = new InputManager()
    this.player = new Player(spawnX, spawnY)
    this.renderer = new Renderer(canvas)
    this.paused = false
    this.running = false
    this.rafId = null
  }

  start() {
    this.input.attach()
    this.running = true
    this._loop()
  }

  stop() {
    this.running = false
    this.input.detach()
    if (this.rafId) cancelAnimationFrame(this.rafId)
  }

  _loop() {
    if (!this.running) return
    if (!this.paused) this._update()
    this._render()
    this.rafId = requestAnimationFrame(() => this._loop())
  }
}
```

### Entity Pattern (Player, Portal)

```javascript
import { PLAYER_SIZE, PLAYER_SPEED, DIRECTIONS } from './constants'

export default class Player {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = PLAYER_SIZE
    this.height = PLAYER_SIZE
    this.facing = DIRECTIONS.DOWN
    this.moving = false
  }

  update(direction, room) {
    // Movement with wall collision checking
    let dx = 0, dy = 0
    if (direction === DIRECTIONS.UP) dy = -PLAYER_SPEED
    // ...
    const nextX = this.x + dx
    if (!room.collidesWithWall(nextX, this.y, this.width, this.height)) {
      this.x = nextX
    }
  }
}
```

## Chakra UI Theme

```javascript
import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const theme = extendTheme({
  config: { initialColorMode: 'dark', useSystemColorMode: true },
  styles: {
    global: props => ({
      body: { bg: mode('#f0e7db', '#202023')(props), overflowX: 'hidden' }
    })
  },
  components: {
    Heading: {
      variants: {
        'section-title': {
          textDecoration: 'underline', fontSize: 20,
          textUnderlineOffset: 6, textDecorationColor: '#525252',
          textDecorationThickness: 4, marginTop: 3, marginBottom: 4
        },
        'page-title': { fontSize: 28, fontWeight: 'bold' }
      }
    },
    Link: {
      baseStyle: props => ({
        color: mode('#3d7aed', '#ff63c3')(props),
        textUnderlineOffset: 3
      })
    }
  },
  fonts: { heading: "'Rationale'" },
  colors: { grassTeal: '#88ccca' }
})
```

## Key Patterns

- **Dynamic imports**: Heavy components (Three.js scene, game engine) loaded with `next/dynamic` and `ssr: false`
- **Ref-based rendering**: Three.js and Canvas 2D use `useRef` for container/canvas elements
- **Context for global state**: `GameModeContext` manages game mode toggle via Konami code
- **Responsive design**: Chakra responsive arrays (`w={['100%', 480, 640]}`) for breakpoints
- **Color mode**: `useColorModeValue(light, dark)` for theme-aware colors
- **Cleanup**: All `useEffect` hooks return cleanup functions for `cancelAnimationFrame`, `removeEventListener`, `renderer.dispose()`

## Prettier Config

```javascript
{
  arrowParens: 'avoid',
  singleQuote: true,
  bracketSpacing: true,
  endOfLine: 'lf',
  semi: false,
  tabWidth: 2,
  trailingComma: 'none'
}
```

## Sections / Feature Areas

- **Hero**: Greeting banner, name, title, profile image
- **Summary**: Brief professional summary with external links
- **Bio**: Timeline of education and career with expandable details (Collapse)
- **Skills**: Categorized skill list with emoji icons
- **Projects**: Project showcase with descriptions and links
- **Social Links**: GitHub, LinkedIn, Instagram, email
- **3D Donut**: Interactive GLTF model with auto-rotate and orbit controls
- **Game Mode**: Hidden easter egg activated by Konami code -- 2D pixel-art game with portals to content sections

## Agent Pipelines

4 pipelines, 13 agent files. Full documentation in `.claude/agents/README.md`.

### Quick Reference

| Pipeline | Command | When | Stages |
|----------|---------|------|--------|
| **Feature** | `@folio-orchestrator` | New feature (2+ files) | planner -> architect -> implementor -> tester -> reviewer |
| **Bugfix** | `@folio-bug-orchestrator` | Bug, unknown root cause | triager -> fixer -> tester -> reviewer |
| **Hotfix** | `@folio-hotfix-orchestrator` | Bug, known root cause | fixer -> reviewer |
| **Refactor** | `@folio-refactor-orchestrator` | Restructure code | analyzer -> executor -> tester -> reviewer |

### Choosing the Right Pipeline

```
"I need a new feature"                    -> @folio-orchestrator
"Something is broken, not sure why"       -> @folio-bug-orchestrator
"Something is broken, I know the cause"   -> @folio-hotfix-orchestrator
"I want to restructure this code"         -> @folio-refactor-orchestrator
"Single-file fix, trivial change"         -> just do it directly
```

### Artifact Directories

```
.planning/
  features/{slug}/      <- feature pipeline
  bugs/{slug}/          <- bugfix pipeline
  hotfixes/{slug}/      <- hotfix pipeline
  refactors/{slug}/     <- refactor pipeline
```
