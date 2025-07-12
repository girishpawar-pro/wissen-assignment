import { useContext, useEffect, useState } from 'react'

import "./employee.css";
import { Table } from '../common/table/Table';
import { Button } from '../common/button/Button';
import { organisationEndpoints } from '../../api/Endpoints';
import { ToastContext } from '../../api/ToastContextProvider';
import { EmployeeContext } from '../../api/EmployeeContextProvider';

const Employee = ({goTo}) => {
    const {employees, tableHeader} = useContext(EmployeeContext)
  
    const actionBtnHandler = (empObj) => {
      goTo("moveEmp", empObj);
    }

    const handleAddEmployee = () => {
      // popToast({show:true, details: {heading: "Success", severity: "success", message: "Testing toast!"}})
      goTo("addNewEmp", {});
    }

  return (
    <div className='employee-details'>
        <div className={"df-row jc-sb aln-cnt"}>
            <h3>All Employees</h3>
            <Button 
                clickHandler={handleAddEmployee}
                buttonLabel={"Add Employee"}
                inlineStyle={{padding: '5px'}}
                />
        </div>
        <Table 
          theaders={tableHeader} 
          tbodyData={employees} 
          actionButton={true} 
          actionHandler={actionBtnHandler}
          actionName={"Move Employee"}
          tableFor={"empId"}/>
    </div>
  )
}

export default Employee;