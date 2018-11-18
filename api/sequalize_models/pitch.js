module.exports = (sequelize, Sequelize) => {
  return sequelize.define('pitch', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
  })
}