# CodeLens 🔍 

**CodeLens** is a powerful developer tool that allows you to extract design tokens, layout structures, typography, and color palettes from any public website. It seamlessly bridges the gap between inspecting a website and writing code by using **Google's Gemini 2.5 Flash Lite AI** to instantly generate production-ready React and Tailwind CSS components.

---

## ✨ Key Features

- **Deep DOM Extraction:** Instantly capture the CSS properties, fonts, and colors of any element on a web page via the custom Chrome Extension.
- **AI Code Architect:** Convert extracted styles into highly reusable, "Senior-Level" React components using Tailwind CSS.
- **Credit System:** Built-in AI quota management to track usage.
- **Syntax Highlighting:** VS Code-like experience directly in the browser for viewing generated component code.
- **JSON Export:** Download the "DNA" of any web element as a `.json` file for your design system records.
- **Secure Authentication:** JWT-based user authentication with secure HTTP-only cookies.

---

## 🏗️ Tech Stack

CodeLens is built using the **MERN** stack, supercharged with AI and browser extensions.

### **Frontend**
- **React.js (Vite)** - Fast, modern UI framework.
- **Tailwind CSS** - Utility-first styling.
- **Framer Motion** - Smooth, professional animations.
- **Lucide React** - Clean and modern icons.

### **Backend**
- **Node.js & Express.js** - Robust REST API.
- **MongoDB & Mongoose** - Database for user and credit management.
- **Google Generative AI SDK** - Integration with Gemini 2.5 Flash Lite for code generation.
- **JWT (JSON Web Tokens)** - Secure cross-domain authentication.

### **Extension**
- **Manifest V3** - Modern Chrome Extension architecture.
- **Content Scripts & Background Service Workers** - To securely extract page data and bridge it to the React dashboard.

---

## 🚀 Getting Started (Local Development)

Follow these steps to run CodeLens locally on your PC.

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)
- A [Google Gemini API Key](https://aistudio.google.com/)
- Google Chrome or Chromium-based browser (Brave, Edge)

### 2. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   Install dependencies:

Bash
npm install
Create a .env file in the backend directory and add the following variables:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
ACCESS_TOKEN_SECRET=generate_a_random_secret_string
REFRESH_TOKEN_SECRET=generate_another_random_secret_string
CORS_ORIGINS=http://localhost:5173
Start the backend server:

Bash
npm run dev
# or
node server.js
The server should now be running on http://localhost:5000.

3. Frontend Setup
Open a new terminal window and navigate to the frontend folder:

Bash
cd frontend
Install dependencies:

Bash
npm install
Create a .env file in the frontend directory:

Code snippet
VITE_API_URL=http://localhost:5000
Start the Vite development server:

Bash
npm run dev
The dashboard should now be running on http://localhost:5173.

4. Extension Setup
To use CodeLens, you need to install the custom extension in your browser.

Open Chrome and navigate to chrome://extensions/.

Toggle Developer mode ON (top right corner).

Click the Load unpacked button (top left).

Select the extension folder located inside your CodeLens project directory.

Important for Local Testing: Open extension/content.js and extension/popup.js (if applicable) and ensure the fetch URL points to http://localhost:5000 or http://localhost:5173 (depending on your bridge logic) so it communicates with your local environment instead of production.

💡 How to Use
Start the tools: Ensure both your local backend and frontend are running.

Log In: Navigate to http://localhost:5173, create an account, or log in.

Capture: Open any public website in Chrome. Click the CodeLens extension icon in your toolbar, and hover over the element you want to inspect. Click to capture it.

Analyze: You will be redirected to the CodeLens Dashboard (/audit).

Generate Code: Click the Generate Code (AI Insights) button to let Gemini process the CSS and output a clean, reusable React + Tailwind component.

Export: Copy the generated code to your clipboard or export the raw JSON specs.

🌍 Production Deployment
If you are pushing this to production (e.g., Render for Backend, Netlify/Vercel for Frontend), remember to:

Update the CORS_ORIGINS in the backend .env to your live frontend URL.

Update the VITE_API_URL in the frontend .env to your live backend URL.

Update the API endpoints inside the extension folder to point to your live backend.

Add sameSite: 'None' and secure: true to your Express cookie configuration for cross-domain authentication.

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
