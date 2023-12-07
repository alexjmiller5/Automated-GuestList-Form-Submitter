const TRIGGER_INTERVAL = 30
function createTrigger() {
    // First, clear any existing triggers on the function
    var existingTriggers = ScriptApp.getProjectTriggers();
    for (var i = 0; i < existingTriggers.length; i++) {
        if (existingTriggers[i].getHandlerFunction() === 'submitDataToBigNight') {
            ScriptApp.deleteTrigger(existingTriggers[i]);
        }
    }

    // Create a new time-driven trigger that runs every 30 minutes
    ScriptApp.newTrigger('submitDataToBigNight')
             .timeBased()
             .everyMinutes(TRIGGER_INTERVAL)
             .create();
}