
const hostName = "http://localhost:8087";
const contextPath = "/api/v1";
const domain = hostName + contextPath;
const header = {"Content-Type": "application/json"}

export const intiPost = {
    method: "POST",
    headers: header
}
export const intiPatch = {
    method: "PATCH",
    headers: header
}
export const organisationEndpoints = {
    getGenders: `${domain}/fields/gender`,
    getDesignations: `${domain}/fields/designation`,
    getDepartments: `${domain}/dept`,
    getEmployees: `${domain}/emp`,
    addEmployee: `${domain}/emp`,
    addDepartment: `${domain}/dept`,
    changeHOD: pathParams =>  `${domain}/dept/${pathParams.deptId}/change-hod/${pathParams.newHodEmp}`,
    moveEmployee: pathParams =>  `${domain}/emp/${pathParams.empId}/move-to/${pathParams.newDepartment}/under/${pathParams.newManager}`,
}