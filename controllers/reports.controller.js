const { request, response } = require("express");
const { getCampaigns } = require("../core/database");
const fs = require('fs');

const csvCreator = require("../utils/csvParser.util");
const dateFormater = require("../utils/dateFormater.util");

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

    const csvs = csvCreator(groupedByCampaing);
    // const buffered = csvs.map(csv => {
    //     return Buffer.from(csv, )
    // })
    for (const csv in csvs) {
        res.write(Buffer.from(csv))
    }
    return res.json({
        message: 'Ok',
        data: groupedByCampaing
    })
    
};

module.exports = ReportController;
