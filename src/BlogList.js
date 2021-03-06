import React from 'react';

const BlogList = ({
  blogPosts=[],
  clickHandler=() => {}
}) => {
  // Convert our blog post array into an array of `<li>` elements
  // and provide each one with a key and click handler.
  // We'll need to pass our click handler each blog post's array index.
  // That's how we know which blog post to show in the viewer/editor.
  const listItems = blogPosts.map( (d, i) => {
    return (
      <li
        key={d.id}
        onClick={ () => clickHandler(i) }
      >
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