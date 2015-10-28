var React = require('react');
var ReactDOM = require('react-dom');
var FeedStore = require('./feedStore');
var FeedList = require('./feedList');
var FeedContent = require('./feedContent');

var app = React.createClass({

	feedState: function() {
		return {
			allFeeds: FeedStore.getAll()
		};
	},

	getInitialState: function() {
		return this.feedState()
	},

	componentDidMount: function() {
		FeedStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		FeedStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(this.feedState());
	},

	render: function() {
		return (
			<section>
				<header>
					<FeedSearchInput placeholder="Feed to subscribe"/>
				</header>
				<FeedList feeds = {this.state.allFeeds}></FeedList>
				<FeedContent feed = {this.state.selectedFeed}></FeedContent>
			</section>
		)
	}
});

module.exports = app;

