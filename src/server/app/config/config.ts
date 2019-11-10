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
        tokenExpiry: 3600,  // 1h
    },
    passportOptions: {
        defaultStrategy: 'jwt',
        session: false,
    },
    salt: 10,
    port: 3001,
};
