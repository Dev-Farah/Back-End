const TodoModel = require('../models/todoSchema');

const TodoController = {
    createTodo: (request, response) => {

        const body = request.body;
        // console.log(body, "body");
      
        if (!body.todo) {
          response.json({
            message: "Please fill out the required field",
            status: false,
          });
          return;
        }
      
        const objToSend = {
          todo: body.todo,
        };
      
        TodoModel.create(objToSend)
          .then((data) => {
            response.json({
              message: "Successfully Created",
              status: true,
            });
          })
          .catch((err) => {
            response.json({
              message: "Internal Server Error",
              status: false,
            });
          });
    },
    getTodo: (request, response) => {

        TodoModel.find({})
            .then((data) => {
            response.json({
                message: "Get Successfully",
                status: true,
                data,
            });
            })
            .catch((err) => {
            response.json({
                message: "Internal Server Error",
                status: false,
            });
            });
    },
    updateTodo: (request, response) => {
        const body = request.body;
        console.log(body, "body");
        
        if (!body.todo) {
            response.json({
            message: "Please fill out the required field",
            status: false,
            });
            return;
        }
        
        const objToSend = {
            todo: body.todo,
        };
        
        TodoModel.findByIdAndUpdate(body.id, objToSend)
            .then((data) => {
            response.json({
                message: "Successfully Updated",
                status: true,
            });
            })
            .catch((err) => {
            response.json({
                message: "Internal Server Error",
                status: false,
            });
            });
    },
    deleteTodo: (request, response) => {
        const { id } = request.params;
        
        TodoModel.findByIdAndDelete(id)
        .then((data) => {
            response.json({
            message: "Successfully Deleted",
            status: true,
            });
        })
        .catch((err) => {
            response.json({
            message: "Internal Server Error",
            status: false,
            });
        });
        
    },
    deleteAll: (request, response) => {
        console.log(request.body);
        TodoModel.deleteMany({})
        .then((data) => {
            response.json({
            message: "Successfully Deleted All",
            status: true,
            });
        })
        .catch((err) => {
            response.json({
            message: "Internal Server Error",
            status: false,
            });
        });
    }
}


module.exports = TodoController;