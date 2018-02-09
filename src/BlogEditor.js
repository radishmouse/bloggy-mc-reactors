import React from 'react';
import { Link } from 'react-router-dom';


// The BlogEditor component should show the content of a blog post in a textarea.
class BlogEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // We copy the blog post content into state.
      content: props.blog.content
    }
  }

  render() {
    // Here's an example of using a React.Fragment component.
    // It's basically a way to avoid having to wrap an extra `<div>`
    // around your elements.
    return (
      <React.Fragment>
        <h1>{this.props.blog.title}</h1>
        <p>
          {this.props.blog.createdAt}
        </p>
        <textarea
          value={this.state.content}
          onChange={(e) => this._handleChange(e.target.value) }
          />
        <button onClick={this._commitChanges}>Save</button>
        <Link to={`/posts/${this.props.blog.id}`}>
          <button>Cancel</button>
        </Link>

        </React.Fragment>
    );
  }

  // As the user types in the textarea, we capture those changes
  // in state.
  _handleChange = (newContent) => {
    this.setState({
      content: newContent
    }, () => {
      console.log('updated content locally')
    })
  }

  // When the user clicks the "Save" button, we push those
  // changes out to the parent.
  _commitChanges = () => {
    // this.props.clickHandler(false);
    this.props.changeHandler(this.state.content, this.props.blog.id);
    this.props.finishEditing();
    // this.props.history.push(`/posts/${this.props.blog.id}`);
  }

};

export default BlogEditor;