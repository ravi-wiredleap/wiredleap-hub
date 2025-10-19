# WiredLeap Visual Hub - "Art of the Possible"

A stunning, cinematic discovery platform for exploring AI-powered visual intelligence solutions across public safety, smart cities, and enterprise use cases.

## 🚀 Live Demo

The application is currently running at: **http://localhost:3001**

## ✨ Features

### Core Functionality
- **🎨 Cinematic Dark UI** - Apple keynote-inspired design with smooth animations
- **🔍 50+ Use Cases** - Comprehensive library across Visual, Audio, Social Media, Text, and Sensors
- **🎯 Smart Filtering** - Multi-dimensional filtering by input type, category, and persona
- **👥 Persona Views** - Tailored experiences for Police, City Planners, Enterprises, Conservation, Healthcare
- **📱 Fully Responsive** - Optimized for desktop, tablet, and mobile
- **⚡ Real-time Search** - Instant search across titles, descriptions, tags, and customers
- **🎬 Interactive Modals** - Deep-dive into each use case with full details

### Pages Built
1. **Landing Page (/)** - Animated hero with category pills and interactive elements
2. **Explore Hub (/explore)** - Main discovery interface with filters and grid layout
3. **Use Case Detail** - Modal-based detailed view with integration info
4. **Persona Pages** - Dynamic persona-specific curated views
5. **About Page** - Platform overview with Edgeverse, Pulse, and Sentinel
6. **Resources** - Download center for documentation and specs
7. **Demo Request** - Contact form for scheduling demos

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS with custom dark theme
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Language:** TypeScript
- **State:** React Hooks + Context

## 📊 Data Model

All use cases are stored in `/content/usecases.json` with the following structure:

```json
{
  "id": "unique-identifier",
  "title": "Use Case Title",
  "input": "Visual | Audio | Social Media | Text | Sensors (IoT, GIS)",
  "category": "Public Safety | Smart City | etc.",
  "description": "Detailed description",
  "potentialCustomers": ["Customer Type 1", "Customer Type 2"],
  "tags": ["tag1", "tag2"],
  "persona_relevance": ["Police", "City Planner"],
  "demoAsset": "image-url",
  "outputs": ["Output 1", "Output 2"],
  "integration": {
    "edge": true,
    "pulse": true,
    "sentinel": false
  }
}
```

## 🎨 Design System

### Colors
- **Primary Background:** `#0b0d0f` (near-black)
- **Accent Green:** `#0ff3a3`
- **Accent Blue:** `#2bb1ff`
- **Text Primary:** `#ffffff`
- **Text Secondary:** `#b7c0c9`

### Typography
- **Font Family:** Inter (system-ui fallback)
- **Heading Sizes:** 4xl to 8xl
- **Body Text:** Base to xl

### Components
- `UseCaseCard` - Hoverable card with image, tags, and actions
- `FilterPanel` - Multi-select filters with search
- `UseCaseModal` - Full-screen modal with details
- `Header` - Global navigation with active state

## 📁 Project Structure

```
wiredleap-hub/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles
│   ├── explore/page.tsx            # Main discovery hub
│   ├── persona/[persona]/page.tsx  # Dynamic persona pages
│   ├── about/page.tsx              # About page
│   ├── resources/page.tsx          # Resources page
│   ├── demo-request/page.tsx       # Demo request form
│   └── api/
│       └── usecases/
│           ├── route.ts            # List API
│           └── [id]/route.ts       # Detail API
├── components/
│   ├── ui/
│   │   ├── UseCaseCard.tsx         # Use case card component
│   │   ├── FilterPanel.tsx         # Filter sidebar
│   │   └── UseCaseModal.tsx        # Detail modal
│   └── layout/
│       └── Header.tsx              # Global header
├── content/
│   └── usecases.json               # All use cases data
├── lib/
│   └── utils.ts                    # Utility functions
├── types/
│   └── index.ts                    # TypeScript types
└── public/                         # Static assets
```

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Production
```bash
npm start
```

## 🎯 API Endpoints

### Get All Use Cases
```
GET /api/usecases
```

**Query Parameters:**
- `category` - Filter by category
- `persona` - Filter by persona
- `tag` - Filter by tag
- `input` - Filter by input type

**Example:**
```
/api/usecases?input=Visual&persona=police
```

### Get Single Use Case
```
GET /api/usecases/:id
```

**Example:**
```
/api/usecases/visual-fight-aggression
```

## 🎬 Key Features Detail

### Landing Page
- Animated star field background
- Blinking cursor prompt
- Category preview pills
- Press any key to continue
- Smooth page transitions

### Explore Hub
- Real-time filtering by input type, category, persona
- Live search across all fields
- Results count display
- Empty state with clear filters CTA
- Staggered card animations

### Use Case Cards
- Hover elevation effect
- Category-specific color coding
- Integration badges (Edge, Pulse, Sentinel)
- Tag previews
- Add to composer button (placeholder)

### Modal Details
- Full-screen overlay
- Hero image with gradient
- Platform integration status
- Potential customers list
- Key outputs showcase
- Download spec button (placeholder)
- Request demo CTA

### Persona Pages
- Dynamic routing for any persona
- Auto-filtered use cases
- Persona-specific icons and colors
- Use case count display

## 🔮 Future Enhancements

1. **Composer Feature** - Build custom solution packages
2. **Presenter Mode** - Guided storyboard presentations
3. **PDF Export** - Generate branded solution documents
4. **3D Network Map** - Three.js visualization of deployments
5. **Search Analytics** - Track popular use cases
6. **Authentication** - User accounts for saved sessions
7. **Internationalization** - Multi-language support
8. **Video Demos** - Embed actual demo videos
9. **Live Chat** - Real-time support integration
10. **Advanced Analytics** - PostHog or GA integration

## 📝 Use Case Categories

- **Visual** (14 use cases) - Computer vision and video analytics
- **Audio** (8 use cases) - Sound detection and analysis
- **Social Media** (7 use cases) - OSINT and sentiment analysis
- **Text** (7 use cases) - NLP and document processing
- **Sensors (IoT, GIS)** (8 use cases) - Environmental and location monitoring

## 🎨 Animation Details

- **Page Transitions:** Fade in + slide up (0.6s)
- **Card Hover:** Translate Y -8px (0.2s)
- **Stagger Delay:** 50ms per card
- **Modal:** Scale + fade (spring animation)
- **Filter Panels:** Height auto with 200ms transition
- **Cursor Blink:** 530ms interval

## 🌟 Design Highlights

1. **Glass Morphism** - Backdrop blur with subtle borders
2. **Gradient Accents** - Animated gradient text and buttons
3. **Glow Effects** - Subtle shadows on hover states
4. **Custom Animations** - Float, shimmer, and pulse effects
5. **Responsive Grid** - 1-4 columns based on viewport
6. **Dark Theme First** - Optimized for dark mode viewing

## 📱 Responsive Breakpoints

- **Mobile:** < 640px (1 column)
- **Tablet:** 640px - 1024px (2 columns)
- **Desktop:** 1024px - 1280px (3 columns)
- **Large:** > 1280px (4 columns)

## ✅ Accessibility

- Keyboard navigation support
- ARIA labels on interactive elements
- Focus trap in modals
- ESC to close modals
- Semantic HTML structure
- Alt text on all images

## 🚀 Performance

- Next.js App Router for optimal routing
- Static generation where possible
- Image optimization with Next/Image
- Lazy loading for modal content
- Minimal bundle size
- No external dependencies for core functionality

---

**Built with ❤️ for WiredLeap**

Version: 1.0.0
Last Updated: October 2025
