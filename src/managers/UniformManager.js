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

export const createUniform = (uniform) => {
    return fetch("http://localhost:8000/uniforms", { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-type": "application/json"
        },
        method: "POST", 
        body: JSON.stringify(uniform),
    })
        .then(res => res.json())
}

export const deleteUniform = (uniformId) => {
    return fetch(`http://localhost:8000/uniforms/${uniformId}`, { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        },
        method: "DELETE", 
    })
        
}