export const getMusic = () => {
    return fetch("http://localhost:8000/music", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}