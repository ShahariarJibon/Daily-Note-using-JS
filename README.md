# Daily Note Taker

A modern, feature-rich note-taking application built with vanilla JavaScript, HTML, and CSS.

## Features

- **Create Notes** - Add titles, content, and customize with colors
- **Categories** - Organize notes with categories (Personal, Study, Work, Ideas, Important, Other)
- **Search & Filter** - Search notes by title/content and filter by category
- **Favorites** - Star important notes
- **Completed Tasks** - Mark notes as completed with checkboxes
- **Pin Notes** - Pin important notes to the top
- **Dark Mode** - Toggle between light and dark themes
- **Local Storage** - Notes persist between sessions
- **Responsive Design** - Works on desktop and mobile

## Screenshots

### Light Mode
![Light Mode](screenshots/light-mode.png)

### Dark Mode
![Dark Mode](screenshots/dark-mode.png)

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ShahariarJibon/Daily-Note-using-JS.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Daily-Note-using-JS
   ```

3. Open `index.html` in your browser:
   ```bash
   # On macOS
   open index.html
   
   # On Linux
   xdg-open index.html
   
   # On Windows
   start index.html
   ```

   Or simply double-click `index.html` in your file explorer.

## Usage

### Creating a Note
1. Click the **Create** button in the sidebar
2. Enter a title and content
3. Select a color for your note (optional)
4. Choose a category from the dropdown in the header (optional)
5. Click **Save**

### Managing Notes
- **View/Edit**: Click on any note to open it in read mode, then click the edit icon
- **Star**: Click the star icon to add/remove from favorites
- **Complete**: Check the checkbox on a note, then click "Mark Done"
- **Pin**: Click the pin icon to pin/unpin a note
- **Delete**: Select notes with checkboxes and click "Delete"
- **Category**: Use the category dropdown in the note view to change a note's category

### Filtering & Search
- Use the search bar to find notes by title or content
- Use the category dropdown next to search to filter by category
- Click "Favourites" to show only starred notes
- Click "Completed" to show only completed notes

### Dark Mode
Click the moon/sun icon in the sidebar to toggle dark mode.

## Project Structure

```
note-taker/
├── index.html      # Main HTML structure
├── style.css       # All styling including dark mode
├── script.js       # Application logic
└── README.md       # This file
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables, Flexbox, Grid
- **Vanilla JavaScript (ES6+)** - No frameworks or libraries
- **Font Awesome 4.7** - Icons
- **LocalStorage API** - Data persistence

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## License

MIT License - feel free to use this project for learning or personal use.

## Author

**Shahariar Jibon**
- GitHub: [@ShahariarJibon](https://github.com/ShahariarJibon)