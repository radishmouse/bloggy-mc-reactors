import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { API } from './config';
import axios from 'axios';
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

  // componentDidMount is a React Component Lifecycle method that is a good
  // place for Ajax calls.
  componentDidMount() {
    // here, I can call this.setState for the blog posts!
    axios.get(`${API}/blog`)
      .then(response => response.data)  // Axios tucks the "real" info inside a `.data` property. Let's return it for the next link in the promise chain.
      .then(blogPosts => {
        // Save `blogPosts` to state, and set the `currentIndex` to the first blog post in the array.
        this.setState({
          posts: blogPosts,
          currentIndex: 0
        });
      })
  }

  render() {

    // We need to render either a blog viewer or a blog editor.
    // That will depend on whether `this.state.currentIndex` has a real value.

    // Start with a variable that will hold our component.
    // By default, we set it to null.
    let viewer = null;
    if (this.state.currentIndex !== -1) { // Check if the currentIndex is a real value.

      // Create a short variable name to refer to the current blog post to be viewed.
      let currentPost = this.state.posts[this.state.currentIndex];

      // See if we're trying to edit or just view the blog post.
      if (this.state.isEditing) {

        // If we're editing, then use the `BlogEditor` component
        viewer = (<BlogEditor
                    blog={currentPost}
                    changeHandler={this._saveContent}
                    clickHandler={this._setEditing}
                  />);
      } else {
        // If we're not editing, just use the `BlogViewer` component
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

  // `this.state.currentIndex` is how we know which blog post to show in the viewer or blog editor.
  _setIndex = (i) => {
    this.setState({
      currentIndex: i
    })
  }

  // `this.state.isEditing` is how we know whether to render the blog viewer or blog editor.
  _setEditing = (v) => {
    this.setState({
      isEditing: v
    }, () => {
      console.log('setting edting to true');
    });
  }

  _saveContent = (newContent) => {
    // We will update both the backend and our local state.
    // First, we update the backend using an Ajax request.
    // Once we get confirmation that the backend has committed the changes,
    // we will update the local state.

    const currentPost = this.state.posts[this.state.currentIndex];
    // send a POST request to update a specific blog post
    axios.post(`${API}/blog/${currentPost.id}/edit`, {
      ...currentPost,       // include all the key/value pairs from `currentPost`
      content: newContent   // but specifically overwrite the `content` key.
    })
    .then(resp => resp.data)  // axios tucks the "real" information away in the `.data` property of the response
    .then(result => {
      // The backend has sent us back a copy of the data.
      // Let's update our local version.

      // First, make a new array that contains all the existing posts
      // and an updated version of the modified post.

      // To make a new array, we map through our existing array of blog posts...
      const updatedPosts = this.state.posts.map( (p, i) => {
        // as we iterate, check if we're on the one that was being edited.
        if (i === this.state.currentIndex) {
          // If so, we return the version from the server.
          return result;
        } else {
          // Otherwise, just return the blog post as-is.
          return p;
        }
      });

      // Then, we call `setState`, setting our posts to the `updatedPosts` array.
      this.setState({
        posts: updatedPosts
      }, () => {
        console.log(`updated content for ${this.state.currentIndex}`)
      });
    })



  }

}

export default App;
