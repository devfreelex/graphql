const db = require('../config/db')

const novoUsuario = {
    name: 'Ademar Ribeiro',
    email: 'ademar@email.com',
    senha: '123456'
}

const exercicio = async() => {
    const { qtde } = await db('usuarios').count('* as qtde').first()

    if (qtde === 0) {
        await db('usuarios').insert(novoUsuario)
    }

    let { id } = await db('usuarios').select('id').limit(1).first()

    await db('usuarios')
        .where({ id })
        .update({ name: 'Pedro garcia', email: 'pedro@email.com' })

    return await db('usuarios').where({ id }).first()
}

exercicio()
    .then(res => console.log(res))
    .finally(() => db.destroy())