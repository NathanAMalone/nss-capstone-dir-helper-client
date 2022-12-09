export const getUniforms = () => {
    return fetch("http://localhost:8000/uniforms", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}