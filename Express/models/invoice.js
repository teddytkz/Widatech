'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Invoice.hasMany(models.Product, {
        foreignKey: "invoiceNo"
      })
    }
  }
  Invoice.init({
    invoiceNo: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    customerName: DataTypes.TEXT,
    salesPersonName: DataTypes.TEXT,
    paymentType: DataTypes.ENUM("CASH", "CREDIT"),
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};