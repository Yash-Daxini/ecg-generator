import ECGAnimator from './ECGAnimator'
import ECGInputs from './ECGInputs'
import '../../styles/ECG.css'
import { useState } from 'react';
import type { CustomBeatParameter, ECGParameters } from '../../models/ECGParameters';

const ECG = () => {

    const [ecgParameters, setECGParameters] = useState<ECGParameters>(
        {
            HeartRate: 70,
            PixelsPermV: 100,
            WaveParameters: {
                PWaveDimensions: {
                    height: 0.15,
                    breadth: 0.08
                },
                QWaveDimensions: {
                    height: -0.1,
                    breadth: 0.025
                },
                RWaveDimensions: {
                    height: 1.2,
                    breadth: 0.05
                },
                SWaveDimensions: {
                    height: -0.25,
                    breadth: 0.025
                },
                TWaveDimensions: {
                    height: 0.2,
                    breadth: 0.16
                },
                PQSegmentLength: 0.08,
                STSegmentLength: 0.12,
                TPSegmentLength: 0.3,
                DefaultPWavesPerQRS: 1
            },
            DynamicRWaveParameters: {
                IsEnableRWavePattern: false,
                DynamicRWavePattern: {
                    DynamicWavePattern: 2,
                    NQRS: 5,
                }
            },
            DynamicPWaveParameters: {
                IsEnablePWavePattern: false,
                DynamicPWavePattern: {
                    DynamicWavePattern: 0,
                    NQRS: 3,
                }
            },
            CustomBeatsParameters: {
                IsEnableCustomBeats: false,
                NormalBeatsBeforeRepeat: 10
            }
        });

    const [CustomBeatParameters, setCustomBeatParameters] = useState<CustomBeatParameter[]>([]);

    return (
        <>
            <h1>ECG Waveform Animator (Custom Beats)</h1>
            <div className='ecg-container'>
                <div className='controls'>
                    <ECGInputs
                        ecgParameters={ecgParameters} setECGParameters={setECGParameters} />
                </div>
                <div className='canvas-container'>
                    <ECGAnimator
                        ecgParameters={ecgParameters} customBeatsParams={[]} />
                </div>
            </div>
        </>
    )
}

export default ECG