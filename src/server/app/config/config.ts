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
        tokenExpiry: 60 * 60,       // 1h
    },
    passportOptions: {
        defaultStrategy: 'jwt',
        session: false,
    },
    rateLimit: {
        windowMs: 15 * 60 * 1000,   // 15 minutes
        maxRequestPerMs: 100,       // limit each IP to 100 requests per windowMs
    },
    salt: 10,
    port: 3001,
};
