// class component
// function component

import React from "react";

class MyComponent extends React.Component {

    state = {
        name: 'Thao',
        address: 'Hanoi',
        age: 23
    };

    handleClick(event) {
        console.log(">> Click me my button");

        // merge State => react class
        this.setState({
            name: 'Duong',
            age: Math.floor((Math.random() * 100) + 1)
        })
    }

    handleOnMouseOver(event) {
        console.log(event.pageX);
    }

    // jsx
    render() {
        return (
            <div>
                My name is {this.state.name} and I'm  {this.state.age}
                <button onMouseOver={this.handleOnMouseOver}>Hover me</button>
                <button onClick={(event) => { this.handleClick(event) }}>Click me</button>
            </div>
        );
    }
}

export default MyComponent;