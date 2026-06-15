# React Frontend - Setup Guide

## ⚠️ Important Setup Steps

### Step 1: Install Node.js Dependencies

Open **Command Prompt** (cmd.exe) or **PowerShell** and run:

```bash
cd e:\book_manage\frontend
npm install
```

Wait for installation to complete.

### Step 2: Start React Development Server

```bash
npm run dev
```

This will:
- Start Vite dev server on `http://localhost:3000`
- Automatically open your browser
- Enable hot module reload

### Step 3: Verify Backend is Running

Make sure Django backend is running:
```bash
cd e:\book_manage
python manage.py runserver
```

Django should be accessible at `http://localhost:8000`

### Step 4: Access Frontend

Open browser and go to: **http://localhost:3000**

You should see the Book Management System interface.

## Features Ready to Test

✅ **Display Book List** - Get all books from API
✅ **Search & Filter** - Filter by title and author  
✅ **Add New Book** - Create new books
✅ **View Details** - See book information
✅ **Edit Book** - Update existing books
✅ **Delete Book** - Remove books
✅ **Pagination** - Navigate between pages
✅ **Responsive Design** - Works on mobile/tablet

## Project Files Structure

```
frontend/
├── index.html                 # HTML entry point
├── package.json              # NPM dependencies
├── vite.config.js           # Vite configuration
├── src/
│   ├── main.jsx             # React entry point
│   ├── App.jsx              # Main component
│   ├── components/
│   │   ├── AddBookForm.jsx     # Form to add books
│   │   ├── BookList.jsx        # Display books
│   │   ├── DetailModal.jsx     # Book details modal
│   │   ├── EditModal.jsx       # Edit book modal
│   │   ├── FilterForm.jsx      # Search/filter form
│   │   └── Notification.jsx    # Toast notifications
│   ├── services/
│   │   └── bookService.js      # API calls
│   └── styles/
│       └── index.css           # Global styles
└── README.md
```

## Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- --port 3001
```

### Module not found errors
Delete `node_modules` and `package-lock.json`, then run `npm install` again

### Backend connection errors
- Check Django is running on `http://localhost:8000`
- Check CORS headers are enabled in Django settings
- Open browser DevTools (F12) to see network errors

### Clear cache
```bash
npm run build
rm -rf dist node_modules
npm install
npm run dev
```

## API Endpoints Used

The frontend connects to these Django API endpoints:

```
GET    /api/books/                    - List books (paginated, filterable)
GET    /api/books/{id}/               - Get single book
POST   /api/books/                    - Create new book
PUT    /api/books/{id}/               - Update book
DELETE /api/books/{id}/               - Delete book
```

## Environment Configuration

If needed, create `.env` file:

```
VITE_API_BASE_URL=http://localhost:8000/api
```

Then update `src/services/bookService.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
```

## Build for Production

```bash
npm run build
```

Creates optimized `dist` folder ready for deployment.

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Start dev server: `npm run dev`
3. ✅ Test all features
4. ✅ Take screenshots
5. ✅ Push to GitHub

## Support

For issues with Vite: https://vitejs.dev/
For React docs: https://react.dev/
For Axios: https://axios-http.com/
