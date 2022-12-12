export const getStudents = () => {
    return fetch("http://localhost:8000/students", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const updateStudent = (student, studentId) => {
    return fetch(`http://localhost:8000/students/${studentId}`, { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-type": "application/json"
        },
        method: "PUT", 
        body: JSON.stringify(student)
    })
        
}