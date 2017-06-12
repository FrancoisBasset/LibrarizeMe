"use strict";

module.exports = function(sequelize, DataTypes) {
	const User = sequelize.define("User", {
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		handle: {
			type: DataTypes.STRING
		},
		emailAddress: {
			type: DataTypes.STRING
		},
		lastName: {
			type: DataTypes.STRING
		},
		firstName: {
			type: DataTypes.STRING
		},
		phoneNumber: {
			type: DataTypes.STRING
		},
		hashedPassword: {
			type: DataTypes.STRING
		},
		newsletter: {
			type: DataTypes.BOOLEAN
		},
		picture: {
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

	return User;
};
