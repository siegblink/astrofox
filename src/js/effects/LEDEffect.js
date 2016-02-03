'use strict';

var _ = require('lodash');
var Effect = require('../effects/Effect.js');
var LEDShader = require('../shaders/LEDShader.js');

var defaults = {
    spacing: 10,
    size: 4,
    blur: 4
};

var LEDEffect = function(options) {
    Effect.call(this, 'LEDEffect', defaults);

    this.update(options);
};

LEDEffect.info = {
    name: 'LED'
};

LEDEffect.prototype = _.create(Effect.prototype, {
    constructor: LEDEffect,

    addToScene: function(scene) {
        this.pass = scene.composer.addShaderPass(LEDShader);
    },

    removeFromScene: function(scene) {
        scene.composer.removePass(this.pass);
    },

    updateScene: function(scene) {
        if (this.hasUpdate) {
            this.pass.setUniforms(this.options);
            this.hasUpdate = false;
        }
    }
});

module.exports = LEDEffect;