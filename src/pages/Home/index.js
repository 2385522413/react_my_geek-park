import React from "react";
import Icon from "@/components/icon";
import "./index.scss"
function Home(props) {
    return (
        <div>
            home123
            <br/>
            <br/>
            <br/>
            <svg className="icon">
                <use xlinkHref="#iconfanhui"></use>
            </svg>

            <Icon
                type="iconfanhui"
                className="test-icon"
                onClick={() => { alert('clicked') }}
            />
        </div>

    );
}

export default Home;
