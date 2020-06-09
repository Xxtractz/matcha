const ServerUrl = "http://localhost:4000";


/**
 * All User Related url
 * */
export const registerUserUrl = ServerUrl + "/users/register";
export const verifyUserAfterRegUrl = ServerUrl + "/users/verify";
export const loginUserUrl = ServerUrl + "/login";
export const logoutUserUrl = ServerUrl + "/users/logout";
export const ReverifyUrl = ServerUrl + "/verifyAgain";
export const forgotPasswordUrl = ServerUrl + "/users/verification";
export const UpdateUrl = ServerUrl + "/update";

// You can get and delete on these URLs
export const usersUrl = ServerUrl + "/users";
export const refreshTokenUrl = ServerUrl + "/users/refresh";


// //registering the user
// app.post("/users/register", users.create);

// //check if email already exists
// app.post("/users/checkEmail", users.checkEmail);

// //check if username already exists
// app.post("/users/checkUsername", users.checkUsername);

// //verification for forgot password
// app.post("/users/verification", users.verification);

// //verification for invalid token and getting new token
// app.post("/users/verifyAgain", users.verifyAgain);

// //users token check if exists
// app.post("/users/checkToken", users.checkToken);

// //changing the password of the user
// app.post("/users/changePassword", users.changePassword);

// //logout a user and update last seen
// app.post("/users/logout", users.logout);

// //refreshing the token 
// app.post("/users/refresh", users.refreshToken);

// //verifythe user after registration
// app.get("/users/verify/:id", users.verifyReg);

// //getting all the users in the database
// app.get("/users", users.findAll);

// //get a user by their userid
// app.get("/users/:userid", users.findOne);

// //update a user by their id
// app.put("/users/:userid", users.update);

// //delete a user by their id
// app.delete("/users/:userid", users.delete);

// //delete all the users in the database
// app.delete("/users", users.deleteAll);