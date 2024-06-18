"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/app.ts
var app_exports = {};
__export(app_exports, {
  app: () => app
});
module.exports = __toCommonJS(app_exports);
var import_fastify = __toESM(require("fastify"));

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

// src/routes/auth.router.ts
async function AuthRoutes(app2) {
  app2.get("/teste", auth_controller_default.teste);
  app2.post("/login", auth_controller_default.login);
  app2.get("/refresh", auth_controller_default.refresh);
  app2.put("/logout", auth_controller_default.logout);
}

// src/app.ts
var app = (0, import_fastify.default)();
app.get("/", (req, reply) => {
  reply.send({ message: "TESTE OK" });
});
app.register(AuthRoutes, { prefix: "/auth" });
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app
});
