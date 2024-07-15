## Tech Blog
[live Demo](https://tech-blog-nsns.onrender.com/)

**A Full-Stack Blog Application with Docker Support**

A detailed overview of Tech Blog, a full-stack blog application built with robust features and modern technologies.

**Features**

* **User Authentication:**
    * **JWT (JSON Web Token):** Enables secure user login with encrypted tokens.
    * **Google OAuth:** Provides a convenient login option using users' Google accounts.
* **Post Management:**
    * **CRUD Operations:** Admins can create, read (view), update, and delete posts.
    * **WYSIWYG Editor:** (Optional) Consider integrating a rich text editor for enhanced post creation.
    * **Content Management System (CMS):** (Optional) Explore integrating a CMS for easier content management.
* **User Management:**
    * **Admin Dashboard:** Provides functionalities for user management (if applicable).
    * **User Roles:** (Optional) Implement different user roles (e.g., admin, editor, author) for granular permissions.
* **Commenting System:**
    * **Nested Comments:** (Optional) Allow users to reply to comments, creating threaded discussions.
    * **Comment Moderation:** (Optional) Implement tools for admins to moderate comments (e.g., approve, reject, edit).
* **Post Analytics:**
    * **Dashboard:** Visualize key performance indicators (KPIs) for posts (e.g., views, likes, comments).
    * **Reporting:** (Optional) Generate reports for deeper analysis and insights.
* **Image Upload:**
    * **Firebase Integration:** Leverages Firebase for efficient and scalable image storage.
* **Password Security:**
    * **bcrypt.js:** Enforces secure password hashing with bcrypt.js for robust data protection.
* **Styling:**
    * **Tailwind CSS:** Utilizes Tailwind CSS for a streamlined and responsive design.

**Tech Stack**

**Frontend:**
* React: JavaScript library for building user interfaces.
* Redux: State management library for managing application state predictably.
* Tailwind CSS: Utility-first CSS framework for rapid and responsive styling.

**Backend:**
* Node.js: Server-side JavaScript runtime environment for building dynamic web applications.
* Express.js: Web framework simplifying building backends with Node.js.

**Database:**
* MongoDB: NoSQL document database offering flexibility and scalability for storing blog data.

**Authentication:**
* JWT: Industry-standard method for secure user authentication based on encrypted tokens.
* Google OAuth: Convenient login using Google accounts, reducing signup friction.

**Deployment:**
* Dockerfile: This enables packaging the application into a containerized image for consistent and streamlined deployment across environments.

**Getting Started**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/tech-blog.git
   ```

2. **Install Dependencies:**
   ```bash
   cd tech-blog
   npm install
   ```

3. **Configure Environment Variables:** (Optional, depending on authentication and database setup)
   Create a `.env` file at the project root and add relevant configuration entries for JWT secret, Google OAuth client ID and secret, and database connection details. Example:
   ```
   JWT_SECRET=your_secret_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   MONGODB_URI=mongodb://localhost:27017/tech-blog  # Adjust if necessary
   ```

4. **Run the Application (Development Mode):**
   ```bash
   npm start
   ```
   The application will typically start on `http://localhost:3000` (adjust the port if needed).

5. **Build the Docker Image:** (See Dockerfile for specific instructions)
   ```bash
   # For Frontend
   docker build -t react-app:dev .

   # For backend
   docker build -t node-app:dev .
   ```

6. **Run the Application (Dockerized):**
    This approach leverages Docker Compose for a more streamlined experience:
   ```bash
   docker-compose up -d  # Run detached (-d) for background execution
   ```

**Contributing**

We welcome contributions to this project! Please see the `CONTRIBUTING.md` file (if provided) for guidelines on code style, testing, and pull requests.

**License**

This project is licensed under the MIT License (see the `LICENSE` file for details).
