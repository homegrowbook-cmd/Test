# 🌿 homegrowbook 2.0 - Open Grow Log Platform

A modern, open-source web application for tracking and sharing your growing journey. Inspired by growdiaries.com but with enhanced features and modern technology.

![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)
![TypeScript](https://img.shields.io/badge/typescript-5.3-blue)

## ✨ Features

### 🌱 Core Features
- **Grow Journals (Runs)**: Create and manage detailed grow diaries
- **Entries System**: Track daily/weekly progress with measurements
- **Rich Media**: Upload photos and document your journey
- **Measurements**: Track VPD, EC, pH, PPFD, temperature, humidity
- **Grow Phases**: Seedling, Vegetative, Flowering, Drying, Curing

### 👥 Community Features
- **Comments**: Engage with other growers
- **Likes**: Show appreciation for great grows
- **Follow System**: Follow your favorite growers
- **User Profiles**: Customizable profiles with bio and social links
- **Trending Runs**: Discover popular grows

### 🔐 User System
- **Authentication**: JWT-based auth with refresh tokens
- **Registration/Login**: Secure user management
- **Email Verification**: Account verification system
- **Password Reset**: Secure password recovery
- **Role-based Access**: User and Admin roles

## 🛠️ Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **TailwindCSS**: Utility-first CSS framework
- **Zustand**: State management
- **Axios**: HTTP client with interceptors
- **React Hook Form**: Form validation
- **React Markdown**: Markdown rendering

### Backend
- **NestJS**: Progressive Node.js framework
- **TypeScript**: Type-safe backend
- **Prisma ORM**: Next-generation ORM
- **PostgreSQL**: Robust database
- **JWT**: Secure authentication
- **Swagger**: Auto-generated API documentation
- **Bcrypt**: Password hashing

### Infrastructure
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration
- **GitHub Actions**: CI/CD pipeline
- **GitHub Pages**: Frontend hosting

## 📋 Prerequisites

- Node.js >= 20.0.0
- npm or yarn
- Docker and Docker Compose (for containerized setup)
- PostgreSQL (if running locally without Docker)

## 🚀 Quick Start

### 🎭 Try Demo Mode (No Backend Required!)

Want to explore the UI without setting up the backend? Try our **Demo Mode**:

1. **Visit**: https://homegrowbook-cmd.github.io/Test/auth/login
2. **Click** one of the demo user buttons (Alice, Bob, or Charlie)
3. **Explore** the UI with mock data

📖 **[Read more about Demo Mode →](DEMO_MODE.md)**

### Using Docker Compose (Recommended)

1. **Clone the repository**
```bash
git clone https://github.com/homegrowbook-cmd/Test.git
cd Test
```

2. **Start all services**
```bash
docker-compose up -d
```

3. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- API Documentation: http://localhost:4000/api

### 🔑 Test Login Credentials

After seeding the database, you can use these test accounts to login:

| Email | Username | Password |
|-------|----------|----------|
| alice@homegrowbook.com | alice_grower | password123 |
| bob@homegrowbook.com | bob_cultivator | password123 |
| charlie@homegrowbook.com | charlie_green | password123 |

> **Note:** You can login with either email or username. These accounts are created automatically when you run `npm run prisma:seed` in the backend directory.

### 🎭 Demo Mode (No Backend Required)

Don't want to set up the backend? Try **Demo Mode**!

Visit https://homegrowbook-cmd.github.io/Test/auth/login and click on one of the demo user buttons to explore the UI with mock data.

📖 **[Learn more about Demo Mode →](DEMO_MODE.md)**

### Local Development Setup

#### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. **Setup database**
```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database with sample data
npm run prisma:seed
```

5. **Start development server**
```bash
npm run start:dev
```

The API will be available at http://localhost:4000

#### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
# Create .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:4000" > .env.local
```

4. **Start development server**
```bash
npm run dev
```

The frontend will be available at http://localhost:3000

## 📚 API Documentation

Once the backend is running, visit http://localhost:4000/api for interactive API documentation powered by Swagger.

### Main API Endpoints

#### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user

#### Users
- `GET /users/me` - Get current user profile
- `PUT /users/me` - Update current user profile
- `GET /users/:username` - Get user by username
- `GET /users/:username/runs` - Get user's runs

#### Runs (Grow Diaries)
- `GET /runs` - List all public runs
- `POST /runs` - Create new run
- `GET /runs/:id` - Get run details
- `PUT /runs/:id` - Update run
- `DELETE /runs/:id` - Delete run
- `GET /runs/trending` - Get trending runs

#### Entries
- `POST /runs/:runId/entries` - Create entry
- `GET /runs/:runId/entries` - List entries for run
- `GET /runs/:runId/entries/:id` - Get entry details
- `PUT /runs/:runId/entries/:id` - Update entry
- `DELETE /runs/:runId/entries/:id` - Delete entry

#### Comments
- `POST /comments/runs/:runId` - Comment on run
- `POST /comments/entries/:entryId` - Comment on entry
- `GET /comments/runs/:runId` - Get run comments
- `GET /comments/entries/:entryId` - Get entry comments
- `DELETE /comments/:id` - Delete comment

#### Likes
- `POST /likes/runs/:runId` - Like a run
- `DELETE /likes/runs/:runId` - Unlike a run
- `GET /likes/runs/:runId/check` - Check if liked

#### Follows
- `POST /follows/:userId` - Follow user
- `DELETE /follows/:userId` - Unfollow user
- `GET /follows/followers/:userId` - Get followers
- `GET /follows/following/:userId` - Get following
- `GET /follows/check/:userId` - Check if following

#### Uploads
- `POST /uploads/single` - Upload single file
- `POST /uploads/multiple` - Upload multiple files

## 🗄️ Database Schema

The database uses PostgreSQL with Prisma ORM. Key models:

- **User**: User accounts and profiles
- **Run**: Grow diaries/journals
- **Entry**: Daily/weekly updates
- **Comment**: Comments on runs and entries
- **Like**: Likes on runs
- **Follow**: User follow relationships
- **RefreshToken**: JWT refresh tokens

See `backend/prisma/schema.prisma` for complete schema.

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🏗️ Project Structure

```
.
├── backend/                 # NestJS backend
│   ├── prisma/             # Database schema and migrations
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # Users module
│   │   ├── runs/           # Runs module
│   │   ├── entries/        # Entries module
│   │   ├── comments/       # Comments module
│   │   ├── likes/          # Likes module
│   │   ├── follows/        # Follows module
│   │   ├── uploads/        # File uploads module
│   │   └── common/         # Shared utilities
│   └── package.json
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # React components
│   │   ├── lib/          # Utilities and API client
│   │   ├── store/        # State management
│   │   └── types/        # TypeScript types
│   └── package.json
├── .github/
│   └── workflows/         # GitHub Actions CI/CD
├── docs/                  # Documentation
├── docker-compose.yml     # Docker Compose configuration
└── README.md
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/homegrowbook
JWT_SECRET=your-secret-key
PORT=4000
BASE_URL=http://localhost:4000
FRONTEND_URL=http://localhost:3000
UPLOAD_DIR=./uploads
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## 🚢 Deployment

### Frontend to GitHub Pages

The frontend is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

#### Initial Setup

1. **Configure repository settings**
   - Go to Settings > Pages
   - Set **Source** to "GitHub Actions"
   - The site will be available at `https://<username>.github.io/<repository-name>/`

2. **Push to main branch**
```bash
git push origin main
```

#### How it works

- The CI/CD pipeline (`ci-cd.yml`) automatically builds and deploys the frontend
- Uses Next.js static export (`output: 'export'`)
- Deploys to GitHub Pages using official GitHub Actions
- The website will be accessible at the GitHub Pages URL (e.g., `https://homegrowbook-cmd.github.io/Test/`)

#### Troubleshooting

If the GitHub Pages site shows only the README:
1. Verify the workflow ran successfully in the Actions tab
2. Ensure "GitHub Actions" is selected as the source in Settings > Pages
3. Check that the `deploy-frontend` job completed successfully
4. The deployment may take a few minutes to propagate

### Backend Deployment

The backend can be deployed to any platform supporting Docker:

- **Docker**: Use the provided Dockerfile
- **Heroku**: Use Heroku Postgres
- **DigitalOcean**: Use App Platform
- **AWS**: Use ECS or Elastic Beanstalk
- **Railway**: Simple deployment with PostgreSQL

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by growdiaries.com
- Built with modern open-source technologies
- Community-driven development

## 📞 Support

For support, please open an issue in the GitHub repository.

## 🗺️ Roadmap

Wir haben eine detaillierte Roadmap erstellt, um die Entwicklung bis zum ersten vollständigen Grow-Eintrag zu planen.

📋 **[Siehe vollständige Roadmap](ROADMAP.md)** - Detaillierte Phasen, Meilensteine und Features  
🎯 **[Siehe Ziele & Sprint-Plan](GOALS.md)** - Kurzfristige Ziele und Checklisten  
📊 **[Siehe Status Update](STATUS_UPDATE_NOV_2024.md)** - Aktueller Stand mit Screenshots

### Nächste Schritte (Q4 2024 - Q1 2025)
**Phase 1: MVP - Erster Grow möglich** ✅ **ABGESCHLOSSEN**
- [x] Run Management UI (Create, List, Detail, Edit)
- [x] Entry Management UI (Create, Timeline, Detail)
- [x] Image Upload & Gallery
- [x] Measurement Input & Display
- [x] Phase Tracking

**Phase 2: Harvest & Analytics**
- [ ] Harvest, Drying & Curing Tracking
- [ ] Statistics & Analytics Dashboard
- [ ] Data Export (PDF, JSON)

**Phase 3: Community & Discovery**
- [ ] Enhanced Discovery & Search
- [ ] Improved Social Features
- [ ] Content Quality Tools

**Phase 4: Mobile & Advanced**
- [ ] Progressive Web App (PWA)
- [ ] Mobile Optimization
- [ ] AI-powered Features
- [ ] Advanced Tools

## 🔐 Security

For security concerns, please open an issue in the repository.

---

Built with ❤️ by the homegrowbook community
