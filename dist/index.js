"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const invariant_1 = __importDefault(require("invariant"));
const Voice = react_native_1.NativeModules.Voice;
// NativeEventEmitter is only availabe on React Native platforms, so this conditional is used to avoid import conflicts in the browser/server
const voiceEmitter = react_native_1.Platform.OS !== 'web' ? new react_native_1.NativeEventEmitter(Voice) : null;
class RCTVoice {
    constructor() {
        this._loaded = false;
        this._listeners = null;
        this._events = {
            onSpeechStart: () => { },
            onSpeechRecognized: () => { },
            onSpeechEnd: () => { },
            onSpeechError: () => { },
            onSpeechResults: () => { },
            onSpeechPartialResults: () => { },
            onSpeechVolumeChanged: () => { },
            onTranscriptionStart: () => { },
            onTranscriptionEnd: () => { },
            onTranscriptionError: () => { },
            onTranscriptionResults: () => { },
        };
    }
    removeAllListeners() {
        Voice.onSpeechStart = undefined;
        Voice.onSpeechRecognized = undefined;
        Voice.onSpeechEnd = undefined;
        Voice.onSpeechError = undefined;
        Voice.onSpeechResults = undefined;
        Voice.onSpeechPartialResults = undefined;
        Voice.onSpeechVolumeChanged = undefined;
        Voice.onTranscriptionStart = undefined;
        Voice.onTranscriptionEnd = undefined;
        Voice.onTranscriptionError = undefined;
        Voice.onTranscriptionResults = undefined;
    }
    destroy() {
        if (!this._loaded && !this._listeners) {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            Voice.destroySpeech((error) => {
                if (error) {
                    reject(new Error(error));
                }
                else {
                    if (this._listeners) {
                        this._listeners.map(listener => listener.remove());
                        this._listeners = null;
                    }
                    resolve();
                }
            });
        });
    }
    destroyTranscription() {
        if (!this._loaded && !this._listeners) {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            Voice.destroyTranscription((error) => {
                if (error) {
                    reject(new Error(error));
                }
                else {
                    if (this._listeners) {
                        this._listeners.map(listener => listener.remove());
                        this._listeners = null;
                    }
                    resolve();
                }
            });
        });
    }
    start(locale, options = {}) {
        if (!this._loaded && !this._listeners && voiceEmitter !== null) {
            this._listeners = Object.keys(this._events).map((key) => voiceEmitter.addListener(key, this._events[key]));
        }
        return new Promise((resolve, reject) => {
            const callback = (error) => {
                if (error) {
                    reject(new Error(error));
                }
                else {
                    resolve();
                }
            };
            if (react_native_1.Platform.OS === 'android') {
                Voice.startSpeech(locale, Object.assign({
                    EXTRA_LANGUAGE_MODEL: 'LANGUAGE_MODEL_FREE_FORM',
                    EXTRA_MAX_RESULTS: 5,
                    EXTRA_PARTIAL_RESULTS: true,
                    REQUEST_PERMISSIONS_AUTO: true,
                }, options), callback);
            }
            else {
                Voice.startSpeech(locale, callback);
            }
        });
    }
    startTranscription(url, locale, options = {}) {
        if (!this._loaded && !this._listeners && voiceEmitter !== null) {
            this._listeners = Object.keys(this._events).map((key) => voiceEmitter.addListener(key, this._events[key]));
        }
        return new Promise((resolve, reject) => {
            const callback = (error) => {
                if (error) {
                    reject(new Error(error));
                }
                else {
                    resolve();
                }
            };
            if (react_native_1.Platform.OS === 'android') {
                Voice.startTranscription(url, locale, Object.assign({
                    EXTRA_LANGUAGE_MODEL: 'LANGUAGE_MODEL_FREE_FORM',
                    EXTRA_MAX_RESULTS: 5,
                    EXTRA_PARTIAL_RESULTS: true,
                    REQUEST_PERMISSIONS_AUTO: true,
                }, options), callback);
            }
            else {
                Voice.startTranscription(url, locale, callback);
            }
        });
    }
    stop() {
        if (!this._loaded && !this._listeners) {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            Voice.stopSpeech(error => {
                if (error) {
                    reject(new Error(error));
                }
                else {
                    resolve();
                }
            });
        });
    }
    stopTranscription() {
        if (!this._loaded && !this._listeners) {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            Voice.stopTranscription(error => {
                if (error) {
                    reject(new Error(error));
                }
                else {
                    resolve();
                }
            });
        });
    }
    cancel() {
        if (!this._loaded && !this._listeners) {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            Voice.cancelSpeech(error => {
                if (error) {
                    reject(new Error(error));
                }
                else {
                    resolve();
                }
            });
        });
    }
    cancelTranscription() {
        if (!this._loaded && !this._listeners) {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            Voice.cancelSpeech(error => {
                if (error) {
                    reject(new Error(error));
                }
                else {
                    resolve();
                }
            });
        });
    }
    isAvailable() {
        return new Promise((resolve, reject) => {
            Voice.isSpeechAvailable((isAvailable, error) => {
                if (error) {
                    reject(new Error(error));
                }
                else {
                    resolve(isAvailable);
                }
            });
        });
    }
    /**
     * (Android) Get a list of the speech recognition engines available on the device
     * */
    getSpeechRecognitionServices() {
        if (react_native_1.Platform.OS !== 'android') {
            invariant_1.default(Voice, 'Speech recognition services can be queried for only on Android');
            return;
        }
        return Voice.getSpeechRecognitionServices();
    }
    isRecognizing() {
        return new Promise(resolve => {
            Voice.isRecognizing((isRecognizing) => resolve(isRecognizing));
        });
    }
    set onSpeechStart(fn) {
        this._events.onSpeechStart = fn;
    }
    set onTranscriptionStart(fn) {
        this._events.onTranscriptionStart = fn;
    }
    set onSpeechRecognized(fn) {
        this._events.onSpeechRecognized = fn;
    }
    set onSpeechEnd(fn) {
        this._events.onSpeechEnd = fn;
    }
    set onTranscriptionEnd(fn) {
        this._events.onTranscriptionEnd = fn;
    }
    set onSpeechError(fn) {
        this._events.onSpeechError = fn;
    }
    set onTranscriptionError(fn) {
        this._events.onTranscriptionError = fn;
    }
    set onSpeechResults(fn) {
        this._events.onSpeechResults = fn;
    }
    set onTranscriptionResults(fn) {
        this._events.onTranscriptionResults = fn;
    }
    set onSpeechPartialResults(fn) {
        this._events.onSpeechPartialResults = fn;
    }
    set onSpeechVolumeChanged(fn) {
        this._events.onSpeechVolumeChanged = fn;
    }
}
exports.default = new RCTVoice();
