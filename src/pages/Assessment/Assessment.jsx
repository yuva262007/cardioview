 import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  UserRound,
  HeartPulse,
  Activity,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
  Check,
  AlertCircle,
} from 'lucide-react'

import Navbar from '../../components/Navbar/Navbar'
import './Assessment.css'

const steps = [
  { number: 1, title: 'Profile', icon: UserRound },
  { number: 2, title: 'Lifestyle', icon: HeartPulse },
  { number: 3, title: 'Symptoms', icon: Activity },
  { number: 4, title: 'Clinical Data', icon: Stethoscope },
]

function Assessment() {
  const [currentStep, setCurrentStep] = useState(1)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    height: '',
    weight: '',
    diabetes: '',
    hypertension: '',
    smoking: '',
    familyHistory: '',
    chestPain: '',
    dyspnea: '',
    functionalClass: '',
    bloodPressure: '',
    heartRate: '',
    fastingBloodSugar: '',
    cholesterol: '',
    triglycerides: '',
    ef: '',
  })

  const updateField = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }))

    setError('')
  }

  const validateStep = () => {
    if (currentStep === 1) {
      if (!formData.age || !formData.sex) {
        setError('Please enter your age and select your sex.')
        return false
      }

      if (Number(formData.age) < 1 || Number(formData.age) > 120) {
        setError('Please enter a valid age between 1 and 120.')
        return false
      }

      if (!formData.height || !formData.weight) {
        setError('Please enter your height and weight.')
        return false
      }
    }

    if (currentStep === 2) {
      if (
        !formData.diabetes ||
        !formData.hypertension ||
        !formData.smoking ||
        !formData.familyHistory
      ) {
        setError('Please complete all lifestyle and risk factor fields.')
        return false
      }
    }

    if (currentStep === 3) {
      if (
        !formData.chestPain ||
        !formData.dyspnea ||
        !formData.functionalClass
      ) {
        setError('Please complete all symptom fields.')
        return false
      }
    }

    if (currentStep === 4) {
      if (
        !formData.bloodPressure ||
        !formData.heartRate ||
        !formData.fastingBloodSugar ||
        !formData.cholesterol ||
        !formData.triglycerides ||
        !formData.ef
      ) {
        setError('Please complete all clinical measurement fields.')
        return false
      }

      if (Number(formData.heartRate) < 30 || Number(formData.heartRate) > 220) {
        setError('Please enter a valid heart rate.')
        return false
      }

      if (Number(formData.ef) < 1 || Number(formData.ef) > 100) {
        setError('Please enter an ejection fraction between 1 and 100.')
        return false
      }
    }

    return true
  }

  const nextStep = () => {
    if (!validateStep()) {
      return
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
      setError('')
    }
  }

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setError('')
    }
  }

  const submitAssessment = () => {
    if (!validateStep()) {
      return
    }

    localStorage.setItem(
      'cardioViewAssessment',
      JSON.stringify(formData)
    )

    navigate('/dashboard')
  }

  return (
    <div className="assessment-page">

      <Navbar />

      <main className="assessment-container">

        <section className="assessment-heading">

          <div>
            <p className="assessment-eyebrow">
              CARDIOVASCULAR ASSESSMENT
            </p>

            <h1>
              Build your health profile
            </h1>

            <p>
              Complete the assessment to generate an
              interactive cardiovascular profile.
            </p>
          </div>

          <div className="assessment-count">
            STEP {currentStep} OF 4
          </div>

        </section>


        {/* STEPPER */}

        <section className="stepper">

          {steps.map((step, index) => {

            const Icon = step.icon

            const completed =
              currentStep > step.number

            const active =
              currentStep === step.number

            return (
              <div
                className="step-wrapper"
                key={step.number}
              >

                <div
                  className={`step ${
                    active ? 'active' : ''
                  } ${
                    completed ? 'completed' : ''
                  }`}
                >

                  <div className="step-icon">

                    {completed ? (
                      <Check size={17} />
                    ) : (
                      <Icon size={17} />
                    )}

                  </div>

                  <div className="step-label">

                    <small>
                      0{step.number}
                    </small>

                    <span>
                      {step.title}
                    </span>

                  </div>

                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`step-line ${
                      completed
                        ? 'completed-line'
                        : ''
                    }`}
                  />
                )}

              </div>
            )
          })}

        </section>


        {/* FORM */}

        <section className="assessment-form-card">

          {/* ERROR */}

          {error && (
            <div className="form-error">

              <AlertCircle size={18} />

              <span>
                {error}
              </span>

            </div>
          )}


          {/* STEP 1 */}

          {currentStep === 1 && (

            <div className="form-step">

              <div className="form-step-heading">

                <div className="form-step-icon">
                  <UserRound size={21} />
                </div>

                <div>

                  <h2>
                    Personal Profile
                  </h2>

                  <p>
                    Basic information used to understand
                    your cardiovascular profile.
                  </p>

                </div>

              </div>


              <div className="form-grid">

                <InputField
                  label="Age"
                  placeholder="Example: 45"
                  type="number"
                  value={formData.age}
                  onChange={(value) =>
                    updateField('age', value)
                  }
                />

                <SelectField
                  label="Sex"
                  value={formData.sex}
                  onChange={(value) =>
                    updateField('sex', value)
                  }
                  options={[
                    'Male',
                    'Female',
                  ]}
                />

                <InputField
                  label="Height"
                  placeholder="Height in cm"
                  type="number"
                  value={formData.height}
                  onChange={(value) =>
                    updateField('height', value)
                  }
                />

                <InputField
                  label="Weight"
                  placeholder="Weight in kg"
                  type="number"
                  value={formData.weight}
                  onChange={(value) =>
                    updateField('weight', value)
                  }
                />

              </div>

            </div>
          )}


          {/* STEP 2 */}

          {currentStep === 2 && (

            <div className="form-step">

              <div className="form-step-heading">

                <div className="form-step-icon">
                  <HeartPulse size={21} />
                </div>

                <div>

                  <h2>
                    Lifestyle & Risk Factors
                  </h2>

                  <p>
                    Tell us about factors that may
                    influence cardiovascular health.
                  </p>

                </div>

              </div>


              <div className="form-grid">

                <SelectField
                  label="Diabetes"
                  value={formData.diabetes}
                  onChange={(value) =>
                    updateField('diabetes', value)
                  }
                  options={[
                    'Yes',
                    'No',
                  ]}
                />

                <SelectField
                  label="Hypertension"
                  value={formData.hypertension}
                  onChange={(value) =>
                    updateField('hypertension', value)
                  }
                  options={[
                    'Yes',
                    'No',
                  ]}
                />

                <SelectField
                  label="Current Smoker"
                  value={formData.smoking}
                  onChange={(value) =>
                    updateField('smoking', value)
                  }
                  options={[
                    'Yes',
                    'No',
                  ]}
                />

                <SelectField
                  label="Family History"
                  value={formData.familyHistory}
                  onChange={(value) =>
                    updateField('familyHistory', value)
                  }
                  options={[
                    'Yes',
                    'No',
                  ]}
                />

              </div>

            </div>
          )}


          {/* STEP 3 */}

          {currentStep === 3 && (

            <div className="form-step">

              <div className="form-step-heading">

                <div className="form-step-icon">
                  <Activity size={21} />
                </div>

                <div>

                  <h2>
                    Symptoms
                  </h2>

                  <p>
                    Select the symptoms or functional
                    indicators that apply.
                  </p>

                </div>

              </div>


              <div className="form-grid">

                <SelectField
                  label="Typical Chest Pain"
                  value={formData.chestPain}
                  onChange={(value) =>
                    updateField('chestPain', value)
                  }
                  options={[
                    'Yes',
                    'No',
                  ]}
                />

                <SelectField
                  label="Dyspnea"
                  value={formData.dyspnea}
                  onChange={(value) =>
                    updateField('dyspnea', value)
                  }
                  options={[
                    'Yes',
                    'No',
                  ]}
                />

                <SelectField
                  label="Functional Class"
                  value={formData.functionalClass}
                  onChange={(value) =>
                    updateField(
                      'functionalClass',
                      value
                    )
                  }
                  options={[
                    'Class I',
                    'Class II',
                    'Class III',
                    'Class IV',
                  ]}
                />

              </div>

            </div>
          )}


          {/* STEP 4 */}

          {currentStep === 4 && (

            <div className="form-step">

              <div className="form-step-heading">

                <div className="form-step-icon">
                  <Stethoscope size={21} />
                </div>

                <div>

                  <h2>
                    Clinical Measurements
                  </h2>

                  <p>
                    Enter available physiological
                    measurements.
                  </p>

                </div>

              </div>


              <div className="form-grid">

                <InputField
                  label="Blood Pressure"
                  placeholder="Example: 120/80"
                  value={formData.bloodPressure}
                  onChange={(value) =>
                    updateField(
                      'bloodPressure',
                      value
                    )
                  }
                />

                <InputField
                  label="Heart Rate"
                  placeholder="BPM"
                  type="number"
                  value={formData.heartRate}
                  onChange={(value) =>
                    updateField(
                      'heartRate',
                      value
                    )
                  }
                />

                <InputField
                  label="Fasting Blood Sugar"
                  placeholder="mg/dL"
                  type="number"
                  value={formData.fastingBloodSugar}
                  onChange={(value) =>
                    updateField(
                      'fastingBloodSugar',
                      value
                    )
                  }
                />

                <InputField
                  label="Cholesterol"
                  placeholder="mg/dL"
                  type="number"
                  value={formData.cholesterol}
                  onChange={(value) =>
                    updateField(
                      'cholesterol',
                      value
                    )
                  }
                />

                <InputField
                  label="Triglycerides"
                  placeholder="mg/dL"
                  type="number"
                  value={formData.triglycerides}
                  onChange={(value) =>
                    updateField(
                      'triglycerides',
                      value
                    )
                  }
                />

                <InputField
                  label="Ejection Fraction"
                  placeholder="Example: 60"
                  type="number"
                  value={formData.ef}
                  onChange={(value) =>
                    updateField('ef', value)
                  }
                />

              </div>

            </div>
          )}


          {/* NAVIGATION */}

          <div className="form-navigation">

            <button
              className="back-button"
              onClick={previousStep}
              disabled={currentStep === 1}
            >

              <ChevronLeft size={17} />

              Back

            </button>


            {currentStep < 4 ? (

              <button
                className="next-button"
                onClick={nextStep}
              >

                Continue

                <ChevronRight size={17} />

              </button>

            ) : (

              <button
                className="next-button"
                onClick={submitAssessment}
              >

                Complete Assessment

                <Check size={17} />

              </button>

            )}

          </div>

        </section>


        <p className="assessment-disclaimer">

          CardioView is an educational frontend
          demonstration. Entered information is not used
          for medical diagnosis.

        </p>

      </main>

    </div>
  )
}


function InputField({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
}) {
  return (
    <label className="field">

      <span>
        {label}
      </span>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
      />

    </label>
  )
}


function SelectField({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <label className="field">

      <span>
        {label}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
      >

        <option value="">
          Select an option
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}

      </select>

    </label>
  )
}

export default Assessment