# 🚀 NestJS Starter: PostgreSQL, Redis, Kafka & Docker

A production-ready **NestJS** backend starter kit. Clone it, configure your `.env`, and start building: authentication, database, API docs, code quality tooling and Docker setup are already in place.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ What's Inside

- **JWT authentication** (RS256 keys) with **role-based access control**
- **PostgreSQL + TypeORM** with migrations and connection pooling
- **Swagger API docs**, auto-generated at `/api`
- **Docker Compose**: one command to run all services
- **Testing** with Jest (unit and e2e)
- **Code quality**: ESLint, Prettier, Husky, commitlint
- **Security**: Helmet and CORS
- **Health checks** for production monitoring
- **Feature modules** for users and tasks as working examples

<!-- TODO: Redis (caching) and Kafka (messaging) are part of the repo name. Confirm they are wired in src/ and docker-compose.yml, then describe them here. -->

---

## 🧰 Tech Stack

| Area          | Technology                          |
| ------------- | ----------------------------------- |
| Framework     | NestJS (TypeScript)                 |
| Database      | PostgreSQL with TypeORM             |
| Auth          | JWT (RSA key pair), RBAC guards     |
| API docs      | Swagger / OpenAPI                   |
| Testing       | Jest                                |
| Tooling       | ESLint, Prettier, Husky, commitlint |
| Infrastructure| Docker, Docker Compose              |

---

## ✅ Prerequisites

- Node.js **20 or later**
- PostgreSQL (or Docker, which provides it)
- OpenSSL (to generate the JWT key pair)

---

## 🚀 Quick Start

```bash
git clone https://github.com/srmarohit/NestJs-Redis-docker-kafka-postgress.git
cd NestJs-Redis-docker-kafka-postgress
npm install
cp .env.example .env
```

Then choose one:

```bash
# Run everything with Docker (recommended)
npm run docker:up

# Or run locally with hot reload
npm run start:dev
```

- API: **http://localhost:3000**
- Swagger docs: **http://localhost:3000/api**

---

## 🔐 Environment Variables

Copy `.env.example` to `.env` and adjust:

```env
# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=mysecretpassword
POSTGRES_DB=postgres

# App
PORT=3000
NODE_ENV=development

# Auth (generate your own keys, see below)
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----..."
PUBLIC_KEY="-----BEGIN PUBLIC KEY-----..."
```

> Never commit `.env` or your private key. Change the default database password before deploying.

### Generate the RSA keys

```bash
# Private key
openssl genrsa -out private_key.pem 2048

# Public key
openssl rsa -in private_key.pem -pubout -out public_key.pem

# Format as a single line for .env
awk 'NF {sub(/\r/, ""); printf"%s\\n",$0;}' private_key.pem
awk 'NF {sub(/\r/, ""); printf"%s\\n",$0;}' public_key.pem
```

---

## 📜 Available Scripts

### Application

```bash
npm run start:dev     # Development with hot reload
npm run build         # Build for production
npm run start:prod    # Run the production build
```

### Testing and quality

```bash
npm run test          # Unit tests
npm run test:e2e      # End-to-end tests
npm run test:cov      # Coverage report
npm run lint          # Lint and fix
npm run format        # Format with Prettier
```

### Database

```bash
npm run schema:sync          # Sync schema (development only)
npm run migration:generate   # Generate a migration from entity changes
npm run migration:run        # Apply pending migrations
npm run migration:revert     # Revert the last migration
```

### Docker

```bash
npm run docker:build   # Build containers
npm run docker:up      # Start all services
npm run docker:down    # Stop all services
```

---

## 📁 Project Structure

```
.
├── src/
│   ├── auth/            # JWT authentication and guards
│   ├── config/          # Application configuration
│   ├── tasks/           # Task management feature
│   ├── users/           # User management
│   └── main.ts          # Application entry point
├── test/                # e2e tests
├── documentation/       # Images and docs
├── .github/             # GitHub workflows and templates
├── Dockerfile
├── docker-compose.yml
├── endpoints.json       # API endpoint collection
├── nest-cli.json
├── setup.sh
└── .env.example
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing`
3. Commit using Conventional Commits: `git commit -m "feat: add amazing feature"`
4. Push the branch: `git push origin feature/amazing`
5. Open a Pull Request

Please read the [Code of Conduct](CODE_OF_CONDUCT.md) and [Security Policy](SECURITY.md).

---

## 📄 License

Released under the [MIT License](LICENSE).

## Author
Rohit Sharma (@srmarohit)
