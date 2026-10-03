 import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import './Home.css'

function Home() {
  return (
    <div className="home-page">

      <Navbar />

      <main>

        {/* HERO */}

        <section className="hero">

          <div className="hero-content">

            <div className="status-badge">
              <span className="status-dot"></span>
              CARDIOVASCULAR INTELLIGENCE
            </div>

            <h1>
              See your heart
              <span> differently.</span>
            </h1>

            <p className="hero-description">
              CardioView transforms cardiovascular health data
              into interactive visual insights, helping you
              understand your heart through a modern digital
              experience.
            </p>

            <div className="hero-actions">

              <Link
                to="/assessment"
                className="primary-action"
              >
                Start Health Assessment
                <span>→</span>
              </Link>

              <Link
                to="/anatomy"
                className="secondary-action"
              >
                Explore Heart Anatomy
              </Link>

            </div>

            <div className="hero-trust">

              <div>
                <strong>55+</strong>
                <span>Health Features</span>
              </div>

              <div>
                <strong>4</strong>
                <span>Cardiac Indicators</span>
              </div>

              <div>
                <strong>24/7</strong>
                <span>Digital Insights</span>
              </div>

            </div>

          </div>


          {/* VISUAL */}

          <div className="hero-visual">

            <div className="visual-glow"></div>

            <div className="orbit orbit-one"></div>
            <div className="orbit orbit-two"></div>

            <div className="heart-visual">

              <div className="heart-symbol">
                ♥
              </div>

              <div className="pulse-ring"></div>

            </div>


            {/* Heart Rate Card */}

            <div className="floating-card heart-rate-card">

              <div className="card-icon">
                ♥
              </div>

              <div>
                <span>Heart Rate</span>
                <strong>72 <small>BPM</small></strong>
              </div>

              <div className="mini-wave">
                ∿∿∿∿
              </div>

            </div>


            {/* Health Score */}

            <div className="floating-card score-card">

              <div className="score-circle">
                <span>86</span>
                <small>/100</small>
              </div>

              <div>
                <span>Health Index</span>
                <strong>Good</strong>
              </div>

            </div>

          </div>

        </section>


        {/* FEATURE STRIP */}

        <section className="feature-strip">

          <div className="feature-intro">
            <span>01</span>
            <h2>
              One platform.
              <br />
              Multiple insights.
            </h2>
          </div>


          <div className="feature-item">

            <div className="feature-number">
              01
            </div>

            <div>
              <h3>Visual Analytics</h3>
              <p>
                Turn complex health information into
                understandable visual insights.
              </p>
            </div>

          </div>


          <div className="feature-item">

            <div className="feature-number">
              02
            </div>

            <div>
              <h3>Heart Anatomy</h3>
              <p>
                Explore an interactive representation
                of cardiovascular structures.
              </p>
            </div>

          </div>


          <div className="feature-item">

            <div className="feature-number">
              03
            </div>

            <div>
              <h3>Health Assessment</h3>
              <p>
                Enter health information and explore
                your personalized dashboard.
              </p>
            </div>

          </div>

        </section>


        {/* DISCLAIMER */}

        <section className="home-disclaimer">

          <span>●</span>

          CardioView is an educational visualization
          platform. It is not a medical diagnostic tool
          and does not replace professional medical advice.

        </section>

      </main>

    </div>
  )
}

export default Home