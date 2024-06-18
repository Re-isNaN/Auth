import { IAuthContext } from "../../@types/auth"
import { useAuth } from "../../contexts/AuthContext"

export function Home(){
    const { logout } = useAuth() as IAuthContext

    async function onLogout(){
        await logout()
    }
    
    return(
        <div>
            <h1>Home</h1>
            <button onClick={onLogout}>Logout</button>
        </div>
    )
}