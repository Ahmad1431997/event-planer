var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

today = mm + "/" + dd + "/" + yyyy;

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Event", {
    organizer: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: [0, 20],
      },
    },

    name: {
      type: DataTypes.STRING,
      validate: {
        notContains: "event",
      },
    },

    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    numOfSeats: {
      type: DataTypes.INTEGER,
      unique: true,
      validate: {
        min: 0,
      },
    },

    bookedSeats: {
      type: DataTypes.INTEGER,
      // validate: {
      //   max: this.numOfSeats,
      // },
    },

    startDate: {
      type: DataTypes.DATEONLY,
      // validate: {
      //   isAfter: today,
      // },
    },

    endDate: {
      type: DataTypes.DATEONLY,
    },
  });
};
