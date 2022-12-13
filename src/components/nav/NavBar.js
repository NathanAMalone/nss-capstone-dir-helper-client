import { DirectorNav } from "./DirectorNav"
import { StudentNav } from "./StudentNav"

export const NavBar = () => {
    const localUser = localStorage.getItem("user")
    const userObject = JSON.parse(localUser)

    if (userObject.staff) {
        return <DirectorNav />
    } else {
        return <StudentNav />
    }
}
