module.exports = (params) => {
    const people = parseInt(params.people || 1);
    const accountValue = parseFloat(params.accountValue || 100);
    const consumptionPerPerson = accountValue / people;
    const kwhMonth = accountValue / 0.9; // R$0,90 por kWh (ajustável)
    const nationalAverage = 160; // Média nacional por pessoa (kWh/mês)

    const usageHours = {
        tv: parseFloat(params.tvHours || 0),
        ac: parseFloat(params.acHours || 0),
        shower: parseFloat(params.showerUses || 0),
        computer: parseFloat(params.computerHours || 0),
        fridge: 1 // fixo
    };
    
    const appliances = {
        tv: 0.1, // kWh/h
        fridge: 1.2, // kWh/dia fixo
        ac: 1.5, // kWh/h
        computer: 0.2, // kWh/h
        shower: 5.5 // kWh por 10 min
    };

    let estimatedConsumption = 0;
    let tips = [];

    for (const appliance in usageHours) {
        const hours = usageHours[appliance];
        const kwh = appliances[appliance] || 0;

        if (appliance === "fridge") {
            estimatedConsumption += kwh * 30; // consumo fixo por dia
        } else if (appliance === "shower") {
            estimatedConsumption += (kwh * hours); // assume que "hours" = quantidade de banhos de 10min
        } else {
            estimatedConsumption += (kwh * hours * 30); // horas por dia * 30 dias
        }

        // Sugestões específicas
        if (appliance === "shower" && hours >= 2) {
            tips.push("Tente reduzir o tempo de banho ou usar um chuveiro mais eficiente.");
        }
        if (appliance === "ac" && hours >= 4) {
            tips.push("O ar-condicionado consome bastante. Use ventilador quando possível ou ajuste a temperatura.");
        }
        if (appliance === "tv" && hours > 5) {
            tips.push("Considere desligar a TV quando não estiver assistindo.");
        }
    }

    // Pegada energética
    let footprint, footprintTip;
    if (consumptionPerPerson < 50) {
        footprint = 'Baixa';
        footprintTip = 'Continue assim! Sua casa é eficiente.';
    } else if (consumptionPerPerson < 100) {
        footprint = 'Média';
        footprintTip = 'Você pode economizar usando lâmpadas LED e evitando o stand-by.';
    } else {
        footprint = 'Alta';
        footprintTip = 'Considere investir em painéis solares ou equipamentos mais econômicos.';
    }

    // Comparativo com média nacional
    const diff = consumptionPerPerson - nationalAverage;
    if (diff > 20) {
        tips.push(`Você está consumindo cerca de ${diff.toFixed(1)} kWh a mais que a média nacional por pessoa.`);
    }

    // Simulação com painel solar de 5 kWh/dia (~150 kWh/mês)
    if (kwhMonth <= 150) {
        tips.push("Um sistema solar pequeno (5kWh/dia) poderia zerar sua conta de luz.");
    } else if (kwhMonth <= 300) {
        tips.push("Um sistema solar médio pode reduzir pela metade sua conta de luz.");
    }

    return {
        fulfillmentText: 
                        `Sua pegada energética é **${footprint}**.
                        Dica geral: ${footprintTip}

                        📊 Consumo estimado: ${estimatedConsumption.toFixed(1)} kWh/mês
                        💡 Consumo médio por pessoa: ${consumptionPerPerson.toFixed(1)} kWh
                        📈 Diferença da média nacional: ${diff.toFixed(1)} kWh

                        🔍 Sugestões para economizar:
                        - ${tips.join('\n- ') || 'Tudo certo por aqui! Continue assim.'}`
    };
};
