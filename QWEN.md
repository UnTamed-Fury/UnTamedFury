# UnTamedFury Website Analysis

## Overview
UnTamedFury is a personal portfolio website built with Node.js and Express.js, featuring a modern glass-morphism design with responsive layout and animated elements.

## Technology Stack
- Backend: Node.js, Express.js
- Frontend: HTML5, CSS3, JavaScript
- Design: Glass-morphism UI with animated backgrounds
- CDN: particles.js for particle effects

## Project Structure
```
src/
├── public/
│   ├── index.html      # Homepage with animated UNTAMED_FURY title
│   ├── about.html      # About page with personal information
│   ├── contacts.html   # Contact page with social media links
│   ├── style.css       # Glass-morphism styling and layout
│   ├── script.js       # Grid animation and mouse interactions
│   ├── fury.js         # Animated text effects for titles
│   └── favicon.ico     # Site favicon
server.js               # Express server configuration
package.json            # Dependencies and scripts
netlify.toml            # Netlify deployment configuration
```

## Key Features
- Animated title that randomizes letters on hover/click
- Interactive grid background that responds to mouse movement
- Particle.js background effects (home page)
- Glass-morphism UI components
- Responsive design across devices
- Smooth navigation between pages

## Server Configuration
The Express server serves static files from the `src/public` directory and includes routes for:
- GET `/` → index.html
- GET `/about` → about.html
- GET `/contacts` → contacts.html
- GET `/api/info` → JSON API endpoint

## Running the Application
1. Navigate to the project directory: `cd /path/to/UnTamedFury`
2. Install dependencies: `npm install`
3. Start the server: `npm start` (runs on port 3000 by default)
   - Alternative: `PORT=8080 npm start` to use a different port
4. Access the website at `http://localhost:3000` (or your custom port)

The server is confirmed to be running when you see: "Server is running on port [PORT]"

## Additional Information
- The site is deployed on Netlify (as shown in the README)
- Includes modern CSS features like backdrop-filter for glass effects
- Uses Google Fonts (Space Mono and Rubik) for typography
- Has links to GitHub, GitLab, Instagram, and Reddit profiles