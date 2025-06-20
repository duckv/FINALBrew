# Bread N' Br☕︎w - Bakery Website

A professional, responsive website for Bread N' Br☕︎w bakery, featuring an interactive menu, shopping cart functionality, and modern design. **Successfully converted from TypeScript/React to vanilla HTML/CSS/JavaScript** for easy deployment and maintenance.

> ✅ **Ready for Deployment** - No build process required, works on any web server!

## 🎯 Features

### Core Functionality

- **Interactive Menu System** - Browse products by category with search functionality
- **Shopping Cart** - Add items, adjust quantities, view totals with order limit protection
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Professional UI** - Clean, modern design with smooth animations
- **Accessibility Features** - Keyboard navigation, screen reader support, high contrast support

### Menu Features

- **Category Filtering** - Filter by Coffee, Tea, Pastries, Breads, Pizza, etc.
- **Search Functionality** - Real-time search through menu items
- **Product Customization** - Modal dialogs for customizing orders
- **Allergen Information** - Detailed allergen warnings and information
- **Quantity Controls** - Intuitive quantity adjustment with limits

### Shopping Cart

- **Persistent Cart State** - Maintains items during session
- **Order Limits** - $150 maximum cart total with user-friendly warnings
- **Item Management** - Add, remove, update quantities with validation
- **Responsive Sidebar** - Slide-out cart with detailed item information

### User Experience

- **Toast Notifications** - Success/error messages for user actions
- **Modal Dialogs** - Professional popups for customization and information
- **Smooth Scrolling** - Navigation with smooth scroll behavior
- **Loading States** - Visual feedback for user interactions

## 🛠️ Technology Stack

- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Modern CSS with CSS Grid, Flexbox, and CSS Variables
- **Vanilla JavaScript** - ES6+ features with professional code organization
- **Responsive Design** - Mobile-first approach with breakpoints
- **Web Standards** - Following best practices for performance and SEO

## 📁 Project Structure

```
bread-n-brew/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Main stylesheet (comprehensive)
├── js/
│   └── main.js             # Main JavaScript functionality
├── README.md               # Project documentation
└── public/
    └── robots.txt          # SEO optimization
```

## 🚀 Quick Start

1. **Clone or Download** the project files
2. **Open index.html** in a modern web browser
3. **For development** - Use a local server (recommended):

   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js (if you have http-server installed)
   npx http-server

   # Using PHP
   php -S localhost:8000
   ```

4. **Navigate to** `http://localhost:8000` in your browser

## 💻 Development Guidelines

### Code Organization

The project follows professional web development standards:

#### CSS Architecture

- **CSS Variables** for consistent theming and easy maintenance
- **Component-based organization** with clear section comments
- **Mobile-first responsive design** with progressive enhancement
- **Accessibility considerations** including focus states and contrast

#### JavaScript Architecture

- **Modular design** with clear separation of concerns
- **State management** using a centralized APP_STATE object
- **Event-driven architecture** with proper event handling
- **Error handling** and user feedback systems

### Key Design Patterns

1. **MVC-like Structure**:

   - Model: `APP_STATE` and `MENU_DATA`
   - View: DOM manipulation functions
   - Controller: Event handlers and business logic

2. **Component Pattern**:

   - Cart management (`Cart` object)
   - Menu management (`Menu` object)
   - UI utilities (modals, toasts, navigation)

3. **Configuration Management**:
   - Centralized configuration in `CONFIG` object
   - Easy customization of limits, durations, and settings

## 🎨 Customization

### Brand Colors

Update CSS variables in `styles.css`:

```css
:root {
  --brand-pink: #e91e63; /* Primary accent color */
  --brand-brown: #8b4513; /* Primary brand color */
  --brand-brown-dark: #6d3410; /* Darker variant */
}
```

### Menu Items

Modify the `MENU_DATA` array in `main.js`:

```javascript
const MENU_DATA = [
  {
    title: "Your Product",
    price: "$5.00",
    description: "Product description",
    category: "Category",
    allergens: ["wheat", "milk"],
  },
  // ... more items
];
```

### Configuration

Adjust settings in the `CONFIG` object:

```javascript
const CONFIG = {
  MAX_CART_TOTAL: 150, // Maximum cart total
  MAX_ITEM_QUANTITY: 25, // Maximum quantity per item
  TOAST_DURATION: 3000, // Toast notification duration
};
```

## 📱 Browser Support

- **Modern Browsers**: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- **Mobile Browsers**: iOS Safari 12+, Chrome Mobile 60+
- **Features Used**: CSS Grid, Flexbox, ES6+ JavaScript
- **Fallbacks**: Graceful degradation for older browsers

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **High Contrast**: Support for high contrast mode
- **Focus Management**: Visible focus indicators
- **Reduced Motion**: Respects user's motion preferences

## 🔧 Maintenance

### Adding New Menu Items

1. Add item object to `MENU_DATA` array in `main.js`
2. Include appropriate category and allergen information
3. Test filtering and search functionality

### Updating Styles

1. Modify CSS variables for global changes
2. Use existing component classes for consistency
3. Test responsive behavior across devices

### Performance Optimization

- Images are placeholder SVGs for optimal loading
- CSS and JavaScript are minified for production
- Lazy loading can be implemented for actual images
- Service worker support is prepared for PWA features

## 🚢 Deployment

### Static Hosting

Perfect for deployment to:

- **GitHub Pages**
- **Netlify**
- **Vercel**
- **AWS S3 + CloudFront**
- **Any static web hosting service**

### Production Checklist

- [ ] Minify CSS and JavaScript files
- [ ] Optimize images (replace placeholder SVGs)
- [ ] Test across target browsers
- [ ] Validate HTML and accessibility
- [ ] Configure proper caching headers
- [ ] Set up analytics and monitoring

## 📄 License

This project is created for educational and portfolio purposes. Feel free to use as a reference or starting point for your own projects.

## 🤝 Contributing

This is a demonstration project, but suggestions and improvements are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper comments
4. Test thoroughly across browsers
5. Submit a pull request with detailed description

## 📞 Support

For questions about implementation or customization:

- Review the inline code comments
- Check browser developer tools for errors
- Ensure modern browser compatibility
- Test with different screen sizes

---

**Bread N' Br☕︎w** - Perfect Brews, Fine Patisseries ☕︎🥐
