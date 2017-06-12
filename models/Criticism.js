"use strict";

module.exports = function(sequelize, DataTypes) {
	const Criticism = sequelize.define("Criticism", {
		criticismId: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},productId: {
			type: DataTypes.BIGINT
		},
		criticasterId: {
			type: DataTypes.BIGINT
		},
		criticismDetails: {
			type: DataTypes.STRING
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

	return Criticism;
};
