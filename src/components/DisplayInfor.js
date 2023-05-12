import React, { useEffect, useState } from "react";
import './DisplayInfor.scss';
import logo from './../logo.svg';
// stateless vs stateful


const DisplayInfor = (props) => {
    const { listUsers } = props; //object

    const [isShowHideListUser, setShowHideListUser] = useState(true);

    // this.state = {
    //     isShowHideListUser: true
    // }
    const handleShowHildListUser = () => {
        // alert('click me')
        setShowHideListUser(!isShowHideListUser);
    }

    useEffect(() => {
        if (listUsers.length === 0) {
            alert('You delete all users')
        }
        console.log(">> call me useEffect")
    }, [listUsers]
    );

    return (
        <div className="display-infor-container">
            <div>
                <span onClick={() => handleShowHildListUser()}>
                    {isShowHideListUser === true ? "Hide List User" : "Show List User"}
                </span>
            </div>
            {isShowHideListUser &&
                <>
                    {listUsers.map((user) => {
                        return (
                            <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                                <div>
                                    <div>My name's {user.name} </div>
                                    <div>My age's {user.age} </div>
                                </div>
                                <div>
                                    <button onClick={() => props.handleDeleteUser(user.id)}>Delete</button>
                                </div>
                                <hr />
                            </div>
                        )
                    })}
                </>
            }
        </div>
    )

}
export default DisplayInfor;