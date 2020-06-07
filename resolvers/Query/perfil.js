const db = require('../../config/db')

module.exports = {
    async perfis() {
        return db('perfis')
    },
    async perfil(_, { filtro }) {
        if (!filtro) return null
        const { id, nome } = filtro

        return id ?
            db('perfis').where({ id }).first() :
            db('perfis').where({ nome }).first()

    }
}