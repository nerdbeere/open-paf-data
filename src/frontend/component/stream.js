import React from 'react';

const {func, object, array} = React.PropTypes;

export default class Stream extends React.Component {

  constructor() {
    super();
  }

  render() {

    var {data} = this.props;

    data = data.map(function(item, index) {

      var tags = item.tags.map(function(tag, index) {
        return <span className="label" key={index}>
          {tag}
        </span>
      });

      return <div className="item" key={index}>
        <h2>{item.title}</h2>
        <p>{item.text}</p>
        <div className="tags">
          {tags}
        </div>
      </div>
    });

    return <div className="stream">
      <h1>Open Paf Data</h1>
      {data}
    </div>;
  }
}

Stream.propTypes = {
  data: array.isRequired
};
