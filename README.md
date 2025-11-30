# Project-Blogging-Site

A full-stack blogging platform built with React (frontend) and Express.js (backend).

## 🚀 Features

- **User Authentication**: Register and login with JWT-based authentication
- **Blog Management**: Create, read, update, and delete blog posts
- **Categories & Tags**: Organize blogs with categories, tags, and subcategories
- **Publishing System**: Save drafts or publish blogs immediately
- **Responsive Design**: Modern UI built with Tailwind CSS v4
- **Dark Theme**: Beautiful dark-themed design with custom color palette

## 📁 Project Structure

```
/
├── backend/          # Express.js API
│   ├── src/
│   │   ├── controller/   # Route handlers
│   │   ├── middleware/   # Auth middleware
│   │   ├── models/       # Mongoose models
│   │   ├── route/        # API routes
│   │   └── validate/     # Input validation
│   ├── index.js
│   └── package.json
├── frontend/         # React + Vite application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── pages/        # Page components
│   │   ├── services/     # API client
│   │   ├── store/        # Zustand state management
│   │   └── theme/        # Design tokens
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── package.json      # Root package with workspaces
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- React 19 + Vite 7
- React Router v7
- TanStack Query (React Query)
- Zustand for state management
- Tailwind CSS v4
- Axios for API calls
- React Hot Toast for notifications
- React Icons

### Backend
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- CORS enabled

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- MongoDB database (or MongoDB Atlas connection string)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Dipesh-J/Project-Blogging-Site.git
cd Project-Blogging-Site
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (optional):
   - For backend: Set `MONGODB_URI` and `PORT`
   - For frontend: Set `VITE_API_URL` for production

### Running Locally

**Start the backend server:**
```bash
npm run dev:backend
```
The API will be available at `http://localhost:3000/api`

**Start the frontend development server:**
```bash
npm run dev:frontend
```
The frontend will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## 📚 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/authors` | Register a new author |
| POST | `/api/login` | Login and get JWT token |

### Blogs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/blogs` | Get all published blogs (with optional filters) |
| POST | `/api/blogs` | Create a new blog (auth required) |
| PUT | `/api/blogs/:blogId` | Update a blog (auth + owner only) |
| DELETE | `/api/blogs/:blogId` | Delete a blog (auth + owner only) |
| DELETE | `/api/blogs` | Delete blogs by query (auth required) |

### Query Parameters for GET /api/blogs
- `authorId` - Filter by author
- `category` - Filter by category
- `tags` - Filter by tag
- `subcategory` - Filter by subcategory

## 🎨 Design System

The frontend uses a custom design token system with:
- **Primary Color**: `#735F32` (Olive Gold)
- **Primary Variant**: `#C69749` (Warm Gold)
- **Background**: `#000000` (Black)
- **Surface**: `#282A3A` (Dark Gray)
- **Font**: Poppins

## 📱 Pages

- **Home** (`/`) - Landing page with hero section
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - New user registration
- **Blogs** (`/blogs`) - List all published blogs with filtering
- **Blog Detail** (`/blogs/:id`) - View a single blog
- **Create Blog** (`/blogs/create`) - Create new blog (auth required)
- **Edit Blog** (`/blogs/:id/edit`) - Edit existing blog (auth required)
- **Dashboard** (`/dashboard`) - Manage your blogs (auth required)

## 🧩 Reusable Components

The frontend includes a comprehensive component library:
- Button, Input, Textarea, Select
- Card, Tag, Modal
- Loader, PageLoader, Skeleton
- APIError, EmptyState
- SectionHeader, Navbar, Footer

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend: `npm run build --workspace=frontend`
2. Deploy the `frontend/dist` folder
3. Set `VITE_API_URL` environment variable to your backend URL

### Backend (Render/Railway)
1. Deploy the `backend` folder
2. Set environment variables:
   - `MONGODB_URI` - Your MongoDB connection string
   - `PORT` - Port number (optional)
   - `FRONTEND_URL` - Your frontend URL for CORS

## 📝 Author Model

```javascript
{
  fname: String,      // Required
  lname: String,      // Required
  title: String,      // Required, enum: ["Mr", "Mrs", "Miss"]
  email: String,      // Required, unique, valid email
  password: String    // Required, 8-16 chars with special char
}
```

## 📝 Blog Model

```javascript
{
  title: String,           // Required
  body: String,            // Required
  authorId: ObjectId,      // Required, refs Author
  tags: [String],
  category: String,        // Required
  subcategory: [String],
  isDeleted: Boolean,      // Default: false
  deletedAt: String,
  isPublished: Boolean,    // Default: false
  publishedAt: String
}
```

## 📄 License

ISC

## 👤 Author

Dipesh Joshi
