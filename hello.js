const Hello = (app) => {
app.get('/hello', (req, res) => {res.send('Life is good!')}) ;
app.get('/', (req, res) => {res.send('Welsome to Full Stack Development!')})
}
export default Hello;