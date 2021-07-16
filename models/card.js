'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,Wallet}) {
      // define association here
      this.hasOne(Wallet,{foreignKey:"cardId"})
      this.belongsTo(User,{foreignKey:"userId"})
    }
  };
  Card.init({
    userId:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false
    },
    amount:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    authorization_code: {
      type: DataTypes.STRING,
      allowNull:false
    },
    card_type: {
      type: DataTypes.STRING,
      allowNull:false
    },
    last4: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    exp_month: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    exp_year: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    bin: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    bank: {
      type: DataTypes.STRING,
      allowNull:false
    },
    channel: {
      type: DataTypes.STRING,
      allowNull:false
    },
    signature: {
      type: DataTypes.STRING,
      allowNull:false
    },
    reusable: {
      type: DataTypes.BOOLEAN,
      defaultValue:true,
      allowNull:false
    },
    country_code: {
      type: DataTypes.STRING,
      allowNull:false
    },
    account_name: {
      type: DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};