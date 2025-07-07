import React, { useEffect, useState } from 'react'
import { Button } from '../common/button/Button';
import { intiPatch, organisationEndpoints } from '../../api/Endpoints';
import { deptFields } from '../../utility/helper';

export const ChangeHOD = ({goTo, rowDetails}) => {
    const [inputs, setInputs] = useState({});
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);

    useEffect(()=>{
        const getDropDownData = async () =>{
                await fetch(organisationEndpoints.getDepartments)
                    .then(res => res.json())
                    .then(data => setDepartments(data.filter(department => department?.deptId != rowDetails?.department?.deptId)));
                        
                await fetch(organisationEndpoints.getEmployees)
                        .then(res => res.json())
                        .then(data => {
                            const empData = data.filter(employee => { 
                                if(employee.designation == "CEO"){
                                    return false;
                                }
                                debugger
                                if(rowDetails?.hodEmp?.empId == employee?.empId) {
                                    return false;
                                }
                                return true
                        })
                        setEmployees(empData);
                    });
            }
            getDropDownData();
            let temp = {};
            deptFields.forEach(field => {
                temp[field] = rowDetails[field]
                if(field == "hodEmp") {
                    temp[field] = rowDetails[field]["fullName"];
                    temp["hodEmpId"] = rowDetails[field]["empId"];
                }
            })
            setInputs(temp);
        },[])

    const handleOnSubmit = (e) => {
        e.preventDefault();
        let patchInti = intiPatch;
        let pathParams = {...inputs};

        console.log("pre api call check: ", patchInti);
        console.log("pre api call check: ", pathParams);

        fetch(organisationEndpoints.changeHOD(pathParams), patchInti)
            .then(res => res.json())
            .then(data => {console.log("HOD Changed Successfully: ", data); 
                // goTo("",{});
            });
    }

    const handleOnChange = (e) => {
        const name = e.target.name;
        let val = e.target.value;
        setInputs(vals => ({...vals, [name]: val}));
    }
  return (
    <div className="df-col al-cnt bb">
        <h3>Change Department Head</h3>
        <form onSubmit={handleOnSubmit} className="df-col w-40 bb">
            <label className="df-row jc-sb mt-20">Department Name
                <input 
                    type="text" 
                    name="deptName" 
                    value={inputs.deptName || ""} 
                    onChange={handleOnChange}
                    className="inpt-box-d"
                    disabled
                />
            </label >
            <label className="df-row jc-sb mt-20">Current HOD
                <input 
                    type="text" 
                    name="hodEmp" 
                    value={inputs.hodEmp || ""} 
                    onChange={handleOnChange}
                    className="inpt-box-d"
                    disabled
                />
            </label >
            <label className="df-row jc-sb mt-20">Select HOD
                <select name="newHodEmp" select={inputs.newHodEmp} onChange={handleOnChange} className='sel-opt'>
                    <option name="" value=""></option>
                    {employees && employees.map((employee)=> (<option value={employee.empId}>{employee.fullName}</option>))}
                </select>
            </label>
            <label className="df-row jc-sb mt-20 ">
                <Button 
                    buttonLabel={'Back'} 
                    clickHandler={(e)=>{e.preventDefault();goTo("", {});}}
                    inlineStyle={{height: '2rem', width: '10.5rem'}}
                    ></Button>
                <Button 
                    buttonLabel={'Create'} 
                    clickHandler={(e)=>handleOnSubmit(e)}
                    inlineStyle={{height: '2rem', width: '14rem'}}
                    ></Button>
            </label>
        </form>

    </div>
  )
}
