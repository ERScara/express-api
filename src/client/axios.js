import { URLSearchParams } from 'url';
import axios from 'axios';
import express from 'express';
import { LogMdw } from '../client/newApp.js';
const app = express();
app.use(LogMdw);


axios.interceptors.request.use(config => {
    console.log('Before sending request, send to URL: ', config.url);
    return config;
}, (error) => {
    console.log('Error', error);
});

axios.interceptors.response.use((response) => {
    console.log('Success', response.status);
    return response;
}, (error) => {
    console.log('Error', error.message);
    console.log('Errors', error.errors);
});
async function makeRequest() {
    let payload = {
        'author': 'Guiliano Salvarezza',
        'title': 'Modified Seeds and Crops',
        'description': 'Book about getenically modified seeds and the use of TILLING and transposable elements in the technique of mutation of plants.',
        'id': 1
    }; 
    const params = new URLSearchParams(payload);
    let config = {
        method: 'get',
        url: `http://localhost:3000/api/features/?${params}`,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    let response = await axios(config);
    if (response && response.data) {
        console.log(response.data);
    } else {
        console.error('Error:', response);
    }
}

async function createObject() {
    let config = {
        method: 'post',
        url: 'http://localhost:3000/api/features',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            'author': 'Guiliano Salvarezza',
            'title': 'Modified Seeds and Crops',
            'description': 'Book about getenically modified seeds and the use of TILLING and transposable elements in the technique of mutation of plants.',
            'id': 1
        }
    };
    let response = await axios(config);
    if (response && response.data) {
        console.log(response.data);
    } else {
        console.error('Error:', response);
    }
}

async function updateObject() {
    let config = {
        method: 'put',
        url: 'http://localhost:3000/api/features/:id',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            'author': 'Guiliano Salvarezza',
            'title': 'Modified Seeds and Crops',
            'description': 'Book about getenically modified seeds and the use of TILLING and transposable elements in the technique of mutation of plants.',
            'id': 1
        }
    };
    let response = await axios(config);
    if (response && response.data) {
        console.log(response.data);
    } else {
        console.error('Error:', response);
    }
}

async function deleteObject() {
    let config = {
        method: 'delete',
        url: 'http://localhost:3000/api/features/:id',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    let response = await axios(config);
    if (response && response.data) {
        console.log(response.data);
    } else {
        console.error('Error:', response);
    }
}


axios.get('http://localhost:3000/api/features')
    .then(response => {
        if (response && response.data) {
            console.log(response?.data);
        } else {
            console.error('Error:', response);
        }
    })
        .catch(error => {
        console.error(error);
    });


makeRequest();
createObject();
updateObject();
deleteObject();