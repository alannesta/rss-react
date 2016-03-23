/*
 	MySQL
 */
var express = require('express');
var router = express.Router();

var FeedService = require('../mysql/feedService');
var BlogService = require('../mysql/blogService');


router.get('/feeds', function (req, res) {
	FeedService.getAllFeeds(function(error, results, fields) {
		if (error) {
			throw error;
		}
		console.log(results);
		res.json(results);
	})

});

router.get('/feed/:id', function (req, res) {
	FeedService.getFeedByID(req.params.id, function(error, results, fields) {
		if (error) {
			throw error;
		}
		//console.log(results);
		res.json(results[0]);	// only one feed should be get
	})

});

router.post('/feed/:id', function (req, res) {
	console.log(req.body);

	FeedService.updateFeed(req.body, function(err, result) {
		if (err) {
			console.log(err)
		} else {
			res.status(200).send('update success');
		}
	})
});

router.post('/feed', function (req, res) {
	console.log(req.body);

	FeedService.saveFeed(req.body, function(err, result) {
		if (err) {
			console.log(err)
		} else {
			// has to return the feed to trigger auto select
			res.status(200).send({
				id: result.insertId,
				feedName: req.body.name,
				feedUrl: req.body.feedUrl
			});
		}
	})
});

router.delete('/feed/:id', function (req, res) {
	FeedService.deleteFeedByID(req.params.id, function(err, results) {
		if (err) {
			console.log(err);
		}
		if (!err) {
			res.status(200).send('removed successfully');
		}
	})

});

module.exports = router;
