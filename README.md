# Status - Production
Visit the link for a quick review: https://poker-ruha.hu
The page was created for my cousin, who is uploading new clothes every day. The shops are located in Mohacs, feel free to call them and visit their shops!

# Stack
The frontend was developed using React, the backend was implemented with Node.js, and the database is MongoDB.

# .env file
In the first, you need to create a .env file in the server folder, to be able to run the CreateAdminIfNotExist and of course the server and the client,too.
Variables you need in the .env:
- MONGO_URL=
- NODE_ENV=
- ADMIN_USERNAME=
- ADMIN_PASSWORD=
- TOKEN_SECRET=
After you created this variables, you are ready to run the application.

# Tests
To run the tests with coverage you need to go to the /server/tests folder, and then run the following command: npm run coverage

# Server
After you created the .env, and installed the dependencies with "npm i" you are able to run "node server.js" in the /server folder.

# Client
After you go to the ./client folder and installed dependencies with "npm i" command, you are able to run the frontend server with running the npm start command.
