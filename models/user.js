'use strict';
const {
  Model, UUIDV4
} = require('sequelize');

const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Card,Wallet,Transaction}) {
      // define association here
      this.hasMany(Card,{foreignKey:"userId"})
      this.hasMany(Wallet,{foreignKey:"userId"})
      this.hasMany(Transaction,{foreignKey:"userId"})
    }
  };
  User.init({
    uuid:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
    firstName: {
      type:DataTypes.STRING,
      allowNull:false
    },
    lastName: {
      type:DataTypes.STRING,
      allowNull:false
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique: true
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    hooks:{
      beforeCreate: async(user)=>{
        if (user.password) {
          const  hash = await bcrypt.hash(user.password, 10)
        user.password = hash
       }
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};