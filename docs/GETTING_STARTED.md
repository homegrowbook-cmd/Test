# Getting Started with homegrowbook 2.0

This guide will help you get homegrowbook 2.0 up and running on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (version 20 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`

- **npm** (comes with Node.js)
  - Verify installation: `npm --version`

- **Docker and Docker Compose** (recommended)
  - Download from [docker.com](https://www.docker.com/)
  - Verify installation: `docker --version` and `docker-compose --version`

- **PostgreSQL** (if not using Docker)
  - Download from [postgresql.org](https://www.postgresql.org/)

## Quick Start with Docker (Recommended)

This is the easiest way to get started!

### 1. Clone the Repository

```bash
git clone https://github.com/homegrowbook-cmd/Test.git
cd Test
```

### 2. Start All Services

```bash
docker-compose up -d
```

This will start:
- PostgreSQL database on port 5432
- Backend API on port 4000
- Frontend on port 3000

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **API Documentation**: http://localhost:4000/api

### 4. Login with Test Account

The database is seeded with test accounts:
- **Email**: alice@homegrowbook.com
- **Password**: password123

Other test accounts:
- bob@homegrowbook.com / password123
- charlie@homegrowbook.com / password123

### 5. Stop Services

```bash
docker-compose down
```

To also remove data volumes:
```bash
docker-compose down -v
```

## Manual Setup (Without Docker)

If you prefer to run services individually:

### Backend Setup

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
```

Edit `.env` file and update the database URL:
```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/homegrowbook?schema=public"
JWT_SECRET="your-super-secret-key-change-this"
PORT=4000
BASE_URL="http://localhost:4000"
FRONTEND_URL="http://localhost:3000"
```

4. **Create PostgreSQL database**
```bash
# Using psql
createdb homegrowbook

# Or using SQL
psql -U postgres
CREATE DATABASE homegrowbook;
\q
```

5. **Run database migrations**
```bash
npm run prisma:generate
npm run prisma:migrate
```

6. **Seed database with sample data**
```bash
npm run prisma:seed
```

7. **Start the backend**
```bash
npm run start:dev
```

Backend will be running at http://localhost:4000

### Frontend Setup

1. **Open a new terminal and navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

4. **Start the frontend**
```bash
npm run dev
```

Frontend will be running at http://localhost:3000

## First Steps

### 1. Explore the Platform

- Visit http://localhost:3000
- Browse existing grow diaries
- Check out trending runs
- View user profiles

### 2. Create an Account

- Click "Sign Up" in the navigation
- Fill in your details
- Login with your credentials

### 3. Create Your First Grow Diary

1. Click "New Diary" after logging in
2. Fill in the details:
   - Title (e.g., "My First Indoor Grow")
   - Strain name (e.g., "Northern Lights")
   - Setup information (lights, medium, nutrients)
   - Current phase

3. Click "Create"

### 4. Add Entries

1. Go to your diary
2. Click "Add Entry"
3. Fill in daily/weekly updates:
   - Title and description
   - Day/week number
   - Measurements (temp, humidity, pH, etc.)
   - Upload photos
4. Save entry

### 5. Engage with Community

- Like other grows
- Leave comments
- Follow interesting growers
- Share your progress

## Using the API

### Access API Documentation

Visit http://localhost:4000/api for interactive Swagger documentation.

### Make API Requests

Example using curl:

```bash
# Register
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "username": "newgrower",
    "password": "SecurePass123!"
  }'

# Login
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "emailOrUsername": "newgrower",
    "password": "SecurePass123!"
  }'

# Get runs (no auth required)
curl http://localhost:4000/runs
```

## Troubleshooting

### Database Connection Errors

**Error**: "Can't reach database server"

**Solution**:
1. Check PostgreSQL is running: `pg_isadmin`
2. Verify database exists: `psql -l`
3. Check DATABASE_URL in .env file
4. Ensure PostgreSQL is accepting connections on port 5432

### Port Already in Use

**Error**: "Port 3000/4000 already in use"

**Solution**:
1. Kill the process using the port:
   ```bash
   # On Linux/Mac
   lsof -ti:3000 | xargs kill -9
   
   # On Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```
2. Or change the port in .env file

### Module Not Found Errors

**Error**: "Cannot find module..."

**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Prisma Client Errors

**Error**: "Prisma Client not found"

**Solution**:
```bash
cd backend
npm run prisma:generate
```

### Frontend Build Errors

**Error**: Build fails with TypeScript errors

**Solution**:
```bash
cd frontend
rm -rf .next
npm run build
```

## Next Steps

- Read the [API Documentation](docs/API.md)
- Check out [Deployment Guide](docs/DEPLOYMENT.md)
- See [Contributing Guidelines](CONTRIBUTING.md)
- Explore the codebase
- Start developing!

## Need Help?

- Check existing [GitHub Issues](https://github.com/homegrowbook-cmd/Test/issues)
- Open a new issue with your question
- Review the documentation in the `docs/` folder

## Useful Commands

### Backend

```bash
npm run start:dev      # Start development server
npm run build          # Build for production
npm run start:prod     # Run production build
npm run lint           # Lint code
npm run test           # Run tests
npm run prisma:studio  # Open Prisma Studio (database GUI)
npm run prisma:migrate # Create new migration
npm run prisma:seed    # Seed database
```

### Frontend

```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run start          # Run production build
npm run lint           # Lint code
npm run export         # Export static site
```

### Docker

```bash
docker-compose up -d           # Start all services
docker-compose down            # Stop all services
docker-compose logs -f backend # View backend logs
docker-compose logs -f frontend # View frontend logs
docker-compose ps              # View running services
docker-compose restart backend # Restart backend
```

Happy growing! 🌿
