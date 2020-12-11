Legolas_22'use strict';

/**
* Config file for a https://github.com/micromata/http-fake-backend to
* mock the PythonProjectBeispiel backend.
*
* Just place in ./server/api folder.
*/

const SetupEndpoint = require('./setup/');

const prefix = "/app"

module.exports = SetupEndpoint({
    name: 'app',
    urls: [{
        params: '/persons',
        requests: [{
            method: 'GET',
            response: '/response-files/app/persons.json'
        },
        {
            method: ['POST'],
            response: '/response-files/app/person.json'
        }]
    }, {
        params: '/persons/{id}',
        requests: [{
            method: ['GET'],
            response: '/response-files/app/person.json'
        }, {
            method: ['PUT'],
            response: '/response-files/app/person.json'
        }, {
            method: 'DELETE',
            response: '/response-files/app/person.json'
        }]
    }
    ]
});
    // , 
    
        // {
//         params: '/persons/{id}/accounts',
//         requests: [{
//             method: 'GET',
//             response: '/response-files/app/accountsfor1.json'
//         }, {
//             method: ['POST'],
//             response: '/response-files/app/account.json'
//         }]
//     }, {
//         params: '/accounts',
//         requests: [{
//             method: 'GET',
//             response: '/response-files/app/allaccounts.json'
//         }]
//     }, {
//         params: '/accounts/{id}',
//         requests: [{
//             method: 'GET',
//             response: '/response-files/app/account.json'
//         },
//         {
//             method: ['delete'],
//             response: {
//                 deleted: true
//             }
//         }]
//     }, {
//         params: '/accounts/{id}/balance',
//         requests: [{
//             method: 'GET',
//             response: '/response-files/app/balance.json'
//         }]
//     }, {
//         params: '/account/{id}/credits',
//         requests: [{
//             method: 'GET',
//             response: '/response-files/app/creditsfor1.json'
//         }]
//     }, {
//         params: '/account/{id}/debits',
//         requests: [{
//             method: 'GET',
//             response: '/response-files/app/debitsfor1.json'
//         }]
//     }
//     ]
// });

