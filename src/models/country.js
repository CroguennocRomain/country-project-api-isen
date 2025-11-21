const continent_list = [
    "Africa",
    "Asia",
    "Europe",
    "North America",
    "South America",
    "Oceania",
    "Antarctica",
];
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Country",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          len: [1, 100],
        },
      },

      capital: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          len: [1, 100],
        },
      },

      population: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          isInt: true,
        },
      },

      flag: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },

      continent: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [continent_list],
            msg: `The continent must be one of the following: ${continent_list.join(', ')}.`
          }
        },
      },
    }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
};
