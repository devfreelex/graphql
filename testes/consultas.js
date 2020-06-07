const db = require('../config/db')

db('perfis')

// .then(res => console.log(res))
//     .finally(() => db.destroy())

// db('perfis')
//     .select('id', 'nome')
//     .then(res => console.log(res))
//     .finally(() => db.destroy())

// db.select('nome', 'id')
//     .from('perfis')
//     .limit(4)
//     .offset(4)
//     .then(res => console.log(res))
//     .finally(() => db.destroy())

db('perfis')
    // .where({ id: 2 })
    // .where('id', '=', 2)
    // .where('nome', 'like', 'ad%')
    // .where('nome', 'like', '%min%')
    // .whereNot({ id: 2 })
    // .first()
    .whereIn('id', [1, 2, 3])
    .then(res => console.log(res))
    .finally(() => db.destroy())