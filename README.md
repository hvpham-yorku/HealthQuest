# HealthQuest

---

**HealthQuest** is a user-friendly, motivational platform designed to help individuals track their daily intake of calories, nutrients, and fluids. By providing real-time insights and progress tracking, HealthQuest empowers users to stay informed about their health and encourages them to achieve their wellness goals.

---

## Motivation

The motivation for our product is to provide users with awareness of the amount of calories, protein, macros, micros, vitamins, fibre, sugar, etc, they intake with each item they consume. We want to also motivate users to better their health because your own health should be the most important thing in your life. Bad health leads to many diseases and heart problems.


## What is HealthQuest?

Our product is a minimalistic, motivational, user friendly interface that tracks calorie intake along with other nutritional information. What problem does it solve? It solves user’s problems with the lack of knowledge of what they are intaking into their body, the lack of consistency users may have with being healthy, or hitting their goals of being in a calorie surplus or deficit. Why it exists? This app exists because of users that are looking for something that keeps them informed of their health and to take control of it.

Installation for your Software/System:
## Installation

### Prerequisites

Please ensure you have the following installed:
- [Node.js](https://nodejs.org) (Download and install)
- [Git](https://git-scm.com/) (Download and install)

### Setup Instructions

1. **Clone the Repository**

   Open your terminal and run the following command to create a local copy of the project on your computer:

   ```bash
   git clone https://github.com/hvpham-yorku/project-Group_06.git
This command downloads the entire project repository into a folder named project-group_6 in your current directory.

Navigate to the Project Directory

Use the cd command to move into the project folder:

bash
Copy code
cd project-group_6
You are now in the main directory, where all project files are stored. This is essential for running further commands.

Install Dependencies

To ensure the app runs smoothly, install all required packages:

bash
Copy code
npm install
This command reads the package.json file and installs all listed dependencies, including libraries for both frontend and backend.

Set Up Environment Variables

Environment variables like API keys and database URLs need to be configured.

Create a new file called .env in the root of the project directory.

Open .env in a text editor and add your environment variables. For example:

plaintext
Copy code
API_KEY=your_api_key
DATABASE_URL=your_database_url
Save and close the file. These variables are kept secure in .env and will not be shared publicly.

Run the Application

For production mode, run:

bash
Copy code
npm run start
For development mode (which auto-reloads as you edit), run:

bash
Copy code
npm run dev
Open a web browser and go to http://localhost:3000 to see the application running locally.

Contribution
How to Contribute
Fork and Clone the Repository

Fork the main repository by clicking on the "Fork" button on GitHub.

Clone your forked repository to your local system:

bash
Copy code
git clone https://github.com/your-username/project-Group_06.git
Create a New Branch

To keep your work separate, create a new branch for each feature or fix:

bash
Copy code
git checkout -b feature-or-fix-name
Replace feature-or-fix-name with a descriptive name, like add-dashboard-chart or fix-login-issue.

Make and Commit Changes

After making changes, add them to Git:

bash
Copy code
git add .
Then commit the changes with a clear message explaining what you did:

bash
Copy code
git commit -m "Description of changes, e.g., 'Added dashboard chart component'"
Push Changes to Your Fork

Push your branch to GitHub:

bash
Copy code
git push origin feature-or-fix-name
Open a Pull Request (PR)

On your GitHub fork, switch to the branch you pushed.
Click Compare & pull request to create a PR. In the description, provide an overview of your changes, why they’re necessary, and any relevant context.
License
This project is licensed under the MIT License.