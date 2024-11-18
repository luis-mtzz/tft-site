class AccountServices {
    // HTTP METHODS
    static GET = "GET";

    // REGIONS
    static americas = "AMERICAS";
    static europe = "EUROPE";
    static asia = "ASIA";

    constructor() {
        this.httpClient = require("./sv.httpClient");
    }

    // METHOD TO GET ACCOUNT
    async getAccountByGameNameTag(gameName, tag, region) {
        let lowerRegion = region.toLowerCase();
        let url = `https://${lowerRegion}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tag}`;
        this.httpClient.Authentication = this.httpClient.RIOT;
        let response = await this.httpClient.submitRequest(
            url,
            AccountServices.GET,
        );
        if (!response.ok) {
            console.error(
                "Error grabbing account by GameName and Tag: ",
                response.error,
            );
        }
        return response;
    }
}

module.exports = new AccountServices();
