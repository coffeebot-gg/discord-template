require('dotenv').config();
const { DISCORD_TOKEN, DISCORD_IDS } = require('../../config');
const Stats = require('sharding-stats');
const express = require('express');
const logger = require('../../util/logger.js');
const app = express();

const port = 3000;
const token = DISCORD_TOKEN();
const { client_id, client_secret } = DISCORD_IDS();

const StatsServer = new Stats.Server(app, {
    selfHost: false, // set it to true, to "self-host" the stats websites via your APP, by doing StatsServer.getStatsData(); | Data is sent via: "POST /stats" - that endpoint will be automatically assigned by the Server, if your app is a valid APP Server
    bannedUsers: [],
    bot: {
        name: "CoffeeBot",
        icon: "Your Discord Bot Avatar URL",
        website: `http://localhost:${port}/`,
        client_id: client_id,
        client_secret: client_secret
    },
    stats_uri: "http://localhost:3000/", //Base URL. Can be IP:PORT or Domains behind a proxy or just a Domain.
                                         // https://domain.com | https://repository.username.repl.co | https://server.stats-of-me.xyz
    redirect_uri: "http://localhost:3000/login", //Landing Page
    owners: ["Bot_Owner1", "Bot_Owner2"],
    authorizationkey: "Your Password for verifying requests",
});

StatsServer.on('error', console.log)

app.listen(port, () => {
    logger('web', `Application started, listening on port ${port}!`);
});

app.get("/statuspage", (req, res) => {
    const data = StatsServer.getStatsData().raw.shards
    const sorted = StatsServer.chunkShardsToClusterArrays(data)
    let statsBody = "";
    const shardMap = x => `<div class="col-auto"><span class="text bg-dark p-4 rounded" style="color: ${x.color}" data-bs-toggle="tooltip" data-bs-html="true" title="<b>${x.statusText}</b>">#${x.id}</span></div>`;
    for(const { cluster, shards } of sorted) statsBody += `<h2 class="m-4 mt-5">Cluster Id: ${cluster}</h2><div class="row gx-5">${shards.map(shardMap).join("")}</div>`
    // set header for html content
    res.setHeader('Content-type','text/html');
    // send status page with auto-reloader and more
    res.send(`<html><head><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></head><body>
    
    <!-- Here is your bootstrap website code-->
    <div class="container px-4"><h1>Bot | Status</h1>${statsBody}</div>
    
    <!-- auto-reload page every X ms -->
    <script> setInterval(() => location.reload(true), 20000)</script>
    <!-- Bootstrap scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script>var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) { return new bootstrap.Tooltip(tooltipTriggerEl); });</script>
    </body></html>`);
});


function receiveStatsDataManually() {
    return StatsServer.getStatsData(); // { raw, pretty }; // (raw|pretty).(shards|total);
}