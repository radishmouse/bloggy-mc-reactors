import React from 'react';



class BlogEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.blog.content
    }
  }

  render() {
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
        </React.Fragment>
    );
  }

  _commitChanges = () => {
    this.props.clickHandler(false);
    this.props.changeHandler(this.state.content);
  }

  _handleChange = (newContent) => {
    this.setState({
      content: newContent
    }, () => {
      console.log('updated content locally')
    })
  }
};

export default BlogEditor;