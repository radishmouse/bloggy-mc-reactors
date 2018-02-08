import React from 'react';

const BlogList = (props) => {
  const listItems = props.blogPosts.map( (d, i) => {
    return (
      <li>{d.title}</li>
    );
  })

  return (
    <ul>
      {listItems}
    </ul>
  );
};

export default BlogList;