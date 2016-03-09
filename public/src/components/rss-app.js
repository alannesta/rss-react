var React = require('react');
var ReactDOM = require('react-dom');
var FeedStore = require('../stores/feed-store');
var FeedAction = require('../actions/feed-actions');
var FeedList = require('./feed-list');
var FeedContent = require('./feed-content');
var FeedSearchInput = require('./feed-search-input');
var Toast = require('./toasts/toast');

var payload = [
	{
		name: '1',
		feedUrl: 'http://benmccormick.org/rss/'
	},
	{
		name: '2',
		feedUrl: 'http://www.smashingmagazine.com/feed/'
	},
	{
		name: '3',
		feedUrl: 'http://feed.cnblogs.com/blog/u/109914/rss'
	},
	{
		name: '4',
		feedUrl: 'http://coolshell.cn/feed'
	},
	{
		name: '5',
		feedUrl: 'http://perfectionkills.com/feed.xml'
	}
];

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

	quickAdd: function() {
		payload.forEach(function(feed) {
			FeedAction.subscribeFeed(feed);
		});
	},

	quickDelete: function() {
		//this.state.allFeeds.forEach(function(feed) {
		//	FeedAction.deleteFeed(feed);
		//});
		for (var i = 0; i < this.state.allFeeds.length; i++) {
			doDelete(this.state.allFeeds[i], i)();
		}

		function doDelete(item, index) {
			return function() {
				setTimeout(function() {
					FeedAction.deleteFeed(item)
				}, index * 1000);
			}
		}
	},

	_onChange: function () {
		this.setState(this.feedState());
	},

	render: function () {
		return (
			<section className = "app-container">
				<FeedSearchInput />
				/*
					<button onClick={this.quickAdd}>Quick Add</button>
					<button onClick={this.quickDelete}>Quick Delete</button>
				*/
				<section className="feeds">
					<FeedList selected={this.state.currentFeed} feeds={this.state.allFeeds}></FeedList>
					<FeedContent content={this.state.feedContent}></FeedContent>
				</section>
			</section>
		)
	}
});

module.exports = app;

