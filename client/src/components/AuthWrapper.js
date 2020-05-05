import { useEffect, useState, useContext } from "react"
import axios from "axios"
import {Link, Redirect} from "react-router-dom"
import UnauthorizedPage from "../pages/UnauthorizedPage"
import AuthContext from "../hooks/AuthContext"

export default function AuthWrapper(WrappedComponent){
    // const auth = useContext(AuthContext)
    // console.log(auth);
    
    
    return function(props){
        let {auth, setAuth} = useContext(AuthContext)

        useEffect(() => {
            async function fetchData(){
                axios.get(`/api/auth/check/session`)
                    .then((res) => {
                        console.log(res);
                        
                        if(res.statusCode == 200) setAuth({
                            isAuthenticated: true
                        })
                    })
                    .catch((error) => {
                        console.log(error.response);
                        
                        if(error.response.status == 401) setAuth({
                            isAuthenticated: false
                        })
                    })
            }
            fetchData()
        },[])

        if(auth != null){
            if(auth.isAuthenticated){
                return <WrappedComponent {...props}/>
            } else {
                return <UnauthorizedPage />
                // return <Redirect to={"/login"} />
            }
        } else {
            return <h2>Loading...</h2>
        }
    }
}