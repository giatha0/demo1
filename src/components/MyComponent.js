// class component
// function component

import React from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {

    state = {
        listUsers: [
            { id: 1, name: "Thao", age: "16" },
            { id: 2, name: "Huy", age: "26" },
            { id: 3, name: "Nam", age: "69" }
        ]
    }

    handleAddNewUser = (userObj) => {
        console.log(userObj);
        this.setState({
            listUsers: [userObj, ...this.state.listUsers]
        })
    }

    // jsx
    render() {
        // const myInfor = ['ab', 'ac', 'v']
        return (
            <div>
                <AddUserInfor
                    handleAddNewUser={this.handleAddNewUser}
                />
                <br /><br />
                <DisplayInfor
                    listUsers={this.state.listUsers}

                />

            </div>
        );
    }
}

export default MyComponent;