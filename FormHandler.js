function doGet(e) {
    try {
        var template = HtmlService.createTemplateFromFile('Form.html');
        template.url = ScriptApp.getService().getUrl();
        Logger.log('Displaying web form.');
        return template.evaluate();
    } catch (e) {
        Logger.log('Error displaying web form: ' + e.toString());
        return HtmlService.createHtmlOutput('Error displaying form.');
    }
}
function doPost(e) {
    var responseMessage = '';

    try {
        var newSheetUrl = e.parameter.sheetUrl;
        var userEmail = e.parameter.userEmail;
        var userName = e.parameter.userName;

        // Validate the name format
        if (!/^[A-Za-z]+ [A-Za-z]+$/.test(userName)) {
            responseMessage += 'Name must be in the format: Firstname Lastname.\n';
        }

        // Validate email format
        if (!/\S+@\S+\.\S+/.test(userEmail)) {
            responseMessage += 'Invalid email format.\n';
        }

        // Validate Google Sheets URL format
        if (!/^https:\/\/docs\.google\.com\/spreadsheets\/d\/[a-zA-Z0-9-_]+\/edit#gid=\d+$/.test(newSheetUrl)) {
            responseMessage += 'Invalid Google Sheets URL format.\n';
        }

        if (responseMessage === '') {
            // Add the user using the addUser function
            addAmbassador(newSheetUrl, userEmail, userName);
            Logger.log('New user added: ' + userName);

            responseMessage = '<div style="font-family: Arial, sans-serif; text-align: center; background: #f4f4f4; color: #333; padding: 20px;">' +
                              '<h2 style="color: #50b3a2;">Confirmation</h2>' +
                              '<p>User <strong>' + userName + '</strong> (' + userEmail + ') has been successfully added to the Guest List Submission Automation.</p>' +
                              '<p>Your Spreadsheet URL: <a href="' + newSheetUrl + '" style="color: #50b3a2;">' + newSheetUrl + '</a></p>' +
                              '<p>Thank you for registering!</p>' +
                              '</div>';
        }

        return HtmlService.createHtmlOutput(responseMessage);
    } catch (e) {
        Logger.log('Error in form submission: ' + e.toString());
        responseMessage = '<div style="font-family: Arial, sans-serif; text-align: center; background: #f4f4f4; color: #333; padding: 20px;">' +
                          '<p>Error in form submission.</p>' +
                          '</div>';
        return HtmlService.createHtmlOutput(responseMessage);
    }
}