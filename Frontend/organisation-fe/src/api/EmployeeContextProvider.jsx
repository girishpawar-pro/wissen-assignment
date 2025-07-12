import {createContext, useCallback, useEffect, useState} from "react";
import { ignoreEmpObjKeys, organisationEndpoints } from "./Endpoints";
import { useContext } from "react";
import { ToastContext } from "./ToastContextProvider";

export const EmployeeContext = createContext({
    employees: [],
    tableHeader: [],
    refresh: ()=>{}
});

const EmployeeContextProvider = ({children}) => {
    const {popToast} = useContext(ToastContext);

    const [employee, setEmployee] = useState({
        allEmployees: [],
        tableHeader: [],
    });

    const getAllEmployees = useCallback(()=>{
        fetch(organisationEndpoints.getEmployees)
            .then((res) => {
                if(res.status != 500) {
                    return res.json();
                }
                throw Error("Error Occurred: " + res.statusText);
            })
            .then((data) => {
                const keys =  Object.keys(data[0]);
                const requiredColumns = keys.filter(key => !ignoreEmpObjKeys.includes(key));
                setEmployee({...employee, allEmployees: data, tableHeader: requiredColumns})
            })
            .catch((error) => {
                console.log("Error occurred while fetching All Employees: ", error);
                popToast({show:true, details: {severity: "error", heading: "Error", message: error.message}});
            });
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