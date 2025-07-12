import { createContext, useContext, useEffect, useState } from "react";
import { organisationEndpoints } from "./Endpoints";

export const StaticDataContext = createContext();

const StaticDataContextProvider = ({children}) =>{

    const[staticData, setStaticData] = useState({
        genders: [],
        designations: []
    })

    useEffect(()=>{
        fetch(organisationEndpoints.getGenders)
        .then(res => res.json())
        .then((data) => {
            const allGenders = data;
            fetch(organisationEndpoints.getDesignations)
            .then(res => res.json())
            .then((data) => {
                setStaticData({...staticData, genders: allGenders, designations: data});
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
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