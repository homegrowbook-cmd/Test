# Deployment Guide

## Deployment Options

### Option 1: Docker Compose (Simplest)

This is the easiest way to deploy the entire stack.

1. **Clone the repository on your server**
```bash
git clone https://github.com/homegrowbook-cmd/Test.git
cd Test
```

2. **Configure environment variables**
```bash
# Edit docker-compose.yml and update:
# - Database credentials
# - JWT_SECRET
# - BASE_URL and FRONTEND_URL
```

3. **Start services**
```bash
docker-compose up -d
```

4. **Access your application**
- Frontend: http://your-server:3000
- Backend: http://your-server:4000

### Option 2: Separate Deployment

#### Backend Deployment

**Railway.app** (Recommended for backend)

1. Create account at railway.app
2. Create new project
3. Add PostgreSQL database
4. Deploy from GitHub
5. Set environment variables:
   - `DATABASE_URL` (auto-set by Railway)
   - `JWT_SECRET`
   - `PORT=4000`
   - `FRONTEND_URL`

**Heroku**

1. Create Heroku app
```bash
heroku create growdiaries-api
```

2. Add PostgreSQL addon
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

3. Set environment variables
```bash
heroku config:set JWT_SECRET=your-secret
heroku config:set FRONTEND_URL=https://your-frontend.com
```

4. Deploy
```bash
git subtree push --prefix backend heroku main
```

**DigitalOcean App Platform**

1. Create new app from GitHub
2. Select `backend` folder
3. Add PostgreSQL database
4. Configure environment variables
5. Deploy

#### Frontend Deployment

**GitHub Pages** (Recommended for frontend)

The frontend is configured for static export and can be deployed to GitHub Pages.

1. **Configure GitHub Pages**
   - Go to repository Settings > Pages
   - Select "GitHub Actions" as source

2. **Update API URL in workflow**
   
   Edit `.github/workflows/ci-cd.yml` and set:
   ```yaml
   NEXT_PUBLIC_API_URL: https://your-backend-url.com
   ```

3. **Push to main branch**
```bash
git push origin main
```

Your site will be available at: `https://username.github.io/repository-name/`

**Vercel** (Alternative)

1. Install Vercel CLI
```bash
npm i -g vercel
```

2. Deploy from frontend directory
```bash
cd frontend
vercel
```

3. Set environment variable
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

**Netlify** (Alternative)

1. Create `netlify.toml` in frontend directory:
```toml
[build]
  command = "npm run build"
  publish = "out"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. Deploy via Netlify CLI or GitHub integration

3. Set environment variable:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### Option 3: VPS Deployment

For full control, deploy on a VPS (DigitalOcean, Linode, AWS EC2, etc.)

1. **Setup server**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose
```

2. **Clone and configure**
```bash
git clone https://github.com/homegrowbook-cmd/Test.git
cd Test

# Edit environment variables in docker-compose.yml
nano docker-compose.yml
```

3. **Setup SSL with Nginx**

Create `nginx.conf`:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name api.your-domain.com;
    
    location / {
        proxy_pass http://localhost:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

4. **Install Certbot for SSL**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d api.your-domain.com
```

5. **Start services**
```bash
docker-compose up -d
```

## Database Backups

### Automated Backups

Add to crontab:
```bash
# Daily backup at 2 AM
0 2 * * * docker exec growdiaries-db pg_dump -U growdiaries growdiaries > /backups/db-$(date +\%Y\%m\%d).sql
```

### Manual Backup

```bash
# Export
docker exec growdiaries-db pg_dump -U growdiaries growdiaries > backup.sql

# Import
docker exec -i growdiaries-db psql -U growdiaries growdiaries < backup.sql
```

## Monitoring

### Health Checks

Backend health endpoint: `GET /health`

### Logs

```bash
# View all logs
docker-compose logs

# Follow backend logs
docker-compose logs -f backend

# Follow frontend logs
docker-compose logs -f frontend
```

## Scaling

### Horizontal Scaling

1. Deploy multiple backend instances behind a load balancer
2. Use managed PostgreSQL (AWS RDS, DigitalOcean Managed Database)
3. Use Redis for session storage
4. Use S3/MinIO for file uploads

### Vertical Scaling

Update Docker resources in `docker-compose.yml`:

```yaml
backend:
  deploy:
    resources:
      limits:
        cpus: '2'
        memory: 2G
```

## Security Checklist

- [ ] Change default JWT_SECRET
- [ ] Use strong database passwords
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set up firewall rules
- [ ] Enable database backups
- [ ] Update dependencies regularly
- [ ] Monitor logs for suspicious activity
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting (future feature)

## Troubleshooting

### Backend won't start
```bash
# Check logs
docker-compose logs backend

# Check database connection
docker-compose exec backend npx prisma db pull
```

### Database migration issues
```bash
# Reset database (CAUTION: deletes all data)
docker-compose exec backend npx prisma migrate reset

# Or apply migrations manually
docker-compose exec backend npx prisma migrate deploy
```

### Frontend build errors
```bash
# Clear cache
rm -rf frontend/.next
rm -rf frontend/out

# Rebuild
cd frontend && npm run build
```

## Support

For deployment support, please open an issue on GitHub.
