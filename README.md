# Tasty Kitchens - Food Delivery App

A React-based food delivery application that allows users to browse restaurants, view menus, and manage their cart. Built with React Router, authentication, and responsive design.

## Features

### 🔐 Authentication
- User login with JWT token management
- Protected routes for authenticated users
- Automatic redirect to login for unauthenticated access

### 🏠 Home Page
- **Restaurant Offers Carousel**: Interactive slider showing current offers
- **Popular Restaurants**: Grid display of restaurant cards with ratings
- **Sorting Functionality**: Sort restaurants by highest/lowest ratings
- **Pagination**: Browse restaurants with paginated navigation
- **Responsive Design**: Mobile, tablet, and desktop optimized

### 🍽️ Restaurant Details
- Detailed restaurant information with image, cuisine, and location
- Food items list with images, pricing, and ratings
- Add/remove items to cart with quantity controls
- Real-time cart updates stored in localStorage

### 🛒 Shopping Cart
- View all added food items with quantities and prices
- Increase/decrease item quantities
- Automatic total price calculation
- Persistent cart data using localStorage
- Empty cart state with helpful messaging

### 🧭 Navigation & Routing
- **Routes**:
  - `/login` - User authentication
  - `/` - Home page with restaurants
  - `/restaurant/:id` - Specific restaurant details
  - `/cart` - Shopping cart
  - `*` - 404 Not Found page
- Responsive header with navigation links
- Active route highlighting

## Technologies Used

- **React** (Class Components)
- **React Router DOM** for navigation
- **React Slick** for carousel functionality
- **React Icons** for social media icons
- **JS Cookie** for JWT token management
- **CSS** for styling (no styled-components)
- **Local Storage** for cart persistence

## Installation and Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tasty-kitchens
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

### `npm start`
Runs the app in development mode with hot reloading.

### `npm run build`
Builds the app for production deployment.

### `npm test`
Launches the test runner in interactive watch mode.

## API Integration

The application integrates with external APIs for:
- User authentication
- Restaurant offers carousel
- Restaurant listings with sorting and pagination
- Individual restaurant details and menu items

## User Credentials for Testing

You can use the following credentials to test the application:
- **Username**: `rahul`
- **Password**: `rahul@2021`

Or:
- **Username**: `henry`
- **Password**: `henry_the_developer`

## Project Structure

```
src/
├── components/
│   ├── Cart/              # Shopping cart component
│   ├── CartItem/          # Individual cart item component
│   ├── FoodItem/          # Food item with quantity controls
│   ├── Footer/            # App footer with social links
│   ├── Header/            # Navigation header
│   ├── Home/              # Main home page component
│   ├── LoaderComponent/   # Loading spinner component
│   ├── Login/             # Authentication component
│   ├── NotFound/          # 404 error page
│   ├── ProtectedRoute/    # Route protection wrapper
│   ├── RestaurantCard/    # Restaurant card component
│   └── RestaurantDetails/ # Restaurant details page
├── App.js                 # Main app component with routing
├── App.css               # Global styles
└── index.js              # React app entry point
```

## Key Features Implementation

### Authentication Flow
- JWT token stored in cookies
- Automatic login state persistence
- Protected route implementation
- Logout functionality with token cleanup

### Cart Management
- localStorage integration for persistence
- Real-time quantity updates
- Automatic price calculations
- Cart state synchronization across components

### Responsive Design
- Mobile-first CSS approach
- Flexible grid layouts
- Touch-friendly interaction elements
- Optimized images and typography

### Performance Optimizations
- Component-based architecture
- Efficient state management
- Image optimization
- Lazy loading considerations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
