import { createContext, useContext, useEffect, useState } from "react";
import { organisationEndpoints } from "./Endpoints";
import { ToastContext } from "./ToastContextProvider";

export const StaticDataContext = createContext();

const StaticDataContextProvider = ({children}) =>{
    const {popToast} = useContext(ToastContext);
    const[staticData, setStaticData] = useState({
        genders: [],
        designations: []
    })

    useEffect(()=>{
        fetch(organisationEndpoints.getGenders)
        .then((res) => {
            if(res.status != 500) {
                return res.json();
            }
            throw Error("Error Occurred: " + res.statusText);
        })
        .then((data) => {
            const allGenders = data;
            fetch(organisationEndpoints.getDesignations)
            .then((res) => {
                if(res.status != 500) {
                    return res.json();
                }
                throw Error("Error Occurred: " + res.statusText);      
            })
            .then((data) => {
                setStaticData({...staticData, genders: allGenders, designations: data});
            })
            .catch((error) => {
                console.log(error);
                popToast({show:true, details: {severity: "error", heading: "Error", message: error.message}});
            });
        })
        .catch((error) => {
            console.log(error);
            popToast({show:true, details: {severity: "error", heading: "Error", message: error.message}});
        });
    },[]);

    const staticDataCtxValue = {
        genders: staticData.genders,
        designations: staticData.designations
    }
    
    return <StaticDataContext.Provider value={staticDataCtxValue}>
        {children}
    </StaticDataContext.Provider>
}

export default StaticDataContextProvider;