export default{
    jwt: {
        secret: `${process.env.RESET_SECRET}`,
        expireIn: '1h'
    }
}