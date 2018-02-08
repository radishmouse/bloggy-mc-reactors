import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { API } from './config';
import BlogList from './BlogList';
import BlogViewer from './BlogViewer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      currentIndex: -1
    };
  }

  componentDidMount() {
    // here, I can call this.setState for the blog posts!
    fetch(`${API}/blog`)
      .then(response => response.json())
      .then(blogPosts => {
        this.setState({
          posts: blogPosts,
          currentIndex: 0
        });
      })
  }

  render() {

    const viewer = this.state.currentIndex !== -1 ?
                        <BlogViewer blog={this.state.posts[this.state.currentIndex]} />
                        : null;


    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to my blog!</h1>
        </header>
        <BlogList
          blogPosts={this.state.posts}
        />
        {viewer}
      </div>
    );
  }
}

export default App;
