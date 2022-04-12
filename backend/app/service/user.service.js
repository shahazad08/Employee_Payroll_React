
const userModel = require("../models/user.model");

class UserService {
  /**
   * @description Service layer function to create a note
   * @param {Object} body
   * @param {callback} callback
   * @returns err or data
   */
  createNote = (body, callback) => {
    userModel.createNote(body.username, body.gender,body.department, body.salary,body.day,body.month, body.year,(err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

    /**
   * @description Service layer function to find all note
   * @param {callback} callback
   * @returns err or data
   */
     findAll = (id,callback) => {
      userModel.findAll(id,(err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    };
}
module.exports = new UserService();

