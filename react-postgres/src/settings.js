// default to 127.0.0.1:3001
var api_host = "127.0.0.1:3001";

const api_url = "http://" + api_host + "";

const config = {
    map: {
        center: [47.5, 2],
        zoom: 5,
    },
    colors: {
        backgroundColor: [
            "#ff4848", // rouge
            "#00cdb1", // bleu vert
            "#ffc638", // jaune
            "#ffa641", // orange
            "#a0d8e7", // bleu clair
        ],
        borderColor: [
            "rgb(54, 79, 107)",
            "rgb(63, 193, 201)",
            "rgb(252, 81, 133)",
            "rgb(255, 222, 125)",
            "rgb(15, 76, 117)",
            "rgb(187, 225, 250)",
            "rgb(50, 130, 184)",
            "rgb(248, 243, 212)",
        ],
    },
};

module.exports = {
    api_url,
    config,
};