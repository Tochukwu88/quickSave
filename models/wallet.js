'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Card,User,Transaction}) {
      // define association here
      this.belongsTo(Card,{foreignKey:"cardId"})
      this.belongsTo(User,{foreignKey:"userId"})
      this.hasMany(Transaction,{foreignKey:"walletId"})
    }
  };
  Wallet.init({
    cardId:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    userId:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull:false
      
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'Wallet',
  });
  return Wallet;
};