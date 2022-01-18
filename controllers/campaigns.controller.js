const { request, response } = require("express");
const { runQuery } = require("../core/database");

const CampaignController = async(req = request, res = response) => {
    const query = 'SELECT * FROM TA_SMS_MAESTRO';
    try {
        const resp = await runQuery(query);
        return res.json({message: 'ok', data: resp.recordset, rowsAffected: resp.rowsAffected});
    } catch (error) {
        return res.status(500).json({message: 'Error en BD'});
    }
};

module.exports = CampaignController
