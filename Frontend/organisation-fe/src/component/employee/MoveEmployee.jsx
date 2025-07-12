import { useContext, useEffect, useState } from 'react'
import { Button } from '../common/button/Button';
import { intiPatch, organisationEndpoints } from '../../api/Endpoints';
import { moveEmpPageFields } from '../../utility/helper';
import { EmployeeContext } from '../../api/EmployeeContextProvider';
import { DepartmentContext } from '../../api/DepartmentContextProvider';
import { ToastContext } from '../../api/ToastContextProvider';

const MoveEmployee = ({goTo, rowDetails}) => {
    const { employees } = useContext(EmployeeContext);
    const { departments, refresh } = useContext(DepartmentContext);
    const { popToast } = useContext(ToastContext);

    const [inputs, setInputs] = useState({});
    const [deptEmps, setDeptEmps] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(()=>{
        // const getDropDownData = () => {
        //     // data.filter(department => department?.deptId != rowDetails?.department?.deptId);
        // }
        // getDropDownData();
        let temp = {}
        moveEmpPageFields.map(field => {
            temp[field] = rowDetails[field]
            if(field == "department") {
                temp["department"] = rowDetails[field]["deptName"];
                temp["deptId"] = rowDetails[field]["deptId"];
            }
            if(field == "manager") {
                temp["manager"] = rowDetails[field]["fullName"];
                temp["managerEmpId"] = rowDetails[field]["empId"];
            }
        });
        setInputs(temp);
    },[]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        let patchInit = intiPatch;
        let pathParams = {...inputs};

        fetch(organisationEndpoints.moveEmployee(pathParams), patchInit)
        .then((res) => {
            if(res.status != 500) {
                return res.json();
            }
            throw Error("Error Occurred: " + res.statusText);
        })
        .then((data) => {
            console.log("Employee moved to new department Successfully.");
            popToast({show:true, details: {severity: "success", heading: "Success", message: "Employee moved to new department Successfully."}});
        })
        .catch((error) => {
            console.log("Error occurred while moving employee to another department: ", error);
            popToast({show:true, details: {severity: "error", heading: "Error", message: `Error occurred while moving employee to another department. ${error.message}`}});
        });
    }

    const handleOnChange = (e) => {
        const name = e.target.name;
        const val = e.target.value;
        setInputs(vals => ({...vals, [name]: val}));

        if(name == "newDepartment") {
            const deptEmps = employees.filter(employee => {
                let deptID = employee?.department?.deptId;
                if(deptID != null && deptID != undefined && deptID != "" && deptID == parseInt(val))  {
                    return true;
                } 
                return false;
            });
            setDeptEmps(deptEmps);
        }
        validateForm(name, val);
    }

    const handleBackBtnMoveEmp = (e) => {
        e.preventDefault();
        refresh();
        goTo("", {});
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

    return (
        <div className="df-col al-cnt bb">
            <h3>Move Employee To Other Department</h3>
            <form onSubmit={handleOnSubmit} className="df-col w-40 bb">
                <label className="df-row jc-sb mt-20">Employee Name
                    <input 
                        type="text" 
                        name="fullName" 
                        value={inputs.fullName || ""} 
                        className="inpt-box-d"
                        disabled
                    />
                </label >
                <label className="df-row jc-sb mt-20">Gender
                    <input 
                        type="text" 
                        name="gender" 
                        value={inputs.gender || ""} 
                        className="inpt-box-d"
                        disabled
                    />
                </label >
                <label className="df-row jc-sb mt-20">Designation
                    <input 
                        type="text" 
                        name="designation" 
                        value={inputs.designation || ""} 
                        className="inpt-box-d"
                        disabled
                    />
                </label >
                <label className="df-row jc-sb mt-20">Current Department
                    <input 
                        type="text" 
                        name="department" 
                        value={inputs.department || ""} 
                        className="inpt-box-d"
                        disabled
                    />
                </label >
                <label className="df-row jc-sb mt-20">Current Manager
                    <input 
                        type="text" 
                        name="manager" 
                        value={inputs.manager || ""} 
                        className="inpt-box-d"
                        disabled
                    />
                </label >
                <label className="df-row jc-sb mt-20">Select Department
                    <select name="newDepartment" select={inputs.newDepartment} onChange={handleOnChange} className='sel-opt' required>
                        <option name={""} value=""></option>
                        {departments != null && departments.map((department)=> (<option value={department.deptId}>{department.deptName}</option>))} 
                    </select>
                </label>
                <label className="df-row jc-sb mt-20">Select Manager
                    <select name="newManager" select={inputs.newManager} onChange={handleOnChange} className='sel-opt' required>
                        <option name={""} value=""></option>
                        {deptEmps != null && deptEmps.map((deptEmp)=> (<option value={deptEmp.empId}>{deptEmp.fullName}</option>))} 
                    </select>
                </label>
                <label className="df-row jc-sb mt-20 ">
                    <Button 
                        buttonLabel={'Back'} 
                        clickHandler={(e)=>handleBackBtnMoveEmp(e)}
                        inlineStyle={{height: '2rem', width: '10.5rem'}}
                        ></Button>
                    <Button 
                        buttonLabel={'Submit'} 
                        clickHandler={(e)=>handleOnSubmit(e)}
                        inlineStyle={{height: '2rem', width: '13.3rem'}}
                        isDisabled={isDisabled}
                        ></Button>
                </label>
            </form>
        </div>
    )
}

export default MoveEmployee;
