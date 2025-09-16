import express from "express";
import chatController from "./controller/chatController.js";
import salaeController from "./controller/salaController.js";
import salaPermissaoController from "./controller/salaPermissaoController.js";
import usuarioController from "./controller/usuarioController.js";

export function adicionarRotas(api) {
  api.use(chatController);
  api.use(salaeController);
  api.use(salaPermissaoController);
  api.use(usuarioController);
  api.use("/public/storage", express.static("public/storage"));
}
