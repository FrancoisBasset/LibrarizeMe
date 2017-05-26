"use strict";

module.exports = function(sequelize, DataTypes) {
	const Movie = sequelize.define("Movie", {
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
		directors: {
			type: DataTypes.STRING
		},
		actors: {
			type: DataTypes.STRING
		},
		description: {
			type: DataTypes.STRING
		}
	}, {
		paranoid: true,
		freezeTableName: true
	});

	return Movie;
};
