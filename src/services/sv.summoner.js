class SummonerServices {
    // HTTP METHODS
    static GET = "GET";

    constructor() {
        this.httpClient = require("./sv.httpClient");
    }

    async getSummonerByPUUID(puuid, region) {
        let lowerRegion = region.toLowerCase();
        let url = `https://${lowerRegion}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;
        this.httpClient.Authentication = this.httpClient.RIOT;
        let response = await this.httpClient.submitRequest(
            url,
            SummonerServices.GET,
        );
        if (!response.ok) {
            console.error(
                "Error grabbing summoner from PUUID: ",
                response.error,
            );
        }
        return response;
    }
}

module.exports = new SummonerServices();
