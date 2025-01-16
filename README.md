# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

Electronic Components Catalog - Nuxt.js SSR Application
A server-side rendered Nuxt.js application that provides an electronic components catalog with user authentication, SEO optimization, and advanced listing features.
Features
Authentication

Secure login system with form validation
Protected routes using middleware
JWT token-based authentication
Automatic redirect to login for unauthorized users

Product Listing

Comprehensive electronic components catalog
Advanced table view with sorting and filtering
Categories include:

Controllers and Processors
Integrated Circuits - ICs
Discrete Semiconductors
Circuit Protection
Sensors and Transducers
Passive Components
Connectors
Optoelectronics
Switches and Relays

Pagination with numbered navigation
Price tier display (1+, 10+, 100+ units)
Stock availability indicators
Product images and detailed descriptions

SEO Optimization

Dynamic meta tags for improved search engine visibility
Optimized page titles and descriptions
Responsive design for all devices

Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v16.0.0 or later)
npm (v7.0.0 or later)

Installation

Clone the repository:

bashCopygit clone <repository-url>
cd Frontend-Assignment

Install dependencies:

bashCopynpm install
Development
Run the development server:
bashCopynpm run dev
The application will be available at http://localhost:3000
Build for Production

Build the application:

bashCopynpm run build

Start the production server:

bashCopynpm run start
Project Structure
CopyFrontend-Assignment/
├── components/ # Reusable Vue components
├── composables/ # Composable functions (includes auth store)
├── middleware/ # Route middleware (auth protection)
├── pages/ # Application pages
│ ├── index.vue # Main listing page
│ └── login.vue # Login page
├── public/ # Static assets
├── app.vue # Root component
├── nuxt.config.ts # Nuxt configuration
└── package.json # Project dependencies
Dependencies
This project uses the following main dependencies:

Nuxt.js 3 - Vue.js framework for SSR
@pinia/nuxt - State management for Nuxt
@nuxtjs/tailwindcss - Utility-first CSS framework
Axios - HTTP client for API requests

Configuration
The application can be configured through nuxt.config.ts. Key configurations include:

SSR mode enabled
Pinia for state management
TailwindCSS for styling
Custom meta tags for SEO

Test Credentials
Use these credentials for testing the application:

Email: test@example.com
Password: password

Features in Detail
Authentication System

Form validation for email and password
Secure token storage
Protected routes using middleware
Automatic redirects for unauthorized access

Product Listing

Table view with columns for:

Product image
Manufacturer part number
Manufacturer name
Description
Availability
Pricing (with quantity breaks)
Buy button

Sorting options:

Part number
Manufacturer
Price

Category filtering
Pagination with configurable items per page

SEO Features

Dynamic meta tags based on:

Current page
Selected category
Search/filter state

Optimized for search engine crawling
Server-side rendering for improved indexing

Contributing

Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

The API calls are currently mocked for demonstration purposes
Images are using placeholders and should be replaced with actual product images
The authentication system is simulated and should be connected to a real backend
Pricing tiers are examples and should be updated with real data
