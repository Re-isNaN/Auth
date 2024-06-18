"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/api/controllers/auth.controller.ts
var auth_controller_exports = {};
__export(auth_controller_exports, {
  default: () => auth_controller_default,
  logout: () => logout,
  refresh: () => refresh
});
module.exports = __toCommonJS(auth_controller_exports);

// src/errors/gerarErros.ts
var CustomError = class extends Error {
  constructor(objectError) {
    super(objectError.message);
    this.name = "CustomError";
    this.statusCode = objectError.statusCode || 500;
    this.local = objectError.local;
    if (!objectError.typeError) {
      if (objectError.statusCode >= 500) {
        const errorsHTTPCodes = {
          "500": "Erro do Servidor Interno",
          "501": "Erro l\xF3gica n\xE3o implementada",
          "502": "Erro servi\xE7o requisitado inconsistente",
          "503": "Erro servi\xE7o indispon\xEDvel",
          "504": "Erro tempo limite de resposta atingido",
          "505": "Erro vers\xE3o HTTP n\xE3o suportada"
        };
        const statusCodeKey = objectError.statusCode.toString() || Number;
        this.typeError = errorsHTTPCodes[statusCodeKey] || "Erro do Servidor Interno";
      } else if (objectError.statusCode >= 400) {
        const errorsHTTPCodes = {
          "400": "Erro solicita\xE7\xE3o inv\xE1lida",
          "401": "Erro de autentica\xE7\xE3o",
          "403": "Erro de autoriza\xE7\xE3o",
          "404": "Erro p\xE1gina n\xE3o encontrada",
          "406": "Erro requisi\xE7\xE3o negada",
          "408": "Erro tempo de solicita\xE7\xE3o esgotado",
          "409": "Erro solicita\xE7\xE3o conflituosa",
          "410": "Erro comunica\xE7\xE3o perdida"
        };
        const statusCodeKey = objectError.statusCode.toString() || Number;
        this.typeError = errorsHTTPCodes[statusCodeKey] || "Erro solicita\xE7\xE3o inv\xE1lida";
      } else {
        this.typeError = "Erro do Servidor Interno";
      }
    } else {
      this.typeError = objectError.typeError;
    }
  }
};

// src/api/controllers/auth.controller.ts
async function teste(req, reply) {
  try {
    reply.send("Token v\xE1lido");
  } catch (err) {
    const objectError = { message: "Erro na verifica\xE7\xE3o de token", statusCode: 401, local: "controller/auth  teste()", typeError: "Erro de autentica\xE7\xE3o" };
    throw new CustomError(objectError);
  }
}
async function login(req, reply) {
  try {
  } catch (err) {
  }
}
async function refresh(req, reply) {
  try {
  } catch (err) {
  }
}
async function logout(req, reply) {
  try {
  } catch (err) {
  }
}
var auth_controller_default = { teste, login, refresh, logout };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  logout,
  refresh
});
