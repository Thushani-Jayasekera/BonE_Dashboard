function GetTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const timeString = date.toLocaleTimeString("it-IT");

    return timeString;
}

module.exports = {
    GetTime,
}