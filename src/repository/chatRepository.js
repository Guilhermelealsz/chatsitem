import { connection } from "./connection.js";

export async function inserirMensagem(usuarioId, salaId, mensagem) {
  const comando = `
    INSERT INTO chat (usuario_id, sala_id, mensagem, criacao)
    VALUES (?, ?, ?, NOW());
  `;
  const [info] = await connection.query(comando, [usuarioId, salaId, mensagem]);
  return info.insertId;
}

export async function listarMensagensPorSala(salaId) {
  const comando = `
    SELECT chat.id,
           chat.usuario_id,
           nome,
           mensagem,
           criacao
    FROM chat
    JOIN usuario ON chat.usuario_id = usuario.id
    WHERE sala_id = ?
    ORDER BY criacao ASC;
  `;
  const [registros] = await connection.query(comando, [salaId]);
  return registros;
}
