import React from 'react';

const BlogEditor = (props) => {
  return (
    <React.Fragment>
      <h1>{props.blog.title}</h1>
      <p>
        {props.blog.createdAt}
      </p>
      <textarea value={props.blog.content} />
      <button>Save</button>
    </React.Fragment>
  );
};

export default BlogEditor;