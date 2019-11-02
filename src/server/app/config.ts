export default {
    mongoUri: 'mongodb://localhost:27017/webpricer',
    mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    secretKey: 'toto',
    port: 8080,
};
