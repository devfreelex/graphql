const db = require('../../config/db')

module.exports = {
    usuarios() {
        return db('usuarios')
    },
    usuario(_, { filtro }) {
        if (!filtro) return null
        const { id, email } = filtro
        return id ?
            db('usuarios').where({ id }).first() :
            db('usuarios').where({ email }).first()

    },
}