import React, {useEffect, useState } from 'react';
import Employee from './employee/Employee';
import { Department } from './department/Department';
import { AddEmployee } from './employee/AddEmployee';
import { AddDepartment } from './department/AddDepartment';
import MoveEmployee from './employee/MoveEmployee';
import { ChangeHOD } from './department/ChangeHOD';
import Toast from './common/notification/Toast';
import ToastContextProvider from '../api/ToastContextProvider';
import StaticDataContextProvider from '../api/StaticDataContextProvider';
import DepartmentContextProvider from '../api/DepartmentContextProvider';
import EmployeeContextProvider from '../api/EmployeeContextProvider';

export const Home = () => {
  const [showPage, setShowPage] = useState("");
  const [detailsToCarry, setDetailsToCarry] = useState({});
  const [toast, setToast] = useState(false);
  const [toastDetails, setToastDetails] = useState({});
  
  const moveTo = (goTo, details, msg) => {
    setDetailsToCarry(details);
    setShowPage(goTo);
    if(msg != undefined) {
      setToast(true);
      setToastDetails({...msg});
      // Object.keys(message).length > 0 ? setToast(true) : setToast(false);
    }

    setTimeout(()=>{
      setToast(false);
    },15000)
    
  }

  const getContent = () => {
    switch (showPage) {
      case "addNewEmp":
        return <AddEmployee goTo={moveTo}/>
      case "addNewDept":
        return <AddDepartment goTo={moveTo}/>
      case "moveEmp":
        return <MoveEmployee goTo={moveTo} rowDetails={detailsToCarry}/>
      case "changeHOD":
        return <ChangeHOD goTo={moveTo} rowDetails={detailsToCarry}/>
      default:
        return <>
          <Employee goTo={moveTo} />
            <hr className='mt-20'></hr>
          <Department goTo={moveTo}/>
        </>
    }}

  return (
    <div className='main-container'>
        <h1>Oragniasation</h1>
        <hr className='mt-20'></hr>
        <ToastContextProvider>
          <StaticDataContextProvider>
            <DepartmentContextProvider>
              <EmployeeContextProvider>
                  {getContent()}
                  <Toast/>
                </EmployeeContextProvider>
              </DepartmentContextProvider>
            </StaticDataContextProvider>
        </ToastContextProvider>
    </div>
  )
}
