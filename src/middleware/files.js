"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loader = void 0;
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
exports.loader = multer_1.default({ dest: path_1.default.join(__dirname, 'tmp') });
