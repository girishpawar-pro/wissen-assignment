export const camelToSpaceSeparated = (str) => {
    return str.replace(/[A-Z]/g, l => ` ${l.toLowerCase()}`).toUpperCase();
}

export const moveEmpPageFields = [
    "empId", "fullName", "gender", "designation", "department", "manager"
];

export const moveEmpPageManagerFields = [
    "empId", "fullName"
]
export const deptFields = [
    "deptId", "deptName", "hodEmp"
]