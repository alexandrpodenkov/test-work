import { useState } from 'react';
import './App.css'

interface Param {
  id: number;
  name: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[]
}

interface Props {
  params: Param[];
  model: Model;
}

interface Color {

}

const params: Param[] = [
  {
    id: 1,
    name: 'Назначение',
  },
  {
    id: 2,
    name: 'Длина',
  },
]

const model: Model = {
  paramValues: [
    {
      paramId: 1,
      value: 'повседневное',
    },
    {
      paramId: 2,
      value: 'макси',
    },
  ],

  colors: [

  ]
}

function App() {

  return (
    <>
      <ParamEditor model={model} params={params} />
    </>
  )
}

export default App

const ParamEditor: React.FC<Props> = ({ model, params }) => {
  const [purposeInputValue, setPurposeInputValue] = useState<string>(model.paramValues[0].value);
  const [lengthInputValue, setLengthInputValue] = useState<string>(model.paramValues[1].value);

  const getModel = (): Model => {
    return {
      ...model,
      paramValues: [
        { paramId: model.paramValues[0].paramId, value: purposeInputValue },
        { paramId: model.paramValues[1].paramId, value: lengthInputValue },
      ],
    };
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'purpose':
        setPurposeInputValue(e.target.value);
        break;
      case 'length':
        setLengthInputValue(e.target.value);
        break;
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' && e.currentTarget.name === 'purpose') {
      setPurposeInputValue(purposeInputValue);
    }
    if (e.code === 'Enter' && e.currentTarget.name === 'length') {
      setLengthInputValue(lengthInputValue);
    }
  }

  return (
    <div className='container'>
      <div className='params-container'>
        {params.map(param => {
          return (
            <div key={param.id}>
              <h3>{param.name}</h3>
            </div>
          )
        })}
      </div>


      <div className='input-contianer'>
        <input
          name='purpose'
          value={purposeInputValue}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => handleKeyDown(e)} />

        <input
          name='length'
          value={lengthInputValue}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => handleKeyDown(e)} />
      </div>
    </div>
  )
}
