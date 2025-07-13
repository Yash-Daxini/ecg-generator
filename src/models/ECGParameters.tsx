export interface ECGParameters {
    HeartRate: number;
    PixelsPermV: number;
    WaveParameters: WaveParameters;
    DynamicRWaveParameters: DynamicRWaveParameters;
    DynamicPWaveParameters: DynamicPWaveParameters;
    CustomBeatsParameters: CustomBeatsParameters;
}

interface WaveParameters {
    PWaveDimensions: WaveDimensions;
    QWaveDimensions: WaveDimensions;
    RWaveDimensions: WaveDimensions;
    SWaveDimensions: WaveDimensions;
    TWaveDimensions: WaveDimensions;
    PQSegmentLength: number;
    STSegmentLength: number;
    TPSegmentLength: number;
    DefaultPWavesPerQRS: number;
}

interface DynamicRWaveParameters {
    IsEnableRWavePattern: boolean;
    DynamicRWavePattern: DynamicWaveParameters;
}

interface DynamicPWaveParameters {
    IsEnablePWavePattern: boolean;
    DynamicPWavePattern: DynamicWaveParameters;
}

interface DynamicWaveParameters {
    DynamicWavePattern: number;
    NQRS: number;
}

interface CustomBeatsParameters {
    IsEnableCustomBeats: boolean;
    NormalBeatsBeforeRepeat: number;
}

interface WaveDimensions {
    height: number;
    breadth: number;
}

export interface CustomBeatParameter {
    PWaveDimensions: WaveDimensions;
    QWaveDimensions: WaveDimensions;
    RWaveDimensions: WaveDimensions;
    SWaveDimensions: WaveDimensions;
    TWaveDimensions: WaveDimensions;
    PQSegmentLength: number;
    STSegmentLength: number;
    TPSegmentLength: number;
}