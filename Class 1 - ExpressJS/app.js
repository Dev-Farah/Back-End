const express = require('express');
const app = express();
const PORT = 5000;
app.use(express.json());    // app.use is a Middleware to read the body on the server   // express.json() body-parser to read the body on the server

// app.get('/user', (request, response) => {
//     response.send("Hello World Get");
//     // console.log(request.body);   // Cannnot send body on get request on browser
// });

// app.post('/user', (request, response) => {
//     response.send("Hello World Post");
//     console.log(request.body);

//      // DB Query
// });

// REST APIs
app.get("/api/user", (request, response) => {
    response.send("User get");
})   // get

app.post("/api/user", (request, response) => {
    response.send("User created");
    console.log("User created");
})   // create

app.put("/api/user", (request, response) => {
    response.send("User updated");
})   // update

app.delete("/api/user", (request, response) => {
    response.send("User deleted");
})   // delete


app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`);
})

// export default exportItem