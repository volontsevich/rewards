# Rewards Redemption Demo

A tiny full-stack app that lets a single demo user

* view their points balance  
* browse a reward catalog  
* **earn** additional points  
* redeem rewards (atomic check on balance + stock)  
* see a complete redemption history  

**Backend** – Ruby 3.4.3 / Rails 8.0.2 / SQLite  
**Frontend** – React 18 (Vite) / JavaScript  
**Testing & Lint** – RSpec, RuboCop, ESLint/Prettier

---

## 1 Quick start (Docker)

```bash
git clone https://github.com/volontsevich/rewards.git
cd rewards-app
docker compose up --build
````

| URL                                                                          | What you get  |
| ---------------------------------------------------------------------------- | ------------- |
| [http://localhost:5173](http://localhost:5173)                               | React SPA     |
| [http://localhost:3000/api/v1/rewards](http://localhost:3000/api/v1/rewards) | JSON endpoint |

Hot-reload is enabled; edit code on the host, containers auto-refresh.

---

## 2 Quick start (local install, no Docker)

### 2.1 Prerequisites

* Ruby **3.4.3** with Bundler 2.5+
* Node **18** and `npm` (or `pnpm`/`yarn`)
* SQLite 3

### 2.2 Backend

```bash
cd api
bundle install
bin/rails db:prepare      # 
bin/rails server          # http://localhost:3000
```

### 2.3 Frontend

```bash
cd ../frontend
npm install
cp .env.sample .env       # API URL + demo USER_ID
npm run dev               # http://localhost:5173
```

---

## 3 Seed data (auto-loaded)

```
Demo user:   demo@example.com  |  starting balance: 5 000 pts
Rewards:
  1  Coffee Mug      –  500 pts (stock 100)
  2  T-Shirt (M)     – 1 500 pts (stock  50)
  3  Sticker Pack    –  200 pts (unlimited)
```

If you restart containers or run `rails db:seed` again no duplicates are created.

---

## 4 Common commands

| What                     | Docker                                                   | Bare-metal                         |
| ------------------------ | -------------------------------------------------------- | ---------------------------------- |
| Run **RSpec**            | `docker compose run --rm api bundle exec rspec`          | (inside *api*) `bundle exec rspec` |
| Run **Rubocop**          | `docker compose run --rm api bundle exec rubocop`        | `bundle exec rubocop`              |
| Run **ESLint**           | `docker compose run --rm frontend npm run lint`          | (inside *frontend*) `npm run lint` |
| Format with **Prettier** | `docker compose run --rm frontend npm run format`        | `npm run format`                   |
| Rebuild DB + seeds       | `docker compose run --rm api bin/rails db:reset db:seed` | `bin/rails db:reset db:seed`       |

---

## 5 API reference

All endpoints are JSON. No authentication for this version (`user_id = 1`).

### 5.1 Get current balance

```
GET /api/v1/users/1/balance
→ 200 { "user_id":1, "points_balance":5000 }
```

### 5.2 List available rewards

```
GET /api/v1/rewards
→ 200 [
  { "id":1,"name":"Coffee Mug","description":"Ceramic, 11 oz","points_cost":500,"in_stock":true },
  ...
]
```

### 5.3 Earn points

```
POST /api/v1/users/1/earn     { "points":250 }
→ 201 { "user_id":1,"added_points":250,"new_balance":5250 }
```

*Server caps `points` at **10 000** per request.*

### 5.4 Redeem a reward

```
POST /api/v1/users/1/redemptions   { "reward_id":2 }
→ 201 { "redemption_id":17,"new_balance":3750 }

# Errors
← 422 { "error":"Insufficient points" }
← 422 { "error":"Out of stock" }
```

### 5.5 Redemption history

```
GET /api/v1/users/1/redemptions
→ 200 [
  { "id":17,"reward":"T-Shirt","points_cost":1500,"redeemed_at":"2025-06-16T01:23:45Z" },
  ...
]
```

---

## 6 Project layout (top-level)

```
rewards-app/
├── api/         # Rails 8 API-only app  (Ruby 3.4)
│   ├── app/
│   ├── config/
│   ├── db/
│   └── spec/
├── frontend/    # React 18 Vite SPA    (Node 18)
│   ├── src/
│   ├── public/
│   └── vite.config.js
└── docker-compose.yml
```

---

## 7 Running tests & linters in CI

```bash
# backend
bundle exec rspec
bundle exec rubocop --parallel

# frontend
npm run lint
```

```bash
# backend
docker compose run --rm api bundle exec rspec
docker compose run --rm api bundle exec rubocop --parallel

# frontend
docker compose run --rm frontend npm run lint
```

---
