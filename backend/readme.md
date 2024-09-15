# FriendBook Backend API

This project is the backend for a social networking application built using **Node.js**, **Express.js**, and **MongoDB**. It provides APIs for user registration, authentication, friend management, and friend suggestions. The application uses **bcrypt** for password hashing and **jsonwebtoken (JWT)** for secure user authentication.

## Table of Contents

- [Technologies](#technologies)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [User Authentication](#user-authentication)
  - [Friend Management](#friend-management)
  - [Friend Suggestion](#friend-suggestion)
- [Security](#security)
- [License](#license)

## Technologies

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing user data
- **bcrypt**: For hashing user passwords securely
- **jsonwebtoken (JWT)**: For authenticating users with tokens
- **Mongoose**: ODM (Object Data Modeling) for MongoDB

## Installation

1. Clone the repository:

    https://github.com/tarunkatariaonline/friendlist-assignment

2. Install packages:
    npm install

3. Create a .env file and add the following environment variables:

    MONGO_URI=<Your MongoDB URI>
    JWT_SECRET=<Your JWT Secret>

4. Start the server:

    npm start


## API Endpoints

### User Authentication

| Endpoint                        | Method | Description                                | Protected |
|----------------------------------|--------|--------------------------------------------|-----------|
| `/api/v1/user/register`          | POST   | Register a new user                        | No        |
| `/api/v1/user/login`             | POST   | Log in the user and return a JWT token      | No        |
| `/api/v1/user/aboutme`           | GET    | Get user profile information               | Yes       |
| `/api/v1/user/updatepassword`    | POST   | Update the logged-in user's password       | Yes       |
| `/api/v1/user/logout`            | GET    | Log out the user                           | Yes       |

### Friend Management

| Endpoint                                         | Method | Description                                | Protected |
|--------------------------------------------------|--------|--------------------------------------------|-----------|
| `/api/v1/friendbook/sendfriendrequest/:friendid` | GET    | Send a friend request to a user            | Yes       |
| `/api/v1/friendbook/friendlist/:id`              | GET    | Retrieve the user's friend list            | Yes       |
| `/api/v1/friendbook/acceptfriendrequest/:friendid`| GET    | Accept a friend request                    | Yes       |
| `/api/v1/friendbook/rejectfriendrequest/:friendid`| GET    | Reject a friend request                    | Yes       |
| `/api/v1/friendbook/removefriend/:friendid`      | DELETE | Remove a user from the friend list         | Yes       |
| `/api/v1/friendbook/getreceivedfriendlist`       | GET    | Get all received friend requests           | Yes       |
| `/api/v1/friendbook/getsendrequestfriendlist`    | GET    | Get all sent friend requests               | Yes       |
| `/api/v1/friendbook/cancelsendrequest/:friendid` | POST   | Cancel a sent friend request               | Yes       |

### Friend Suggestion

| Endpoint                                   | Method | Description                                       | Protected |
|--------------------------------------------|--------|---------------------------------------------------|-----------|
| `/api/v1/friendbook/suggestusersusingfriends` | GET    | Suggest friends based on mutual friends           | Yes       |
| `/api/v1/friendbook/suggestuserusinghobbies` | GET    | Suggest friends based on shared hobbies           | Yes       |

### User Search

| Endpoint                      | Method | Description                             | Protected |
|-------------------------------|--------|-----------------------------------------|-----------|
| `/api/v1/friendbook/users/search` | GET    | Search users by name or other criteria  | No        |




 

