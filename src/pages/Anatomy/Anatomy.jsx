 import { useState } from 'react'
import {
  Rotate3D,
  Activity,
  HeartPulse,
  CircleDot,
} from 'lucide-react'

import Navbar from '../../components/Navbar/Navbar'
import HeartModel from '../../components/HeartModel/HeartModel'
import './Anatomy.css'

const vessels = [
  {
    name: 'LAD',
    fullName: 'Left Anterior Descending',
    value: 32,
    description: 'Illustrative vessel indicator',
  },
  {
    name: 'LCX',
    fullName: 'Left Circumflex',
    value: 21,
    description: 'Illustrative vessel indicator',
  },
  {
    name: 'RCA',
    fullName: 'Right Coronary Artery',
    value: 27,
    description: 'Illustrative vessel indicator',
  },
]

function Anatomy() {
  const [selectedVessel, setSelectedVessel] = useState('LAD')

  const selected = vessels.find(
    (vessel) => vessel.name === selectedVessel
  )

  return (
    <div className="anatomy-page">

      <Navbar />

      <main className="anatomy-container">

        <section className="anatomy-heading">

          <div>
            <p className="anatomy-eyebrow">
              INTERACTIVE CARDIOVASCULAR MODEL
            </p>

            <h1>
              Explore the
              <span> heart.</span>
            </h1>

            <p>
              Rotate and explore an illustrative 3D cardiovascular
              model while viewing vessel-specific visualization data.
            </p>
          </div>

          <div className="model-status">
            <span></span>
            3D MODEL ACTIVE
          </div>

        </section>


        <section className="anatomy-layout">

          <div className="model-panel">

            <div className="model-panel-top">

              <div className="model-title">
                <Rotate3D size={18} />
                <span>Interactive Anatomy</span>
              </div>

              <div className="model-hint">
                Drag to rotate · Scroll to zoom
              </div>

            </div>

            <HeartModel />

            <div className="model-footer">

              <div>
                <span className="footer-label">VIEW</span>
                <strong>Cardiovascular System</strong>
              </div>

              <div>
                <span className="footer-label">MODE</span>
                <strong>Interactive 3D</strong>
              </div>

              <div>
                <span className="footer-label">STATUS</span>
                <strong className="live-status">
                  <span></span>
                  Live
                </strong>
              </div>

            </div>

          </div>


          <aside className="vessel-panel">

            <div className="panel-heading">

              <div className="panel-icon">
                <HeartPulse size={19} />
              </div>

              <div>
                <h2>Vessel Overview</h2>
                <p>Illustrative vessel indicators</p>
              </div>

            </div>


            <div className="vessel-list">

              {vessels.map((vessel) => (

                <button
                  key={vessel.name}
                  className={
                    selectedVessel === vessel.name
                      ? 'vessel-item selected'
                      : 'vessel-item'
                  }
                  onClick={() =>
                    setSelectedVessel(vessel.name)
                  }
                >

                  <div className="vessel-left">

                    <div className="vessel-icon">
                      <CircleDot size={16} />
                    </div>

                    <div>
                      <strong>{vessel.name}</strong>
                      <span>{vessel.fullName}</span>
                    </div>

                  </div>

                  <div className="vessel-value">
                    {vessel.value}%
                  </div>

                </button>

              ))}

            </div>


            <div className="selected-vessel">

              <p className="selected-label">
                SELECTED VESSEL
              </p>

              <h3>{selected.name}</h3>

              <p>{selected.fullName}</p>

              <div className="indicator">

                <div className="indicator-top">
                  <span>Illustrative indicator</span>
                  <strong>{selected.value}%</strong>
                </div>

                <div className="indicator-bar">
                  <div
                    style={{
                      width: `${selected.value}%`,
                    }}
                  ></div>
                </div>

              </div>

              <div className="indicator-note">
                <Activity size={15} />
                {selected.description}
              </div>

            </div>

          </aside>

        </section>


        <section className="anatomy-info">

          <div>
            <span>01</span>
            <h3>Rotate & Explore</h3>
            <p>
              Interact with the 3D model to examine the
              cardiovascular structure from different angles.
            </p>
          </div>

          <div>
            <span>02</span>
            <h3>Select a Vessel</h3>
            <p>
              Select LAD, LCX, or RCA to update the
              corresponding visualization panel.
            </p>
          </div>

          <div>
            <span>03</span>
            <h3>Future AI Layer</h3>
            <p>
              The architecture can later connect these
              visualizations to a trained prediction model.
            </p>
          </div>

        </section>


        <p className="anatomy-disclaimer">
          CardioView's 3D model and vessel values are
          illustrative frontend demonstrations and are not
          anatomical measurements or medical diagnoses.
        </p>

      </main>

    </div>
  )
}

export default Anatomy