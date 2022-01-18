const { Router } = require("express");
const CampaignController = require("../controllers/campaigns.controller");
const ReportController = require("../controllers/reports.controller");

const reportsRouter = Router();

reportsRouter.get('', ReportController);
reportsRouter.get('/campaigns', CampaignController);

module.exports = reportsRouter;
