import React from 'react';

const BlogViewer = (props) => {
  // Return our blog post information in a `React.Fragment`
  // element. This is a special container that doesn't produce an
  // extra DOM element.
  // Also, there will be a button that activates blog post editing.
  return (
    <React.Fragment>
      <h1>{props.blog.title}</h1>
      <p>
        {props.blog.createdAt}
      </p>
      <div>
        {props.blog.content}
      </div>
      <button onClick={ () => props.clickHandler(true) }>Edit</button>
    </React.Fragment>
  );
};

export default BlogViewer;