const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(24),
          allowNull: false,
        },
        birthday: {
          type: Sequelize.DATE(),
          allowNull: false,
        },
        phoneNumber: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        sex: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        image: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        nickname: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        job: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        point: {
          type: Sequelize.NUMBER(100),
          allowNull: true,
        },
        processAds: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        adsHistory: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        provider: {
          type: Sequelize.STRING(10),
          allowNull: false,
          defaultValue: 'local',
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.User.belongsToMany(db.Advertisement, {
      // foreignKey: 'followingId',
      // as: 'Followers',
      through: 'UserAdvertisement',
    });
    db.User.belongsToMany(db.Advertisement, {
      // foreignKey: 'followerId',
      // as: 'Followings',
      through: 'UserAdvertisement',
    });
  }
};
