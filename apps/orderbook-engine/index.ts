import { Engine } from "./engine";
import { eth_usdc_ob, sol_usdc_ob } from "./orderbook";
import { obm } from "./orderbookmanager";

const engine = new Engine();

obm.push('sol_usdc', sol_usdc_ob)
obm.push('eth_usdc', eth_usdc_ob)
engine.run()
