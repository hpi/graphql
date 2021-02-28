const { writeFileSync } = require(`fs`)
const { JWK } = require(`jose`)

;(async () => {
  const key = await JWK.generate(`EC`)

  const publicKey = key.toPEM()
  const privateKey = key.toPEM({ passphrase: process.env.PEM_FILE_PASSWORD })

  writeFileSync('pub.pem', publicKey)
  writeFileSync('priv.pem', privateKey)
})()

