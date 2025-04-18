const energyFootprintCalc = require('./intents/energy_footprint_calc');
const defaultHandler = require('./intents/default');

const handlers = {
    energyFootprintCalc: energyFootprintCalc
}

function handleIntent(intent, parameters) {
    const handler = handlers[intent] || defaultHandler;
    return handler(parameters);
}

module.exports = handleIntent;