//Integration test with jest
'use strict';
const request = require('supertest');
const app = require('../app');


//test cases
test('Get all features', async () => {
    const response = request(app).get('/api/features');
    expect(response.statusCode).toBe(200);
    expect(response.body).toMoveLength(4);
});

test('Get feature by id', async () => {
    const response = request(app).get('/api/features/1');
    expect(response.statusCode).toBe(200);
})
test('Add new feature', async () => {
    const newFeature = {
        'author': 'Guiliano Salvarezza',
        'title': 'Modified Seeds and Crops',
        'description': 'Book about getenically modified seeds and the use of TILLING and transposable elements in the technique of mutation of plants.',
        'id': 1
    };

    const res = request(app).post('/api/features');
    const response = request(app)
    res.send(newFeature);
    expect(response.statusCode).toBe(201);

});
test('Update feature', async () => {
    const updateFeature = {
        'author': 'Guiliano Salvarezza',
        'title': 'Modified Seeds and Crops',
        'description': 'Book about getenically modified seeds and the use of TILLING and transposable elements in the technique of mutation of plants.',
        'id': 1
    };
    const res = request(app).put('/api/features/1');
    const response = request(app)
    res.send(updateFeature);
    expect(response.statusCode).toBe(200);
});

test('Delete feature', async () => {
    const response = request(app);
    expect(response.statusCode).toBe(200);
    if (response.statusCode == 200) {
        expect(response.body).toBe('Successfully deleted!');
    }
});
