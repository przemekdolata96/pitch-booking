module.exports = (sequelize, Sequelize) => {
  return sequelize.define('user', {
    id: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING
    },
  })
}