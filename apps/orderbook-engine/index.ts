import { Engine } from "./engine";
import { sol_usdc_ob } from "./orderbook";
import { obm } from "./orderbookmanager";

const engine = new Engine();

obm.push('sol_usdc', sol_usdc_ob)
engine.run()
