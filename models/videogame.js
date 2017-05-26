"use strict";

module.exports = function(sequelize, DataTypes) {
	const VideoGame = sequelize.define("VideoGame", {
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING
		},
		releaseDate: {
			type: DataTypes.DATE
		},
		genre: {
			type: DataTypes.STRING
		},
		price: {
			type: DataTypes.FLOAT
		},
		editor: {
			type: DataTypes.STRING
		},
		platform: {
			type: DataTypes.STRING
		},
		description: {
			type: DataTypes.STRING
		}
	}, {
		paranoid: true,
		freezeTableName: true
	});

	return VideoGame;
};
