var POST_URL = "https://q95mtbuell.execute-api.us-east-1.amazonaws.com/default/team-signup";
function onSubmit(e) {
    var form = FormApp.getActiveForm();
    var allResponses = form.getResponses();
    var latestResponse = allResponses[allResponses.length - 1];
    var response = latestResponse.getItemResponses();
    var payload = {};
    payload.formTitle = form.getTitle();
    payload.submitterName = response[0].getResponse();
    payload.submitterEmail = response[1].getResponse();
    payload.projectName = response[2].getResponse();
    payload.heardAbout = response[3].getResponse();
    payload.teamMembers = [];
    i = 4;
    while (i < response.length) {
      payload.teamMembers.push({
        'name': response[i].getResponse(),
        'email': response[i + 1].getResponse(),
      });
      i += 3;
    }

    var options = {
        "method": "post",
        "contentType": "application/json",
        "payload": JSON.stringify(payload)
    };
  console.log(options.payload);
UrlFetchApp.fetch(POST_URL, options);
};