const { request, response } = require("express");
const { getCampaigns } = require("../core/database");

const dateFormater = require("../utils/dateFormater.util");
const CsvUtil = require("../utils/csvParser.util");

const ReportController = async (req = request, res = response) => {

    const unparsedDate = req.query.fecha || null;
    const limit = Number(req.query.limit || 10);
    const skip = Number(req.query.skip || 0);

    const parsedDate = dateFormater(unparsedDate);

    let result;

    try {
        result = await getCampaigns(parsedDate, skip, limit);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error en la consulta'
        });
    }

    const record = result.recordset;
    const count = result.rowsAffected;

    const groupedByCampaing = record.reduce((prev, current) => {
        prev[current.ID_campaign] = prev[current.ID_campaign] || [];
        prev[current.ID_campaign].push(current);
        return prev;
    }, Object.create(null));

    const csvUtil = new CsvUtil(groupedByCampaing);
    csvUtil.csvParser();
    const data = csvUtil.zipFiles();
    
    res.set('Content-Type', 'application/zip')
    res.set('Content-Disposition', 'attachment; filename=reports.zip');
    res.set('Content-Length', data.length);
    res.end(data, 'binary');
    return; 
};

module.exports = ReportController;
