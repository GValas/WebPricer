export default {
    mongoUri: 'mongodb://localhost:27017/webpricer',
    mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    jwtOptions: {
        ignoreExpiration: true,
        secretKey: 'toto',
        tokenExpiry: '60s',
    },
    port: 3001,
};
