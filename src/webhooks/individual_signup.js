var POST_URL = "https://61pn2f5a1m.execute-api.us-east-1.amazonaws.com/default/individual-signup";
function onSubmit(e) {
    var form = FormApp.getActiveForm();
    var allResponses = form.getResponses();
    var latestResponse = allResponses[allResponses.length - 1];
    var response = latestResponse.getItemResponses();
    var payload = {};
    payload.name = response[0].getResponse();
    payload.email = response[1].getResponse();
    payload.heardAbout = response[2].getResponse();
  
    var options = {
        "method": "post",
        "contentType": "application/json",
        "payload": JSON.stringify(payload)
    };
  console.log(options.payload);
UrlFetchApp.fetch(POST_URL, options);
};
