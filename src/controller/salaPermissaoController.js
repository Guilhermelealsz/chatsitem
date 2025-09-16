import { Router } from "express";
import { getAuthentication } from "../utils/jwt.js";

import * as salaPermissaoRepo from "../repository/salaPermissaoRepository.js";
import * as salaRepo from "../repository/salaRepository.js";

const endpoints = Router();
const autenticador = getAuthentication();

//---------------------------------- Usuário pede para entrar em uma sala (aprovado = false)
endpoints.post("/sala/:sala/entrar", autenticador, async (req, resp, next) => {
  const usuarioLogadoId = req.user.id;
  const salaId = req.params.sala;

  //--------------------------------- Cria a permissão com aprovado = false
  const permissaoId = await salaPermissaoRepo.inserirPermissao(
    salaId,
    usuarioLogadoId,
    false
  );

  resp.status(201).send({ id: permissaoId });
});

//---------------------------------- Criador da sala aprova outro usuário
endpoints.post(
  "/sala/:sala/aprovar/:usuario",
  autenticador,
  async (req, resp, next) => {
    const usuarioLogadoId = req.user.id;
    const salaId = req.params.sala;
    const usuarioId = req.params.usuario;

    //---------------------------------- Verifica se o usuário logado é o criador da sala
    const sala = await salaRepo.buscarSalaPorId(salaId);
    if (!sala || sala.usuario_id !== usuarioLogadoId) {
      return resp
        .status(403)
        .send({ erro: "Apenas o criador da sala pode aprovar usuários" });
    }

    //----------------------------------- Aprova o usuário
    const aprovado = await salaPermissaoRepo.aprovarPermissao(
      salaId,
      usuarioId
    );
    if (!aprovado) {
      return resp.status(404).send({ erro: "Permissão não encontrada" });
    }

    resp.send({ mensagem: "Usuário aprovado" });
  }
);

export default endpoints;
