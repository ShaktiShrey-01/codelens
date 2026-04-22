markdown_content = """
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
