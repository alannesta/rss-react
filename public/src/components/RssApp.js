var React = require('react');
var ReactDOM = require('react-dom');
var FeedStore = require('../stores/feedStore');
var FeedAction = require('../actions/feedActions');
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
		FeedAction.fetch();	// is this the place?
		FeedStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		FeedStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		console.log('changed', this.feedState());
		this.setState(this.feedState());
	},

	render: function() {
		return (
			<section>
				<header>
					FeedSearchInput
				</header>
				<FeedList feeds = {this.state.allFeeds}></FeedList>
				<FeedContent feed = {this.state.selectedFeed}></FeedContent>
			</section>
		)
	}
});

module.exports = app;

