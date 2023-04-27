// class component
// function component

import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {

    // jsx
    render() {
        const myInfor = ['ab', 'ac', 'v'];
        return (
            <div>
                <UserInfor />
                <br /><br />
                <DisplayInfor name="Thao" age="23" />
                <hr />
                <DisplayInfor name="Duong" age={20} myInfor={myInfor} />
            </div>
        );
    }
}

export default MyComponent;