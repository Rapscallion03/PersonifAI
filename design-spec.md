# PersonifAI - Design Specification Document
# For Figma Prototype Implementation

---

## 1. PROJECT OVERVIEW

**Project Name:** PersonifAI Landing Page
**Project Type:** Website / Web Application Landing Page
**Core Functionality:** AI-powered personalized learning platform for school and college students
**Target Users:** School students (K-12), College students, Parents, Educators

---

## 2. PAGE STRUCTURE / USER JOURNEY

### 2.1 Sitemap
1. **Navbar** (Fixed)
2. **Hero Section**
3. **Target Audience** (School vs College)
4. **Features Section**
5. **How It Works**
6. **Testimonials**
7. **Call to Action (CTA)**
8. **Footer**

### 2.2 User Flow
```
Landing → Navbar (Sign In / Get Started)
       → Hero (Scroll Down)
       → Target Audience (Choose Path)
       → Features (Explore)
       → How It Works (Understand)
       → Testimonials (Social Proof)
       → CTA (Conversion)
       → Footer (Links)
```

---

## 3. VISUAL DESIGN SPECIFICATIONS

### 3.1 Color Palette

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Primary Indigo | #4F46E5 | Primary buttons, links, highlights |
| Primary Purple | #9333EA | Gradients, accents |
| Accent Pink | #EC4899 | Secondary highlights |
| Accent Cyan | #06B6D4 | School student section |
| Accent Orange | #F97316 | CTAs, warnings |
| Background Light | #F8FAFC | Main background (light mode) |
| Background Dark | #0F172A | Main background (dark mode) |
| Surface White | #FFFFFF | Cards, sections (light mode) |
| Surface Dark | #1E293B | Cards, sections (dark mode) |
| Text Primary | #0F172A | Headings, primary text |
| Text Secondary | #475569 | Body text, descriptions |
| Text Muted | #94A3B8 | Captions, secondary info |

### 3.2 Gradient Definitions

| Gradient Name | Colors | Direction |
|--------------|--------|-----------|
| Brand Gradient | #4F46E5 → #9333EA → #EC4899 | 135deg |
| Primary Gradient | #4F46E5 → #9333EA | 135deg |
| Purple Pink | #9333EA → #EC4899 | 135deg |
| Pink Orange | #EC4899 → #F97316 | 135deg |
| Blue Cyan | #3B82F6 → #06B6D4 | 135deg |

### 3.3 Typography

| Element | Font Family | Size | Weight | Line Height |
|---------|-------------|------|--------|-------------|
| H1 (Hero) | Inter / Geist Sans | 72px / 4.5rem | 700 (Bold) | 1.1 |
| H2 (Section) | Inter / Geist Sans | 48px / 3rem | 700 (Bold) | 1.2 |
| H3 (Card) | Inter / Geist Sans | 24px / 1.5rem | 600 (Semibold) | 1.3 |
| Body Large | Inter / Geist Sans | 20px / 1.25rem | 400 (Regular) | 1.6 |
| Body | Inter / Geist Sans | 16px / 1rem | 400 (Regular) | 1.6 |
| Caption | Inter / Geist Sans | 14px / 0.875rem | 400 (Regular) | 1.5 |
| Button | Inter / Geist Sans | 18px / 1.125rem | 600 (Semibold) | 1 |

### 3.4 Spacing System (8px Grid)

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Tight spacing |
| sm | 8px | Icon gaps |
| md | 16px | Component padding |
| lg | 24px | Section gaps |
| xl | 32px | Large gaps |
| 2xl | 48px | Section padding |
| 3xl | 64px | Major sections |
| 4xl | 96px | Hero spacing |

### 3.5 Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| sm | 4px | Small elements |
| md | 8px | Inputs |
| lg | 16px | Cards |
| xl | 24px | Large cards |
| full | 9999px | Buttons, avatars |

---

## 4. COMPONENT SPECIFICATIONS

### 4.1 NAVBAR
**Height:** 64px (h-16)
**Position:** Fixed top
**Background:** White 80% opacity with backdrop blur
**Border:** Bottom 1px #E2E8F0

**Logo Section:**
- Logo icon: 40x40px rounded-xl with brand gradient
- Logo text: 24px bold with gradient

**Navigation Links:**
- Features, How It Works, Testimonials
- Color: #475569, Hover: #4F46E5

**Action Buttons:**
- "Sign In": Text button, medium weight
- "Get Started": Gradient background, rounded-full, shadow

---

### 4.2 HERO SECTION
**Padding:** 128px top, 80px bottom
**Background:** Gradient from indigo-50 to purple-50 (light) / dark equivalents

**Badge:**
- Inline-flex, rounded-full, indigo-100 background
- Pulsing dot animation
- Text: "AI-Powered Learning Revolution"

**Headline:**
- "Learn Smarter with Personalized AI"
- Gradient text for "Personalized AI"
- Max width: 800px

**Subheadline:**
- "Transform your educational journey..."
- Max width: 600px
- Color: #475569

**CTA Buttons:**
1. Primary: "Start Learning Free"
   - Gradient background
   - Shadow on hover
   - Scale up 1.02 on hover
   
2. Secondary: "Watch Demo"
   - White background with border
   - Play icon

**Trust Indicators:**
- 3 items in a row: "Free to Start", "No Credit Card", "Cancel Anytime"
- Green checkmark icons

**Hero Cards (3 columns):**
- Smart Tutoring, Progress Tracking, Custom Curriculum
- Icon + Title + Description
- Gradient background per card

---

### 4.3 TARGET AUDIENCE SECTION
**Background:** White / Dark gray
**Padding:** 80px vertical
**Layout:** 2 columns, gap 32px

**Card Structure:**
- Relative positioning with blur gradient behind
- Border radius: 24px
- Padding: 32px

**School Students Card:**
- Gradient: Blue to Cyan
- Icon: Graduation cap
- Features list with checkmarks

**College Students Card:**
- Gradient: Purple to Pink
- Icon: Flask/beaker
- Features list with checkmarks

---

### 4.4 FEATURES SECTION
**Background:** Gradient background
**Padding:** 80px vertical
**Layout:** 3 columns, gap 24px

**Section Header:**
- "Powerful AI Features"
- Subtitle: "Experience the future..."

**Feature Cards (6 total):**
- White/Dark background
- Border radius: 16px
- Shadow on hover
- Icon with gradient background
- Title (20px semibold)
- Description (16px regular)

**Feature List:**
1. AI Chat Tutor - Message bubble icon
2. Adaptive Learning - Checklist icon
3. Smart Analytics - Chart icon
4. Study Materials - Book icon
5. Practice Tests - Clock icon
6. Study Groups - Users icon

---

### 4.5 HOW IT WORKS SECTION
**Background:** White / Dark gray
**Padding:** 80px vertical
**Layout:** 4 columns

**Section Header:**
- "How PersonifAI Works"
- Subtitle

**Step Cards:**
- Number circle: 64px diameter, gradient background
- Step title (18px semibold)
- Step description (14px)

**Steps:**
1. Create Account - Sign up
2. AI Assessment - Quiz
3. Get Personalized Plan - Custom path
4. Start Learning - Rocket

---

### 4.6 TESTIMONIALS SECTION
**Background:** Gradient background
**Padding:** 80px vertical
**Layout:** 3 columns

**Section Header:**
- "What Students Say"
- Subtitle

**Testimonial Card:**
- White/Dark background
- Border radius: 16px
- Padding: 24px

**Card Content:**
- 5-star rating (yellow)
- Quote text
- Author: Avatar + Name + Role

---

### 4.7 CTA SECTION
**Background:** Gradient (Indigo to Purple)
**Padding:** 80px vertical
**Layout:** Centered

**Content:**
- Headline: "Ready to Transform Your Learning?"
- Subtitle
- 2 buttons: "Get Started Free" (white), "Contact Sales" (outline)

---

### 4.8 FOOTER
**Background:** Gray 900
**Text Color:** Gray 400
**Padding:** 48px vertical

**Layout:** 4 columns

**Columns:**
1. Brand + Description
2. Product Links
3. Company Links
4. Legal Links

**Bottom Section:**
- Copyright text
- Social icons (Twitter, GitHub, LinkedIn)

---

## 5. ANIMATIONS & INTERACTIONS

### 5.1 Hover Effects
- **Buttons:** Scale 1.02, shadow increase, color shift
- **Cards:** Shadow increase, slight lift (translateY -2px)
- **Links:** Color transition 200ms
- **Nav background:** Opacity transition

### 5.2 Animations
- **Hero badge dot:** Pulse animation (infinite)
- **Gradients:** Subtle movement on hover

### 5.3 Scroll Behavior
- Smooth scroll enabled
- Navbar fixed on scroll with backdrop blur

---

## 6. DARK MODE

All components support dark mode:
- Background colors invert
- Text colors adjust
- Card backgrounds change
- Gradients shift to darker variants

---

## 7. RESPONSIVE BREAKPOINTS

| Breakpoint | Width | Layout Changes |
|------------|-------|---------------|
| Mobile | < 640px | Single column, stacked |
| Tablet | 640px - 1024px | 2 columns |
| Desktop | > 1024px | Full layout |

---

## 8. FIGMA IMPLEMENTATION STEPS

1. **Create New File** in Figma
2. **Set Up Design System:**
   - Create color variables
   - Define typography styles
   - Set up component library
3. **Build Components:**
   - Create each section as a frame
   - Use auto-layout
   - Add variants for dark mode
4. **Create Prototype:**
   - Set up scrolling
   - Add interactions
   - Link to sections
5. **Export Assets:**
   - Export as PDF or share link

---

## 9. ASSET REQUIREMENTS

### Icons Needed (from Heroicons/Phosphor):
- Checkmark
- Play
- Message bubble
- Chart
- Book
- Clock
- Users
- Graduation cap
- Flask
- Rocket
- Twitter
- GitHub
- LinkedIn
- Menu (mobile)
- X (close)

### Images:
- Logo SVG
- Demo video thumbnail placeholder

---

## 10. ACCESSIBILITY NOTES

- Color contrast ratio: 4.5:1 minimum
- Focus states on all interactive elements
- Alt text for all images
- Semantic HTML structure
- Keyboard navigation support

---

**Document Version:** 1.0
**Created:** 2026-03-10
**Project:** PersonifAI Landing Page
