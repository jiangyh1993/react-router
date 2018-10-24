import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Prompt
} from "react-router-dom";
import "./App.css";

const Home = () => {
  return <h1>Home</h1>;
};

const About = () => {
  return <h1>About</h1>;
};

const Topic = ({ match }) => {
  return (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  );
};

const Topics = ({ match }) => {
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/rendering`}>Rendering with React</Link>
        </li>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:topicId`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
};

const Protected = () => <h3>Protected </h3>;

let auth = false;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refer: false
    };
  }

  login = () => {
    auth = true;
    this.setState({
      refer: true
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    if (this.state.refer) {
      return (
        <div>
          <Prompt
            when={this.state.refer}
            message={location => `Are you sure go to ${location.pathname}`}
          />
          <Redirect to={from} />
        </div>
      );
    }
    return (
      <div>
        <p>You need to login</p>
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}

const AuthButton = ({ history }) => {
  return auth ? (
    <div>
      welcome!{" "}
      <button
        onClick={() => {
          auth = false;
          history.push("/");
        }}
      >
        Logout
      </button>
    </div>
  ) : (
    <p>You need to login</p>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        auth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/topics">Topics</Link>
              </li>
              <li>
                <Link to="/protected">Protected</Link>
              </li>
            </ul>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/topics" component={Topics} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/protected" component={Protected} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
