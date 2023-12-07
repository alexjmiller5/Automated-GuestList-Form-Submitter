var AMBASSADOR_DATA_SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/1LU0w1xpdd9PaME82EAdv5ODKOHPDH2goG7bQRm1BexE/edit?usp=sharing";

function getSpreadsheet() {
  return SpreadsheetApp.openByUrl(AMBASSADOR_DATA_SPREADSHEET_URL);
}

// Function to add a new Ambassador
function addAmbassador(url, email, name) {
  var sheet = getSpreadsheet().getActiveSheet();
  sheet.appendRow([url, email, name]);
}

// Function to get a Ambassador's spreadsheet URL by email
function getAmbassadorSpreadsheetByEmail(email) {
  var sheet = getSpreadsheet().getActiveSheet();
  var data = sheet.getRange("A2:C" + sheet.getLastRow()).getValues(); // Adjust the range to exclude the first row

  for (var i = 0; i < data.length; i++) {
    if (data[i][1] === email) { // Email is in the second column
      return data[i][0]; // URL is in the first column
    }
  }
  return null;
}

// Function to get all Ambassador data into a list
function getAllAmbassadorData() {
  var sheet = getSpreadsheet().getActiveSheet();
  return sheet.getRange("A2:C" + sheet.getLastRow()).getValues(); // Adjust the range to exclude the first row
}

// Function to delete a Ambassador's data
function deleteAmbassadorByEmail(email) {
  var sheet = getSpreadsheet().getActiveSheet();
  var data = sheet.getRange("A2:C" + sheet.getLastRow()).getValues(); // Adjust the range to exclude the first row

  for (var i = 0; i < data.length; i++) {
    if (data[i][1] === email) { // Email is in the second column
      sheet.deleteRow(i + 2); // Adjust for zero-indexed array and header row
      break;
    }
  }
}

function tester() {
  // Test data
  var testUrl = "https://example.com/spreadsheet";
  var testEmail = "test@example.com";
  var testName = "Test Ambassador";

  // Test addAmbassador
  Logger.log("Testing addAmbassador...");
  addAmbassador(testUrl, testEmail, testName);
  Logger.log("addAmbassador executed.");

  // Test getAmbassadorSpreadsheetByEmail
  Logger.log("Testing getAmbassadorSpreadsheetByEmail...");
  var retrievedUrl = getAmbassadorSpreadsheetByEmail(testEmail);
  Logger.log("getAmbassadorSpreadsheetByEmail returned: " + retrievedUrl);

  // Verify if the retrieved URL matches the test URL
  if (retrievedUrl === testUrl) {
    Logger.log("getAmbassadorSpreadsheetByEmail - Success.");
  } else {
    Logger.log("getAmbassadorSpreadsheetByEmail - Failed.");
  }

  // Test getAllAmbassadorData
  Logger.log("Testing getAllAmbassadorData...");
  var allAmbassadorData = getAllAmbassadorData();
  Logger.log("getAllAmbassadorData returned: ");
  Logger.log(allAmbassadorData);

  // Test deleteAmbassadorByEmail
  Logger.log("Testing deleteAmbassadorByEmail...");
  deleteAmbassadorByEmail(testEmail);
  Logger.log("deleteAmbassadorByEmail executed.");

  // Verify deletion
  var postDeletionData = getAllAmbassadorData();
  var isDeleted = true;
  for (var i = 0; i < postDeletionData.length; i++) {
    if (postDeletionData[i][1] === testEmail) {
      isDeleted = false;
      break;
    }
  }
  if (isDeleted) {
    Logger.log("deleteAmbassadorByEmail - Success.");
  } else {
    Logger.log("deleteAmbassadorByEmail - Failed.");
  }
}

function testWithMultipleAmbassadors() {
  // Array of test Ambassadors (each Ambassador is an object with url, email, and name)
  var testAmbassadors = [
    { url: "https://example.com/spreadsheet1", email: "Ambassador1@example.com", name: "Ambassador One" },
    { url: "https://example.com/spreadsheet2", email: "Ambassador2@example.com", name: "Ambassador Two" },
    { url: "https://example.com/spreadsheet3", email: "Ambassador3@example.com", name: "Ambassador Three" },
    // Add more test Ambassadors as needed
  ];

  // Test addAmbassador for each Ambassador
  Logger.log("Testing addAmbassador for multiple ambassadors...");
  testAmbassadors.forEach(function(ambassador) {
    addAmbassador(ambassador.url, ambassador.email, ambassador.name);
  });
  Logger.log("addAmbassador executed for all test ambassadors.");

  // Test getAmbassadorSpreadsheetByEmail and validation for each Ambassador
  Logger.log("Testing getAmbassadorSpreadsheetByEmail for multiple ambassadors...");
  testAmbassadors.forEach(function(ambassador) {
    var retrievedUrl = getAmbassadorSpreadsheetByEmail(ambassador.email);
    if (retrievedUrl === ambassador.url) {
      Logger.log("Success: Retrieved correct URL for " + ambassador.email);
    } else {
      Logger.log("Failed: Incorrect URL for " + ambassador.email);
    }
  });

  // Test getAllAmbassadorData
  Logger.log("Testing getAllAmbassadorData...");
  var allAmbassadorData = getAllAmbassadorData();
  Logger.log("All ambassador data:");
  Logger.log(allAmbassadorData);

  // Test deleteAmbassadorByEmail for each Ambassador
  Logger.log("Testing deleteAmbassadorByEmail for multiple ambassadors...");
  testAmbassadors.forEach(function(ambassador) {
    deleteAmbassadorByEmail(ambassador.email);
  });
  Logger.log("deleteAmbassadorByEmail executed for all test ambassadors.");

  // Verify deletion for each Ambassador
  var postDeletionData = getAllAmbassadorData();
  testAmbassadors.forEach(function(ambassador) {
    var isDeleted = true;
    for (var i = 0; i < postDeletionData.length; i++) {
      if (postDeletionData[i][1] === ambassador.email) {
        isDeleted = false;
        break;
      }
    }
    if (isDeleted) {
      Logger.log("Success: Deleted " + ambassador.email);
    } else {
      Logger.log("Failed: Not deleted " + ambassador.email);
    }
  });
}
