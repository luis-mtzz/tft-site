const accountServices = require("./../services/sv.account");
const svLogExceptions = require("./../services/sv.logExceptions");

// This will be the function called to get the information related to Account. Get PUUID from this.

class AccountController {
    async getAccountByGameNameTag(gameName, tag, region) {
        try {
            let accountInformation =
                await accountServices.getAccountByGameNameTag(
                    gameName,
                    tag,
                    region,
                );
            return {
                status: 200,
                puuid: accountInformation.data.puuid,
                gameName: accountInformation.data.gameName,
                tagLine: accountInformation.data.tagLine,
            };
        } catch (ex) {
            svLogExceptions.log(ex, req);
            throw ex;
        }
    }
}

module.exports = new AccountController();
