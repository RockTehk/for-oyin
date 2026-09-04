const RECIPIENT_EMAIL = "YOUR_EMAIL_HERE";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    const choice = data.choice || "No choice";
    const time = data.timestamp || new Date().toISOString();

    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject: "Oyin replied to your little website ♡",
      htmlBody:
        "<h2>Oyin replied ❤️</h2>" +
        "<p><b>Choice:</b> " + escapeHtml(choice) + "</p>" +
        "<p><b>Time:</b> " + escapeHtml(time) + "</p>"
    });

    return ContentService
      .createTextOutput(JSON.stringify({ok:true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ok:false,error:String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;")
    .replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
