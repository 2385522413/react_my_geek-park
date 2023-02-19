import React, {useEffect} from "react";
import Tabs from "@/components/Tabs";
import {useDispatch, useSelector} from "react-redux";
import {getUserChannels} from "@/store/action/home";

function Home(props) {
    const tabs=useSelector((state)=>state.home.userChannels)
    const dispatch= useDispatch()
    useEffect(()=>{
        dispatch(getUserChannels())
    },[dispatch])
    return (
        <div>
            <Tabs tabs={tabs}></Tabs>
        </div>
    );
}

export default Home;
