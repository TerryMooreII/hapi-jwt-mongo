'use strict';

const Joi = require('joi');
const Boom = require('boom');

exports.register = function(server, options, next) {

    server.route([{
        method: 'GET',
        path: '/example-one',
        config: {
            description: 'No required authorization.',
            auth: false,
            handler: function(request, reply) {
                console.log(request.auth.credentials)
                return reply('Success, You have accessed a public route!');
            }
        }
    }, {
        method: 'GET',
        path: '/example-two',
        config: {
            description: 'User required authorization',
            auth: {
                strategy: 'jwt',
                scope: 'user'
            },
            handler: function(request, reply) {
                return reply('Success! username: <strong>"' + request.auth.credentials.username + '"</strong>, you can access a route that requires the user role!');
            }
        }
    }, {
        method: 'GET',
        path: '/example-three',
        config: {
            auth: {
                strategy: 'jwt',
                scope: 'admin'
            },
            description: 'Admin required authorization because the default is admin.',
            handler: function(request, reply) {
                return reply({email: request.auth.credentials.email });
            }
        }
    }, {
        method: 'GET',
        path: '/example-four/{id}',
        config: {
            description: 'User specific authorization required.',
            auth: {
                strategy: 'jwt',
                scope: ['admin', 'user-{params.id}']
            },
            handler: function(request, reply) {
                return reply('Success, you can access a route for ' + request.params.id + '!');
            }
        }
    }]);

    next();
}

exports.register.attributes = {
    name: 'example'
};
