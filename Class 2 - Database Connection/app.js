const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const userModel = require('./models/user');


const connectionString = 'YOUR CONNECTION STRING HERE'

mongoose.connect(DBURI)
.then((res) => console.log('mongodb connected'))
.catch((err) => console.log('DB Error:', err));

// Body-Parser
app.use(express.json()); // here .use() is a Middleware

//   Get All Users  // This api is not a part of the other (REST) APIs because it has different endpoint
app.get("/api/allusers", (request, response) => {

    console.log(request.params, "params");
    const userId = request.params;

    userModel.find({}, (error, data) => {   // Passing Empty Object to get all users
        if(error) {
            response.json({
                message: `Internal Error: ${error}`,
                status: false,
            })
        } else{
            response.json({
                message: "All Users get successsfully",
                data: data,
                status: true,
        })
        }
    })
});

//   Get SINGLE User    // 63d58c92d7c0ef06cdd3e2bb
app.get("/api/user/:userId", (request, response) => {

    // Params = https://myapp.com/api/user/:userId
    // Query Params = https://myapp.com/FarahSyed?tab=repositories

    // console.log(request.params, "params");
    const { userId } = request.params;

    // .findOne({_id: mongoose.Types.ObjectId(userId)},
    userModel.findById(userId, (error, data) => {
        if(error) {
            response.json({
                message: `Internal Error: ${error}`,
                status: false,
            })
        } else{
            response.json({
                message: "User get successsfully",
                data: data,
                status: true,
        })
        }
    })
});
 
//   Create User
app.post("/api/user", (request, response) => {
    // response.send("User Created")
    console.log(request.body);

    const { firstName, lastName, email, password } = request.body || {};
    
    if(!firstName || !lastName || !email || !password) {
        response.json({
            message: "Required fields are missing",
            status: false,
        });

    }
    
    const objToSend = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };

    userModel.create(objToSend, (error, data) => {
        if(error) {
            response.json({
                message: `Internal Error: ${error}`,
                status: false,
            })
        } else{
            response.json({
                message: "User created successsfully",
                data: data,
                status: true,
        })
        }
    })

})

app.put("/api/user/:userId", (request, response) => {
    const { userId } = request.params;

    console.log(userId, "put");
    // userModel.updateOne(userId, (error, data) => {
    //     if(error) {
    //         response.json({
    //             message: `Internal Error: ${error}`,
    //             status: false,
    //         })
    //     } else{
    //         response.json({
    //             message: "User get successsfully",
    //             data: data,
    //             status: true,
    //     })
    //     }
    // })
}) //   Update

app.delete("/api/user/:userId", (request, response) => {
    response.send("User Deleted")
    console.log("User Deleted")
}) //   Delete


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});