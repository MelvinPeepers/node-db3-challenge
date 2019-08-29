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

// // SELECT s.id, s.scheme_name, st.step_number st.instructions
// // JOIN steps AS st ON s.st_id = st.id
// id: 17, scheme_name: 'Find the Holy Grail', step_number: 1, instructions: 'quest'}
// Still having issues with this one
function findSteps(id) {
    return db('schemes as s')
    .join('steps as st', 's.id', 'st.scheme_id')
    .select('s.id', 's.scheme_name', 'st.step_number', 'st.instructions')
    .where({ scheme_id: id })
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
