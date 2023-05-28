const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const userModel = require("./models/user");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "secret_key";


app.use(cors()); // Allow cross origin
app.use(express.json()); // here .use() is a Middleware and express.json() is a Body-Parser

const DBURI = 'YOUR CONNECTION STRING HERE';
  
mongoose
  .connect(DBURI)
  .then((res) => console.log("mongodb connected"))
  .catch((err) => console.log("DB Error:", err));

// SignUp API
app.post("/api/signup", (request, response) => {
  // console.log(request.body, "request.body");
  let { userName, email, contact, password, confirmPassword } = request.body || {};

  if (!userName || !email || !contact || !password || !confirmPassword) {
    response.json({
      message: "Required fields are missing",
      status: false,
    });
    return;
  }

  //  // let hashPassword = bcrypt.hashSync(password, 10);  // .hashSync() method is not recommended
  let hashPassword = bcrypt.hash(password, 10);
  let hashConfirmPassword = bcrypt.hash(confirmPassword, 10);
  
  hashPassword
  .then((hashPass) => {
    // console.log(hashPass, "hashPass")
    hashConfirmPassword
    .then((hashConfirmPass) => {
      // console.log(hashConfirmPass, "hashConfirmPass")
      const objToSend = {
        user_name: userName,
        email: email,
        contact: contact,
        password: hashPass,
        confirm_password: hashConfirmPass,
      };
      // console.log(objToSend, "objToSend");

      userModel.findOne({ email: email })
      .then((user) => {
        // console.log(user, "user");
        if (user) {
          response.json({
            message: "Email address already exists",
            status: false,
          });
        } else {
          userModel.create(objToSend)
          .then(user => {
            response.json({
              message: "User signed up successfully",
              status: true,
              user,
            });
          })
          .catch(() => {  // User create Error
            response.json({
              message: "Internal Server Error",
              status: false,
            });
          })
        }
      })
      .catch(() => {  // Find One Error
        response.json({
          message: "Internal Server Error",
          status: false,
        });
      })
    }).catch(() => { // Confirm Password Error
      response.json({
        message: "Internal Server Error",
        status: false,
      });
    })
  }).catch(() => { // Password Error
    response.json({
      message: "Internal Server Error",
      status: false,
    });  
  })
});

// Login API
app.post("/api/login", (request, response) => {
  // console.log("request.body", request.body);
  const { email, password } = request.body || {};
  if (!email || !password) {
    response.json({
      message: "Required fields are missing",
      status: false,
    });
    return;
  }

  userModel.findOne({ email: email })
  .then((user) => {
    if (!user) {
      response.json({
        message: "Credential Error",
        status: false,
      });
      return;
    } else {
      async function comparePassword(password) {
        
        const result = await bcrypt.compare(password, user.password);
        // console.log(result, "result"); // true
      
        if (result) {
          response.json({
            message: "User Logged in Successfully",
            status: true,
            user,
          });
        } else {
          response.json({
            message: "Credential Error",
            status: false,
          });
        }
      }
      comparePassword(password)
    }
  })
  .catch(() => {
    response.json({
      message: "Internal Error",
      status: false,
    });
  })
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});