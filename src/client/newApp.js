import express from 'express';
const app = express();
import bodyParser from 'body-parser';
const PORT = 3000;

export const LogMdw = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    res.setHeader('Content-Type', 'application/json', 'text/start');
    next();
};

app.use(LogMdw);
app.use(express.json());
app.use(bodyParser.json());

const features = [
    {
        'author': 'Guiliano Salvarezza',
        'title': 'Modified Seeds and Crops',
        'description': 'Book about getenically modified seeds and the use of TILLING and transposable elements in the technique of mutation of plants.',
        'id': 1
    },
    {
        'author': 'Vincenzo Rotti',
        'title': 'The use of RNAi in Crop Science for Gene Silecing',
        'description': 'Book about getenically modified seeds and the use of RNAi and miRNA to add more features to plants.',
        'id': 2
    },
    {
        'author': 'Alberto Pierdominici',
        'title': 'New insights in the use of CRISPR/Cas9 and TALEN in Crop Science',
        'description': 'Book about CRISPR/Cas9 and TALEN in Crop Science as an alternative method to TILLING.',
        'id': 3
    },
    {
        "author": "Andrea Gabrielli",
        "title": "Orthodox and Recalcitrant seeds: new discoveries",
        "description": "Book about how to store seeds according to certain characteristics",
        "id": 4
    }
];

app.get('/features', (req, res, next) => {
    res.json(features);
    next();
});

app.get('/feature/:id', (req, res, next) => {
    const featureId = req.params.id;
    res.json(features[featureId - 1]);
    next();
});

app.post('/feature', (req, res) => {
    console.log(req.body);
    features.push(req.body);
    res.send("New post successfully added!");
});

app.put('/update/:id', (req, res) => {
    const index = features.findIndex(feature => feature.id == req.params.id);
    features[index] = req.body;
    console.log('updated', features[index]);
    res.send("Successfully updated!");
})  
app.delete('/delete/:id', (req, res) => {
    console.log(req.params.id);
    const index = features.findIndex(feature => feature.id == req.params.id);
    console.log(index);
    const deleteFeature = features.splice(index, 1);
    console.log(deleteFeature);
    res.send("Successfully deleted!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});