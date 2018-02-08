import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { API } from './config';
import BlogList from './BlogList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    // here, I can call this.setState for the blog posts!
    fetch(`${API}/blog`)
      .then(response => response.json())
      .then(blogPosts => {
        this.setState({
          posts: blogPosts
        });
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to my blog!</h1>
        </header>
        <BlogList
          blogPosts={this.state.posts}
        />
      </div>
    );
  }
}

export default App;
