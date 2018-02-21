// Create a new React component here!
import React, { Component } from 'react';

export default class Tweet extends Component {
  constructor (props) {
    super(props);

    this.state = {
      highlighted: false
    }

    this.changeColor = this.changeColor.bind(this);
  }

  changeColor (evt) {
    evt.preventDefault();

    this.setState({
      highlighted: !this.state.highlighted
    })
  }

  render () {
    const tweet = this.props.tweet;

    return (
      <div className="tweet" style={{
        backgroundColor: this.state.highlighted ? 'yellow' : 'white'
      }}>
        <img src={tweet.user.profile_image_url} />
        <h4>${tweet.user.name}</h4>
        <p>${tweet.text}</p>
        <button onClick={this.changeColor}>{this.state.highlighted ? 'Unhighlight' : 'Highlight'} Tweet</button>
      </div>
    );
  }
}
