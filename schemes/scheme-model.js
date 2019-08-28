const db = require('../data/dbConfig');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
};

function find() {
    return db('schemes');
}
// tested in Postman

// a scheme or null
function findById(id) {
    return db('schemes')
    .where({ id })
    .first()
}
// tested in Postman

// // SELECT s.id, s.name, s.username FROM schemes AS s
// // JOIN steps AS st ON s.st_id = st.id
// id: 17, scheme_name: 'Find the Holy Grail', step_number: 1, instructions: 'quest'}
function findSteps(id) {
    return db('steps as st')
    .join('schemes as s', 's.id', 'st.scheme_id')
    .select('s.scheme_name', 'st.step_number', 'st.instructions')
    .where({ scheme_id:id })
}

// resolves to newly created scheme
function add(scheme) {
    return db('schemes').insert(scheme)
    .then(ids => {
        return findById(ids[0]);
    })
}
// tested in Postman

// resolves to updated changes
function update(changes, id) {
    return db('schemes')
    .where({ id })
    .update(changes)
    .then(count => {
        return findById(id)
    })
}
// tested in Postman

// resolves to a count
function remove(id) {
    return db('schemes')
    .where({ id })
    .del();
}
// tested in Postman
