import axios from "axios";


class EmployeePayrollService{
    //baseURL=`http://localhost:8080/employeedetails`;
    baseURL=`http://localhost:3000/employee`;

    // addEmployee = (data) => {
    //     console.log(data)
    //     return axios.post(this.baseURL + '/create',data);
    // }

    addEmployeeFromJSON = (data) => {
        console.log(data)
        return axios.post(this.baseURL ,data);
    }

    delete = (data) => {
        //return axios.delete(this.baseURL + 'delete/',data)
        axios.delete(`${this.baseURL}/delete/${data}`);
    }

    getAllEmployee = () => {
        return axios.get(this.baseURL + "/get/");
    }
    getAllEmployeeFromJsonServer = () => {
        return axios.get(this.baseURL);
    }
    getEmployeeById = (empId) => {
        return axios.get(this.baseURL+`/get/${empId}`)
    }

    updateEmployee= (empId,data) => {
        console.log(empId);
        return axios.put(this.baseURL+`/update/${empId}`,data);
    }
}

export default new EmployeePayrollService();