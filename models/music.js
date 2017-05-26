"use strict";

module.exports = function(sequelize, DataTypes) {
	const Music = sequelize.define("Music", {
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
		artist: {
			type: DataTypes.STRING
		},
		description: {
			type: DataTypes.STRING
		}
	}, {
		paranoid: true,
		freezeTableName: true
	});

	return Music;
};
