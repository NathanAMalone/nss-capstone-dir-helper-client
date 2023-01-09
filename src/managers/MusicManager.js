export const getMusic = () => {
    return fetch("http://localhost:8000/music", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getOneMusic = (musicId) => {
    return fetch(`http://localhost:8000/music/${musicId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const updateMusic = (music, musicId) => {
    return fetch(`http://localhost:8000/music/${musicId}`, { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-type": "application/json"
        },
        method: "PUT", 
        body: JSON.stringify(music)
    })
        
}

export const createMusic = (music) => {
    return fetch("http://localhost:8000/music", { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-type": "application/json"
        },
        method: "POST", 
        body: JSON.stringify(music),
    })
        .then(res => res.json())
}

export const deleteMusic = (musicId) => {
    return fetch(`http://localhost:8000/music/${musicId}`, { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        },
        method: "DELETE", 
    })
        
}