import React from 'react';

const BlogList = (props) => {
  const listItems = props.blogPosts.map( (d) => {
    return (
      <li key={d.id}>
        {d.title}
      </li>
    );
  })

  return (
    <ul>
      {listItems}
    </ul>
  );
};

export default BlogList;