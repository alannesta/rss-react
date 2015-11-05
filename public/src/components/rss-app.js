var React = require('react');
var ReactDOM = require('react-dom');
var FeedStore = require('../stores/feedStore');
var FeedAction = require('../actions/feedActions');
var FeedList = require('./feedList');
var FeedContent = require('./feedContent');
var FeedSearchInput = require('./feed-search-input');
var ViewManager = require('./view-manager');

var app = React.createClass({

	feedState: function() {
		return FeedStore.getState();
	},

	getInitialState: function() {
		return this.feedState()
	},

	componentDidMount: function() {
		console.log('component did mount');
		FeedAction.fetch();	// is this the place?
		FeedStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		FeedStore.removeChangeListener(this._onChange);
	},

	componentWillReceiveProps: function() {
		console.log('componentWillReceiveProps');
	},

	componentWillUpdate: function() {
		console.log('component will update');
	},

	componentDidUpdate: function() {
		console.log('componenet did update');
	},

	_onChange: function() {
		console.log('changed', this.feedState());
		this.setState(this.feedState());
	},

	render: function() {
		return (
			<section>
				<FeedSearchInput></FeedSearchInput>
				<section className = "feeds">
					<FeedList selected = {this.state.currentFeed} feeds = {this.state.allFeeds}></FeedList>
					<FeedContent content = {this.state.feedContent}></FeedContent>
				</section>
				<ViewManager></ViewManager>
				<div className = "modal-container"></div>
				<div className = "backdrop"></div>
			</section>
		)
	}
});

module.exports = app;

