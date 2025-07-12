import { useContext, useState } from 'react'
import { Button } from '../common/button/Button';
import { intiPost, organisationEndpoints } from '../../api/Endpoints';
import { EmployeeContext } from '../../api/EmployeeContextProvider';
import { isEmpty } from '../../utility/helper';
import { ToastContext } from '../../api/ToastContextProvider';
import { DepartmentContext } from '../../api/DepartmentContextProvider';

export const AddDepartment = ({goTo}) => {
    const {employees} = useContext(EmployeeContext);
    const {refresh} = useContext(DepartmentContext);
    const {popToast} = useContext(ToastContext);
    
    const [inputs, setInputs] = useState({});
    const [isDisabled, setIsDisabled] = useState(true);
 
    const handleOnSubmit = (e) => {
        e.preventDefault();
        let postInti = intiPost;
        let payload = {...inputs};

        payload = {deptName: payload.deptName, hodEmp: {empId: parseInt(payload.hodEmp)}};
        postInti.body = JSON.stringify(payload);

        console.log("pre api call check: ", postInti);

        fetch(organisationEndpoints.addDepartment, postInti)
            .then((res) => {
                if(res.status != 500) {
                    return res.json();
                }
                throw Error("Error Occurred: " + res.statusText);
            })
            .then((data) => {
                console.log("Department Created Successfully: ", data);
                popToast({show:true, details: {severity: "success", heading: "Success", message: "Department record created successfully."}});
            })
            .catch((error) => {
                console.log("Error occurred while creating department: ", error);
                popToast({show:true, details: {severity: "error", heading: "Error", message: error.message}});
            });
    }

    const handleOnChange = (e) => {
        const name = e.target.name;
        const val = e.target.value;
        setInputs(vals => ({...vals, [name]: val}));
        validateForm(name, val);
    }

    const handleBackAddDept = (e) => {
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
        <h3>Add New Department</h3>
        <form onSubmit={handleOnSubmit} className="df-col w-40 bb">
            <label className="df-row jc-sb mt-20">Enter Department Name
                <input 
                    type="text" 
                    name="deptName" 
                    value={inputs.deptName || ""} 
                    onChange={handleOnChange}
                    className="inpt-box-d"
                />
            </label >
            <label className="df-row jc-sb mt-20">Select HOD
                <select name="hodEmp" select={inputs.department} onChange={handleOnChange} className='sel-opt'>
                    <option name="" value=""></option>
                    {employees && employees.map((employee)=> (<option name={employee.fullName} value={employee.empId}>{employee.fullName}</option>))}
                </select>
            </label>
            <label className="df-row jc-sb mt-20 ">
                <Button 
                    buttonLabel={'Back'} 
                    clickHandler={e => handleBackAddDept(e)}
                    inlineStyle={{height: '2rem', width: '10.5rem'}}
                ></Button>
                <Button 
                    buttonLabel={'Create'} 
                    inlineStyle={{height: '2rem', width: '13.3rem'}}
                    isDisabled={isDisabled}
                ></Button>
            </label>
        </form>
    </div>
  )
}
