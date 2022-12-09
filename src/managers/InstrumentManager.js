export const getInstruments = () => {
    return fetch("http://localhost:8000/instruments", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}