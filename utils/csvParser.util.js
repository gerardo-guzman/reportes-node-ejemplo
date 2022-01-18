const { Parser } = require('json2csv');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const zip = new require('node-zip')();

class CsvUtil {

    csvs = [];
    fileNames = [];

    constructor (jsonResult) {
        this.jsonResult = jsonResult;
    }

    csvParser() {
        try {
            const fields = ['ID_campaign', 'campaign_name', 'fecha', 'country', 'ID_detalle', 'seller', 'total'];
            const options = { fields };
            const parser = new Parser(options);
            Object.keys(this.jsonResult).forEach(key => {
                const csv = parser.parse(this.jsonResult[key]);
                //console.log('CSV', csv);
                this.csvs.push(csv);
            });
        } catch (error) {
            console.error(error);
        }
    }

    saveFileCopy() {
        const promises = [];
        for (const csv in this.csvs) {
            const name = 'temp/' + uuidv4() + '.csv';
            const fileProm = this.writePromiseBased(name, csv);
            promises.push(fileProm);
            this.fileNames.push(name);
        }
        return promises;
    }

    writePromiseBased(name, data) {
        return new Promise((resolve, reject) => {
            fs.write(name, data, (err) => {
                if (err) reject(err);
                resolve(true);
            });
        })
    }

    zipFiles() {
        for (const csv of this.csvs) {
            const name = uuidv4() + '.csv';
            zip.file(name, csv)
        }
        return zip.generate({base64:false,compression:'DEFLATE'});
    }

}



module.exports = CsvUtil;
