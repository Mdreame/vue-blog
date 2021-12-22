const mongoose = require("./db-connect");
const MusicModel = require("./Schema/MusicModel");
const BlogModel = require("./Schema/BlogModel");

const song = { name: "liuyuemoli" };
const test = {
	findMusic: function (type, query) {
		if (type !== "music") return "type error";
		MusicModel.find(query, (err, data) => {
			console.log("findMusic...");

			return data;
		});
	},

	findBlog: function (type, query) {
		if (type !== "blog") return "type error";
		console.log(query);

		return new Promise(function (resolve, reject) {
			BlogModel.find(query, (err, data) => {
				if (err) reject(err);
				console.log("findBlog...");
				if (data) resolve(data);
			});
		});

	},
};

module.exports = test;
