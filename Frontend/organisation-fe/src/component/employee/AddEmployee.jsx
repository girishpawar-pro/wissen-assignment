import { useContext, useState } from 'react'
import { Button } from '../common/button/Button';
import { intiPost, organisationEndpoints } from '../../api/Endpoints';
import { EmployeeContext } from '../../api/EmployeeContextProvider';
import { DepartmentContext } from '../../api/DepartmentContextProvider';
import { StaticDataContext } from '../../api/StaticDataContextProvider';
import { ToastContext } from '../../api/ToastContextProvider';

export const AddEmployee = ({goTo}) => {
    const {employees, refresh} = useContext(EmployeeContext);
    const {departments} = useContext(DepartmentContext);
    const {designations, genders} = useContext(StaticDataContext);
    const {popToast} = useContext(ToastContext);
    
    const [inputs, setInputs] = useState({});
    const [assignedManagerList, setAssignedManagerList] = useState([]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        
        let postInti = intiPost;
        let payload = {...inputs};

        payload.department = {deptId: parseInt(payload.department), 
            deptName: departments.filter(department => department.deptId == parseInt(payload.department))[0].deptName};
        payload.manager = {empId: parseInt(payload.manager)};
        postInti.body = JSON.stringify(payload);

        console.log("pre api call check: ", postInti);

        fetch(organisationEndpoints.addEmployee, postInti)
            .then((res) => {
                if(res.status != 500) {
                    return res.json();
                }
                throw Error("Error Occurred: " + res.statusText);
            })
            .then((data) => {
                console.log("Employee Created Successfully: ", data);
                popToast({show:true, details: {severity: "success", heading: "Success", message: "Employee record created successfully."}});
            })
            .catch((error) => {
                console.log("Error occurred while creating Employee: ", error);
                popToast({show:true, details: {severity: "error", heading: "Error", message: error.message}});
            });
    }

    const handleOnChange = (e) => {
        const name = e.target.name;
        const val = e.target.value;
        setInputs(vals => ({...vals, [name]: val}));

        if(name == "department") {
            let managers = employees.filter(emp => {
                let deptID = emp?.department?.deptId;
                if(deptID != null && deptID != undefined && deptID != "" && deptID == parseInt(val))  {
                    return true;
                } 
                return false;
            });
            setAssignedManagerList(managers);
        }
    }

    const handleBackAddEmp = (e) => {
        e.preventDefault();
        refresh();
        goTo("", {});
    }

  return (
    <div className="df-col al-cnt bb">
        <h3>Add New Employee</h3>
        <form onSubmit={handleOnSubmit} className="df-col w-20 bb">
            <label className="df-row jc-sb mt-20">First Name
                <input 
                    type="text" 
                    name="firstName" 
                    value={inputs.firstName || ""} 
                    onChange={handleOnChange}
                    className="inpt-box"
                    required
                />
            </label >
            <label className="df-row jc-sb mt-20">Middle Name
                <input 
                    type="text" 
                    name="middleName" 
                    value={inputs.middleName || ""} 
                    onChange={handleOnChange}
                    className="inpt-box"
                />

            </label>
            <label className="df-row jc-sb mt-20">Last Name
                <input 
                    type="text" 
                    name="lastName" 
                    value={inputs.lastName || ""} 
                    onChange={handleOnChange}
                    className="inpt-box"
                    required
                />
            </label>
            <label className="df-row jc-sb mt-20">Gender
                <select name="gender" select={inputs.gender} onChange={handleOnChange} className='sel-opt' required>
                    <option value=""></option>
                    {genders != null && genders.map((gender)=> (<option value={gender}>{gender}</option>))} 
                </select>
            </label>
            <label className="df-row jc-sb mt-20">Date Of Birth
                <input 
                    type="date" 
                    name="dob" 
                    value={inputs.dob || ""} 
                    onChange={handleOnChange}
                    className="inpt-date"
                    required
                />
            </label>
            <label className="df-row jc-sb mt-20">Designation
                <select name="designation" select={inputs.designation} onChange={handleOnChange} className='sel-opt' required>
                    <option value=""></option>
                    {designations != null && designations.map((designation)=> (<option value={designation}>{designation}</option>))} 
                </select>
            </label>
            <label className="df-row jc-sb mt-20">Department
                <select name="department" select={inputs.department} onChange={handleOnChange} className='sel-opt' required>
                    <option name={""} value=""></option>
                    {departments != null && departments.map((department)=> (<option name={department.deptName} value={department.deptId}>{department.deptName}</option>))} 
                </select>
            </label>
            <label className="df-row jc-sb mt-20">Manager
                <select name="manager" select={inputs.department} onChange={handleOnChange} className='sel-opt' required>
                    <option value=""></option>
                    {assignedManagerList && assignedManagerList.map((emp)=> (<option name={emp.fullName} value={emp.empId}>{emp.fullName}</option>))}
                </select>
            </label>
            <label className="df-row jc-sb mt-20 ">
                <Button 
                    buttonLabel={'Back'} 
                    clickHandler={(e)=>handleBackAddEmp(e)}
                    inlineStyle={{height: '2rem', width: '6.5rem'}}
                ></Button>
                <Button 
                    buttonLabel={'Submit'} 
                    inlineStyle={{height: '2rem', width: '8.9rem'}}
                    ></Button>
            </label>
        </form>

    </div>
  )
}
