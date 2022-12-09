export const getStudents = () => {
    return fetch("http://localhost:8000/students", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}