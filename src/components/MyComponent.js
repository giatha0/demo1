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

    handleOnChangeInput = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        console.log(this.state)
    }

    // jsx
    render() {
        return (
            <div>
                My name is {this.state.name} and I'm  {this.state.age}
                <form onSubmit={(event) => this.handleOnSubmit(event)}>
                    <input
                        type="text"
                        onChange={(event) => this.handleOnChangeInput(event)}
                    />
                    <button>Submit</button>
                </form>

            </div>
        );
    }
}

export default MyComponent;