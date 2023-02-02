import React from "react";
import NavBar from "@/components/NavBar";
function Login() {
    return (
       <div>
           <NavBar></NavBar>
           <NavBar extra="芜湖"></NavBar>
           <NavBar children={<div>hahah</div>}></NavBar>
       </div>
    )
}

export default Login;
