import React from "react";
import './Dashboard.css';
import mainImage from '../dashboard/assets/images/logo.png';
import {Link} from 'react-router-dom';
import delete1 from './assets/icons/delete-black-18dp.svg';
import edit from './assets/icons/create-black-18dp.svg';
import EmployeePayrollService from '../../service/employees';
import profile1 from "../dashboard/assets/profile-images/Ellipse -1.png"
import profile2 from "../dashboard/assets/profile-images/Ellipse -2.png"
import profile3 from "../dashboard/assets/profile-images/Ellipse -3.png"
import profile4 from '../dashboard/assets/profile-images/Ellipse -4.png'
import { withRouter } from "react-router-dom";

class Dashboard extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            employees:[],
        }
    }


    employees = [];

    // For Rest API
    // componentDidMount=()=>{
    //     EmployeePayrollService.getAllEmployee().then(response =>{
    //         const employee = response.data;
    //         this.setState({employees :employee });
    //     })
    // }

    // For JSON Server
    componentDidMount=()=>{
      EmployeePayrollService.getAllEmployeeFromJsonServer().then(response =>{
          const employee = response.data;
          this.setState({employees :employee });
      })
  }


    deleteEmployee=(id)=> {
        const value = parseInt(id);
        console.log("Delete", value);
        EmployeePayrollService.delete(value);
        window.location.assign(`http://localhost:3000/`);
    }


    updateEmployee = (employeeId) => {
        console.log(employeeId)
        //this.props.history.push("/form/:employeeId",{ employeeId});
        this.props.history.push({
            pathname: "/form/",
            state: employeeId,
          });
        //console.log(`${employeeId}`)
   };

    render(){
        return(
            <>
                <header className="header-content-header">
                <div className="logo-content">
                <Link  to='/form'><img  className='image' src={mainImage}/></Link>
                <div>
                    <span className="emp-text">EMPLOYEE</span><br></br>
                    <span className="emp-text emp-payroll">PAYROLL</span>
                    </div>
                </div>
                </header>
                <div className='main-content'>
                    <div className="header-content">
                        <div className="emp-detail-text">Employee Details <div className="emp-count">{this.state.employees.length}</div>
                    </div>
                    <Link  to='/form'><button className="add-button"><img src={require("./assets/icons/add-24px.svg")}alt=""/>Add User</button></Link>
                </div>
                    <div className="table-main">
                        <table id="table-display" className="table">
                            <thead>
                            <tr>
                                <th>Profile image</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Department</th>
                                <th>Salary</th>
                                <th>Start Date</th>
                                <th>Actions</th>
                            </tr>
                                {
                                    this.state.employees.map(
                                        employee =>
                                        <tr key={employee.empId}>
                                            <td><img className="profile"src={
                                                  employee.profile ==="../dashboard/assets/profile-images/Ellipse -1.png"? profile1 
                                                : employee.profile ==="../dashboard/assets/profile-images/Ellipse -2.png"? profile2
                                                : employee.profile ==="../dashboard/assets/profile-images/Ellipse -3.png"? profile3 
                                                : profile4
                                            }alt="profile"/>
                                            </td>
                                            <td>{employee.username}</td>
                                            <td>{employee.gender}</td>
                                            <td><div className="dept-label">{employee.departMent}</div></td>
                                            <td>{employee.salary}LPA</td>
                                            <td>{employee.day}/{employee.month}/{employee.year}</td>
                                            <td>
                                                <img name={employee.emp_id} src={delete1} alt="delete" onClick={() =>this.deleteEmployee(employee.empId)}/>
                                                <img name={employee.emp_id} src={edit} alt="edit" onClick={() =>this.updateEmployee(employee.empId) }/>
                                            </td>
                                        </tr>
                                    )
                                }
                            </thead>
                        </table>
                    </div>
                </div>
            </>
    );
    }
        
}
export default withRouter (Dashboard)
