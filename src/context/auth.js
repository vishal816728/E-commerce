import {useState,useEffect,createContext, useContext} from "react"

const AuthContext=createContext()

const AuthProvider=({children})=>{
    const [auth,setAuth]=useState({
        user:null,
        token:""
    })
    useEffect(()=>{
        const authData=localStorage.getItem('auth')
        if(authData){
            const ParsedData=JSON.parse(authData)
            setAuth({
                ...auth,
                user:ParsedData.user,
                token:ParsedData.token
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return <AuthContext.Provider value={[auth,setAuth]}>
        {children}
    </AuthContext.Provider>
}    

//custom hook
const useAuth=()=>useContext(AuthContext)

export {useAuth,AuthProvider}