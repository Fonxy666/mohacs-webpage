# .env file
In the first, you need to create a .env file in the server folder, to be able to run the CreateAdminIfNotExist and of course the server and the client,too.
Variables you need in the .env:
- MONGO_URL=
- NODE_ENV=
- ADMIN_USERNAME=
- ADMIN_PASSWORD=
- TOKEN_SECRET=
After you created this variables, you are ready to run the application.

# tests
To run the tests with coverage you need to go to the /server/tests folder, and then run the following command: npm run coverage

# server
After you created the .env, you are able to run "node server.js" in the /server folder.

# client
After you go to the ./client folder, you are able to run the frontend server with running the npm start command.
