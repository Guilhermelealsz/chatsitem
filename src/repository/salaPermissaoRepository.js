import { connection } from "./connection.js";

export async function inserirPermissao(salaId, usuarioId, aprovado) {
  const comando = `
    INSERT INTO salaPermissao (sala_id, usuario_id, aprovado)
    VALUES (?, ?, ?);
  `;
  const [info] = await connection.query(comando, [salaId, usuarioId, aprovado]);
  return info.insertId;
}

export async function aprovarPermissao(salaId, usuarioId) {
  const comando = `
    UPDATE salaPermissao
    SET aprovado = TRUE
    WHERE sala_id = ? AND usuario_id = ?;
  `;
  const [info] = await connection.query(comando, [salaId, usuarioId]);
  return info.affectedRows > 0;
}

export async function verificarPermissaoSala(salaId, usuarioId) {
  const comando = `
    SELECT id
    FROM salaPermissao
    WHERE sala_id = ? AND usuario_id = ? AND aprovado = TRUE;
  `;
  const [registros] = await connection.query(comando, [salaId, usuarioId]);
  return registros.length > 0;
}
