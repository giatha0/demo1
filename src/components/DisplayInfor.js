import React from "react";
import './DisplayInfor.scss';
import logo from './../logo.svg';
// stateless vs stateful
// class DisplayInfor extends React.Component {

//     render() {
//         console.log('>>> call me render ')
//         // destructuring array/object
//         const { listUsers } = this.props; //object
//         // props => viết tắt properties
//         return (
//             <div className="display-infor-container">

//                 {true &&
//                     <>
//                         {listUsers.map((user) => {
//                             return (
//                                 <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
//                                     <div>
//                                         <div>My name's {user.name} </div>
//                                         <div>My age's {user.age} </div>
//                                     </div>
//                                     <div>
//                                         <button onClick={() => this.props.handleDeleteUser(user.id)}>Delete</button>
//                                     </div>
//                                     <hr />
//                                 </div>
//                             )
//                         })}
//                     </>
//                 }
//             </div>
//         )
//     }
// }

const DisplayInfor = (props) => {
    const { listUsers } = props; //object


    return (
        <div className="display-infor-container">

            {true &&
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