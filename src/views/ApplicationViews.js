import { DirectorViews } from "./DirectorViews"
import { StudentViews } from "./StudentViews"

export const ApplicationViews = () => {
    
    const localUser = localStorage.getItem("user")
    const userObject = JSON.parse(localUser)

    if (userObject.staff) {
        return < DirectorViews />
    } else {
        return < StudentViews />
    }
}