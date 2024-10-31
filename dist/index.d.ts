import { SpeechEvents, TranscriptionEvents, TranscriptionEndEvent, TranscriptionErrorEvent, TranscriptionStartEvent, SpeechRecognizedEvent, SpeechErrorEvent, SpeechResultsEvent, SpeechStartEvent, SpeechEndEvent, SpeechVolumeChangeEvent, TranscriptionResultsEvent } from './VoiceModuleTypes';
declare class RCTVoice {
    _loaded: boolean;
    _listeners: any[] | null;
    _events: Required<SpeechEvents> & Required<TranscriptionEvents>;
    constructor();
    removeAllListeners(): void;
    destroy(): Promise<unknown>;
    destroyTranscription(): Promise<void>;
    start(locale: any, options?: {}): Promise<unknown>;
    startTranscription(url: any, locale: any, options?: {}): Promise<void>;
    stop(): Promise<unknown>;
    stopTranscription(): Promise<void>;
    cancel(): Promise<unknown>;
    cancelTranscription(): Promise<void>;
    isAvailable(): Promise<0 | 1>;
    /**
     * (Android) Get a list of the speech recognition engines available on the device
     * */
    getSpeechRecognitionServices(): void | Promise<string[]>;
    isRecognizing(): Promise<0 | 1>;
    set onSpeechStart(fn: (e: SpeechStartEvent) => void);
    set onTranscriptionStart(fn: (e: TranscriptionStartEvent) => void);
    set onSpeechRecognized(fn: (e: SpeechRecognizedEvent) => void);
    set onSpeechEnd(fn: (e: SpeechEndEvent) => void);
    set onTranscriptionEnd(fn: (e: SpeechEndEvent) => void);
    set onSpeechError(fn: (e: SpeechErrorEvent) => void);
    set onTranscriptionError(fn: (e: TranscriptionErrorEvent) => void);
    set onSpeechResults(fn: (e: SpeechResultsEvent) => void);
    set onTranscriptionResults(fn: (e: TranscriptionResultsEvent) => void);
    set onSpeechPartialResults(fn: (e: SpeechResultsEvent) => void);
    set onSpeechVolumeChanged(fn: (e: SpeechVolumeChangeEvent) => void);
}
export { SpeechEndEvent, SpeechErrorEvent, SpeechEvents, SpeechStartEvent, SpeechRecognizedEvent, SpeechResultsEvent, SpeechVolumeChangeEvent, TranscriptionEndEvent, TranscriptionErrorEvent, TranscriptionEvents, TranscriptionStartEvent, TranscriptionResultsEvent, };
declare const _default: RCTVoice;
export default _default;
//# sourceMappingURL=index.d.ts.map