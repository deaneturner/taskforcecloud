module.exports = {
    secretKey: 'jesusislord',
    server: {
        name: 'Task Force Cloud API',
        version: '1.0.0',
        port: process.env.PORT || 8000
    },
    database: {
        'mongoUrl': 'mongodb://heroku_z92f2c7p:jvpc24pav8njo2flojm1bmm3rd@ds019886.mlab.com:19886/heroku_z92f2c7p'
    },
    session: {
        default: {
            duration: 10,
            interval: 's' // s,m
        },
        keepLoggedIn: {
            duration: 180,
            interval: 'm'
        }
    }
};
