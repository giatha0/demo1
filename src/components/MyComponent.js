// class component
// function component

import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {

    state = {
        listUser: [
            { id: 1, name: "Thao", age: "16" },
            { id: 2, name: "Huy", age: "26" },
            { id: 3, name: "Nam", age: "69" }
        ]
    }
    // jsx
    render() {
        // const myInfor = ['ab', 'ac', 'v']
        return (
            <div>
                <UserInfor />
                <br /><br />
                <DisplayInfor
                    listUsers={this.state.listUser}
                />

            </div>
        );
    }
}

export default MyComponent;