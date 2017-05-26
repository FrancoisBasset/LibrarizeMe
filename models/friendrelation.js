"use strict";

module.exports = function(sequelize, DataTypes) {
	const FriendRelation = sequelize.define("FriendRelation", {
		userId: {
			type: DataTypes.INT
		},
		friendId: {
			type: DataTypes.INT
		}
	}, {
		paranoid: true,
		freezeTableName: true
	});

	return FriendRelation;
};
