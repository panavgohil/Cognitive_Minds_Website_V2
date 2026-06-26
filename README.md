# 🧠 Cognitive Minds Portal

<div align="center">

### Official Digital Platform of Cognitive Minds, DTU

*A premium digital home for debate, public discourse, competitive excellence, and intellectual growth.*

</div>

---

## 📖 About

**Cognitive Minds** is the official debating and public discourse society of **Delhi Technological University (DTU)**.

This platform serves as the central hub for:

* Society members
* Prospective recruits
* Alumni
* Faculty coordinators
* Debate enthusiasts
* Competition participants

The portal is designed to streamline recruitment, preserve society archives, showcase achievements, and provide a modern digital experience for the debating community.

---

## ✨ Features

### 🎯 Recruitment Portal

A fully integrated recruitment system that eliminates the need for Google Forms.

**Features:**

* Online application submission
* Resume upload support
* Domain preference selection
* Secure data storage
* Applicant tracking
* Admin review workflow

---

### 👥 Council & Member Showcase

Professional directory of society leadership and members.

**Includes:**

* Senior Council
* Junior Council
* Faculty Advisors
* Alumni Network

Each profile supports:

* Professional headshots
* Position details
* LinkedIn integration
* Instagram integration

---

### 📚 Motion Archive

A searchable repository of debate motions from competitions and practice sessions.

**Features:**

* Motion search
* Category filters
* Tournament tagging
* Difficulty classification
* Historical archive

Example:

> THBT social media does more harm than good.

---

### 📖 Digital Rulebook

A centralized knowledge base for debating formats and society practices.

Includes:

* Debate formats
* Speaker roles
* Adjudication criteria
* Point of Information (POI) guidelines
* Scoring systems
* Competition etiquette

---

### 🏆 Competition Archive

Comprehensive record of society participation and achievements.

Tracks:

* Tournament participation
* Awards won
* Best Speaker recognitions
* Team compositions
* Motion sets
* Event photographs

---

### 🖼️ Media Gallery

Interactive showcase of society activities.

Includes:

* Debate tournaments
* Workshops
* Speaker sessions
* Recruitment drives
* Society events
* Team achievements

---

### 📊 Admin Dashboard

Secure backend for society administration.

Capabilities:

* Review applications
* Manage members
* Update archive records
* Upload media
* Export applicant data
* Manage recruitment cycles

---

## 🎨 Design Philosophy

The website follows a modern editorial design language inspired by:

* Apple
* Stripe
* Linear
* Harvard Debate Council
* Oxford Union

### Core Principles

* Minimalism
* Typography-first layouts
* Generous whitespace
* Smooth animations
* Premium user experience
* Mobile responsiveness

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Framer Motion
* Lucide React

### Backend

* Supabase

### Database

* PostgreSQL (via Supabase)

### Authentication

* Supabase Auth

### Storage

* Supabase Storage
* Cloudinary (Media Assets)

### Deployment

* Vercel

---

## 📂 Project Structure

```bash
src/
│
├── assets/
│   ├── logo/
│   ├── council/
│   ├── gallery/
│   └── backgrounds/
│
├── components/
│   ├── common/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   │
│   ├── home/
│   │   ├── Hero.jsx
│   │   ├── Impact.jsx
│   │   ├── About.jsx
│   │   └── Achievements.jsx
│   │
│   ├── council/
│   │   ├── MemberCard.jsx
│   │   └── CouncilGrid.jsx
│   │
│   ├── archive/
│   │   ├── MotionCard.jsx
│   │   └── SearchBar.jsx
│   │
│   ├── recruitment/
│   │   └── ApplicationForm.jsx
│   │
│   └── gallery/
│       └── GalleryGrid.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Council.jsx
│   ├── Archive.jsx
│   ├── Competitions.jsx
│   ├── Rulebook.jsx
│   ├── Gallery.jsx
│   ├── Recruitment.jsx
│   └── Contact.jsx
│
├── routes/
│   └── router.jsx
│
├── services/
│   └── supabase.js
│
├── data/
│   ├── council.js
│   ├── motions.js
│   └── competitions.js
│
└── styles/
    └── globals.css
```

---

## ⚙️ Local Development

### Clone the Repository

```bash
git clone https://github.com/your-username/cognitive-minds-portal.git
```

```bash
cd cognitive-minds-portal
```

---

### Install Dependencies

```bash
npm install
```

---

### Configure Environment Variables

Create a `.env` file in the project root.

```env
VITE_SUPABASE_URL=your_supabase_project_url

VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

### Start Development Server

```bash
npm run dev
```

Application will run at:

```bash
http://localhost:5173
```

---

## 🔐 Security

### Authentication

Implemented using **Supabase Auth**.

Features:

* Secure login
* Protected routes
* Session management
* Role-based access

---

### Row Level Security (RLS)

All database interactions are protected using Supabase RLS policies.

Benefits:

* Data isolation
* Secure application submissions
* Controlled admin access
* Privacy protection

---

## 📈 Deployment

The project is optimized for deployment using **Vercel**.

### Steps

1. Push project to GitHub

```bash
git push origin main
```

2. Import repository into Vercel

3. Configure environment variables:

```env
VITE_SUPABASE_URL

VITE_SUPABASE_ANON_KEY
```

4. Deploy

---

## 🚀 Future Roadmap

### Phase 2

* AI-powered motion search
* Advanced filtering system
* Alumni portal
* Event registration system
* Automated recruitment workflow

### Phase 3

* Debate analytics dashboard
* Internal member portal
* Competition management system
* Live event updates
* AI debate preparation assistant

---

## 🤝 Contributing

Contributions are welcome.

Please ensure:

* Code follows existing structure
* Components remain reusable
* Changes are tested locally
* Pull requests include clear descriptions

---

## 📬 Contact

**Cognitive Minds**
Delhi Technological University (DTU)

For queries, collaborations, and participation opportunities, please reach out through the society's official channels.

---

<div align="center">

### Built with ❤️ for Cognitive Minds, DTU

*"Where ideas meet argument, and argument shapes thought."*

</div>
