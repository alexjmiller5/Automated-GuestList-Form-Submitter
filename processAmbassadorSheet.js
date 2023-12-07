function processAmbassadorSheet(spreadsheetUrl) {
    Logger.log("Starting processAmbassadorSheet for URL: " + spreadsheetUrl);

    // Get the spreadsheet data
    var spreadsheet = SpreadsheetApp.openByUrl(spreadsheetUrl);
    var sheet = spreadsheet.getSheets()[0];
    var dataRange = sheet.getDataRange();
    var data = dataRange.getValues();

    Logger.log("Retrieved data from spreadsheet");

    var recentData = [];
    var now = new Date();
    var thirtyMinutesAgo = new Date(now.getTime() - TRIGGER_INTERVAL * 60000); // 30 minutes ago

    Logger.log("Processing data for entries within the last 30 minutes");

    for (var i = 1; i < data.length; i++) {
        var rowDate = new Date(data[i][0]);
        if (rowDate > thirtyMinutesAgo) {
            recentData.push(data[i]);
        }
    }

    Logger.log("Processed " + recentData.length + " recent entries");
    Logger.log("Completed processAmbassadorSheet for URL: " + spreadsheetUrl);

    return recentData;
}