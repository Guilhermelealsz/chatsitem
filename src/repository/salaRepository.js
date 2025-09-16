import { connection } from "./connection.js";

export async function inserirSala(nome, usuarioId) {
  const comando = `
    INSERT INTO sala (nome, usuario_id)
    VALUES (?, ?);
  `;
  const [info] = await connection.query(comando, [nome, usuarioId]);
  return info.insertId;
}

export async function buscarSalaPorId(salaId) {
  const comando = `
    SELECT id, nome, usuario_id
    FROM sala
    WHERE id = ?;
  `;
  const [registros] = await connection.query(comando, [salaId]);
  return registros[0];
}
