import React from 'react';
import Tweet from './Tweet.jsx';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: [],
      tweetIds: new Set(),
      paused: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.tweetHandler = this.tweetHandler.bind(this);
  }

  tweetHandler (receivedTweets) {
    const newTweets = receivedTweets.filter(tweet => {
      return !this.state.tweetIds.has(tweet.id)
    });

    const updatedTweets = [...this.state.tweets];

    newTweets.forEach(tweet => {
      this.state.tweetIds.add(tweet.id);
      if (updatedTweets.length >= 26) updatedTweets.pop();
      updatedTweets.unshift(tweet);
    });

    this.setState({
      tweets: updatedTweets
    });
  }

  componentDidMount () {
    fetch('http://ec2-18-216-120-197.us-east-2.compute.amazonaws.com:3030/feed/start')
    .then(res => res.json())
    .then(result => {
      this.tweetHandler(result);

      setInterval(() => {
        if (!this.state.paused) {
          fetch('http://ec2-18-216-120-197.us-east-2.compute.amazonaws.com:3030/feed/start')
          .then(res => res.json())
          .then(this.tweetHandler)
          .catch(err => {
            console.error(err);
          });
        }
      }, 3000);
    })
    .catch(err => {
      console.error(err);
    })
  }

  handleClick (evt) {
    evt.preventDefault();

    this.setState({
      paused: !this.state.paused
    })
  }

  render() {
      return (
        <div id="feed">
          <h1>Twitter Feed</h1>
          <button onClick={this.handleClick} id="btn">{ this.state.paused ? 'Resume' : 'Pause'}</button>
          <div id="tweets">
            <hr id="head" />
            {
              this.state.tweets.map(tweet => {
                return <Tweet key={tweet.id} tweet={tweet} />
              })
            }
            <hr id="tail" />
          </div>
        </div>
    );
  }
}
