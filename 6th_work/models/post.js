const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            content : {
                type : Sequelize.STRING(5)
            },
            writer : {
                type : Sequelize.INTEGER(10)
            },						

		},
         {
            sequelize,
            timestamps: false,
            modelName: 'post',
            tableName: 'posts',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
       
}
};