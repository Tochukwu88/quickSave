'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,Wallet}) {
      // define association here
      this.belongsTo(User,{foreignKey:"userId"})
      this.belongsTo(Wallet,{foreignKey:"walletId"})
    }
  };
  Transaction.init({
    userId:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    amount_credited: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    walletId:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};