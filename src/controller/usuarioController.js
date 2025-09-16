import * as repo from "../repository/usuarioRepository.js";

import { generateToken } from "../utils/jwt.js";

import { Router } from "express";
const endpoints = Router();

endpoints.post("/usuario", async (req, resp) => {
  let novoLogin = req.body;

  let id = await repo.criarConta(novoLogin);
  resp.send({ novoId: id });
});

endpoints.post("/usuario/login", async (req, resp) => {
  let email = req.body.email;
  let senha = req.body.senha;

  let credenciais = await repo.validarCredenciais(email, senha);
  if (!credenciais) {
    resp.status(401).send({ erro: "Credenciais inválidas" });
  } else {
    let token = generateToken(credenciais);
    resp.send({
      token: token,
    });
  }
});

export default endpoints;
