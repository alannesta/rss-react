var React = require('react');
var ReactDOM = require('react-dom');
var FeedStore = require('../stores/feed-store');
var FeedAction = require('../actions/feed-actions');
var FeedList = require('./feed-list');
var FeedContent = require('./feed-content');
var FeedSearchInput = require('./feed-search-input');
var ViewManager = require('./view-manager');

var app = React.createClass({

	feedState: function () {
		return FeedStore.getState();
	},

	getInitialState: function () {
		return this.feedState();
	},

	componentDidMount: function () {
		FeedAction.fetch();	// is this the place?
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
			<section>
				<FeedSearchInput />
				<section className="feeds">
					<FeedList selected={this.state.currentFeed} feeds={this.state.allFeeds}></FeedList>
					<FeedContent content={this.state.feedContent}></FeedContent>
				</section>
				<ViewManager />

				<div id="modal-container"></div>
				<div className="backdrop"></div>
			</section>
		)
	}
});

module.exports = app;

