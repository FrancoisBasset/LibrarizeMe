"use strict";

module.exports = function(sequelize, DataTypes) {
	const FriendRelation = sequelize.define("FriendRelation", {
		userId: {
			type: DataTypes.BIGINT
		},
		friendId: {
			type: DataTypes.BIGINT
		}
	}, {
		paranoid: true,
		freezeTableName: true
	});

	return FriendRelation;
};
