import React from 'react'
import ECGInput from '../ecg-components/ECGInput'
import type { ECGParameters } from '../../models/ECGParameters';

interface WaveParametersInputsProps {
    ecgParameters: ECGParameters
    handleInputChange: (path: string, value: number) => void;
}

const WaveParametersInputs: React.FC<WaveParametersInputsProps> = ({
    ecgParameters,
    handleInputChange
}) => {
    return (
        <>
            <h3>Wave Parameters (mV, sec)</h3>

            <ECGInput
                label={"P Wave Height:"}
                value={ecgParameters.WaveParameters.PWaveDimensions.height}
                htmlFor="h_p"
                step={0.01}
                id="h_p"
                onChange={(_) => handleInputChange("WaveParameters.PWaveDimensions.height", _.value)} />

            <ECGInput
                label={"P Wave Breadth:"}
                value={ecgParameters.WaveParameters.PWaveDimensions.breadth}
                htmlFor="h_p"
                step={0.01}
                id="b_p"
                onChange={(_) => handleInputChange("WaveParameters.PWaveDimensions.breadth", _.value)} />

            <ECGInput
                label={"Q Wave Height:"}
                value={ecgParameters.WaveParameters.QWaveDimensions.height}
                htmlFor="h_q"
                step={0.01}
                id="h_q"
                onChange={(_) => handleInputChange("WaveParameters.QWaveDimensions.height", _.value)} />

            <ECGInput
                label={"Q Wave Breadth:"}
                value={ecgParameters.WaveParameters.QWaveDimensions.breadth}
                htmlFor="b_q"
                step={0.005}
                id="b_q"
                onChange={(_) => handleInputChange("WaveParameters.QWaveDimensions.breadth", _.value)} />

            <ECGInput
                label={"R Wave Height:"}
                value={ecgParameters.WaveParameters.RWaveDimensions.height}
                htmlFor="h_r"
                step={0.1}
                id="h_r"
                onChange={(_) => handleInputChange("WaveParameters.RWaveDimensions.height", _.value)} />

            <ECGInput
                label={"R Wave Breadth:"}
                value={ecgParameters.WaveParameters.RWaveDimensions.breadth}
                htmlFor="b_r"
                step={0.01}
                id="b_r"
                onChange={(_) => handleInputChange("WaveParameters.RWaveDimensions.breadth", _.value)} />

            <ECGInput
                label={"S Wave Height:"}
                value={ecgParameters.WaveParameters.SWaveDimensions.height}
                htmlFor="h_s"
                step={0.01}
                id="h_s"
                onChange={(_) => handleInputChange("WaveParameters.SWaveDimensions.height", _.value)} />

            <ECGInput
                label={"S Wave Breadth:"}
                value={ecgParameters.WaveParameters.SWaveDimensions.breadth}
                htmlFor="b_s"
                step={0.005}
                id="b_s"
                onChange={(_) => handleInputChange("WaveParameters.SWaveDimensions.breadth", _.value)} />

            <ECGInput
                label={"T Wave Height:"}
                value={ecgParameters.WaveParameters.TWaveDimensions.height}
                htmlFor="h_t"
                step={0.01}
                id="h_t"
                onChange={(_) => handleInputChange("WaveParameters.TWaveDimensions.height", _.value)} />

            <ECGInput
                label={"T Wave Breadth:"}
                value={ecgParameters.WaveParameters.TWaveDimensions.breadth}
                htmlFor="b_t"
                step={0.01}
                id="b_t"
                onChange={(_) => handleInputChange("WaveParameters.TWaveDimensions.breadth", _.value)} />

            <ECGInput
                label={"PQ Segment Length:"}
                value={ecgParameters.WaveParameters.PQSegmentLength}
                htmlFor="l_pq"
                step={0.01}
                id="l_pq"
                onChange={(_) => handleInputChange("WaveParameters.PQSegmentLength", _.value)} />

            <ECGInput
                label={"ST Segment Length:"}
                value={ecgParameters.WaveParameters.STSegmentLength}
                htmlFor="l_st"
                step={0.01}
                id="l_st"
                onChange={(_) => handleInputChange("WaveParameters.STSegmentLength", _.value)} />

            <ECGInput
                label={"TP Segment Length:"}
                value={ecgParameters.WaveParameters.TPSegmentLength}
                htmlFor="l_tp"
                step={0.01}
                id="l_tp"
                onChange={(_) => handleInputChange("WaveParameters.TPSegmentLength", _.value)} />

            <ECGInput
                label={"Default P Waves per QRS:"}
                value={ecgParameters.WaveParameters.DefaultPWavesPerQRS}
                htmlFor="n_p"
                step={1}
                id="n_p"
                onChange={(_) => handleInputChange("WaveParameters.DefaultPWavesPerQRS", _.value)} />
        </>
    )
}

export default WaveParametersInputs