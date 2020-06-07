const db = require('../config/db')

const salvarUsuario = async(nome, email, senha) => {
    const usuario = await db('usuarios').where({ email })

    if (!usuario || !usuario.length) {
        const id = await db('usuarios')
            .insert({
                nome,
                email,
                senha
            })

        return await db('usuarios').where({ id }).first()
    }


    await db('usuarios')
        .where({ email })
        .update({
            nome,
            email,
            senha
        })

    return await db('usuarios').where({ email }).first()

}

const salvarPerfil = async(nome, rotulo) => {
    const perfil = await db('perfis').where({ nome })

    if (!perfil || !perfil.length) {
        const id = await db('perfis')
            .insert({
                nome,
                rotulo
            })

        return await db('perfis').where({ id }).first()
    }

    await db('perfis')
        .where({ nome })
        .update({
            nome,
            rotulo
        })


    return await db('perfis').where({ nome }).first()

}

const adicionarPerfis = async(usuario, perfis) => {
    const usuario_id = usuario.id

    await db('usuarios_perfis').where({ usuario_id }).delete()

    for (let key in perfis) {
        const perfil_id = perfis[key].id
        await db('usuarios_perfis').insert({ usuario_id, perfil_id })
    }

    return await db('usuarios_perfis').where({ usuario_id })
}

const executar = async() => {
    const perfilA = await salvarPerfil('super', 'Super Administrador')
    const perfilB = await salvarPerfil('comum', 'Comum')
    const usuario = await salvarUsuario('Roberto Jefferson', 'roberto@email.com', '123456')

    const perfis = await adicionarPerfis(usuario, { perfilA, perfilB })
    return {
        perfilA,
        perfilB,
        usuario,
        perfis
    }
}

executar()
    .then(res => { console.log(res) })
    .finally(() => db.destroy())