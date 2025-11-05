How to run locally (quick)

Backend:
cd ecom-backend
npm install
npm run dev (server runs on http://localhost:4000)

Frontend:
cd ecom-frontend
npm install
create .env with NEXT_PUBLIC_API_URL=http://localhost:4000
npm start (frontend app on http://localhost:3000)



ecom-backend/
├─ node_modules/
├─ src/
│  ├─ components/
│  │  ├─ products/
│  │  │  ├─ product.controller.js
│  │  │  ├─ product.dal.js
│  │  │  ├─ product.route.js
│  │  │  └─ product.service.js
│  │  └─ users/
│  │     ├─ users.controller.js
│  │     ├─ users.dal.js
│  │     ├─ users.route.js
│  │     └─ users.service.js
│  ├─ middlewares/
│  │  └─ auth.js
│  ├─ routes/
│  │  └─ routes.js
│  └─ utils/
│     ├─ CustomMethods.js
│     ├─ Validation.js
│     ├─ data.sqlite
│     └─ db.js
├─ .env
├─ data.sqlite
├─ index.js
├─ package.json
└─ package-lock.json



ecom-frontend/
├─ .next/
├─ node_modules/
├─ public/
├─ src/
│  ├─ app/
│  │  ├─ login/
│  │  │  ├─ page.js
│  │  │  ├─ page.module.css
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.js
│  │  └─ page.js
│  ├─ components/
│  │  ├─ AddProductForm.js
│  │  ├─ LoginPage.js
│  │  ├─ ProductList.js
│  │  └─ ProtectedRoutes.js
│  ├─ utils/
│  │  └─ auth.js
│  ├─ widgets/
│  │  ├─ AuthLayout.js
│  │  └─ ProductLayout.js
│  └─ api.js
├─ .gitgnore
├─ eslint.config.mjs
├─ jsconfig.json
├─ next.config.mjs
├─ package.json
└─ package-lock.json


> Tech Stack Justification:

Frontend (Next.js) – Provides SSR/SSG, fast page load, and built-in routing, simplifies product page rendering.
Backend (Node.js + Express) - Lightweight and fast for REST APIs, Easy to integrate with SQLite for small-scale projects.
Databse (SQLite) - Simple, file-based, zero-configuration DB ideal for small-scale testing and rapid development, 
                    Easy to migrate to MySQL/Postgres in production if needed.
Deployment (AWS EC2 + Nginx) - EC2 instance hosts backend API and frontend build, Nginx handles (reverse proxy, 
                                HTTPS termination, and static file serving), Cost-effective for small projects.

> Architecture Overview:

Next.js Frontend:
UI for product listing and adding products.
Fetches data from backend API via Axios/Fetch.

Node.js Backend API:
GET api/v1/products - fetch all products (supports pagination/filtering).
POST api/v1/products - add a new product.
POST api/v1/login - user login.
Validates input and interacts with SQLite database.

SQLite Database:
Stores product data: id, name, price, category, stock_status, created_at.
       user data: id, email, password, created_at.

AWS EC2 + Nginx:
EC2 hosts backend server and frontend production build.
Nginx handles static file serving and reverse proxy requests to Node API.

Diagram:
[User Browser]
      |
  [Nginx - EC2]
  /          \
 /            \
[Next.js FE]  [Node.js API]
                 |
              [SQLite DB]


Task Breakdown: 
(Timeline will be 1 week sprint.)

Developer 1 (frontend, 2 days): Structure Next.js project
                                Create user module
                                Login module
                                Product listing page
                                Add product form
                                Responsive UI & validation
Developer 2 (Backend, 2 days):  Setup Node.js + Express API
                                Integrate SQLite.
                                Create endpoints for products and users.
                                Input validation & error handling.
Developer 3(DevOps/QA, 2 days): Configure AWS EC2 instance and domain pointing.
                                Setup Nginx as reverse proxy.
                                Deploy frontend build & backend API.
                                Test APIs & frontend.
                                Document deployment process.


Deployment Plan:

Frontend (Next.js):
Run next build → generate production build.
Copy next code to EC2 server.
Start frontend using PM2 or docker for process management.
Serve via Nginx: configure / to serve static files.

Backend (Node.js API):
Copy backend code to EC2.
Install dependencies with npm install.
Start backend using PM2 or docker for process management.
Configure Nginx reverse proxy: /api → Node.js backend port (e.g., 4000).

S3 bucket (for Product Image storing) -
User uploads image via POST /products (multipart/form-data).
Backend receives the image, uploads to S3 using AWS SDK (putObject).
Backend saves S3 URL in DB.

Database (SQLite):
Store data.sqlite on EC2 filesystem.
Ensure Node.js app points to correct path.

Security & Maintenance:
Enable HTTPS via Let's Encrypt Certbot in Nginx.
Firewall EC2 ports: 80, 443 open; backend port only accessible via Nginx.
Monitor logs and server health using CloudWatch or custom scripts.


Future Enhancements:

- Include product images stored on S3 (pre-signed URL upload).
- Add categories table and product filtering/search by category.
- Convert SQLite to PostgreSQL/MySQL for production scalability.
- Add unit & end-to-end tests for frontend and backend.
- CI/CD: automate frontend & backend deployment from GitHub to EC2.

# e-com
