import React, { useState } from 'react';
import { SurveyWidget, SurveyResponse } from '@surveyflow/sdk';

const App: React.FC = () => {
  const [showMetrics, setShowMetrics] = useState(false);
  const [metrics, setMetrics] = useState<any>(null);
  const [responseSubmitted, setResponseSubmitted] = useState(false);

  const handleSurveyComplete = (response: SurveyResponse) => {
    console.log('Survey completed:', response);
    setResponseSubmitted(true);
  };

  const handleSurveyError = (error: string) => {
    console.error('Survey error:', error);
    alert(`Error: ${error}`);
  };

  const loadMetrics = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/surveys/survey-1/metrics');
      if (!response.ok) throw new Error('Failed to fetch metrics');
      
      const data = await response.json();
      setMetrics(data.data);
      setShowMetrics(true);
    } catch (error) {
      console.error('Error loading metrics:', error);
      alert('Failed to load metrics');
    }
  };

  const calculateCompletions = (metricsData: any) => {
    if (!metricsData || !metricsData.metrics || metricsData.metrics.length === 0) return 0;
    
    // Complete = respondió TODAS las preguntas (1, 2 y 3)
    return Math.min(...metricsData.metrics.map((m: any) => m.totalResponses));
  };

  const calculatePartialResponses = (metricsData: any) => {
    if (!metricsData || !metricsData.metrics || metricsData.metrics.length === 0) return 0;
    
    // Partial = respondió solo las obligatorias (1 y 2) pero no la 3
    const requiredQuestions = metricsData.metrics.slice(0, 2);
    if (requiredQuestions.length === 0) return 0;
    
    const completeSubmissions = calculateCompletions(metricsData);
    const minRequiredResponses = Math.min(...requiredQuestions.map((m: any) => m.totalResponses));
    
    return minRequiredResponses - completeSubmissions;
  };

  return (
    <div>
      <div className="demo-header">
        <h1>🚀 SurveyFlow</h1>
        <p>Professional Survey SDK Integration</p>
        
        <div className="header-buttons">
          <button 
            className="btn-modern"
            onClick={loadMetrics}
          >
            📊 View Metrics
          </button>
          
          <button 
            className="btn-modern"
            onClick={() => {
              setResponseSubmitted(false);
              setShowMetrics(false);
            }}
          >
            🔄 Reset Demo
          </button>
        </div>
      </div>

      {showMetrics ? (
        <div className="metrics-container">
          <div className="metrics-header">
            <h2>📈 Survey Analytics</h2>
          </div>
          
          {metrics ? (
            <div>
              <div className="metrics-summary">
                <div className="metric-card">
                  <div className="metric-value">{metrics.totalQuestions}</div>
                  <div className="metric-label">Total Questions</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">{calculateCompletions(metrics)}</div>
                  <div className="metric-label">Complete Submissions</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">{calculatePartialResponses(metrics)}</div>
                  <div className="metric-label">Partial Submissions</div>
                </div>
              </div>

              <div>
                {metrics.metrics.map((questionMetric: any, index: number) => (
                  <div key={questionMetric.questionId} className="question-metric">
                    <h4>
                      {questionMetric.questionText}
                      {index < 2 && <span style={{ color: '#ff6b6b', marginLeft: '8px' }}>*</span>}
                      {index >= 2 && <span style={{ color: '#888888', marginLeft: '8px', fontSize: '0.9rem' }}>(optional)</span>}
                    </h4>
                    
                    <div className="question-meta">
                      <span><strong>Total Responses:</strong> {questionMetric.totalResponses}</span>
                    </div>
                    
                    {questionMetric.totalResponses > 0 && (
                      <div className="response-distribution">
                        <strong>Results:</strong>
                        {questionMetric.questionType === 'textarea' || questionMetric.questionType === 'text' ? (
                          // For text/textarea questions, show truncated responses
                          Object.entries(questionMetric.responseDistribution).map(([value, count], index) => {
                            // Type assertion for count
                            const responseCount = count as number;
                            
                            // Remove quotes and truncate long text
                            const cleanValue = value.replace(/"/g, '');
                            const truncatedValue = cleanValue.length > 60 
                              ? cleanValue.substring(0, 60) + '...' 
                              : cleanValue;
                            
                            return (
                              <div key={index} className="response-item">
                                <div className="text-response">
                                  <span className="response-text">"{truncatedValue}"</span>
                                  {responseCount > 1 && <span className="response-count-badge">{responseCount}x</span>}
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          // For other question types, show normal distribution
                          Object.entries(questionMetric.responseDistribution).map(([value, count]) => {
                            // Type assertion for count
                            const responseCount = count as number;
                            const percentage = Math.round((responseCount / questionMetric.totalResponses) * 100);
                            
                            // Convert internal values to user-friendly labels
                            let displayLabel = value;
                            if (value === 'very_satisfied') displayLabel = 'Very Satisfied';
                            else if (value === 'satisfied') displayLabel = 'Satisfied';
                            else if (value === 'neutral') displayLabel = 'Neutral';
                            else if (value === 'dissatisfied') displayLabel = 'Dissatisfied';
                            else if (value === 'very_dissatisfied') displayLabel = 'Very Dissatisfied';
                            
                            // Add stars for scale questions
                            if (questionMetric.questionType === 'scale' && !isNaN(Number(value))) {
                              displayLabel = `${value}⭐`;
                            }
                            
                            return (
                              <div key={value} className="response-item">
                                <div className="response-bar-container">
                                  <div className="response-label-row">
                                    <span className="response-label">{displayLabel}</span>
                                    <span className="response-count">{responseCount} ({percentage}%)</span>
                                  </div>
                                  <div className="response-bar">
                                    <div 
                                      className="response-bar-fill" 
                                      style={{ width: `${percentage}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <button 
                className="btn btn-primary"
                onClick={() => setShowMetrics(false)}
                style={{ width: '100%', marginTop: '2rem' }}
              >
                ← Back to Survey
              </button>
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: '#888888' }}>Loading metrics...</p>
          )}
        </div>
      ) : (
        <SurveyWidget
          surveyId="survey-1"
          apiUrl="http://localhost:3001"
          onComplete={handleSurveyComplete}
          onError={handleSurveyError}
        />
      )}

      {responseSubmitted && !showMetrics && (
        <div className="completion-message">
          <p>✅ Response submitted! Check the metrics to see your contribution.</p>
        </div>
      )}
    </div>
  );
};

export default App;