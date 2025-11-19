# API Documentation

## Base URL

Development: `http://localhost:4000`
Production: `https://api.homegrowbook.example.com`

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer {your-access-token}
```

### Token Lifecycle

- **Access Token**: Valid for 15 minutes
- **Refresh Token**: Valid for 7 days

When the access token expires, use the refresh token endpoint to get a new access token.

## Response Format

All API responses follow this format:

### Success Response
```json
{
  "data": { ... },
  "message": "Success message"
}
```

### Error Response
```json
{
  "statusCode": 400,
  "message": "Error message",
  "error": "Bad Request"
}
```

## Pagination

List endpoints support pagination via query parameters:

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

Response includes pagination metadata:

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

## Complete API Reference

For interactive API documentation with request/response examples, visit:

**http://localhost:4000/api** (when backend is running)

This Swagger documentation provides:
- All available endpoints
- Request/response schemas
- Try-it-out functionality
- Authentication testing

## Example Requests

### Register New User

```bash
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "grower123",
    "password": "SecurePass123!"
  }'
```

### Login

```bash
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "emailOrUsername": "grower123",
    "password": "SecurePass123!"
  }'
```

### Create Grow Run

```bash
curl -X POST http://localhost:4000/runs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {access-token}" \
  -d '{
    "title": "My First Grow",
    "strainName": "Northern Lights",
    "strainType": "Indica",
    "description": "First indoor grow attempt",
    "lightType": "LED 300W",
    "medium": "Soil",
    "phase": "SEEDLING"
  }'
```

### Create Entry

```bash
curl -X POST http://localhost:4000/runs/{runId}/entries \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {access-token}" \
  -d '{
    "title": "Day 7 - First true leaves",
    "content": "Plants are looking healthy!",
    "dayNumber": 7,
    "weekNumber": 1,
    "temperature": 24.5,
    "humidity": 65,
    "ph": 6.5
  }'
```

### Upload Image

```bash
curl -X POST http://localhost:4000/uploads/single \
  -H "Authorization: Bearer {access-token}" \
  -F "file=@/path/to/image.jpg"
```

## Rate Limiting

Currently no rate limiting is implemented. This will be added in future versions.

## Versioning

API version is currently v1. Future versions will be accessible via URL path:
- v1: `/api/v1/...`
- v2: `/api/v2/...`

## Support

For API support, please open an issue on GitHub.
