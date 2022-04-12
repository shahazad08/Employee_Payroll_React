import axios from "axios";


class EmployeePayrollService{
    //baseURL=`http://localhost:8080/employeedetails`;
   // baseURL=`http://localhost:3000/employee`;
    baseURL=`http://localhost:5000/users`;
   

    // addEmployeeFromJSON = (data) => {
    //     console.log(data)
    //     return axios.post(this.baseURL ,data);
    // }
    addEmployee = (data) => {
        console.log(data)
        return axios.post(this.baseURL ,data);
    }

    delete = (data) => {
        axios.delete(`${this.baseURL}/delete/${data}`);
    }

    
    deleteFromJson = (data) => {
        console.log("Data to be delete", data);
        return axios.delete(`${this.baseURL}/${data}`);
    }
    

    getAllEmployee = () => {
        return axios.get(this.baseURL + "/get/");
    }
  

    getEmployeeByIdFromJsonServer = (id) => {
            console.log("ID", id);
        return axios.get(`${this.baseURL}/${id}`)
    }
    
   

    updateEmployeeFromJSONServer= (id,data) => {
        console.log('asdasd', data);
        axios.put(`${this.baseURL}/${id}/`, data);
    
    }
}

export default new EmployeePayrollService();