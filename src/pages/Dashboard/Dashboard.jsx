 import { useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'

import {
  HeartPulse,
  Activity,
  Gauge,
  Droplets,
  ArrowUpRight,
  CalendarDays,
} from 'lucide-react'

import Navbar from '../../components/Navbar/Navbar'
import './Dashboard.css'

function Dashboard() {
  const [assessmentData] = useState(() => {
    const saved = localStorage.getItem('cardioViewAssessment')
    return saved ? JSON.parse(saved) : null
  })

  /*
    --------------------------------------------------
    DYNAMIC VALUES FROM ASSESSMENT
    --------------------------------------------------
  */

  const age = Number(assessmentData?.age) || 45
  const heartRate = Number(assessmentData?.heartRate) || 72
  const cholesterol = Number(assessmentData?.cholesterol) || 180
  const ef = Number(assessmentData?.ef) || 60

  const bloodPressure =
    assessmentData?.bloodPressure || '120/80'

  /*
    --------------------------------------------------
    ILLUSTRATIVE HEALTH INDEX
    --------------------------------------------------

    This is only a frontend demonstration.
    It is NOT a clinically validated score.
  */

  const calculateHealthIndex = () => {
    if (!assessmentData) {
      return 86
    }

    let score = 100

    if (age >= 60) {
      score -= 10
    } else if (age >= 45) {
      score -= 5
    }

    if (heartRate > 100) {
      score -= 10
    } else if (heartRate > 90) {
      score -= 5
    }

    if (cholesterol >= 240) {
      score -= 10
    } else if (cholesterol >= 200) {
      score -= 5
    }

    if (assessmentData.diabetes === 'Yes') {
      score -= 8
    }

    if (assessmentData.hypertension === 'Yes') {
      score -= 8
    }

    if (assessmentData.smoking === 'Yes') {
      score -= 8
    }

    if (assessmentData.familyHistory === 'Yes') {
      score -= 4
    }

    return Math.max(0, Math.min(100, score))
  }

  const healthIndex = calculateHealthIndex()

  const healthIndexLabel =
    healthIndex >= 80
      ? 'Good'
      : healthIndex >= 60
        ? 'Moderate'
        : 'Needs Attention'

  /*
    --------------------------------------------------
    DYNAMIC HEART RATE CHART
    --------------------------------------------------
  */

  const heartRateData = [
    {
      day: 'Mon',
      value: Math.max(40, heartRate - 4),
    },
    {
      day: 'Tue',
      value: Math.max(40, heartRate - 1),
    },
    {
      day: 'Wed',
      value: Math.max(40, heartRate - 3),
    },
    {
      day: 'Thu',
      value: Math.max(40, heartRate + 4),
    },
    {
      day: 'Fri',
      value: Math.max(40, heartRate + 1),
    },
    {
      day: 'Sat',
      value: Math.max(40, heartRate - 1),
    },
    {
      day: 'Sun',
      value: heartRate,
    },
  ]

  /*
    --------------------------------------------------
    ILLUSTRATIVE VESSEL DATA
    --------------------------------------------------

    These are demonstration values until the
    actual ML model is connected.
  */

  const vesselData = [
    {
      vessel: 'LAD',
      value: 32,
    },
    {
      vessel: 'LCX',
      value: 21,
    },
    {
      vessel: 'RCA',
      value: 27,
    },
  ]

  /*
    --------------------------------------------------
    DYNAMIC INSIGHT
    --------------------------------------------------
  */

  const getInsight = () => {
    if (!assessmentData) {
      return {
        title: 'Complete your assessment',
        text:
          'Complete the cardiovascular assessment to personalize the dashboard with your entered measurements.',
      }
    }

    if (healthIndex >= 80) {
      return {
        title: 'Profile looks stable',
        text:
          'Your current assessment inputs produce an illustrative Health Index in the higher range. Continue monitoring your measurements and discuss concerns with a healthcare professional.',
      }
    }

    if (healthIndex >= 60) {
      return {
        title: 'Some factors need attention',
        text:
          'Your assessment contains some factors that affect the illustrative Health Index. Consider discussing your measurements and risk factors with a healthcare professional.',
      }
    }

    return {
      title: 'Review your health profile',
      text:
        'Several entered factors affect the illustrative Health Index. This dashboard is educational and should not be used for diagnosis.',
    }
  }

  const insight = getInsight()

  return (
    <div className="dashboard-page">

      <Navbar />

      <main className="dashboard-container">

        {/* ---------------------------------------- */}
        {/* HEADER */}
        {/* ---------------------------------------- */}

        <section className="dashboard-heading">

          <div>
            <p className="dashboard-eyebrow">
              CARDIOVASCULAR ANALYTICS
            </p>

            <h1>
              Health <span>Dashboard</span>
            </h1>

            <p>
              Monitor your cardiovascular profile through
              interactive health indicators and visual analytics.
            </p>
          </div>

          <div className="dashboard-date">
            <CalendarDays size={17} />
            <span>Current Assessment</span>
          </div>

        </section>


        {/* ---------------------------------------- */}
        {/* ASSESSMENT SUMMARY */}
        {/* ---------------------------------------- */}

        {assessmentData && (
          <section className="assessment-summary">

            <div className="summary-heading">

              <div>
                <p className="summary-eyebrow">
                  ASSESSMENT PROFILE
                </p>

                <h2>
                  Your latest health inputs
                </h2>
              </div>

              <div className="summary-status">
                <span></span>
                DATA AVAILABLE
              </div>

            </div>


            <div className="summary-grid">

              <div className="summary-item">
                <span>AGE</span>
                <strong>{age}</strong>
                <small>years</small>
              </div>

              <div className="summary-item">
                <span>SEX</span>
                <strong>
                  {assessmentData.sex || '—'}
                </strong>
              </div>

              <div className="summary-item">
                <span>HEART RATE</span>
                <strong>{heartRate}</strong>
                <small>BPM</small>
              </div>

              <div className="summary-item">
                <span>BLOOD PRESSURE</span>
                <strong>{bloodPressure}</strong>
              </div>

              <div className="summary-item">
                <span>CHOLESTEROL</span>
                <strong>{cholesterol}</strong>
                <small>mg/dL</small>
              </div>

              <div className="summary-item">
                <span>EJECTION FRACTION</span>
                <strong>{ef}</strong>
                <small>%</small>
              </div>

            </div>

          </section>
        )}


        {/* ---------------------------------------- */}
        {/* TOP METRIC CARDS */}
        {/* ---------------------------------------- */}

        <section className="metric-grid">

          {/* Health Index */}

          <div className="metric-card health-card">

            <div className="metric-top">

              <div className="metric-icon">
                <Gauge size={20} />
              </div>

              <span className="metric-label">
                HEALTH INDEX
              </span>

            </div>

            <div className="metric-main">

              <strong>
                {healthIndex}
              </strong>

              <span>/100</span>

            </div>

            <div className="metric-bottom">

              <span className="metric-status">
                {healthIndexLabel}
              </span>

              <ArrowUpRight size={16} />

            </div>

          </div>


          {/* Heart Rate */}

          <div className="metric-card">

            <div className="metric-top">

              <div className="metric-icon">
                <HeartPulse size={20} />
              </div>

              <span className="metric-label">
                HEART RATE
              </span>

            </div>

            <div className="metric-main">

              <strong>
                {heartRate}
              </strong>

              <span>BPM</span>

            </div>

            <div className="metric-bottom">

              <span className="metric-muted">
                Assessment value
              </span>

            </div>

          </div>


          {/* Blood Pressure */}

          <div className="metric-card">

            <div className="metric-top">

              <div className="metric-icon">
                <Activity size={20} />
              </div>

              <span className="metric-label">
                BLOOD PRESSURE
              </span>

            </div>

            <div className="metric-main">

              <strong>
                {bloodPressure}
              </strong>

            </div>

            <div className="metric-bottom">

              <span className="metric-muted">
                Assessment value
              </span>

            </div>

          </div>


          {/* EF */}

          <div className="metric-card">

            <div className="metric-top">

              <div className="metric-icon">
                <Droplets size={20} />
              </div>

              <span className="metric-label">
                EJECTION FRACTION
              </span>

            </div>

            <div className="metric-main">

              <strong>
                {ef}
              </strong>

              <span>%</span>

            </div>

            <div className="metric-bottom">

              <span className="metric-muted">
                Assessment value
              </span>

            </div>

          </div>

        </section>


        {/* ---------------------------------------- */}
        {/* CHART AREA */}
        {/* ---------------------------------------- */}

        <section className="dashboard-charts">

          {/* HEART RATE CHART */}

          <div className="chart-card">

            <div className="chart-header">

              <div>

                <p className="chart-eyebrow">
                  TREND ANALYSIS
                </p>

                <h2>
                  Heart Rate
                </h2>

              </div>

              <div className="chart-value">

                <strong>
                  {heartRate}
                </strong>

                <span>
                  BPM
                </span>

              </div>

            </div>


            <div className="chart-area">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <AreaChart
                  data={heartRateData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -20,
                    bottom: 0,
                  }}
                >

                  <defs>

                    <linearGradient
                      id="heartRateGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >

                      <stop
                        offset="0%"
                        stopColor="#e63946"
                        stopOpacity={0.25}
                      />

                      <stop
                        offset="100%"
                        stopColor="#e63946"
                        stopOpacity={0}
                      />

                    </linearGradient>

                  </defs>


                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#eee5e5"
                  />

                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 11,
                      fill: '#988d8d',
                    }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 11,
                      fill: '#988d8d',
                    }}
                    domain={[
                      'dataMin - 10',
                      'dataMax + 10',
                    ]}
                  />

                  <Tooltip
                    contentStyle={{
                      borderRadius: '10px',
                      border: '1px solid #eee2e2',
                      boxShadow:
                        '0 10px 30px rgba(50,30,30,0.08)',
                    }}
                    formatter={(value) => [
                      `${value} BPM`,
                      'Heart Rate',
                    ]}
                  />

                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#e63946"
                    strokeWidth={3}
                    fill="url(#heartRateGradient)"
                  />

                </AreaChart>

              </ResponsiveContainer>

            </div>

          </div>


          {/* VESSEL CHART */}

          <div className="chart-card">

            <div className="chart-header">

              <div>

                <p className="chart-eyebrow">
                  VESSEL ANALYSIS
                </p>

                <h2>
                  Vessel Indicators
                </h2>

              </div>

              <div className="chart-mini-label">
                Illustrative
              </div>

            </div>


            <div className="chart-area">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={vesselData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -20,
                    bottom: 0,
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#eee5e5"
                  />

                  <XAxis
                    dataKey="vessel"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 11,
                      fill: '#988d8d',
                    }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 11,
                      fill: '#988d8d',
                    }}
                    domain={[0, 100]}
                  />

                  <Tooltip
                    contentStyle={{
                      borderRadius: '10px',
                      border: '1px solid #eee2e2',
                      boxShadow:
                        '0 10px 30px rgba(50,30,30,0.08)',
                    }}
                    formatter={(value) => [
                      `${value}%`,
                      'Indicator',
                    ]}
                  />

                  <Bar
                    dataKey="value"
                    fill="#e63946"
                    radius={[7, 7, 0, 0]}
                    barSize={42}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </section>


        {/* ---------------------------------------- */}
        {/* LOWER SECTION */}
        {/* ---------------------------------------- */}

        <section className="dashboard-lower">

          {/* INSIGHT */}

          <div className="insight-card">

            <div className="insight-icon">
              <Activity size={20} />
            </div>

            <div className="insight-content">

              <p className="chart-eyebrow">
                CARDIOVIEW INSIGHT
              </p>

              <h2>
                {insight.title}
              </h2>

              <p>
                {insight.text}
              </p>

            </div>

          </div>


          {/* LATEST ASSESSMENT */}

          <div className="latest-card">

            <div className="latest-top">

              <div>

                <p className="chart-eyebrow">
                  LATEST ASSESSMENT
                </p>

                <h2>
                  Cardiovascular Profile
                </h2>

              </div>

              <div className="latest-icon">
                <HeartPulse size={18} />
              </div>

            </div>


            <div className="latest-details">

              <div>
                <span>Diabetes</span>

                <strong>
                  {assessmentData?.diabetes || 'Not entered'}
                </strong>
              </div>

              <div>
                <span>Hypertension</span>

                <strong>
                  {assessmentData?.hypertension || 'Not entered'}
                </strong>
              </div>

              <div>
                <span>Smoking</span>

                <strong>
                  {assessmentData?.smoking || 'Not entered'}
                </strong>
              </div>

              <div>
                <span>Chest Pain</span>

                <strong>
                  {assessmentData?.chestPain || 'Not entered'}
                </strong>
              </div>

            </div>

          </div>

        </section>


        {/* ---------------------------------------- */}
        {/* DISCLAIMER */}
        {/* ---------------------------------------- */}

        <div className="dashboard-disclaimer">

          <div className="disclaimer-dot"></div>

          <p>
            CardioView is an educational frontend
            demonstration. Health Index, vessel indicators,
            charts and insights shown here are illustrative
            and are not clinically validated measurements
            or medical diagnoses.
          </p>

        </div>

      </main>

    </div>
  )
}

export default Dashboard