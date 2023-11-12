# Election Analytics

MERN full stack application with authentication, and election analytics with admin dashboard

## It includes:

- Backend API with Express & MongoDB
- Routes for User: auth, logout
- Routes for Admin: auth logout, create new user, profile, update profile, dashboard routes
- JWT authentication stored in HTTP-only cookie
- Protected routes and endpoints for user and admin
- Custom middleware to check JSON web token and store in cookie
- Custom error middleware
- React frontend to login, logout for user,and view profile, and update profile, create new user, admin dashboard for admin
- React Bootstrap UI library
- React Toastify notifications
- Recharts for admin dashboard


## Env Variables

```
MONGO_URL= mongodb uri
PORT=5000
NODE_ENV=development
JWT_SECRET=EXAMPLE1234
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```

# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server

# Run frontend only
npm run client
```



