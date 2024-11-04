<<<<<<< HEAD
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
=======
HealthQuest
----------------------------


Motivations: The motivation for our product is to provide users with awareness of the amount of calories, protein, macros, micros, vitamins, fibre, sugar, etc, they intake with each item they consume. We want to also motivate users to better their health because your own health should be the most important thing in your life. Bad health leads to many diseases and heart problems. 

What is it? Our product is a minimalistic, motivational, user friendly interface that tracks calorie intake along with other nutritional information. 
What problem does it solve? It solves user’s problems with the lack of knowledge of what they are intaking into their body, the lack of consistency users may have with being healthy, or hitting their goals of being in a calorie surplus or deficit. 
Why it exists? This app exists because of users that are looking for something that keeps them informed of their health and to take control of it. 


Installation for your Software/System:

Prerequisites:
Ensure you have:
Download Node.js
Git Downloaded

Setup Instruction:

1. Clone the Repository  

Open the terminal.
Type the following command to create a local copy of the project on your personal computer:

git clone https://github.com/hvpham-yorku/project-group_6.git
     
This downloads the entire project repository from GitHub into a folder called project-group_6 in your current directory.

2. Navigate to Project Directory  

Use the cd command to move into the project folder:
     
cd project-group_6
     
You are now in the main directory where all project files are stored, which is essential for running further commands on this project.

3. Install Dependencies  

Install all required packages for the project. This setup allows the code to work correctly on the system.
     
npm install
     
This command reads the package.json file and installs all listed dependencies, which may include libraries for the frontend and backend.

4. Set Up Environment Variables  

Environment variables are specific settings, like API keys, database URLs, etc., that need to be configured.
Create a new file in the root project folder called .env.
Open .env in a text editor, and add the environment variables. 

For example:
     
API_KEY=your_api_key
DATABASE_URL=your_database_url
     
Save and close the file. These variables are kept secure in .env and are not shared publicly.

5. Run the Application  

To start the app in production mode, use:
     
npm run start
     
For development mode, which reloads the app as you edit code, use:
     
npm run dev
     
Open a web browser and go to http://localhost:####. This is where you’ll see the application running locally on your machine.


Contribution:
1. Fork and Clone the Repository  

Go to the main repository on GitHub.
First, fork the repository by clicking on "Fork" on GitHub. This creates a copy under your GitHub account, allowing you to make changes without affecting the main project.
Clone your forked repository to your local system:
     
git clone https://github.com/your-username/project-group_6.git
     
This downloads the forked project, where you can work independently.

2. Create a New Branch

Creating a new branch ensures your work is separate from the main codebase, so you can work on specific features or fixes.
To create a branch:
     
git checkout -b feature-or-fix-name
     
Replace feature-or-fix-name with a descriptive name, like add-dashboard-chart or fix-login-issue.

3. Make and Commit Changes  

After making changes to the project files, add them to Git for staging:
     
git add .
     
Then commit the changes with a clear message explaining what you did:
     
git commit -m "Description of changes, example: Added dashboard chart component"
     
This saves a snapshot of your work locally in Git.

4. Push Changes to Your Fork  

Push your branch to GitHub under your forked repository:
     
git push origin feature-or-fix-name
     
5. Open a Pull Request (PR)

Go to your forked repository on GitHub and switch to the branch you just pushed.
Click Compare & pull request to create a PR. In the PR, write a brief description of your changes, why they are necessary, and any relevant context.
>>>>>>> f2f3ac0735eb3923fe2e6a5c3db6d63631f267eb
