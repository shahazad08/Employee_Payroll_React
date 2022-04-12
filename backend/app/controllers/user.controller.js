const userService = require("../service/user.service");

class UserController {
  /**
   * @description Handles the request and response for creating a note
   * @param {Object} req
   * @param {Object} res
   */
        createNote = (req, res) => {
            let body=req.body
            userService.createNote(body,(err, data) => {
              if (err) {
              //  logger.error("Could not create Note", err);
              console.log("Could not create Note", err);
              return res.status(400).send({
                message: 'Note Ceration Failed'
              })
              }
              console.log("Note creation Successful", data);
              res.status(200).send({
                  message:"Successfull",
                  data
              })
           
            });
          };

           /**
   * @description Handles the request and response for finding all notes
   * @param {Object} req
   * @param {Object} res
   */
   findAll = (req, res) => {
     console.log("User Id", req.body._id);
    userService.findAll(req.body._id, (err, data) => {
      if (err) {
      //  logger.error("Could not find Note", err);
      console.log("Could not find User", err);
      return res.status(404).send({
        message:"User Not Find",
      })
      }
     // logger.info(data);
     console.log("All Notes", data);
     return res.status(200).send({
      message:"User gets success",
      data
    })
    });
  };
      }
      module.exports = new UserController();

