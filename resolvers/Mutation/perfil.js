const db = require('../../config/db')
const { perfil: obterPerfil } = require('../Query/perfil')

module.exports = {
    async novoPerfil(_, { dados }) {
        try {
            const [id] = await db('perfis').insert({...dados })
            return db('perfis').where({ id }).first()
        } catch (e) {
            throw new Error(e.sqlMessage)
        }
    },
    async excluirPerfil(_, { filtro }) {
        try {
            const perfil = await obterPerfil(_, { filtro })

            if (perfil) {
                await db('usuario_perfil').where({ perfil_id: perfil.id }).delete()
                await db('perfis').where({ id: perfil.id }).delete()

                return perfil
            }

            return null

        } catch (e) {
            throw new Error(e.sqlMessage)
        }
    },
    async alterarPerfil(_, { filtro, dados }) {
        try {
            const perfil = await obterPerfil(_, { filtro })

            if (perfil) {
                await db('perfis').where({ id: perfil.id }).update({...dados })
                return {...perfil, ...dados }
            }

            return null

        } catch (e) {
            throw new Error(e.sqlMessage)
        }
    }
}