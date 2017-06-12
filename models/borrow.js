"use strict";

module.exports = function(sequelize, DataTypes) {
	const Borrow = sequelize.define("Borrow", {
		userId: {
			type: DataTypes.BIGINT
		},
		friendId: {
			type: DataTypes.BIGINT
		},
		productId: {
			type: DataTypes.BIGINT
		}
	}, {
		paranoid: true,
		freezeTableName: true
	});

	return Borrow;
};
