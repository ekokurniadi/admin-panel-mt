import cryptoJs from "crypto-js"
export default ({ app }, inject) => {
    inject('clog', string => console.log(cryptoJs.AES.encrypt(string, "Secret Passphrase")))
}
