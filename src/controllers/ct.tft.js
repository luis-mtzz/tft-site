const svLogExceptions = require("./../services/sv.logExceptions");
const summonerController = require("./ct.summoners");
const tftServices = require("../services/sv.tft");
const accountController = require("./ct.account");

class TFTController {
    async getLeagueBySummonerID(gameName, tag, region) {
        try {
            let accountInformation =
                await accountController.getAccountByGameNameTag(
                    gameName,
                    tag,
                    region,
                );
            let summonerInformation =
                await summonerController.getSummonerByPUUID(
                    accountInformation.puuid,
                    "NA1",
                );
            let leagueEntries = await tftServices.getLeagueBySummonerID(
                summonerInformation.summonerID,
                "NA1",
            );
            return {
                puuid: leagueEntries.data[0].puuid,
                leagueID: leagueEntries.data[0].leagueId,
                queueType: leagueEntries.data[0].queueType,
                tier: leagueEntries.data[0].tier,
                rank: leagueEntries.data[0].rank,
                summonerID: leagueEntries.data[0].summonerId,
                leaguePoints: leagueEntries.data[0].leaguePoints,
                wins: leagueEntries.data[0].wins,
                losses: leagueEntries.data[0].losses,
            };
        } catch (ex) {
            svLogExceptions.log(ex);
            throw ex;
        }
    }
}

module.exports = new TFTController();
