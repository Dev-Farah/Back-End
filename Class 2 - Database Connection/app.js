const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const userModel = require('./models/user');

const DBURI = 'YOUR CONNECTION STRING HERE'

mongoose.connect(DBURI)
.then((res) => console.log('mongodb connected'))
.catch((err) => console.log('DB Error:', err));

// Body-Parser
app.use(express.json()); // here .use() is a Middleware

//   Get All Users  // This api is not a part of the other (REST) APIs because it has different endpoint
app.get("/api/allusers", (request, response) => {

    console.log(request.params, "params");
    const userId = request.params;

    // // MongooseError: Model.find() no longer accepts a callback
    // userModel.find({}, (error, data) => {   // Passing Empty Object to get all users
    //     if(error) {
    //         response.json({
    //             message: `Internal Error: ${error}`,
    //             status: false,
    //         })
    //     } else{
    //         response.json({
    //             message: "All Users get successsfully",
    //             data: data,
    //             status: true,
    //     })
    //     }
    // })

    userModel.find({})
    .then((data) =>{
        response.json({
            message: "All Users get successsfully",
            data: data,
            status: true,
        })
    }).catch((error) => {
        response.json({
            message: `Internal Error: ${error}`,
            status: false,
        })
    })
});

//   Get SINGLE User    // 63d58c92d7c0ef06cdd3e2bb
// Using Parameters
app.get("/api/user/:userId", (request, response) => {
    // Params = https://myapp.com/api/user/:userId
    console.log(request.params, "params");
    const { userId } = request.params;

// Using Query Parameters
// app.get("/api/user", (request, response) => {
    // // Query Params = https://myapp.com/FarahSyed?tab=repositories
    // console.log(request.query, "query");
    // const { userId } = request.query;


    // userModel.findOne({_id: mongoose.Types.ObjectId(userId)})
    // userModel.find({first_name: "Farah"})
    userModel.findById(userId)
        .then((data) =>{
            response.json({
                message: "User get successsfully",
                data: data,
                status: true,
            })
        }).catch((error) => {
            response.json({
                message: `Internal Error: ${error}`,
                status: false,
            })
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
        return;
    }
    
    const objToSend = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };

    userModel.create(objToSend)
    .then(data => {
        response.json({
            message: `User Created Successfully`,
            data: data,
            status: true
        })
    }).catch(error => {
        response.json({
            message: `Internal Error: ${error}`,
            status: false
        })
    }) 

})

// Update User
app.put("/api/user/:userId", (request, response) => {
    const { userId } = request.params;

    const { firstName, lastName, email, password } = request.body || {};
    
    if(!firstName && !lastName && !email && !password) {
        response.json({
            message: "Required field is missing",
            status: false,
        });
        return;
    }
    
    const objToSend = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };
    // console.log(userId, "put");
    
    // userModel.updateOne({_id: userId}, objToSend)
    userModel.findByIdAndUpdate({_id: userId}, objToSend, {new: true})
    .then(data => {
        response.json({
            message: `User Updated Successfully`,
            data: data,
            status: true
        })
    }).catch(error => {
        response.json({
            message: `Internal Error: ${error}`,
            status: false
        })
    }) 
})

//   Delete User
app.delete("/api/user/:userId", (request, response) => {
    const { userId } = request.params;
    
    userModel.findByIdAndDelete({_id: userId})
    .then(data => {
        response.json({
            message: `User Deleted Successfully`,
            data: data,
            status: true
        })
    }).catch(error => {
        response.json({
            message: `Internal Error: ${error}`,
            status: false
        })
    })

})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});