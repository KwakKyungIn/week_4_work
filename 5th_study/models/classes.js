const Sequelize = require('sequelize');

module.exports = class Classes extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            sub_name : {
                type : Sequelize.STRING(5)
            },
            sub_number : {
                type : Sequelize.INTEGER(10)
            },	
            professor : {
                type : Sequelize.STRING(5)                
            },


		},
         {
            sequelize,
            timestamps: false,
            modelName: 'classes',
            tableName: 'classess',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
       
    }
};