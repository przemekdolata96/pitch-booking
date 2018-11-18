module.exports = (sequelize, Sequelize) => {
  const Reservation = sequelize.define('reservation', {
    start_time: {
      type: Sequelize.TIME,
      allowNull: false
    },
    end_time: {
      type: Sequelize.TIME,
      allowNull: false
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
  })

  return Reservation
}