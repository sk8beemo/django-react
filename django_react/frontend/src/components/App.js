import React, { Component } from "react";
import { render } from "react-dom";
import List from './List';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

  componentDidMount() {
    fetch("api/lead")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => {
          return {
            data,
            loaded: true
          };
        });
      });
  }

  render() {
    return (
      <ul>
        <List />
        {this.state.data.map(contact => {
          return (
            <li key={contact.id}>
              <h3>{contact.name} - {contact.email}</h3>
              <p>{contact.message}</p>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default App;

const container = document.getElementById("App");
render(<App />, container);