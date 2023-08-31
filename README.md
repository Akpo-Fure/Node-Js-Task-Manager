# Node-Js-Task-Manager API

This is a task manager API built using Node.js, TypeScript, Express.js, and MongoDB. It enables users to sign up and manage their tasks. The project makes use of authentication and authorization to ensure that users can only access, update, or delete tasks they've created themselves, ensuring privacy. Attached below is the postman documentation to enable a seamless user exprience.

## Features

- User signup and authentication
- Task management
- JWT-based token authentication
- Protected routes for authorized access

## Getting Started

Follow these steps to set up and run the project on your local machine.

1. Clone the repository:

```bash
git clone https://github.com/Akpo-Fure/Node-Js-Task-Manager.git
```

2. Change directory to Task-Manager-API
```
cd Task-Manager-API
```

4. Install the dependecies using yarn
```
RUN yarn
```

4. Set up environmental variables in .env file for your mongoDB database using MONGO_URI

5. Set up environmental variables in .env for your password hashing using SALT_ROUNDS

6. Set up environmental variable in .env for encryption and decryption of your token using JWT_SECRET

7. Set NODE_ENV to production in .env file  

8. Build the typescript code
```
RUN yarn build
```

9. Start the server
```
RUN yarn start
```

10. Checkout https://documenter.getpostman.com/view/28610649/2s9Y5bQMLa for postman documentation for a seamless user experience
