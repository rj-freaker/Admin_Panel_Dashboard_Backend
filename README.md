# Admin Panel Backend

This project provides a backend solution for an admin panel using Node.js, Express.js, and MongoDB. It supports user management operations with authentication via JSON Web Tokens (JWT).

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Installation Steps](#installation-steps)
- [Usage](#usage)
- [API Routes](#api-routes)
  - [User Routes](#user-routes)
  - [Admin Routes](#admin-routes)
- [Models](#models)
  - [User Collection](#user-collection)
- [Routes](#routes)
- [Additional Considerations](#additional-considerations)
- [Flow Diagram](#flow-diagram)


## Introduction

This project serves as a backend for an admin panel application, providing RESTful API endpoints for user management tasks such as user creation, updating user details, fetching users, and deleting users. It utilizes MongoDB as the database and integrates JWT for authentication.

## Installation

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js
- MongoDB (or use a cloud-based MongoDB service)

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your/repository.git
   cd repository-name
2. **Install dependencies:**

   ```bash
   npm install
3. **Set up environment variables:**

   Create a `.env` file in the root directory with the following variables:
   ```dotenv
   DEV_PORT=3000
   DEV_DB=mongodb://localhost:27017
   DB_NAME=your-database-name
   SECRET=your-jwt-secret
   Adjust DEV_PORT, DEV_DB, DB_NAME, and SECRET as per your configuration.
5. **Start the server:**
   ```bash
   npm start
   This command starts the server on the specified port.


## Usage
Once the server is running, you can interact with it using HTTP requests to the defined API endpoints. Below are details on the available routes.

##API Routes
**User Routes**
- POST /api/user/signup: Create a new user.
- POST /api/user/signin: Sign in an existing user.
**Admin Routes**
- POST /api/admin/createUser: Create a new user (admin access required).
- PUT /api/admin/updateUser/:uId: Update a user by ID (admin access required).
- GET /api/admin/getUser: Get all users (admin access required).
- DELETE /api/admin/deleteUser/:uId: Delete a user by ID (admin access required).

## Models

* **User Collection:**
    - `_id` (unique identifier, generated by MongoDB)
    - `password` (hashed and salted string, required)
    - `firstname` (string, required)
    - `lastname` (string, required)
    - `role` (string, enum, default)

## Routes

The routes are grouped functionally for better organization:

**1. User Authentication:**

- /signup (POST) - Create a new user account
- /login (POST) - Login to existing account

**2. Admin (User Management):**

- /createUser (POST) - Create user
- /updateUser/:candidateID (PUT) - Update user details
- /deleteUser/:uID (DELETE) - Delete user

## Additional Considerations

- Secure password storage with hashing and salting.
- Error handling and validation for user input.
- Authentication for admin routes to prevent unauthorized access.
- Explore authorization mechanisms using roles or permissions to restrict access to routes based on user type (e.g., admin vs. user).
- Test the API endpoints thoroughly to ensure security and functionality.

## Flow Diagram

![Flow Diagram](flow%20diagram.png)

