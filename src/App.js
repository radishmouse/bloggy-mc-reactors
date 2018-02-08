import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { API } from './config';
import BlogList from './BlogList';
import BlogViewer from './BlogViewer';
import BlogEditor from './BlogEditor';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      currentIndex: -1,
      isEditing: false
    };
  }

  componentDidMount() {
    // here, I can call this.setState for the blog posts!
    fetch(`${API}/blog`)
      .then(response => response.json())
      .then(blogPosts => {
        this.setState({
          posts: blogPosts,
          currentIndex: 0,
          isEditing: false
        });
      })
  }

  render() {

    let viewer = null;
    if (this.state.currentIndex !== -1) {
      let currentPost = this.state.posts[this.state.currentIndex];
      if (this.state.isEditing) {
        viewer = (<BlogEditor
                    blog={currentPost}
                    changeHandler={this._saveContent}
                    clickHandler={this._setEditing}
                  />);
      } else {
        viewer = (<BlogViewer
                    blog={currentPost}
                    clickHandler={this._setEditing}
                  />);
      }
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to my blog!</h1>
        </header>
        <BlogList
          blogPosts={this.state.posts}
          clickHandler={this._setIndex}
        />
        {viewer}
      </div>
    );
  }

  _setIndex = (i) => {
    this.setState({
      currentIndex: i
    })
  }

  _setEditing = (v) => {
    this.setState({
      isEditing: v
    }, () => {
      console.log('setting edting to true');
    });
  }

  _saveContent = (newContent) => {
    const updatedPosts = this.state.posts.map( (p, i) => {
      if (i === this.state.currentIndex) {
        return {
          ...p, // all the existing key/value pairs
          content: newContent // overwriting the `content` key
        }
      } else {
        return p;
      }
    });
    this.setState({
      posts: updatedPosts
    }, () => {
      console.log(`updated content for ${this.state.currentIndex}`)
    });
  }

}

export default App;
