# API Documentation

This document describes the REST API currently implemented in this repository.

## Base URL

- Local development: `http://localhost:3000`
- Port can be overridden with the `PORT` environment variable.

## Run the API

```bash
npm run api:start
```

## Endpoints

### `GET /health`

Health check endpoint to verify that the API service is running.

#### Request

```http
GET /health HTTP/1.1
Host: localhost:3000
```

#### Successful Response

- **Status:** `200 OK`
- **Content-Type:** `application/json`

```json
{
  "status": "ok"
}
```

## Error Handling

No custom error schema is implemented yet. The current API includes only the health check route.

## Planned Modules

Based on the project roadmap, upcoming API modules are expected to include:

- Authentication
- Calendar events
- Astrometry submissions and results
- Image uploads and gallery
