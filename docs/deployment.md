# Deployment Guide

## Overview

This document describes the deployment process for the application, including environment configuration, build procedures, deployment steps, and rollback strategies.

---

## Infrastructure

Production environment:

```text
GitHub
    │
    ▼
Server / VPS
    │
    ▼
Docker Compose
    │
    ▼
Next.js Application
```

---

## Prerequisites

Required software on the server:

- Docker
- Docker Compose
- Git

Verify installation:

```bash
docker --version
docker compose version
git --version
```

---

## Environment Configuration

Ensure the environment variables are properly configured before deployment.

Example:

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.example.com
```

---

## Deployment Process

### 1. Pull Latest Changes

```bash
git pull origin staging
```

### 2. Rebuild Application

```bash
docker compose down

docker compose build --no-cache

docker compose up -d
```

### 3. Verify Containers

```bash
docker ps
```

---

## Logs

View application logs:

```bash
docker logs <container_name>
```

Follow logs in real time:

```bash
docker logs -f <container_name>
```

---

## Rollback Strategy

If deployment fails:

### View Commit History

```bash
git log --oneline
```

### Roll Back

```bash
git checkout <commit_hash>

docker compose build --no-cache

docker compose up -d
```

---

## Deployment Checklist

Before deployment:

- Ensure changes are merged
- Ensure CI passes successfully
- Verify environment variables
- Verify Docker configuration

After deployment:

- Verify application loads correctly
- Verify authentication flow
- Verify API connectivity
- Verify logs show no errors

---

## Deployment Flow

```text
Developer
    │
    ▼
Push Changes
    │
    ▼
GitHub Actions (CI)
    │
    ▼
Merge
    │
    ▼
Pull Latest Changes
    │
    ▼
Docker Build
    │
    ▼
Start Containers
    │
    ▼
Production
```
