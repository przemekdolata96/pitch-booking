const Sequelize = require('sequelize');
const UserModel = require('./sequalize_models/user')
const PitchModel = require('./sequalize_models/pitch')
const ReservationModel = require('./sequalize_models/reservation')

const sequelize = new Sequelize('booking', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

const User = UserModel(sequelize, Sequelize)
const Pitch = PitchModel(sequelize, Sequelize)
const Reservation = ReservationModel(sequelize, Sequelize)

Reservation.belongsTo(User)
Reservation.belongsTo(Pitch)

sequelize.sync(/* { force: true} */)
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  User,
  Pitch,
  Reservation,
}