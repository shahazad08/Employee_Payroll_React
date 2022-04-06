import React from "react";
import './Payroll-form.css';
import mainImage from '../dashboard/assets/images/logo.png'
import profile1 from "../dashboard/assets/profile-images/Ellipse -1.png"
import profile2 from "../dashboard/assets/profile-images/Ellipse -2.png"
import profile3 from "../dashboard/assets/profile-images/Ellipse -3.png"
import profile4 from '../dashboard/assets/profile-images/Ellipse -4.png'
import { Link } from 'react-router-dom';
import { useState } from "react";
import EmployeePayrollService from '../../service/employees';
import { useParams } from 'react-router-dom';
//import EmployeeService from '../../service/employees';
import { useEffect } from "react";
import { Redirect } from 'react-router-dom';


const Payrollform =(props) =>{

    const allDepartment = ['HR', 'Sales', 'Finance', 'Engineer', 'Others'];

    const [userRegistration, setUserRegistration] = useState({
        username:'',
        profile:"",
        gender:"",
        department:"",
        salary:"",
        day:"",
        month:"",
        year:"",
        note:"",
        empId:'',
        isUpdate:''
    })


    const handleInput = (e) =>{
        const name = e.target.name;
        const value = e.target.value
        setUserRegistration({...userRegistration, [name]: value})
      
    }
    

    const value = props.location.state;
    useEffect(() => {
        if (value) {
          getDataById(value);
        }
      }, 
    []);

    
    const getDataById = (id) => {
        EmployeePayrollService
          .getEmployeeById(id)
          .then((data) => {
        setUserRegistration({...userRegistration,...data,username:data.data.username, profile:data.data.profile, gender:data.data.gender, department:data.data.department,salary:data.data.salary, day:data.data.day, month:data.data.month, year:data.data.year, note:data.data.note,isUpdate:true})
        })
         
    }
    
    const save = async (event) => {
        event.preventDefault();
        
        let object = {
            username: userRegistration.username,
            department: userRegistration.department,
            gender: userRegistration.gender,
            salary: userRegistration.salary,
            day:userRegistration.day,
            month:userRegistration.month,
            year:userRegistration.year,
            note: userRegistration.note,
            profile: userRegistration.profile,
            empId:parseInt(userRegistration.empId)
          };
          
        if (userRegistration.isUpdate) {
            EmployeePayrollService.updateEmployee(value,object);
          } 
        else {
            EmployeePayrollService.addEmployee(object)
        }  
        window.location.assign(`http://localhost:3000/`);
    }
  

    const onCheckChange = (name) => {
        let index = userRegistration.department.indexOf(name);

        let checkArray = [...userRegistration.department]
        if (index > -1)
            checkArray.splice(index, 1)
        else
            checkArray.push(name);
        setUserRegistration({ ...userRegistration, department: checkArray });
    }

    const getChecked = (name) => {
        return userRegistration.department && userRegistration.department.includes(name);
    }
    const reset =(e)=>{
        e.preventDefault();
        setUserRegistration({username:"", profile:"", gender:"", department:"",salary:"", day:"", month:"", year:"", note:""})
    }

        return(
            <>
                <header className="header-content-header">
                <div className="logo-content">
                <Link to="/"><img className='image' src={mainImage} /></Link>
                <div>
                    <span className="emp-text">EMPLOYEE</span><br></br>
                    <span className="emp-text emp-payroll">PAYROLL</span>
                    </div>
                </div>
                </header>
                <div className='payroll-main'>
                    <form action="#"  onSubmit={save} onReset={reset}>
                        <div className='form-head'>Employee Payroll Form</div><br></br>
                        <div className='row'>
                            <label className='label-text' htmlFor='username' >Name</label>
                            <input className='input' type="text" id='username' value={userRegistration.username}  onChange={handleInput} name='username' placeholder='Your name..'/>
                        </div><br></br>
                        <div className='profile-radio-button'>
                            <label className='label-text' htmlFor='profile'>Profile image</label>
                            <label className='profile'>
                                <input type="radio" id='profile1' value="../dashboard/assets/profile-images/Ellipse -1.png" checked={userRegistration.profile === "../dashboard/assets/profile-images/Ellipse -1.png"} onChange={handleInput} name='profile' required/>
                                <img className='pic' id='image1' src={profile1}></img>
                            </label>
                            <label className='profile'>
                            <input type="radio" id='profile2' value= "../dashboard/assets/profile-images/Ellipse -2.png" checked={userRegistration.profile === "../dashboard/assets/profile-images/Ellipse -2.png"} onChange={handleInput} name='profile' required/>
                                <img className='pic' id='image2' src={profile2}></img>
                            </label>
                            <label className='profile'>
                                <input type="radio" id='profile3' value="../dashboard/assets/profile-images/Ellipse -3.png" checked={userRegistration.profile === "../dashboard/assets/profile-images/Ellipse -3.png"} onChange={handleInput} name='profile' required/>
                                <img className='pic' id='image3' src={profile3}></img>
                            </label>
                            <label className='profile'>
                                <input type="radio" id='profile4' value="../dashboard/assets/profile-images/Ellipse -4.png" checked={userRegistration.profile === "../dashboard/assets/profile-images/Ellipse -4.png"} onChange={handleInput} name='profile'  required/>
                                <img className='pic' id='image4' src={profile4}></img>
                            </label>
                        </div><br></br>
                        <div className="row-content">
                                <label className="label-text" htmlFor="gender">Gender</label>
                                <input className="radio-button" type="radio" id="gender" value ="male" checked={userRegistration.gender === 'male'} onChange={handleInput} name="gender"/>
                                <label className="text" htmlFor="male">Male</label>
                                <input className="radio-butt" type="radio" id="female" value ="female" checked={userRegistration.gender === 'femmale'} onChange={handleInput} name="gender"/>
                                <label className="text" htmlFor="female" value={userRegistration.gender}>Female</label>
                        </div><br></br>
                        <div className='row-content'>
                        <label className="label-text" htmlFor="department">Department</label>
                        <>
                            {allDepartment.map(item => (
                                <span key={item}>
                                    <input className="checkbox" type="checkbox" onChange={() => onCheckChange(item)} name={item} checked={getChecked(item)} value={item} />
                                    <label className="text" htmlFor={item}>{item}</label>
                                </span>
                            ))}
                            </>
                        </div><br></br>
                        <div className='row-content'>
                            <label className='label-text' htmlFor='salary'>Salary</label>
                            <select className='salary' id='salary' value={userRegistration.salary} onChange={handleInput} name='salary'>
                                <option>Salary (lpa)</option>
                                <option value="1.2 - 2.0">1.2 - 2.0</option>
                                <option value="3.0 - 4.0">3.0 - 4.0</option>
                                <option value="4.0 - 8.0">4.0 - 8.0</option>
                                <option value="10 - 15">10 - 15</option>
                                <option value="Above 15">Above 15</option>
                            </select>
                        </div><br></br>
                        <div className='row-content'>
                            <label className='label-text' htmlFor='date'>Start Date</label>
                            <select className="date" id='day' value={userRegistration.day} onChange={handleInput} name='day'>
                                <option>Day</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                            <select className="format" id='month' value={userRegistration.month} onChange={handleInput} name='month'>
                                <option>Month</option>
                                <option value="1">Jan</option>
                                <option value="2">Feb</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">Sep</option>
                                <option value="10">Oct</option>
                                <option value="11">Nov</option>
                                <option value="12">Dec</option>
                            </select>
                            <select className="format" id='year' value={userRegistration.year} onChange={handleInput} name='year'>
                                <option>Year</option>
                                <option value="2016">2016</option>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                            </select>
                        </div><br></br>
                        <div className="row-content">
                            <div className="notes1">
                                <label className="label-text" id="note" htmlFor="note">Notes</label>
                                <textarea className="area" id="note" value={userRegistration.note} onChange={handleInput} name="note" placeholder="" ></textarea>
                            </div>
                        </div><br></br>
                        <div className="buttonParent">
                            <div className="submit-reset">
                            <label className="label-text" htmlFor="button"></label>
                                <Link  to='/'><button className="cancleButton">Cancel</button></Link>
                                <button type="submit" className="button submitButton" id="submitButton">{userRegistration.isUpdate ? 'Update' : 'Submit'}</button>
                                <button type="reset" className="button resetButton">Reset</button>
                            </div>
                        </div><br></br>
                    </form>
                </div>
            </>
        );
}

export default Payrollform
