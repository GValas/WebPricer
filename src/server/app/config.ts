export default {
    mongoUri: 'mongodb://localhost:27017/webpricer',
    mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    jwtOptions: {
        secretKey: 'toto',
        tokenExpiry: '600s',
    },
    port: 8080,
};
