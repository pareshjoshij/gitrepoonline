# GitRepos.Online

**GitRepos.Online** is a web application designed to help developers, particularly beginners, find "beginner-friendly" and Hacktoberfest-labeled open-source issues. The application aggregates issues from GitHub based on programming languages, allowing users to easily start contributing to open source.

## 🚀 Features

* **Curated Issue Search:** Automatically fetches issues tagged for beginners (e.g., "good first issue", "hacktoberfest").
* **Language Filtering:** Filter issues by popular programming languages including JavaScript, Python, Java, TypeScript, Go, Rust, and PHP.
* **Performance Optimization:** Utilizes **Redis** caching on the backend to store GitHub API responses for 1 hour, reducing API rate limit usage and improving load times.
* **Modern UI:** Built with a responsive Dark Mode interface using **Tailwind CSS**.

## 🛠️ Tech Stack

### Client (Frontend)
* **Framework:** [React](https://react.dev/) (v18)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **HTTP Client:** Native Fetch API

### Server (Backend)
* **Runtime:** [Node.js](https://nodejs.org/)
* **Framework:** [Express.js](https://expressjs.com/)
* **Database/Cache:** [Redis](https://redis.io/)
* **API Interaction:** [Octokit](https://github.com/octokit/octokit.js) (GitHub REST API)

## 📋 Prerequisites

Before running this project, ensure you have the following installed:
* **Node.js** (v14 or higher recommended)
* **npm** or **pnpm**
* **Redis** (The server requires a running Redis instance for caching)

## ⚙️ Installation & Setup

The project is divided into two directories: `client` and `server`. You will need to set up both.

### 1. Clone the Repository
```bash
git clone [https://github.com/pareshjoshij/gitrepoonline.git](https://github.com/pareshjoshij/gitrepoonline.git)
cd gitrepoonline
```
Based on the code and configuration files provided, here is a comprehensive README.md file for the GitRepos.Online project in Markdown format.

Markdown

# GitRepos.Online

**GitRepos.Online** is a web application designed to help developers, particularly beginners, find "beginner-friendly" and Hacktoberfest-labeled open-source issues. The application aggregates issues from GitHub based on programming languages, allowing users to easily start contributing to open source.

## 🚀 Features

* **Curated Issue Search:** Automatically fetches issues tagged for beginners (e.g., "good first issue", "hacktoberfest").
* **Language Filtering:** Filter issues by popular programming languages including JavaScript, Python, Java, TypeScript, Go, Rust, and PHP.
* **Performance Optimization:** Utilizes **Redis** caching on the backend to store GitHub API responses for 1 hour, reducing API rate limit usage and improving load times.
* **Modern UI:** Built with a responsive Dark Mode interface using **Tailwind CSS**.

## 🛠️ Tech Stack

### Client (Frontend)
* **Framework:** [React](https://react.dev/) (v18)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **HTTP Client:** Native Fetch API

### Server (Backend)
* **Runtime:** [Node.js](https://nodejs.org/)
* **Framework:** [Express.js](https://expressjs.com/)
* **Database/Cache:** [Redis](https://redis.io/)
* **API Interaction:** [Octokit](https://github.com/octokit/octokit.js) (GitHub REST API)

## 📋 Prerequisites

Before running this project, ensure you have the following installed:
* **Node.js** (v14 or higher recommended)
* **npm** or **pnpm**
* **Redis** (The server requires a running Redis instance for caching)

## ⚙️ Installation & Setup

The project is divided into two directories: `client` and `server`. You will need to set up both.

### 1. Clone the Repository
```bash
git clone [https://github.com/pareshjoshij/gitrepoonline.git](https://github.com/pareshjoshij/gitrepoonline.git)
cd gitrepoonline
2. Backend Setup (Server)
Navigate to the server directory and install dependencies:

```
```Bash

cd server
npm install

```

Configuration: Create a .env file in the server/ directory. You will likely need the following variables (based on standard Octokit/Redis usage):

```Code snippet

PORT=5001
# Optional: If using a specific Redis URL. Defaults to localhost:6379 usually.
REDIS_URL=redis://localhost:6379 
# Recommended: GitHub Personal Access Token to increase API rate limits
GITHUB_TOKEN=your_github_token_here 


```
```
Start the server:

Bash
```
# For development (uses nodemon)
```
npm run dev
```
# For production
```
npm start
The server will run on http://localhost:5001
```
3. Frontend Setup (Client)
Open a new terminal, navigate to the client directory, and install dependencies:

```Bash

cd client
npm install
Start the development server:
```
```Bash
```
npm run dev
The client will typically run on http://localhost:5173 (or the port specified by Vite).
```
🔌 API Endpoints
The backend exposes the following API routes under /api:
```
GET /api/issues
Fetches a list of issues from GitHub based on the specified language.

Query Parameters:

language (required): The programming language to filter by (e.g., javascript, python).

Example Request:

HTTP

GET http://localhost:5001/api/issues?language=javascript
Response: Returns a JSON array of issue objects containing titles, repository details, user
```
git clone [https://github.com/pareshjoshij/gitrepoonline.git](https://github.com/pareshjoshij/gitrepoonline.git)
cd gitrepoonline 
```


avatars, and URLs.
```
📂 Project Structure
gitrepos-online/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── App.jsx         # Main UI Logic
│   │   ├── index.css       # Tailwind directives
│   │   └── main.jsx        # React entry point
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                 # Express Backend
│   ├── routes/
│   │   └── api.js          # API Route definitions
│   ├── services/
│   │   ├── cacheService.js # Redis caching logic
│   │   └── githubService.js# GitHub API interaction
│   ├── server.js           # Entry point
│   └── package.json
│
└── README.md

```
🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request
