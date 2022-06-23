const Sequelize = require('sequelize');

module.exports = class List extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            student : {
                type : Sequelize.STRING(5),
                allowNull : false,
            },
            class : {
                type : Sequelize.INTEGER(10),
                allowNull : false,
            },						

		},
         {
            sequelize,
            timestamps: false,
            modelName: 'list',
            tableName: 'lists',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
  }
};