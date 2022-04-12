
const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
      id: { type: mongoose.Schema.Types.ObjectId},
      username: {
        type:String,
        required:true
    },
    gender: {
        type:String,
        required:true
    },
    department: {
        type:[String],
        required:true
    },
    salary: {
        type:String,
    },
    day:{
      type:String
    },
    month:{
      type:String
    },
    year:{
      type:String
    },
    image: String,
  },
  {
    timestamps: true,
  }
);
const myUser = mongoose.model("User", userSchema);


class UserModel {
    /**
     * @description creates a note and saves it in database
     * @param {string} title
     * @param {string} content
     * @param {callback} callback
     * @returns err or data
     */
    createNote = (username, gender, department,salary, day,month,year, callback) => {
       
      const user = new myUser({
        username: username,
        gender: gender,
        department: department,
        salary: salary,
        day:day,
        month:month,
        year:year,
        image:"",
      });
      return user.save((err, data) => {
          console.log("Data", data);
        return err ? callback(err, null) : callback(null, data);
      });
    };
    
       /**
   * @description finds all notes present in data base
   * @param {callback} callback
   * @returns err or data
   */
        findAll = (id, callback) => {
          return myUser
            .find({ id: id })
            .populate({
              path: "_id",
              select: ["name", "gender"],
            })
            .exec((error, data) => {
              return error ? callback(error, null) : callback(null, data);
            });
        };
  
}
module.exports = new UserModel();