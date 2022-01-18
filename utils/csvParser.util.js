const { Parser } = require('json2csv');

const csvCreator = (jsonResult = {}) => {
    const csvs = [];
    try {
        const fields = ['ID_campaign', 'campaign_name', 'fecha', 'country', 'ID_detalle', 'seller', 'total'];
        const options = { fields };
        const parser = new Parser(options);
        Object.keys(jsonResult).forEach(key => {
            const csv = parser.parse(jsonResult[key]);
            //console.log('CSV', csv);
            csvs.push(csv);
        });
    } catch (error) {
        console.error(error);
    }
    return csvs;
}

module.exports = csvCreator;
