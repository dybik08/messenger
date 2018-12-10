import * as path from 'path';
import app from './app';
import wds from './wds';

app.set('env', process.env.NODE_ENV ? process.env.NODE_ENV : 'development');

wds(app);

const PORT = process.env.PORT || 3000;
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

app.listen(PORT, () => console.log('Running on localhost:', PORT));
