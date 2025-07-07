import React, { useEffect } from 'react'
import { Button } from '../button/Button';
import { camelToSpaceSeparated } from '../../../utility/helper'
import "./table.css";

export const Table = ({theaders, tbodyData, tableFor, actionButton, actionHandler, actionName}) => {
    return (
        <>
            <table id={tableFor} className='pw-full'>
                <thead>
                    <tr key={theaders[0] + 1}>
                        {theaders && theaders.map((head) => (<th>{camelToSpaceSeparated(head)}</th>))}
                        {actionButton && (<th>Action</th>)}
                    </tr>
                </thead>
                <tbody>
                    {tbodyData && tbodyData.map((row, i) => {
                        return (<tr key={i+1 + Math.random()}> 
                                {theaders.map((key, j) => {
                                    if(row[key] != null &&  !(row[key] instanceof Object)) {
                                        return <td>{row[key]}</td>
                                    } else if(row[key] instanceof Object) {
                                        const childObj = row[key];
                                        if(key == "department") {
                                            return <td>{row[key]["deptName"]}</td>
                                        }
                                        if(key == "manager") {
                                            return <td>{row[key]["fullName"]}</td>
                                        }   
                                        if(key == "hodEmp") {
                                            return <td>{row[key]["fullName"]}</td>
                                        }      
                                    } else {
                                        return <td>{""}</td>
                                    }
                                })}
                                {actionButton && 
                                    <td>
                                        <Button 
                                            buttonLabel={actionName} 
                                            clickHandler={()=>actionHandler(row)}
                                            inlineStyle={{height: '2rem', width: '9.5rem'}}
                                        ></Button>
                                    </td>}
                            </tr>)
                        }
                    )}
                </tbody>
            </table>
        </>
    )
}
