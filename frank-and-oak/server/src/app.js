const express = require('express')
const {
     adminPanelRouter,
      websiteRouter,
       appRouter
     } = require('./routes/routes')


const allRoutes = express.Router()
allRoutes.use('/admin-panel', adminPanelRouter)
allRoutes.use('/website', websiteRouter)
allRoutes.use('/app', appRouter)

module.exports = allRoutes;