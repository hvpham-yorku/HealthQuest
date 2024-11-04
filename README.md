# HealthQuest

---

## Motivation

The motivation for our product is to provide users with awareness of the amount of calories, protein, macros, micros, vitamins, fiber, sugar, etc., they intake with each item they consume. We aim to motivate users to better their health, as health should be the top priority in one’s life. Poor health can lead to various diseases and heart issues, and our app seeks to combat that.

## What is HealthQuest?

HealthQuest is a minimalistic, motivational, user-friendly interface that tracks calorie intake along with other nutritional information.

- **What problem does it solve?** It helps users understand and monitor what they’re consuming, addressing the challenge of staying consistent in reaching health goals, such as maintaining a calorie surplus or deficit.
- **Why does it exist?** This app is for individuals who seek an easy way to stay informed about their health and take control of it.

---

## Installation

### Prerequisites

Please ensure you have the following installed:
- [Node.js](https://nodejs.org) - Download and install
- [Git](https://git-scm.com/) - Download and install

### Setup Instructions

1. **Clone the Repository**

   Open your terminal and run the following command to create a local copy of the project:

   ```bash
   git clone https://github.com/hvpham-yorku/project-Group_06.git
   ```

   This command downloads the project repository into a folder called `project-group_6` in your current directory.

2. **Navigate to the Project Directory**

   Move into the project folder:

   ```bash
   cd project-group_6
   ```

   You’re now in the main directory, where all project files are stored, essential for running further commands.

3. **Install Dependencies**

   To ensure the app runs smoothly, install all required packages:

   ```bash
   npm install
   ```

   This command reads the `package.json` file and installs all listed dependencies for both the frontend and backend.

4. **Set Up Environment Variables**

   Environment variables such as API keys and database URLs need to be configured.

   - Create a new file called `.env` in the root of the project directory.
   - Open `.env` in a text editor and add your environment variables. For example:

     ```plaintext
     API_KEY=your_api_key
     DATABASE_URL=your_database_url
     ```

   Save and close the file. These variables are kept secure in `.env` and are not shared publicly.

5. **Run the Application**

   - For production mode, run:

     ```bash
     npm run start
     ```

   - For development mode, which reloads as you edit code, use:

     ```bash
     npm run dev
     ```

   - Open a web browser and go to `http://localhost:3000` to see the application running locally.

---

## Contribution

### How to Contribute

1. **Fork and Clone the Repository**

   - Go to the main repository on GitHub and click on "Fork."
   - Clone your forked repository to your local system:

     ```bash
     git clone https://github.com/your-username/project-Group_06.git
     ```

2. **Create a New Branch**

   Create a new branch to keep your work separate:

   ```bash
   git checkout -b feature-or-fix-name
   ```

   Replace `feature-or-fix-name` with a descriptive name, like `add-dashboard-chart` or `fix-login-issue`.

3. **Make and Commit Changes**

   - Stage your changes:

     ```bash
     git add .
     ```

   - Commit with a clear message:

     ```bash
     git commit -m "Description of changes, e.g., 'Added dashboard chart component'"
     ```

4. **Push Changes to Your Fork**

   Push your branch to GitHub:

   ```bash
   git push origin feature-or-fix-name
   ```

5. **Open a Pull Request (PR)**

   - On your GitHub fork, switch to the branch you pushed.
   - Click "Compare & pull request" to create a PR. In the PR, provide an overview of your changes and their purpose.

---
