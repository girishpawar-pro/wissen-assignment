import { createContext, useCallback, useEffect } from "react";
import { organisationEndpoints } from "./Endpoints";
import { useState } from "react";

export const DepartmentContext = createContext({
    departments:[],
    tableHeaders:[],
    refresh: ()=>{}
});

const DepartmentContextProvider = ({children}) => {
    const [departments, setDepartments] = useState({
        allDepartments: [],
        tableHeaders: [],
    });

    const getAllDepartments = useCallback(()=>{
        fetch(organisationEndpoints.getDepartments)
        .then(res => res.json())
        .then(data => setDepartments({...departments, allDepartments: data, tableHeaders: Object.keys(data[0])}))
        .catch(err => console.log(err))
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