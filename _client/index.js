"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const requestsPerSecond = 1;
const totalRequests = 50;
function generateRandomOrder() {
    const market = 'sol_usdc';
    const kinds = ['buy', 'sell'];
    const price = Math.floor(Math.random() * (150 - 140 + 1)) + 140;
    const kind = kinds[Math.floor(Math.random() * kinds.length)];
    const quantity = Math.floor(Math.random() * 10) + 1;
    return {
        kind,
        market,
        price,
        quantity
    };
}
function sendRequests() {
    return __awaiter(this, void 0, void 0, function* () {
        let requestsSent = 0;
        const intervalId = setInterval(() => __awaiter(this, void 0, void 0, function* () {
            if (requestsSent >= totalRequests) {
                clearInterval(intervalId);
                console.log(`Finished sending ${totalRequests} requests.`);
                return;
            }
            const data = generateRandomOrder();
            try {
                const response = yield axios_1.default.post('http://localhost:8000/api/v1/order', data);
                console.log(`Response for Order ${data}:`, response.data);
            }
            catch (error) {
                console.error(`Error sending Order ${data}:`, error);
            }
            requestsSent++;
        }), 1000 / requestsPerSecond);
    });
}
sendRequests();
