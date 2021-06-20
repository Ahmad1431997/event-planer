

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
      validate: {
        min: 0,
      },
    },

    bookedSeats: {
      type: DataTypes.INTEGER,
      validate: {
        max(value) {
          if (value > this.numOfSeats) {
            throw new Error("Booked Seats must be <= number of Seats");
      }}}
    },
  
    startDate: {
      type: DataTypes.DATEONLY,
      validate: {
        validation(value) {
          if (this.endDate && !value) {
            throw new Error("There must be a Start Date");
          }
        },
        isAfter: "2021-06-21",
      },
    
    },

    endDate: {
      type: DataTypes.DATE,
  
      validation(value) {
          if (this.startDate && !value) {
            throw new Error("There must be an End Date");
          }
          if (value < this.startDate) {
            throw new Error("End date must be after startDate");
          }
        }
    },
  });
};
