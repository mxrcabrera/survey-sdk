import React, { useState, useEffect } from 'react';
import { Survey, SurveyWidgetProps, Answer, Question } from './types';

export const SurveyWidget: React.FC<SurveyWidgetProps> = ({
  surveyId,
  apiUrl,
  onComplete,
  onError,
  className = ''
}) => {
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Fetch survey data
  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/surveys/${surveyId}`);
        if (!response.ok) throw new Error('Failed to fetch survey');
        
        const data = await response.json();
        setSurvey(data.data);
        setLoading(false);
      } catch (error) {
        onError?.(error instanceof Error ? error.message : 'Unknown error');
        setLoading(false);
      }
    };

    fetchSurvey();
  }, [surveyId, apiUrl, onError]);

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => {
      const existing = prev.findIndex(a => a.questionId === questionId);
      const newAnswer: Answer = { questionId, value };
      
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = newAnswer;
        return updated;
      }
      
      return [...prev, newAnswer];
    });

    // Clear validation errors when user answers
    setValidationErrors([]);
  };

  const validateCurrentQuestion = (): boolean => {
    if (!survey) return false;

    const currentQuestion = survey.questions[currentQuestionIndex];
    const isRequired = currentQuestionIndex < 2; // First two questions are required
    
    if (!isRequired) return true; // Optional questions can be skipped
    
    const answer = answers.find(a => a.questionId === currentQuestion.id);
    return !!(answer && answer.value !== '' && answer.value !== null && answer.value !== undefined);
  };

  const validateRequiredQuestions = (): boolean => {
    if (!survey) return false;

    const errors: string[] = [];
    
    // First two questions are required (index 0 and 1)
    const requiredQuestions = survey.questions.slice(0, 2);
    
    requiredQuestions.forEach((question, index) => {
      const answer = answers.find(a => a.questionId === question.id);
      if (!answer || answer.value === '' || answer.value === null || answer.value === undefined) {
        errors.push(`Question ${index + 1} is required`);
      }
    });

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleNext = () => {
    // Validate current question if it's required
    if (currentQuestionIndex < 2) {
      if (!validateCurrentQuestion()) {
        setValidationErrors([`Please answer this question before continuing`]);
        return;
      }
    }

    // Clear validation errors and proceed
    setValidationErrors([]);
    
    if (survey && currentQuestionIndex < survey.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!survey) return;

    // Validate required questions
    if (!validateRequiredQuestions()) {
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${apiUrl}/api/responses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          surveyId: survey.id,
          answers
        })
      });

      if (!response.ok) throw new Error('Failed to submit response');
      
      const responseData = { surveyId: survey.id, answers };
      onComplete?.(responseData);
      setCompleted(true);
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={`survey-widget ${className}`}>
        <div className="loading">Loading survey...</div>
      </div>
    );
  }

  if (!survey) {
    return (
      <div className={`survey-widget ${className}`}>
        <div className="error">Survey not found</div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className={`survey-widget ${className}`}>
        <div className="success">
          <h3>Thank you!</h3>
          <p>Your response has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  const currentQuestion = survey.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / survey.questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === survey.questions.length - 1;
  const currentAnswer = answers.find(a => a.questionId === currentQuestion.id)?.value;
  
  // Check if current question is answered (for required questions)
  const isCurrentQuestionAnswered = currentAnswer !== undefined && currentAnswer !== '' && currentAnswer !== null;
  const isCurrentQuestionRequired = currentQuestionIndex < 2;
  const canProceed = !isCurrentQuestionRequired || isCurrentQuestionAnswered;

  return (
    <div className={`survey-widget ${className}`}>
      <div className="survey-header">
        <h2>{survey.title}</h2>
        {survey.description && <p>{survey.description}</p>}
        
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <span className="progress-text">
          Question {currentQuestionIndex + 1} of {survey.questions.length}
        </span>
      </div>

      <div className="question-container">
        <QuestionRenderer
          question={currentQuestion}
          value={currentAnswer}
          onChange={(value) => handleAnswerChange(currentQuestion.id, value)}
          isRequired={currentQuestionIndex < 2} // First two questions are required
        />
      </div>

      {validationErrors.length > 0 && (
        <div className="validation-errors">
          {validationErrors.map((error, index) => (
            <div key={index} className="error-message">{error}</div>
          ))}
        </div>
      )}

      <div className="navigation">
        <button 
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="btn btn-secondary"
        >
          Previous
        </button>

        {isLastQuestion ? (
          <button 
            onClick={handleSubmit}
            disabled={submitting}
            className="btn btn-primary"
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        ) : (
          <button 
            onClick={handleNext}
            disabled={!canProceed}
            className="btn btn-primary"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

// Question renderer component
const QuestionRenderer: React.FC<{
  question: Question;
  value: any;
  onChange: (value: any) => void;
  isRequired?: boolean;
}> = ({ question, value, onChange, isRequired = false }) => {
  const renderInput = () => {
    switch (question.type) {
      case 'text':
        const textLimit = 200;
        const textLength = (value || '').length;
        
        return (
          <div>
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              className="form-input"
              placeholder={isRequired ? "Your answer (required)..." : "Your answer (optional)..."}
              maxLength={textLimit}
            />
            <div className={`char-counter ${textLength > textLimit * 0.8 ? 'char-counter-warning' : ''}`}>
              {textLength}/{textLimit}
            </div>
          </div>
        );

      case 'textarea':
        const textareaLimit = 500;
        const textareaLength = (value || '').length;
        
        return (
          <div>
            <textarea
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              className="form-textarea"
              rows={4}
              placeholder={isRequired ? "Your answer (required)..." : "Your answer (optional)..."}
              maxLength={textareaLimit}
            />
            <div className={`char-counter ${textareaLength > textareaLimit * 0.8 ? 'char-counter-warning' : ''}`}>
              {textareaLength}/{textareaLimit}
            </div>
          </div>
        );

      case 'radio':
        return (
          <div className="radio-group">
            {question.options?.map(option => (
              <label key={option.id} className="radio-option">
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange(e.target.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="checkbox-group">
            {question.options?.map(option => (
              <label key={option.id} className="checkbox-option">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={Array.isArray(value) && value.includes(option.value)}
                  onChange={(e) => {
                    const currentValues = Array.isArray(value) ? value : [];
                    if (e.target.checked) {
                      onChange([...currentValues, option.value]);
                    } else {
                      onChange(currentValues.filter(v => v !== option.value));
                    }
                  }}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="form-select"
          >
            <option value="">{isRequired ? "Select an option (required)..." : "Select an option (optional)..."}</option>
            {question.options?.map(option => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'scale':
        return (
          <div className="scale-group">
            {[1, 2, 3, 4, 5].map(num => (
              <label key={num} className="scale-option">
                <input
                  type="radio"
                  name={question.id}
                  value={num}
                  checked={value === num}
                  onChange={(e) => onChange(Number(e.target.value))}
                />
                <span className="scale-number">{num}</span>
              </label>
            ))}
          </div>
        );

      case 'yes_no':
        return (
          <div className="yes-no-group">
            <label className="yes-no-option">
              <input
                type="radio"
                name={question.id}
                value="yes"
                checked={value === 'yes'}
                onChange={(e) => onChange(e.target.value)}
              />
              <span>Yes</span>
            </label>
            <label className="yes-no-option">
              <input
                type="radio"
                name={question.id}
                value="no"
                checked={value === 'no'}
                onChange={(e) => onChange(e.target.value)}
              />
              <span>No</span>
            </label>
          </div>
        );

      default:
        return <div>Unsupported question type</div>;
    }
  };

  return (
    <div className="question">
      <h3 className="question-text">
        {question.text}
        {isRequired && <span className="required">*</span>}
      </h3>
      {renderInput()}
    </div>
  );
};