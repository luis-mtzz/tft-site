const svLogExceptions = require("./../services/sv.logExceptions");
const summonerController = require("./ct.summoners");
const tftServices = require("../services/sv.tft");
const accountController = require("./ct.account");

// TODO: HANDLE ACCOUNTS WITH NO GAMES/DATA

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
            if (leagueEntries.data.length == 0) {
                return {
                    message: "This account has not played TFT this set yet.",
                };
            }
            console.log({
                IGN: `${gameName}#${tag}`,
                puuid: leagueEntries.data[0].puuid,
                pfp: `https://ddragon.leagueoflegends.com/cdn/14.22.1/img/profileicon/${summonerInformation.profileIconID}.png`,
                tier: leagueEntries.data[0].tier,
                rank: leagueEntries.data[0].rank,
                leaguePoints: leagueEntries.data[0].leaguePoints,
                wins: leagueEntries.data[0].wins,
                losses: leagueEntries.data[0].losses,
            });
            return {
                IGN: `${gameName}#${tag}`,
                pfp: `https://ddragon.leagueoflegends.com/cdn/14.22.1/img/profileicon/${summonerInformation.profileIconID}.png`,
                tier: leagueEntries.data[0].tier,
                rank: leagueEntries.data[0].rank,
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
