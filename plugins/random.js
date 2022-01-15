export default ({ app }, inject) => {
    inject('uniqueID', result => {
        let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 25; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result.match(/.{1,5}/g).join('-');
    })
}