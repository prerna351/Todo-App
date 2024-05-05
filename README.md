
# Todo App

This is a simple todo application built using backend tools: Express.js, Node.js, JWT authentication, Zod for input validation, and MongoDB for storing user credentials and todo tasks.

## Backend Features

- **User Authentication**:
  - Users can sign up for an account with a unique username and email.
  - Existing users can sign in to access their todo lists.
  - JWT tokens are used for authentication and authorization.

- **Todo Management**:
  - Users can create new todo tasks with titles and descriptions.
  - Todo tasks can be updated with new titles or descriptions.
  - Completed todos can be marked as complete and deleted from the list.

## Technologies Used

- **Express.js**: Web framework for Node.js used to build the backend API.
- **Node.js**: JavaScript runtime environment for server-side development.
- **MongoDB**: NoSQL database used to store user credentials and todo tasks.
- **JWT (JSON Web Tokens)**: Token-based authentication mechanism for securing routes.
- **Zod**: Library for input validation, ensuring data integrity and security.
- **Middlewares**: Express middlewares are used for request processing, including input validation and authentication.


## Usage

1. Sign up for a new account using the `/signUp` endpoint.
2. Sign in with your credentials using the `/signIn` endpoint.
3. Create new todos using the `/newTodos` endpoint.
4. View todos using the ` /myTodos ` endpoint.
5. Mark todo as complete using the ` /updateTodos ` endpoint.
6. Delete todos using the ` /removeTodo ` endpoint.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements.
