import { EventSubscriptionVendor } from 'react-native';
declare type Callback = (error: string) => void;
export declare type VoiceModule = {
    /**
     * Gets list of SpeechRecognitionServices used.
     * @platform android
     */
    getSpeechRecognitionServices: () => Promise<string[]> | void;
    destroySpeech: (callback: Callback) => void;
    destroyTranscription: (callback: Callback) => void;
    startSpeech: Function;
    startTranscription: Function;
    stopSpeech: (callback: Callback) => void;
    stopTranscription: (callback: Callback) => void;
    cancelSpeech: (callback: Callback) => void;
    cancelTranscription: (callback: Callback) => void;
    isRecognizing: Function;
    isSpeechAvailable: Function;
} & SpeechEvents & TranscriptionEvents & EventSubscriptionVendor;
export declare type SpeechEvents = {
    onSpeechStart?: (e: SpeechStartEvent) => void;
    onSpeechRecognized?: (e: SpeechRecognizedEvent) => void;
    onSpeechEnd?: (e: SpeechEndEvent) => void;
    onSpeechError?: (e: SpeechErrorEvent) => void;
    onSpeechResults?: (e: SpeechResultsEvent) => void;
    onSpeechPartialResults?: (e: SpeechResultsEvent) => void;
    onSpeechVolumeChanged?: (e: SpeechVolumeChangeEvent) => void;
};
export declare type TranscriptionEvents = {
    onTranscriptionStart?: (e: TranscriptionStartEvent) => void;
    onTranscriptionEnd?: (e: TranscriptionEndEvent) => void;
    onTranscriptionError?: (e: TranscriptionErrorEvent) => void;
    onTranscriptionResults?: (e: TranscriptionResultsEvent) => void;
};
export declare type SpeechStartEvent = {
    error?: boolean;
};
export declare type TranscriptionStartEvent = {
    error?: boolean;
};
export declare type SpeechRecognizedEvent = {
    isFinal?: boolean;
};
export declare type SpeechResultsEvent = {
    value?: string[];
};
export declare type TranscriptionResultsEvent = {
    segments?: string[];
    transcription?: string;
    isFinal?: boolean;
};
export declare type SpeechErrorEvent = {
    error?: {
        code?: string;
        message?: string;
    };
};
export declare type TranscriptionErrorEvent = {
    error?: {
        code?: string;
        message?: string;
    };
};
export declare type SpeechEndEvent = {
    error?: boolean;
};
export declare type TranscriptionEndEvent = {
    error?: boolean;
};
export declare type SpeechVolumeChangeEvent = {
    value?: number;
};
export {};
//# sourceMappingURL=VoiceModuleTypes.d.ts.map