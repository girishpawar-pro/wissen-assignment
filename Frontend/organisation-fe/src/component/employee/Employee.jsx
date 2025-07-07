import React, { useContext, useEffect, useState } from 'react'


import "./employee.css";
import { Table } from '../common/table/Table';
import { Button } from '../common/button/Button';
import { organisationEndpoints } from '../../api/Endpoints';

const Employee = ({goTo}) => {
    const [employees, setEmployees] = useState([]);
    const [tableHeader, setTableHeader] = useState([]);
  
    useEffect(()=>{
      const getTableData = async () =>{
          await fetch(organisationEndpoints.getEmployees)
              .then(res => res.json())
              .then((data) => {
                setEmployees(data)
                setTableHeader(Object.keys(data[0]));
              });
      }
      getTableData();
    }, []);

    const actionBtnHandler = (empObj) => {
      goTo("moveEmp", empObj);
    }

  return (
    <>
        <div className={"df-row jc-sb"}>
            <h3>All Employees</h3>
            <Button 
                clickHandler={(e)=>{e.preventDefault();goTo("addNewEmp", {});}}
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
    </>
  )
}

export default Employee;