export const getUniforms = () => {
    return fetch("http://localhost:8000/uniforms", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getOneUniform = (uniformId) => {
    return fetch(`http://localhost:8000/uniforms/${uniformId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const updateUniform = (uniform, uniformId) => {
    return fetch(`http://localhost:8000/uniforms/${uniformId}`, { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-type": "application/json"
        },
        method: "PUT", 
        body: JSON.stringify(uniform)
    })
        
}