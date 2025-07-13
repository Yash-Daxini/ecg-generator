import type { ECGParameters } from "../../models/ECGParameters";
import '../../styles/ECGInputs.css'
import ECGInputActions from "./ECGInputActions";
import ECGInput from "./ECGInput";
import { onChange } from "../../utils/InputUtil";
import WaveParametersInputs from "../wave-parameters-components/WaveParametersInputs";

interface ECGInputsProps {
  ecgParameters: ECGParameters;
  setECGParameters: (params: ECGParameters | ((prev: ECGParameters) => ECGParameters)) => void;
}

const ECGInputs = ({
  ecgParameters,
  setECGParameters
}:ECGInputsProps) => {

  const handleInputChange = (path: string, value: number | boolean) => {
    setECGParameters((prev: any) => onChange(prev, path, value));
  };
  return (
    <>
      <ECGInput
        label={"Heart Rate (bpm):"}
        value={ecgParameters.HeartRate}
        htmlFor="heart_rate"
        step={1}
        min={20}
        max={250}
        id="heart_rate"
        onChange={(_) => handleInputChange("HeartRate", _.target.value)} />

      <ECGInput
        label={"Pixels per mV:"}
        value={ecgParameters.PixelsPermV}
        htmlFor="pixelsPerMv"
        step={10}
        min={10}
        id="pixelsPerMv"
        onChange={(_) => handleInputChange("PixelsPermV", _.target.value)} />

      <WaveParametersInputs
        ecgParameters={ecgParameters}
        handleInputChange={handleInputChange} />

      <h3>Dynamic R Wave Pattern</h3>
      <div className="param-group">
        <label>
          <input type="checkbox" id="rWaveEnabled" onChange={(_) => handleInputChange("DynamicRWaveParameters.IsEnablePWavePattern", _.target.checked)} /> Enable R Wave Pattern
        </label>
      </div>

      <ECGInput
        label={"R Waves in Pattern:"}
        value={ecgParameters.DynamicRWaveParameters.DynamicRWavePattern.DynamicWavePattern}
        htmlFor="rWaveCount"
        step={1}
        min={0}
        id="rWaveCount"
        onChange={(_) => handleInputChange("DynamicRWaveParameters.DynamicRWavePattern.DynamicWavePattern", _.target.value)} />

      <ECGInput
        label={"Apply After N QRS:"}
        value={ecgParameters.DynamicRWaveParameters.DynamicRWavePattern.NQRS}
        htmlFor="rWaveInterval"
        step={1}
        min={0}
        id="rWaveInterval"
        onChange={(_) => handleInputChange("DynamicRWaveParameters.DynamicRWavePattern.NQRS", _.target.value)} />

      <h3>Dynamic P Wave Pattern</h3>
      <div className="param-group"><label>
        <input type="checkbox" id="pWaveEnabled" onChange={(_) => handleInputChange("DynamicPWaveParameters.IsEnablePWavePattern", _.target.checked)} /> Enable P Wave Pattern
      </label>
      </div>

      <ECGInput
        label={"P Waves in Pattern:"}
        value={ecgParameters.DynamicPWaveParameters.DynamicPWavePattern.DynamicWavePattern}
        htmlFor="pWaveCount"
        step={1}
        min={0}
        id="pWaveCount"
        onChange={(_) => handleInputChange("DynamicPWaveParameters.DynamicPWavePattern.DynamicWavePattern", _.target.value)} />

      <ECGInput
        label={"Apply After N QRS:"}
        value={ecgParameters.DynamicPWaveParameters.DynamicPWavePattern.NQRS}
        htmlFor="pWaveInterval"
        step={1}
        min={0}
        id="pWaveInterval"
        onChange={(_) => handleInputChange("DynamicPWaveParameters.DynamicPWavePattern.NQRS", _.target.value)} />

      <h3>Custom Beat Sequence</h3>
      <div className="param-group">
        <label>
          <input type="checkbox" id="useCustomBeatParameters"
            onChange={(_) => handleInputChange("CustomBeatsParameters.IsEnableCustomBeats", _.target.checked)} /> Enable Custom Beat
          Sequence</label>
      </div>


      <ECGInput
        label={"Normal Beats Before Repeat:"}
        value={ecgParameters.DynamicPWaveParameters.DynamicPWavePattern.NQRS}
        htmlFor="repeatInterval"
        step={1}
        min={0}
        id="repeatInterval"
        onChange={(_) => handleInputChange("CustomBeatsParameters.NormalBeatsBeforeRepeat", _.target.value)} />

      <div id="customBeatsContainer"></div>

      <ECGInputActions />
    </>
  )
}

export default ECGInputs