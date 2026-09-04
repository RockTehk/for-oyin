# For Oyin ♡

A small, sincere, interactive website built as a private love note.

## Files
- `index.html` — website
- `style.css` — visual design and animations
- `script.js` — page transitions, response handling and optional ambient sound
- `config.js` — where you paste your Google Apps Script Web App URL
- `google-apps-script.gs` — optional email notification backend

## Email notification setup
1. Open Google Apps Script and create a new project.
2. Paste the contents of `google-apps-script.gs`.
3. Replace `YOUR_EMAIL_HERE` with the email address where you want responses.
4. Deploy it as a Web App:
   - Execute as: Me
   - Who has access: Anyone
5. Copy the `/exec` URL.
6. Open `config.js` and put the URL into `GAS_ENDPOINT`.
7. Upload/push all files to your website host.

The site still works without email configured; it stores the selected response locally and shows a graceful message.

## Hosting
This is plain HTML/CSS/JS, so it can be hosted on GitHub Pages, Netlify, Vercel, or another static host.

## Note on sound
The site does not require a copyrighted music file. The optional sound button creates a very soft ambient tone in the browser using Web Audio. Browsers generally require the visitor to tap the sound button before audio can start.
