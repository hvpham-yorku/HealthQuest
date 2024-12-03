# Sprint 2 Planning Meeting Document

## **Meeting Overview**
- **Objective**: Define Sprint 2 goals, update the product backlog, finish incomplete user stories, estimate team capacity, and outline task breakdown for successful completion.

---

## **Sprint Goal**
The goal of Sprint 2 is to build upon the foundational framework established in Sprint 1 by refining the UI, expanding the tracking functionalities, and enhancing the core capabilities of HealthQuest’s MVP.

---

## **Participants**
1. **Abrar**: Backend Developer & Database Designer  
2. **Humza**: Frontend Developer & Scrum Master  
3. **Luqmaan**: Software Developer and Product Owner  
4. **Aditya**: Software Developer and Logistics Co-Manager  
5. **Prabhjyot**: Software Developer and Logistics Co-Manager  

---

## **Team Capacity**
- **Abrar**: 10 hours/week  
- **Humza**: 6 hours/week  
- **Luqmaan**: 6 hours/week  
- **Aditya**: 6 hours/week  
- **Prabhjyot**: 6 hours/week  
- **Total Capacity**: 34 hours/week  

---

## **User Stories for Sprint 2**

### **Frontend Stories**
1. **Calorie Tracker UI**  
   - **Description**: A visual tracker for calorie progress.  
   - **Tasks**: Develop calorie progress bar component.  
   - **Assignee**: Humza  
   - **Estimate**: 15 minutes  

2. **Meal Logging UI**  
   - **Description**: Interface for logging meals with a searchable database.  
   - **Tasks**: Develop meal logging form.  
   - **Assignee**: Humza  
   - **Estimate**: 15 minutes  

3. **Water Tracker UI**  
   - **Description**: Visual tracker with reminders for hydration goals.  
   - **Tasks**: Develop hydration progress component.  
   - **Assignee**: Humza  
   - **Estimate**: 15 minutes  

4. **Step Tracker UI**  
   - **Description**: Tracks steps, with a daily goal that is variable (~6000 steps).  
   - **Tasks**: Develop step progress bar component.  
   - **Assignee**: Abrar  
   - **Estimate**: 15 minutes  

5. **Redesign Dashboard UI**  
   - **Description**: Dashboard Page needs to be redesigned.  
   - **Tasks**: Redesign the Dashboard Page.  
   - **Assignee**: Humza  
   - **Estimate**: 15 minutes  

6. **Redesign Header UI**  
   - **Description**: Header needs to be redesigned.  
   - **Tasks**: Redesign the Header.  
   - **Assignee**: Humza  
   - **Estimate**: 15 minutes  

7. **Redesign Hydration Page UI**  
   - **Description**: Hydration Page needs to be redesigned.  
   - **Tasks**: Redesign the Hydration Page.  
   - **Assignee**: Humza  
   - **Estimate**: 15 minutes  

8. **Redesign Login Page UI**  
   - **Description**: Login Page needs to be redesigned.  
   - **Tasks**: Redesign the Login Page.  
   - **Assignee**: Humza  
   - **Estimate**: 15 minutes  

9. **Redesign Profile Page UI**  
   - **Description**: Profile Page needs to be redesigned.  
   - **Tasks**: Redesign the Profile Page.  
   - **Assignee**: Humza  
   - **Estimate**: 15 minutes  

10. **Redesign Register Page UI**  
    - **Description**: Register Page needs to be redesigned.  
    - **Tasks**: Redesign the Register Page.  
    - **Assignee**: Humza  
    - **Estimate**: 15 minutes  

11. **Redesign Steps Tracker UI**  
    - **Description**: Steps Tracker needs to be redesigned.  
    - **Tasks**: Redesign the Steps Tracker.  
    - **Assignee**: Humza  
    - **Estimate**: 15 minutes  

12. **Redesign Navigation Links**  
    - **Description**: Navigation Links need to be redesigned.  
    - **Tasks**: Redesign the Navigation Links.  
    - **Assignee**: Humza  
    - **Estimate**: 15 minutes  

---

### **Backend Stories**
1. **Calorie Tracking Storage**  
   - **Description**: Efficient storage and retrieval of calorie data.  
   - **Tasks**:  
     - Design calorie data schema  
     - Implement calorie data storage functionality  
     - Develop calorie retrieval API endpoint  
   - **Assignee**: Abrar  
   - **Estimate**: 1 hour  

2. **Meal Data Storage**  
   - **Description**: Reliable storage for meal logs with nutritional calculations.  
   - **Tasks**:  
     - Design meal data schema  
     - Implement meal data storage functionality  
     - Develop API for logging and retrieving meal data  
   - **Assignee**: Abrar  
   - **Estimate**: 1 hour  

3. **Water Intake Data**  
   - **Description**: Secure storage for water tracking with adjustable goals.  
   - **Tasks**:  
     - Design water intake data schema  
     - Implement water intake data storage functionality  
     - Develop API for tracking and adjusting hydration goals  
   - **Assignee**: Abrar  
   - **Estimate**: 1 hour  

4. **Step Tracking Data**  
   - **Description**: Efficient storage and retrieval of step data.  
   - **Tasks**:  
     - Design step tracking data schema  
     - Implement step data storage functionality  
     - Develop API for retrieving and storing step data  
   - **Assignee**: Abrar  
   - **Estimate**: 1 hour  

5. **Secure Authentication**  
   - **Description**: User login with encrypted credentials for security.  
   - **Tasks**:  
     - Implement user authentication  
     - Encrypt and store user credentials  
     - Develop API for secure login/logout  
   - **Assignee**: Abrar  
   - **Estimate**: 3 hours  

6. **API & Route Setup**  
   - **Description**: Set up API endpoints for all frontend UI elements and their routes.  
   - **Tasks**:  
     - Create endpoints for calorie tracker  
     - Create endpoints for meal logging  
     - Create endpoints for water tracker  
     - Create endpoints for step tracker  
   - **Assignee**: Abrar  
   - **Estimate**: 3 hours  

7. **Efficient Data Schema**  
   - **Description**: Optimized schema for calorie, meal, and water tracking.  
   - **Tasks**:  
     - Design MongoDB schema for calorie tracking  
     - Design MongoDB schema for meal data  
     - Design MongoDB schema for water intake  
   - **Assignee**: Abrar  
   - **Estimate**: 5 hours

8. **Authentication and Authorization**  
   - **Description**: Secure endpoints for user authentication and authorization. 
   - **Tasks**:  
     - Implement JWT token-based authentication
     - Secure routes with authentication middleware  
     - Validate user token for profile updates
   - **Assignee**: Abrar  
   - **Estimate**: 3 hours  

9. **Database Integration for User Data**  
   - **Description**: Set up database schemas and integrate MongoDB for user data storage. 
   - **Tasks**:  
     - Design user data schema (profile, bio, goals)
     - Implementation CRUD operations for user data
     - Integrate MongoDB with the backend for storing and retreiving data
   - **Assignee**: Abrar  
   - **Estimate**: 4 hours

10. **Profile Picture Upload Storage**  
   - **Description**: Handle profile picture upload and retrieval for user profiles.
   - **Tasks**:  
     - Design storage for profile pictures
     - Implement image upload functionality using multer
     - Develop profile picture retrieval API endpoint
   - **Assignee**: Abrar  
   - **Estimate**: 2 hours

11. **User Profile API Update**  
   - **Description**: Implement API to update user profile data including bio and goals.
   - **Tasks**:  
     - Design user profile update functionality
     - Implement bio and goal update functionality
     - Develop API endpoint for updating user profile data
   - **Assignee**: Abrar  
   - **Estimate**: 2 hours

12. **Image Preview and File Validation**  
   - **Description**: Implement functionality to show image preview before uploading and validate file types.
   - **Tasks**:  
     - Add image preview functionality in frontend
     - Validate file type (only images) on file upload
   - **Assignee**: Abrar  
   - **Estimate**: 1 hours

13. **Profile Data Validation**  
   - **Description**: Ensure user profile data is validated before updating in the database.
   - **Tasks**:  
     - Add validation checks for bio and goals fields
     - Implement error handling for invalid data
   - **Assignee**: Abrar  
   - **Estimate**: 1 hours

14. **MongoDB Integration for Profile Data**  
   - **Description**: Set up MongoDB database integration for storing profile information.
   - **Tasks**:  
     - Design MongoDB schema for user profiles
     - Implement database queries for fetching and updating user profiles
   - **Assignee**: Abrar  
   - **Estimate**: 2 hours
---

### **Documentation Stories**
1. **Routes Documentation**  
   - **Description**: Detailed documentation on all backend routes.  
   - **Tasks**: Write routes documentation.  
   - **Assignee**: Luqmaan  
   - **Estimate**: 30 minutes  

2. **Controller Documentation**  
   - **Description**: Detailed documentation on controllers, including methods and logic for handling requests.  
   - **Tasks**: Write controller documentation.  
   - **Assignee**: Luqmaan  
   - **Estimate**: 30 minutes  

3. **Model Documentation**  
   - **Description**: Detailed documentation on database models, including schema definitions and relationships between models.  
   - **Tasks**: Write model documentation.  
   - **Assignee**: Luqmaan  
   - **Estimate**: 30 minutes  

4. **README.md**  
   - **Description**: Add comprehensive updates to README.md file, including user stories, contribution guidelines, and installation steps.  
   - **Tasks**: Write detailed documentation for README.md.  
   - **Assignees**: Aditya and Prabhjyot  
   - **Estimate**: 2 hours (1 hour each)  

5 **README Documentation**  
   - **Description**: Update README.md with Sprint 2 details  
   - **Tasks**: Add Changes made in Sprint 2
   - **Assignees**: Aditya and Prabhjyot  
   - **Estimate**: 2 hours (1 hour each)  
---

## **Decisions and Notes**
- All participants agreed to focus on the advanced gamification features and revamping the UI for Sprint 2.  
- Spike identified for advanced frontend features related to gamification.  

---

## **Expected Outcomes**
1. Remodeled UI for register, login, profile, dashboard, hydration, and steps tracker pages.  
2. Functional backend storage for tracking calorie, meal, water, and step data.  

