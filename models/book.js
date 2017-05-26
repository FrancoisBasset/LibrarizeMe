"use strict";

module.exports = function(sequelize, DataTypes) {
	const Book = sequelize.define("Book", {
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
		author: {
			type: DataTypes.STRING
		},
		description: {
			type: DataTypes.STRING
		}
	}, {
		paranoid: true,
		freezeTableName: true
	});

	return Book;
};
