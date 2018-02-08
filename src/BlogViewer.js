import React from 'react';

const BlogViewer = (props) => {
  return (
    <React.Fragment>
      <h1>{props.blog.title}</h1>
      <p>
        {props.blog.createdAt}
      </p>
      <div>
        {props.blog.content}
      </div>
      <button onClick={props.clickHandler}>Edit</button>
    </React.Fragment>
  );
};

export default BlogViewer;