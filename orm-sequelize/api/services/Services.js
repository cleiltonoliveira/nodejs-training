const database = require('../models')

class Services {
    constructor(modelName) {
        this.modelName = modelName
    }

    async findAll(where = {}) {
        return database[this.modelName].findAll({ where: { ...where } })
    }

    async update(model, id, transaction = {}) {
        return database[this.modelName].update(model, { where: { id: id } }, transaction)
    }

    async updateAll(model, where, transaction = {}) {
        return database[this.modelName].update(model, { where: { ...where } }, transaction)
    }

    async findById(id) {
        return database[this.modelName].findOne({ where: { id: Number(id) } })
    }
    
    async findOne(where={}) {
        return database[this.modelName].findOne({ where: { ...where } })
    }

    async save(model) {
        return database[this.modelName].create(model)
    }

    async delete(id) {
        return database[this.modelName].destroy({ where: { id: Number(id) } })
    }

    async restore(id) {
        return database[this.modelName].restore({ where: { id: Number(id) } })
    }

    async findAndCountAll(where = {}, agregadores) {
        return database[this.modelName]
          .findAndCountAll({ where: { ...where }, ...agregadores })
      }
} module.exports = Services