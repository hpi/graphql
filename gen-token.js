const { readFileSync } = require(`fs`)
const { JWT, JWK } = require(`jose`)

;(async () => {
  const key = JWK.asKey(readFileSync(`./priv.pem`), {
    passphrase: process.env.PEM_FILE_PASSWORD
  })

  const token = JWT.sign({
    sub: `watchers`,
    iss: process.env.ISSUER,
    claims: [
      `*`
    ]
  }, key)

  process.stdout.write(token)
})()
