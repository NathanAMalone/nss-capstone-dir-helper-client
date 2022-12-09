export const getProps = () => {
    return fetch("http://localhost:8000/props", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}