var POST_URL = "https://61pn2f5a1m.execute-api.us-east-1.amazonaws.com/default/individual-signup";
function onSubmit(e) {
    var form = FormApp.getActiveForm();
    var allResponses = form.getResponses();
    var latestResponse = allResponses[allResponses.length - 1];
    var response = latestResponse.getItemResponses();
    var payload = {};
    payload.formTitle = form.getTitle();
    payload.name = response[0].getResponse();
    payload.email = response[1].getResponse();
    payload.profilePhoto = response[2].getResponse();
    payload.heardAbout = response[3].getResponse();
  
    var options = {
        "method": "post",
        "contentType": "application/json",
        "payload": JSON.stringify(payload)
    };
  UrlFetchApp.fetch(POST_URL, options);
};
