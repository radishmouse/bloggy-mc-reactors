import React from 'react';

class BlogViewer extends React.Component {

  constructor(props) {
    super(props);

    // Alternative to using arrow functions
    this._handleClick = this._handleClick.bind(this);
  }

  render() {
    // Destructuring for readability!
    const { title, createdAt, content } = this.props.blog;

    return (
      <React.Fragment>
        <h1>{title}</h1>
        <p>
          {createdAt}
        </p>
        <div>
          {content}
        </div>
        <button onClick={this._handleClick}>Edit</button>
      </React.Fragment>
    );
  }

  _handleClick() {
    this.props.clickHandler(true);
  }
}

/*
({
  blog,
  clickHandler
}) => {
  // Return our blog post information in a `React.Fragment`
  // element. This is a special container that doesn't produce an
  // extra DOM element.
  // Also, there will be a button that activates blog post editing.

  return (
    <React.Fragment>
      <h1>{blog.title}</h1>
      <p>
        {blog.createdAt}
      </p>
      <div>
        {blog.content}
      </div>
      <button onClick={  }>Edit</button>
    </React.Fragment>
  );
};
*/


export default BlogViewer;
