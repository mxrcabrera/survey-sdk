import express from 'express';
import cors from 'cors';
import db from './database';
import { SurveyResponse } from './types';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});

// Routes

// Get survey by ID
app.get('/api/surveys/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const survey = await db.getSurvey(id);
    
    if (!survey) {
      return res.status(404).json({
        success: false,
        error: 'Survey not found'
      });
    }

    res.json({
      success: true,
      data: survey
    });
  } catch (error) {
    console.error('Error fetching survey:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch survey'
    });
  }
});

// Submit survey response
app.post('/api/responses', async (req, res) => {
  try {
    const { surveyId, answers, userId } = req.body;

    if (!surveyId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request data'
      });
    }

    // Validate that survey exists
    const survey = await db.getSurvey(surveyId);
    if (!survey) {
      return res.status(404).json({
        success: false,
        error: 'Survey not found'
      });
    }

    const responseId = await db.saveResponse({
      surveyId,
      answers,
      userId
    });

    res.status(201).json({
      success: true,
      data: {
        id: responseId,
        message: 'Response submitted successfully'
      }
    });
  } catch (error) {
    console.error('Error saving response:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save response'
    });
  }
});

// Get survey metrics
app.get('/api/surveys/:id/metrics', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate that survey exists
    const survey = await db.getSurvey(id);
    if (!survey) {
      return res.status(404).json({
        success: false,
        error: 'Survey not found'
      });
    }

    const metrics = await db.getMetrics(id);

    res.json({
      success: true,
      data: {
        surveyId: id,
        surveyTitle: survey.title,
        totalQuestions: survey.questions.length,
        metrics
      }
    });
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch metrics'
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 SurveyFlow Backend running on port ${PORT}`);
  console.log(`📊 API endpoints:`);
  console.log(`   GET  /api/surveys/:id       - Get survey`);
  console.log(`   POST /api/responses         - Submit response`);
  console.log(`   GET  /api/surveys/:id/metrics - Get metrics`);
});