const svLogExceptions = require("./../services/sv.logExceptions");
const summonerServices = require("./../services/sv.summoner");

class SummonerController {
    // Use PUUID to get SummonerID
    async getSummonerByPUUID(puuid, region) {
        try {
            let accountInformation = await summonerServices.getSummonerByPUUID(
                puuid,
                region,
            );
            return {
                status: 200,
                summonerID: accountInformation.data.id,
                accountID: accountInformation.data.accountId,
                puuid: accountInformation.data.puuid,
                profileIconID: accountInformation.data.profileIconId,
                summonerLevel: accountInformation.data.summonerLevel,
            };
        } catch (ex) {
            svLogExceptions.log(ex);
            throw ex;
        }
    }
}

module.exports = new SummonerController();
