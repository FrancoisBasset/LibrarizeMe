"use strict";

module.exports = function(sequelize, DataTypes) {
	const LikeUnlike = sequelize.define("LikeUnlike", {
		likeId: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},productId: {
			type: DataTypes.BIGINT
		},
		LikerUnlikerId: {
			type: DataTypes.BIGINT
		},
		like: {
			type: DataTypes.BIGINT
		}
	}, {
		paranoid: true,
		freezeTableName: true
	}, {
		classMethods: {
			associate: function(models) {
			}
		},
		 instanceMethods: {
                responsify: function() {
                    return {
                        name: this.id + ' : ' + this.firstName + ' ' + this.lastName,
                        email: this.emailAddress
                    };
                }
            }
	});

	return LikeUnlike;
};
