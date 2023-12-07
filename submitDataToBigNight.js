function submitDataToBigNight() {
  Logger.log("Starting submitDataToBigNight function");

  allAmbassadorData = getAllAmbassadorData();
  Logger.log("Retrieved all ambassador data");

  for (var j = 0; j < allAmbassadorData.length; j++) { // Corrected the loop condition
    ambassadorData = allAmbassadorData[j];
    ambassadorName = ambassadorData[2];
    ambassadorEmail = ambassadorData[1];
    ambassadorSheetUrl = ambassadorData[0];

    Logger.log("Processing data for ambassador: " + ambassadorName);

    guestListData = processAmbassadorSheet(ambassadorSheetUrl);
    Logger.log("Processed guest list data from the sheet URL");

    var recentGuestListData = []; // Array to store details of guests added in this cycle

    for (var i = 0; i < guestListData.length; i++) {
      guestData = guestListData[i];
      guestName = guestData[1];
      numGuests = guestData[2];
      guestPhoneNumber = guestData[3];
      guestEventName = guestData[4];

      // Add this guest's details to recentGuestListData
      recentGuestListData.push(guestData);

      // Big Night prefilled link: https://docs.google.com/forms/d/e/1FAIpQLSc-A6yjtySvmXDtumIHTgl-kCkh41VEGMyrhfs5RBistpFqZw/viewform?usp=pp_url&entry.21572979=full+name&entry.1858231478=num+additional+guests&entry.1467926162=phone+number&entry.628655428=The+Grand+-+XANDRA+(Friday+12/8)&entry.1385743268=Ross+McGregor
      // Big Night Form Url:
      // Real Url:
      // var bigNightFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSc-A6yjtySvmXDtumIHTgl-kCkh41VEGMyrhfs5RBistpFqZw/formResponse'
      // payload = {
      //   'entry.21572979': guestName, // Full Name
      //   'entry.1858231478': numGuests, // Number of Additional Guests
      //   'entry.1467926162': guestPhoneNumber, // Phone Number Field
      //   'entry.628655428': guestEventName, // Event Name
      //   'entry.1385743268': ambassadorName // Ambassador Name
      // }
      
      // Test form prefilled link: https://docs.google.com/forms/d/e/1FAIpQLSfbrJW2znzr2fXFSMYpQO2cXw04Y9swLK5S17SNysj4rWws_A/viewform?usp=pp_url&entry.1060629931=name&entry.305628316=guests&entry.955910225=hpone&entry.2138022657=Shrine+Foxwoods+-+Donny+D+(Saturday+12/9)&entry.2013515785=Ross+McGregor
      // Test form info:
      var bigNightFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfbrJW2znzr2fXFSMYpQO2cXw04Y9swLK5S17SNysj4rWws_A/formResponse'
      payload = {
        'entry.1060629931': guestName,
        'entry.305628316': numGuests,
        'entry.955910225': guestPhoneNumber,
        'entry.2138022657': guestEventName,
        'entry.2013515785': ambassadorName
      }

      var options = {
        'method': 'post',
        'payload': payload
      };

      // Submit the form
      var response = UrlFetchApp.fetch(bigNightFormUrl, options);
      // Logger.log(response.getContentText());
      Logger.log('Submitted Big Night form for ' + guestName + ' with ' + numGuests + ' guests under phone number ' + guestPhoneNumber + ' for the ' + guestEventName + ' event')
    }

    if (recentGuestListData.length > 0) {
        Logger.log("New guests found, preparing email");

        // Prepare email content
        var subject = 'New Guests Added to the Guest List';
        var message = 'New guests have been added to the guest list in the last 30 minutes.\n\n';
        message += 'Details:\n';

        // Add details of each new entry
        recentGuestListData.forEach(function(row) {
            message += 'Name: ' + row[1] + '\n'; // Assuming name is in the second column
            message += 'Number of Guests: ' + row[2] + '\n'; // Number of Guests
            message += 'Phone Number: ' + row[3] + '\n'; // Phone Number
            message += 'Event Name: ' + row[4] + '\n\n'; // Event Name
        });

        // Send email notification
        GmailApp.sendEmail(ambassadorEmail, subject, message);
        Logger.log("Email sent to: " + ambassadorEmail);
    } else {
        Logger.log("No new guests for ambassador: " + ambassadorName);
    }
  }

  Logger.log("Completed submitDataToBigNight function");
}