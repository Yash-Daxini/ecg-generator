import ECGAnimator from './ECGAnimator'
import ECGInputs from './ECGInputs'
import '../../../styles/ecg.css'

const ECG = () => {
    return (
        <>
            <h1>ECG Waveform Animator (Custom Beats)</h1>
            <div className='ecg-container'>
                <div className='controls'>
                    <ECGInputs />
                </div>
                <div className='canvas-container'>
                    <ECGAnimator />
                </div>
            </div>
        </>
    )
}

export default ECG