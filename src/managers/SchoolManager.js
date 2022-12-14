export const getSchools = () => {
    return fetch("http://localhost:8000/schools", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}