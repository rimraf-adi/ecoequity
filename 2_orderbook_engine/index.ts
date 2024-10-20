import { Engine } from "./engine";
import { eth_usdc_ob, sol_usdc_ob } from "./orderbook";

const engine = new Engine();
engine.pushBooks('sol_usdc', sol_usdc_ob)
engine.pushBooks('eth_usdc', eth_usdc_ob)
engine.run()
