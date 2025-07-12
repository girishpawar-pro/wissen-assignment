import { createContext, useCallback, useContext, useEffect } from "react";
import { organisationEndpoints } from "./Endpoints";
import { useState } from "react";
import { ToastContext } from "./ToastContextProvider";

export const DepartmentContext = createContext({
    departments:[],
    tableHeaders:[],
    refresh: ()=>{}
});

const DepartmentContextProvider = ({children}) => {
    const {popToast} = useContext(ToastContext);
    const [departments, setDepartments] = useState({
        allDepartments: [],
        tableHeaders: [],
    });

    const getAllDepartments = useCallback(()=>{
        fetch(organisationEndpoints.getDepartments)
        .then((res) => {
            if(res.status != 500){
                return res.json();
            }
            throw Error("Error Occurred: " + res.statusText);       
        })
        .then((data) => {
            setDepartments({...departments, allDepartments: data, tableHeaders: Object.keys(data[0])})
        })
        .catch((error) => {
            console.log(error);
            popToast({show:true, details: {severity: "error", heading: "Error", message: error.message}});
        });
    })

    useEffect(()=>{
        getAllDepartments();
    },[]);

    const handleDeptRefresh = () => {
        getAllDepartments();
    } 

    const deptCtxValue = {
        departments: departments.allDepartments,
        tableHeaders: departments.tableHeaders,
        refresh: handleDeptRefresh
    }

    return<DepartmentContext.Provider value={deptCtxValue}>
        {children}
    </DepartmentContext.Provider>
}

export default DepartmentContextProvider;