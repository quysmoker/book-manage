# Book Management System - React Frontend

A modern React frontend for the Book Management System API built with Vite and integrated with Django REST Framework backend.

## Features

- ✅ Display list of books with pagination
- ✅ Search and filter books by title and author
- ✅ Add new books
- ✅ View book details
- ✅ Edit books
- ✅ Delete books
- ✅ Responsive design
- ✅ Toast notifications
- ✅ Loading indicators

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **CSS 3** - Styling with responsive design

## Project Structure

```
src/
├── components/
│   ├── AddBookForm.jsx      # Form to add new books
│   ├── BookList.jsx         # Display list of books with pagination
│   ├── DetailModal.jsx      # Modal for viewing book details
│   ├── EditModal.jsx        # Modal for editing books
│   ├── FilterForm.jsx       # Search and filter form
│   └── Notification.jsx     # Toast notifications
├── services/
│   └── bookService.js       # API service for book operations
├── styles/
│   └── index.css            # Global styles
├── App.jsx                  # Main App component
└── main.jsx                 # React entry point
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Ensure Django backend is running on `http://localhost:8000`

## Development

Start the development server:
```bash
npm run dev
```

The app will automatically open in your browser at `http://localhost:3000`

## Build

Build for production:
```bash
npm run build
```

## API Integration

The frontend connects to the Django REST Framework backend with the following endpoints:

- `GET /api/books/` - Get list of books with pagination and filters
- `GET /api/books/{id}/` - Get book detail
- `POST /api/books/` - Create new book
- `PUT /api/books/{id}/` - Update book
- `PATCH /api/books/{id}/` - Partial update book
- `DELETE /api/books/{id}/` - Delete book

## Features in Detail

### 1. Book List
- Display books in a table format
- Show: ID, Title, Author, Price, Quantity
- Action buttons: View Detail, Edit, Delete

### 2. Pagination
- Support 20 or 100 records per page
- Previous and Next buttons
- Display current page and total count

### 3. Search & Filter
- Filter by book title
- Filter by author name
- Case-insensitive search
- Reset filters button

### 4. Add New Book
- Form with Title, Author, Price, Quantity fields
- POST request to create book
- Auto-refresh book list
- Success notification

### 5. View Details
- Modal showing full book information
- Includes: ID, Title, Author, Price, Quantity, Published Date
- Formatted date and price display

### 6. Edit Book
- Modal form with pre-filled data
- PUT request to update book
- Auto-refresh book list
- Success notification

### 7. Delete Book
- Confirmation dialog before deletion
- DELETE request
- Auto-refresh book list
- Success notification

## Error Handling

- Try-catch blocks for all API calls
- User-friendly error notifications
- Loading states during API requests
- Input validation on forms

## Styling

- Modern gradient background
- Responsive grid and flexbox layouts
- Smooth animations and transitions
- Color-coded buttons and states
- Mobile-friendly design

## Notes

- Ensure CORS is enabled on the Django backend
- Django backend should be running on port 8000
- Frontend runs on port 3000 by default
- All times displayed in Vietnamese format (DD/MM/YYYY)
- Prices formatted as Vietnamese Dong (VND)
