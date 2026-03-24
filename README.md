# 🍛 Raj's Kitchen — Admin Panel System

A full-stack admin panel for managing the Raj's Kitchen catering website menu, built with **Node.js + Express + MongoDB**.

> The existing frontend UI (`index.html`, `menu.html`, `style.css`) is **100% untouched**.

---

## 📁 Project Structure

```
raj-kitchen/
│
├── index.html              ← Original (unchanged)
├── menu.html               ← Original (unchanged)
├── style.css               ← Original (unchanged)
├── script.js               ← Minimal addition: API fetch with static fallback
├── img.png / img.jpeg      ← Original images
│
├── admin-login.html        ← 🆕 Admin login page
├── admin-dashboard.html    ← 🆕 Admin dashboard
│
└── backend/
    ├── server.js           ← Express app entry point
    ├── package.json
    ├── .env                ← Configuration (edit this!)
    ├── seed.js             ← Populate DB with existing menu data
    │
    ├── config/
    │   └── db.js           ← MongoDB connection
    │
    ├── models/
    │   ├── Category.js     ← Category schema
    │   └── Dish.js         ← Dish schema
    │
    ├── controllers/
    │   ├── authController.js
    │   ├── categoryController.js
    │   └── menuController.js
    │
    ├── routes/
    │   ├── auth.js
    │   ├── category.js
    │   └── menu.js
    │
    └── middleware/
        └── auth.js         ← JWT verification
```

---

## ⚡ Quick Setup

### Prerequisites
- **Node.js** v18+
- **MongoDB** (local or MongoDB Atlas)

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Edit `backend/.env`:

```env
MONGO_URI=mongodb://localhost:27017/raj-kitchen
JWT_SECRET=your-very-long-random-secret-key-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
PORT=5000
```

> ⚠️ **Change the default password before going live!**

### 3. Seed the Database

Populate MongoDB with the full existing menu:

```bash
cd backend
node seed.js
```

You'll see:
```
✅ Connected to MongoDB
🗑️  Cleared existing data
📁 Created category: STARTERS
  ✅ Added 5 dishes
📁 Created category: ROTI / BREAD
...
🎉 Database seeded successfully!
```

### 4. Start the Server

```bash
cd backend
npm start       # Production
npm run dev     # Development (with auto-restart via nodemon)
```

### 5. Open in Browser

| Page | URL |
|------|-----|
| 🌐 Main Website | http://localhost:5000 |
| 🔐 Admin Login | http://localhost:5000/admin-login |
| 🎛️ Admin Dashboard | http://localhost:5000/admin-dashboard |

---

## 🔐 Admin Credentials

Default (from `.env`):
- **Username:** `admin`
- **Password:** `admin123`

Change these in `.env` before deploying!

---

## 🌐 API Reference

### Authentication
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/admin/login` | Login and get JWT token |
| GET | `/admin/verify` | Verify token validity |

### Menu (Public)
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/menu` | Get full menu grouped by category |

### Menu (Admin — requires Bearer token)
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/menu/all` | All dishes including inactive |
| POST | `/menu/add` | Add a new dish |
| PUT | `/menu/update/:id` | Edit dish name/price/etc. |
| DELETE | `/menu/delete/:id` | Delete a dish |

### Categories (Admin — requires Bearer token)
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/category` | List all categories |
| POST | `/category/add` | Create a new category |
| PUT | `/category/update/:id` | Rename a category |
| DELETE | `/category/delete/:id` | Delete category + its dishes |

---

## 🎛️ Admin Dashboard Features

### Dashboard
- Total categories, dishes, and active dish count
- Quick view of recent dishes

### Category Management
- Create new categories (Starters, Main Course, etc.)
- Rename existing categories
- Delete categories (with confirmation — also deletes associated dishes)

### Dish Management
- Add dishes with: name, price, category, description, image URL, quantity suggestions
- Edit any field of existing dishes
- Delete dishes (with confirmation)
- Search dishes by name/description
- Filter by category

---

## 🔗 Frontend Integration

`script.js` now tries to load the menu from the API on page load:

```
/menu → if successful → replaces static MENU_DATA
      → if API offline → falls back to hardcoded MENU_DATA
```

This means **the website always works** — even without the backend running. When the backend is live, any admin changes reflect on the menu immediately.

---

## 🚀 Deployment Tips

### MongoDB Atlas (Cloud)
1. Create a free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Update `MONGO_URI` in `.env` with your Atlas connection string

### Hosting (e.g. Railway, Render, Heroku)
1. Set environment variables on your hosting platform
2. Set build command: `npm install`
3. Set start command: `node server.js`
4. Make sure `PORT` env var is configured (most platforms set it automatically)

---

## 🛡️ Security Notes

- JWT tokens expire after **8 hours**
- All admin routes require valid JWT in `Authorization: Bearer <token>` header  
- Admin credentials are stored in `.env` (never commit this to git)
- Add `.env` to your `.gitignore` file

---

*Built for Raj's Kitchen — Nagpur's Premier Catering Service 🍛*
