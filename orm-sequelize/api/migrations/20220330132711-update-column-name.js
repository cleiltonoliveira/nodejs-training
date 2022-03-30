'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Turmas', 'docent_id', 'docente_id')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Turmas', 'docente_id', 'docent_id')
  }
};
