import React from 'react';
import { Link } from 'react-router-dom';
const BlogViewer = ({
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
      <button>
        <Link to={`/posts/${blog.id}/edit`}>
          Edit
        </Link>
      </button>
    </React.Fragment>
  );
};

export default BlogViewer;