class TFTServices {
    // HTTP METHODS
    static GET = "GET";

    // RANKS
    static IRON = "IRON";
    static BRONZE = "BRONZE";
    static SILVER = "SILVER";
    static GOLD = "GOLD";
    static PLATINUM = "PLATINUM";
    static EMERALD = "EMERALD";
    static DIAMOND = "DIAMOND";

    // DIVISIONS
    static one = "I";
    static two = "II";
    static three = "III";
    static four = "IV";

    // QUEUES
    static rankedTFT = "RANKED_TFT";
    static doubleUp = "RANKED_TFT_DOUBLE_UP";

    // REGIONS
    static brazil = "BR1";
    static europeNorth = "EUN1";
    static europeWest = "EUW1";
    static japan = "JP1";
    static korea = "KR";
    static latinAmericaOne = "LA1";
    static latinAmericaTwo = "LA2";
    static middleEast = "ME1";
    static northAmerica = "NA1";
    static oceania = "OC1";
    static phillipines = "PH2";
    static russia = "RU";
    static singapore = "SG2";
    static thailand = "TH2";
    static turkey = "TR1";
    static taiwan = "TW2";
    static vietnam = "VN2";

    constructor() {
        this.httpClient = require("./sv.httpClient");
    }

    // METHODS TO GET TOP LEAGUES
    async getChallengerLeague(region, queue) {
        let lowerRegion = region.toLowerCase();
        let url = `https://${lowerRegion}.api.riotgames.com/tft/league/v1/challenger?queue=${queue}`;
        this.httpClient.Authentication = this.httpClient.RIOT;
        let response = await this.httpClient.submitRequest(
            url,
            TFTServices.GET,
        );
        if (!response.ok) {
            console.error("Error grabbing Challenger League: ", response.error);
        }
        return response;
    }

    async getGrandMasterLeague(region, queue) {
        let lowerRegion = region.toLowerCase();
        let url = `https://${lowerRegion}.api.riotgames.com/tft/league/v1/grandmaster?queue=${queue}`;
        this.httpClient.Authentication = this.httpClient.RIOT;
        let response = await this.httpClient.submitRequest(
            url,
            TFTServices.GET,
        );
        if (!response.ok) {
            console.error(
                "Error grabbing Grandmaster League: ",
                response.error,
            );
        }
        return response;
    }

    async getMasterLeague(region, queue, token) {
        let lowerRegion = region.toLowerCase();
        let url = `https://${lowerRegion}.api.riotgames.com/tft/league/v1/master?queue=${queue}`;
        this.httpClient.Authentication = this.httpClient.RIOT;
        let response = await this.httpClient.submitRequest(
            url,
            TFTServices.GET,
        );
        if (!response.ok) {
            console.error("Error grabbing Master League: ", response.error);
        }
        return response;
    }

    async getLeagueBySummonerID(summonerID, region) {
        let lowerRegion = region.toLowerCase();
        let url = `https://${lowerRegion}.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerID}`;
        this.httpClient.Authentication = this.httpClient.RIOT;
        let response = await this.httpClient.submitRequest(
            url,
            TFTServices.GET,
        );
        if (!response.ok) {
            console.error("Error grabbing league entries: ", response.error);
        }
        return response;
    }
}

module.exports = new TFTServices();
