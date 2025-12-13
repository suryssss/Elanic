 Elanic – Full-Stack E-Commerce Platform
Elanic is a full-stack e-commerce web application built to deliver a modern online shopping experience with secure authentication, product management, and seamless checkout flows.

🚀 Core Features
User Features
User authentication & authorization (JWT)
Product browsing with categories
Cart management
Secure PayPal payment gateway integration
Order placement & order history tracking
Responsive UI across devices

Admin Features
Admin dashboard
Product management (create, update, delete)
Order management & status updates
View all users and orders

🛠️ Tech Stack
Frontend
React / Next.js
Tailwind CSS
Axios

Backend
Node.js
Express.js
MongoDB & Mongoose
JWT Authentication

Payments
PayPal Checkout API

Deployment
Frontend: Vercel
Backend: Render

🌐 Live Demo

Frontend: https://elanic-uhme-s5s18s2oo-rithwik-suryas-projects.vercel.app
Backend API: https://elanic-api.onrender.com

Live payment + admin flows separate Elanic from beginner projects.

📂 Project Structure
```
elanic/
│── frontend/
│   ├── components/
│   ├── pages/
│   ├── admin/
│   ├── styles/
│   └── utils/
│
│── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
└── README.md
```

⚙️ Installation & Setup
Clone Repository
```
git clone https://github.com/your-username/elanic.git
cd elanic
```

Backend Setup
```
cd backend
npm install
npm run dev
```

Create a .env file:
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
PORT=5000
```

Frontend Setup
```
cd frontend
npm install
npm run dev
```

🔐 Environment Variables
Variable	Description
MONGO_URI	MongoDB connection string
JWT_SECRET	Authentication secret
PAYPAL_CLIENT_ID	PayPal payment integration
API_URL	Backend API base URL
🧾 Payments

Integrated PayPal Checkout

Secure transaction flow

Payment status stored per order

This is not mocked — it’s a real payment flow.

📊 Admin Dashboard

Centralized admin panel

Order tracking & status management

Product and user control

This shows you understand role-based access control.

Variable	Description
MONGO_URI	MongoDB connection string
JWT_SECRET	JWT authentication secret


API_URL	Backend API URL

