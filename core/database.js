const sql = require('mssql');
const dbconfig = require('./db.config');

const runQuery = (query) => {
    // Promise based query
    return sql.connect(dbconfig).then((pool) => {
        return pool.query(query);
    })
};

const getCampaigns = (fecha, skip, limit) => {
    return sql.connect(dbconfig).then((pool) => {
        return pool.request()
            .input('fecha', sql.Date, fecha)
            .input('skip', sql.Int, skip)
            .input('limit', sql.Int, limit)
            .execute('sp_get_campaigns_details')
    });
}

module.exports = {
    runQuery, getCampaigns
};
