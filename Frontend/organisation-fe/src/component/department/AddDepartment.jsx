import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../common/button/Button';
import { intiPost, organisationEndpoints } from '../../api/Endpoints';

export const AddDepartment = ({goTo}) => {
    const [inputs, setInputs] = useState({});
    const [employees, setEmployees] = useState([])

    useEffect(()=>{
        const getDropDownData = async () =>{
                fetch(organisationEndpoints.getEmployees)
                    .then(res => res.json())
                    .then(data => setEmployees(data.filter(employee => employee.designation != "CEO")))
            }
            getDropDownData();
    },[])
 
    const handleOnSubmit = (e) => {
            e.preventDefault();
            let postInti = intiPost;
            let payload = {...inputs};
    
            payload = {deptName: payload.deptName, hodEmp: {empId: parseInt(payload.hodEmp)}};
            postInti.body = JSON.stringify(payload);

            console.log("pre api call check: ", postInti);
    
            fetch(organisationEndpoints.addDepartment, postInti)
                .then((res) => {
                    if(res.status == 500) {
                        throw new Error("Some Error Occurred")
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log("Department Created Successfully: ", data);
                    // goTo("", {});
                    })
                .catch((err) => {
                    console.log("Some error occurred1211.", err);
                    debugger
                    goTo("",{}, {"heading": "Error while Adding Deparment", "message": err, "severity": "error"});
                });
        }
    
        const handleOnChange = (e) => {
            const name = e.target.name;
            const val = e.target.value;
            setInputs(vals => ({...vals, [name]: val}));
        }

  return (
    <div className="df-col al-cnt bb">
        <h3>Add New Department</h3>
        <form onSubmit={handleOnSubmit} className="df-col w-40 bb">
            <label className="df-row jc-sb mt-20">Enter Department Name<span className="col-red">*</span>&nbsp;&nbsp;
                <input 
                    type="text" 
                    name="deptName" 
                    value={inputs.deptName || ""} 
                    onChange={handleOnChange}
                    className="inpt-box-d"
                />
            </label >
            <label className="df-row jc-sb mt-20">Select Head Of Department<span className="col-red">*</span>&nbsp;
                <select name="hodEmp" select={inputs.department} onChange={handleOnChange} className='sel-opt'>
                    <option name="" value=""></option>
                    {employees && employees.map((employee)=> (<option name={employee.fullName} value={employee.empId}>{employee.fullName}</option>))}
                </select>
            </label>
            <label className="df-row jc-sb mt-20 ">
                <Button 
                    buttonLabel={'Back'} 
                    clickHandler={(e)=>{e.preventDefault();goTo("");}}
                    inlineStyle={{height: '2rem', width: '10.5rem'}}
                    ></Button>
                <Button 
                    buttonLabel={'Create'} 
                    inlineStyle={{height: '2rem', width: '14rem'}}
                    ></Button>
            </label>
        </form>

    </div>
  )
}
