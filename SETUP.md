# Pilon Homes Inspector: stand-alone setup

This version runs on its own website (GitHub Pages, free). It does not need Claude to run. It keeps everything on your phone first and backs up to your Google Drive. Claude-written comments use your own Claude API key (pay per use). Presets, markup and PDFs work without it.

Plan on about 30 to 45 minutes, done once, ideally on a computer.

---

## 1. Put the app on GitHub Pages (free)

1. Sign in at https://github.com (create a free account if needed).
2. Click **+** (top right), then **New repository**.
   - Name: `pilon-inspector`
   - Visibility: **Public** (free accounts need public for Pages).
   - Click **Create repository**.
3. On the new repo page, click **uploading an existing file**. Drag in **all the files from this folder**:
   `index.html`, `sw.js`, `manifest.webmanifest`, `icon-180.png`, `icon-192.png`, `icon-512.png`, `SETUP.md`.
   Click **Commit changes**.
4. Go to **Settings › Pages**. Under **Build and deployment**, set Source to **Deploy from a branch**, Branch **main**, folder **/ (root)**, then **Save**.
5. After a minute or two the page shows your address, something like:
   `https://YOUR-GITHUB-NAME.github.io/pilon-inspector/`
   Write it down. You need it in step 2.

Nothing private is in these files: no keys, no client or agent data. Your inspections never go to GitHub.

## 2. Let the app use your Google Drive

The app signs in to Google as you. Google needs a free "client ID" for that.

1. Go to https://console.cloud.google.com and sign in with the Google account that holds your Pilon Homes Drive.
2. Top bar: **Select a project › New project**. Name it `Pilon Inspector`, then **Create**, and make sure it is selected.
3. Menu **APIs & Services › Library**. Search **Google Drive API**, open it, click **Enable**.
4. Menu **APIs & Services › OAuth consent screen** (may be called **Google Auth Platform**).
   - User type: **External**. App name `Pilon Homes Inspector`. Your email for support and developer contact. Save.
   - Under **Audience** (or **Test users**), click **Add users** and add your own Gmail address. Leave the app in **Testing**.
5. Menu **APIs & Services › Credentials › Create credentials › OAuth client ID**.
   - Application type: **Web application**. Name: `Inspector`.
   - **Authorized JavaScript origins**: `https://YOUR-GITHUB-NAME.github.io`
   - **Authorized redirect URIs**, add both:
     `https://YOUR-GITHUB-NAME.github.io/pilon-inspector/`
     `https://YOUR-GITHUB-NAME.github.io/pilon-inspector/index.html`
   - Click **Create** and copy the **Client ID** (ends in `.apps.googleusercontent.com`).

The first time you connect, Google warns that the app isn't verified. That's expected for your own private app: tap **Continue**. Google keeps you signed in for an hour at a time. The app renews it quietly each time you open it; if it ever asks, tap **Connect Google Drive**.

## 3. Get a Claude API key (for Claude-written comments)

1. Go to https://console.anthropic.com and sign in or create an account.
2. **Billing**: add a payment method and some prepaid credit.
3. **API keys › Create key**. Copy it (starts with `sk-ant-`). You can only see it once.
4. Optional: set a monthly spend limit under **Limits**.

Each "Photo + Claude" comment is one request with up to 3 photos. Current prices are on the Anthropic pricing page.

## 4. Install it on your iPhone

1. Open your GitHub Pages address in **Safari**.
2. Tap **Share › Add to Home Screen › Add**.
3. Open **Inspector** from the home screen (not from Safari) from now on.
4. Go to **Settings › Connections**:
   - Paste the **Google OAuth client ID**, then tap **Connect Google Drive** and sign in.
   - Paste the **Claude API key**, then tap **Test**.
5. Go to the **Agents** tab and tap **Import Spectora CSV** to load your agent list (your `Agent_Export` file from Spectora).

Your key and Google sign-in stay on that phone. Set up each device the same way; your inspections sync between them through Google Drive.

## 5. How it works day to day

- **Offline:** after the first launch, the app opens with no signal. Everything you do is saved on the phone and backs up to Drive when the signal is back. The banner shows what's waiting.
- **Google Drive folders:**
  - `Pilon Homes Inspector Data`: the app's own records. Don't edit or move these files.
  - `Inspections › job folder`: photos and PDF reports (inside your Pilon Office folder).
- **Pilon Office link:** unchanged. **Send to Inspector** in Office, then **Get from Office** here. Office's **Check for report** finds the PDF in Drive.
- **Phone space:** photos stay on the phone so you can work offline. **Settings › Free up phone space** removes photos of published reports that are already in Drive.
- **Updating the app:** when you get a new `index.html`, upload it to the same GitHub repo (replace the old one). The app picks it up the next time it opens online.

## If something goes wrong

- **"redirect_uri_mismatch" from Google:** the address in step 2.5 doesn't exactly match. Copy it from Safari's address bar and add it (with the trailing `/`).
- **"Access blocked / app not verified":** add your Gmail as a test user (step 2.4).
- **Claude test fails:** check the key and that you have credit at console.anthropic.com.
- **Photos missing on a second device:** they download from Drive when you open them, so that device needs a connection the first time.
