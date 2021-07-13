"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var express_1 = __importDefault(require("express"));
var words_1 = __importDefault(require("./routes/words"));
var categories_1 = __importDefault(require("./routes/categories"));
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
var PORT = 3000;
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/words', words_1.default);
app.use('/categories', categories_1.default);
app.use(function (req, res) {
    res.status(404).json({
        statuscode: 404,
        message: 'Page not found',
    });
});
app.use(function (err, req, res) {
    res.status(500).json({
        statuscode: 500,
        message: err.message,
        stack: err.stack,
    });
});
app.set('port', PORT);
app.listen(PORT, function () {
    console.log("Example app listening at http://localhost:" + PORT);
});
