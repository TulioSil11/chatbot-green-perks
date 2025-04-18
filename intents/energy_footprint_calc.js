module.exports = (params) => {
    const people = parseInt(params.people || 1);
    const accountValue = parseFloat(params.accountValue || 100);
    const consumptionPerPerson = (accountValue / people);
    let footprint, tip;

    if (consumptionPerPerson < 50) {
        footprint = 'Low';
        tip = 'Continue assim! Sua casa é eficiente.';
    } else if (consumptionPerPerson < 100) {
        footprint = 'Medium';
        tip = 'Você pode economizar usando lâmpadas LED e evitando o stand-by.';
    } else {
        footprint = 'High';
        tip = 'Considere investir em painéis solares ou equipamentos mais econômicos.';
    }
      
    return {
        fulfillmentText: `Sua pegada energética é **${footprint}**. Dica: ${tip}`  
    }
};