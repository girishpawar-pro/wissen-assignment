import React from 'react'
import { Table } from '../common/table/Table'
import useFetch from '../../hooks/useFetch';
import { Button } from '../common/button/Button';
import { organisationEndpoints } from '../../api/Endpoints';

export const Department = ({goTo}) => {
    const res = useFetch(organisationEndpoints.getDepartments);
    
    let deptData = [];
    let theaders = [];

    if(res?.data != null){
        deptData = res?.data;
        theaders = Object.keys(deptData[0]);
    }

    const actionBtnHandler = (deptObj) => {
      goTo("changeHOD", deptObj);
    }

  return (
    <>
      <div className={"df-row jc-sb"}>
        <h3>All Departments</h3>
        <Button 
            clickHandler={(e)=>{e.preventDefault();goTo("addNewDept", {});}}
            buttonLabel={"Add Department"}
            inlineStyle={{padding: '5px'}}
            />
      </div>
      <Table theaders={theaders} 
        tbodyData={deptData} 
        actionButton={true} 
        actionHandler={actionBtnHandler}
        tableFor={"deptId"}
        actionName={"Change HOD"}/>
    </>
  )
}
