import { google } from "googleapis"
import * as http from "node:http"
import * as url from "node:url"

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const REDIRECT_URI = "http://localhost:3333/callback"

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "\n❌ Missing env vars. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local\n"
  )
  process.exit(1)
}

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: ["https://www.googleapis.com/auth/photoslibrary.readonly"],
  prompt: "consent",
})

console.log("\n1. Open this URL in your browser:\n")
console.log(authUrl)
console.log("\n2. Authorize, then wait — the script captures the token automatically.\n")

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url ?? "", true)
  if (parsed.pathname !== "/callback") {
    res.end("Waiting for OAuth callback...")
    return
  }

  const code = parsed.query.code as string | undefined
  if (!code) {
    res.end("No code received.")
    server.close()
    return
  }

  try {
    const { tokens } = await oauth2Client.getToken(code)
    res.end("✅ Authorization successful! You can close this tab.")
    server.close()

    if (!tokens.refresh_token) {
      console.error(
        "\n⚠️  No refresh_token returned. Revoke access at https://myaccount.google.com/permissions and re-run.\n"
      )
      return
    }

    console.log("\n✅ Add these to Vercel env vars AND .env.local:\n")
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}\n`)
    console.log("⚠️  Never commit this value to git.\n")
  } catch (err) {
    res.end("Error. Check console.")
    console.error(err)
    server.close()
  }
})

server.listen(3333, () => {
  console.log("Listening on http://localhost:3333/callback ...\n")
})
