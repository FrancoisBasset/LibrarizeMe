"use strict";

module.exports = function(sequelize, DataTypes) {
	const Products = sequelize.define("Products", {
		productId: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		type: {
			type: DataTypes.STRING
		},
		title: {
			type: DataTypes.STRING
		},
		barcode: {
			type: DataTypes.STRING
		},
		price: {
			type: DataTypes.DOUBLE
		},
		editor: {
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

	return Products;
};
