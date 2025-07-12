import React, { useContext } from 'react'
import { Table } from '../common/table/Table'
import useFetch from '../../hooks/useFetch';
import { Button } from '../common/button/Button';
import { organisationEndpoints } from '../../api/Endpoints';
import { DepartmentContext } from '../../api/DepartmentContextProvider';

export const Department = ({goTo}) => {  
  const {departments, tableHeaders} = useContext(DepartmentContext)

  const actionBtnHandler = (deptObj) => {
    goTo("changeHOD", deptObj);
  }

  const handleAddDepartment = () => {
    goTo("addNewDept", {});
  }

  return (
    <div className='department-details'>
      <div className={"df-row jc-sb aln-cnt"}>
        <h3>All Departments</h3>
        <Button 
            clickHandler={handleAddDepartment}
            buttonLabel={"Add Department"}
            inlineStyle={{padding: '5px'}}
            />
      </div>
      <Table theaders={tableHeaders} 
        tbodyData={departments} 
        actionButton={true} 
        actionHandler={actionBtnHandler}
        tableFor={"deptId"}
        actionName={"Change HOD"}/>
    </div>
  )
}
