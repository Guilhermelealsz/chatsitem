import { Router } from "express";
import { getAuthentication } from "../utils/jwt.js";

import * as salaRepo from "../repository/salaRepository.js";
import * as salaPermissaoRepo from "../repository/salaPermissaoRepository.js";

const endpoints = Router();
const autenticador = getAuthentication();

endpoints.post("/sala", autenticador, async (req, resp, next) => {
  try {
    const usuarioLogadoId = req.user.id;
    if (!req.body) {
      return resp.status(400).send({ erro: "Corpo da requisição é obrigatório." });
    }
    const { nome } = req.body;

    if (!nome || typeof nome !== "string" || nome.trim() === "") {
      return resp.status(400).send({ erro: "Nome da sala é obrigatório e deve ser uma string não vazia." });
    }

    const salaId = await salaRepo.inserirSala(nome.trim(), usuarioLogadoId);
    await salaPermissaoRepo.inserirPermissao(salaId, usuarioLogadoId, true);

    resp.status(201).send({ id: salaId });
  } catch (error) {
    next(error);
  }
});

export default endpoints;
