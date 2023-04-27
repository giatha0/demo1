import React from "react";

class DisplayInfor extends React.Component {
    render() {

        // destructuring array/object
        const { age, name } = this.props; //object
        // props => viết tắt properties
        return (
            <div>
                <div>My name's {name}</div>
                <div>My age's {age}</div>
            </div>
        )
    }
}

export default DisplayInfor;