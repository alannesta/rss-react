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

router.post('/feed', function (req, res) {
	console.log(req.body);

	FeedService.saveFeed(req.body, function(err, result) {
		if (err) {
			console.log(err)
		} else {
			console.log('test', result);
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
	//Feeds.remove({_id: req.params.id}, function (err) {
	//	if (!err) {
	//
	//	}
	//});
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
