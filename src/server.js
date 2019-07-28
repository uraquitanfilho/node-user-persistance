import app from './app';

app.listen(process.env.APP_PORT);
console.log('RUNNING ON', `${process.env.APP_URL}:${process.env.APP_PORT}`);
