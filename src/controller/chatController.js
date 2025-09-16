import { Router } from "express";
import { getAuthentication } from "../utils/jwt.js";

import * as salaPermissaoRepo from "../repository/salaPermissaoRepository.js";
import * as chatRepo from "../repository/chatRepository.js";

const endpoints = Router();
const autenticador = getAuthentication();

endpoints.post("/chat/:sala", autenticador, async (req, resp, next) => {
  const usuarioLogadoId = req.user.id;
  const salaId = req.params.sala;
  const { mensagem } = req.body;

  const temPermissao = await salaPermissaoRepo.verificarPermissaoSala(
    salaId,
    usuarioLogadoId
  );
  if (!temPermissao) {
    return resp
      .status(403)
      .send({
        erro: "Usuário não tem permissão para enviar mensagens nesta sala",
      });
  }

  const mensagemId = await chatRepo.inserirMensagem(
    usuarioLogadoId,
    salaId,
    mensagem
  );
  resp.status(201).send({ id: mensagemId });
});

endpoints.get("/chat/:sala", autenticador, async (req, resp, next) => {
  const usuarioLogadoId = req.user.id;
  const salaId = req.params.sala;

  const temPermissao = await salaPermissaoRepo.verificarPermissaoSala(
    salaId,
    usuarioLogadoId
  );
  if (!temPermissao) {
    return resp
      .status(403)
      .send({
        erro: "Usuário não tem permissão para visualizar mensagens nesta sala",
      });
  }

  const mensagens = await chatRepo.listarMensagensPorSala(salaId);
  resp.send(mensagens);
});

export default endpoints;
