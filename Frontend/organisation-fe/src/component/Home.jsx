import React, {useEffect, useState } from 'react';
import Employee from './employee/Employee';
import { Department } from './department/Department';
import { AddEmployee } from './employee/AddEmployee';
import { AddDepartment } from './department/AddDepartment';
import MoveEmployee from './employee/MoveEmployee';
import { ChangeHOD } from './department/ChangeHOD';
import Toast from './common/notification/Toast';

export const Home = () => {
  const [showPage, setShowPage] = useState("");
  const [detailsToCarry, setDetailsToCarry] = useState({});
  const [toast, setToast] = useState(false);
  const [toastDetails, setToastDetails] = useState({});
  
  const moveTo = (goTo, details, msg) => {
    setDetailsToCarry(details);
    setShowPage(goTo);
    debugger
    if(msg != undefined) {
      setToast(true);
      setToastDetails({...msg});
      // Object.keys(message).length > 0 ? setToast(true) : setToast(false);
    }

    setTimeout(()=>{
      setToast(false);
    },15000)
    
  }

  console.log(toastDetails);

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
    <div className='pw-full'>
        <h1>Oragniasation</h1>
        <hr className='mt-20'></hr>
        {getContent()}
        {toast && <Toast 
          heading={toastDetails.heading} 
          message={toastDetails.message.message} 
          severity={toastDetails.severity}/>}
    </div>
  )
}
