import {createContext, useCallback, useEffect, useState} from "react";
import { organisationEndpoints } from "./Endpoints";

export const EmployeeContext = createContext({
    employees: [],
    tableHeader: [],
    refresh: ()=>{}
});

const EmployeeContextProvider = ({children}) => {
    const [employee, setEmployee] = useState({
        allEmployees: [],
        tableHeader: [],
    });

    const getAllEmployees = useCallback(()=>{
        fetch(organisationEndpoints.getEmployees)
            .then(res => res.json())
            .then((data) => {
                setEmployee({...employee, allEmployees: data, tableHeader: Object.keys(data[0])})
            })
            .catch(error => console.log(error));
    });

    useEffect(()=>{
        getAllEmployees();
    }, [])

    const handleRefresh = () => {
        getAllEmployees();
    }
    
    const empCtxValue = {
        employees: employee.allEmployees,
        tableHeader: employee.tableHeader,
        refresh: handleRefresh
    }
    
    return <EmployeeContext.Provider value={empCtxValue}>
        {children}
    </EmployeeContext.Provider>
}

export default EmployeeContextProvider;