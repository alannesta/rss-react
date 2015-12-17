var React = require('react');
var ReactDOM = require('react-dom');
var FeedStore = require('../stores/feed-store');
var FeedAction = require('../actions/feed-actions');
var FeedList = require('./feed-list');
var FeedContent = require('./feed-content');
var FeedSearchInput = require('./feed-search-input');
var Toast = require('./toasts/toast');

var app = React.createClass({

	feedState: function () {
		return FeedStore.getState();
	},

	getInitialState: function () {
		return this.feedState();
	},

	componentDidMount: function () {
		FeedAction.fetch().then(function(data) {
			FeedAction.selectFeed(data[0]);
		});
		FeedStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function () {
		FeedStore.removeChangeListener(this._onChange);
	},

	componentWillReceiveProps: function () {
	},

	componentWillUpdate: function () {
	},

	componentDidUpdate: function () {
	},

	_onChange: function () {
		this.setState(this.feedState());
	},

	render: function () {
		return (
			<section className = "app-container">
				<FeedSearchInput />
				<section className="feeds">
					<FeedList selected={this.state.currentFeed} feeds={this.state.allFeeds}></FeedList>
					<FeedContent content={this.state.feedContent}></FeedContent>
				</section>
			</section>
		)
	}
});

module.exports = app;

