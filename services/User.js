const db = require('./db');
const helper = require('../helper');

async function get(){
  const conn = await db.connection();
  const rows = await conn.execute(
    `SELECT * FROM grupo11.usuario WHERE Deleted = 0;`
  );
  const data = helper.emptyOrRows(rows);
  conn.release();
  return data;
}

async function create(usuario){
  const conn = await db.connection();
  const result = await conn.execute(
    `INSERT INTO usuario (nomusua, Contraseña, rol) VALUES ('${usuario.username}','${usuario.password}',${usuario.role});`
  );
  let message = 'Error al crear usuario.';
  if(result.affectedRows) {
    message = 'Usuario creado con éxito.';
  }
  conn.release();
  return message;
}

async function updateFirst(id){
  const conn = await db.connection();
  const result = await conn.execute(
    `UPDATE grupo11.usuario SET justCreated = 0 WHERE ID_usuario = ${id};`
  );
  let message = 'Error al actualizar usuario.';
  if(result.affectedRows) {
    message = 'Usuario actulizado con éxito.';
  }
  conn.release();
  return message;
}

async function update(id, usuario){
  const conn = await db.connection();
  const result = await conn.execute(
    `UPDATE grupo11.usuario SET nomusua = '${usuario.username}', Contraseña = '${usuario.password}', rol = ${usuario.role} WHERE ID_usuario = ${id};`
  );
  let message = 'Error al actualizar usuario.';
  if(result.affectedRows) {
    message = 'Usuario actulizado con éxito.';
  }
  conn.release();
  return message;
}

async function remove(id){
  const conn = await db.connection();
  const result = await conn.execute(
    `UPDATE grupo11.usuario SET Deleted = 1 WHERE ID_usuario = ${id};`
  );
  let message = 'Error al eliminar usuario.';
  if(result.affectedRows) {
    message = 'Usuario eliminado con éxito.';
  }
  conn.release();
  return message;
}

module.exports = {
  get,
  create,
  updateFirst,
  update,
  remove
}