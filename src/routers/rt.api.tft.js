const tftController = require("./../controllers/ct.tft");

module.exports = function (app) {
    app.get("/api/v1/tft/summoner", async function (req, res) {
        const { gameName, tag, region } = req.query;
        console.log(req.query);
        if (!gameName || !tag || !region) {
            return res.status(400).json({
                success: false,
                message:
                    "Please include a gamename, tag, and region when searching for a summoner.",
            });
        }

        try {
            const summonerInfo = await tftController.getLeagueBySummonerID(
                gameName,
                tag,
                region,
            );
            return res.status(200).json({
                success: true,
                message: summonerInfo,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Error occured:",
                data: error,
            });
        }
    });
};
