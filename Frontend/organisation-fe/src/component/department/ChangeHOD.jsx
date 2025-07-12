import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../common/button/Button';
import { intiPatch, organisationEndpoints } from '../../api/Endpoints';
import { deptFields } from '../../utility/helper';
import { DepartmentContext } from '../../api/DepartmentContextProvider';
import { EmployeeContext } from '../../api/EmployeeContextProvider';
import { ToastContext } from '../../api/ToastContextProvider';

export const ChangeHOD = ({goTo, rowDetails}) => {
    const {refresh} = useContext(DepartmentContext);
    const {employees} = useContext(EmployeeContext);
    const {popToast} = useContext(ToastContext);

    const [inputs, setInputs] = useState({});
    const [employeeDropDown, setEmployeeDropDown] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(()=>{
        const getDropDownData = () => {  
            const empData = employees.filter(employee => { 
                if(employee.designation == "CEO"){
                    return false;
                }
                if(rowDetails?.hodEmp?.empId == employee?.empId) {
                    return false;
                }
                return true
            })
            setEmployeeDropDown(empData);
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
        .then((res) => {
            if(res.status != 500) {
                return res.json();
            }
            throw Error("Error Occurred: " + res.statusText);
        })
        .then((data) => {
            console.log("HOD Changed Successfully: ", data);
            popToast({show:true, details: {severity: "success", heading: "Success", message: "HOD changed successfully."}});
        })
        .catch((error) => {
            console.log("Error occurred while changing HOD: ", error);
            popToast({show:true, details: {severity: "error", heading: "Error", message: error.message}});
        });
    }

    const validateForm = (currentFieldName, currentFieldValue) => {
        const formFields = {...inputs};
        const keys = Object.keys(formFields);
        let enableSubmitBtn = keys.every((key) => {
            if(key === currentFieldName) {
                return !isEmpty(currentFieldValue);
            } else {
                return !isEmpty(formFields[key]);
            }
        })
        if(enableSubmitBtn) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }

    const handleOnChange = (e) => {
        const name = e.target.name;
        let val = e.target.value;
        setInputs(vals => ({...vals, [name]: val}));
        validateForm(name, val);
    }

    const handleBackBtnChangeDeptHOD = (e) => {
        e.preventDefault();
        refresh();
        goTo("", {});
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
                    {employeeDropDown && employeeDropDown.map((employee)=> (<option value={employee.empId}>{employee.fullName}</option>))}
                </select>
            </label>
            <label className="df-row jc-sb mt-20 ">
                <Button 
                    buttonLabel={'Back'} 
                    clickHandler={(e)=>handleBackBtnChangeDeptHOD(e)}
                    inlineStyle={{height: '2rem', width: '10.5rem'}}
                    ></Button>
                <Button 
                    buttonLabel={'Create'} 
                    clickHandler={(e)=>handleOnSubmit(e)}
                    inlineStyle={{height: '2rem', width: '13.3rem'}}
                    isDisabled={isDisabled}
                    ></Button>
            </label>
        </form>
    </div>
  )
}
