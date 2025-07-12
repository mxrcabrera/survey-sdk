import sqlite3 from 'sqlite3';
import { Survey, SurveyResponse, Question, QuestionMetrics } from './types';

class Database {
  private db: sqlite3.Database;
  private isReady: boolean = false;

  constructor() {
    this.db = new sqlite3.Database(':memory:', (err) => {
      if (err) {
        console.error('Error opening database:', err);
      } else {
        console.log('✅ SQLite database connected');
        this.init();
      }
    });
  }

  // Create tables
  private init() {
    this.db.serialize(() => {
      this.db.run(`
        CREATE TABLE surveys (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) console.error('Error creating surveys table:', err);
      });

      this.db.run(`
        CREATE TABLE questions (
          id TEXT PRIMARY KEY,
          survey_id TEXT,
          type TEXT NOT NULL,
          text TEXT NOT NULL,
          options TEXT,
          required BOOLEAN DEFAULT 0,
          order_index INTEGER,
          FOREIGN KEY (survey_id) REFERENCES surveys (id)
        )
      `, (err) => {
        if (err) console.error('Error creating questions table:', err);
      });

      this.db.run(`
        CREATE TABLE responses (
          id TEXT PRIMARY KEY,
          survey_id TEXT,
          submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          user_id TEXT,
          FOREIGN KEY (survey_id) REFERENCES surveys (id)
        )
      `, (err) => {
        if (err) console.error('Error creating responses table:', err);
      });

      this.db.run(`
        CREATE TABLE answers (
          id TEXT PRIMARY KEY,
          response_id TEXT,
          question_id TEXT,
          value TEXT,
          FOREIGN KEY (response_id) REFERENCES responses (id),
          FOREIGN KEY (question_id) REFERENCES questions (id)
        )
      `, (err) => {
        if (err) console.error('Error creating answers table:', err);
        else {
          setTimeout(() => this.insertSampleData(), 100);
        }
      });
    });
  }

  private insertSampleData() {
    const surveyId = 'survey-1';
    
    // Insert survey
    this.db.run(
      'INSERT INTO surveys (id, title, description) VALUES (?, ?, ?)',
      [surveyId, 'Customer Satisfaction Survey', 'Help us improve our service'],
      (err) => {
        if (err) {
          console.error('Error inserting survey:', err);
        } else {
          console.log('✅ Sample survey inserted');
        }
      }
    );

    // Insert questions
    const questions = [
      {
        id: 'q1',
        type: 'radio',
        text: 'How satisfied are you with our service?',
        required: true,
        options: JSON.stringify([
          { id: 'opt1', label: 'Very Satisfied', value: 'very_satisfied' },
          { id: 'opt2', label: 'Satisfied', value: 'satisfied' },
          { id: 'opt3', label: 'Neutral', value: 'neutral' },
          { id: 'opt4', label: 'Dissatisfied', value: 'dissatisfied' },
          { id: 'opt5', label: 'Very Dissatisfied', value: 'very_dissatisfied' }
        ]),
        order: 1
      },
      {
        id: 'q2',
        type: 'scale',
        text: 'On a scale of 1-5, how likely are you to recommend us?',
        required: true,
        options: null,
        order: 2
      },
      {
        id: 'q3',
        type: 'textarea',
        text: 'What could we improve?',
        required: false,
        options: null,
        order: 3
      }
    ];

    questions.forEach(q => {
      this.db.run(
        'INSERT INTO questions (id, survey_id, type, text, options, required, order_index) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [q.id, surveyId, q.type, q.text, q.options, q.required ? 1 : 0, q.order],
        (err) => {
          if (err) {
            console.error('Error inserting question:', err);
          }
        }
      );
    });

    console.log('✅ Sample data initialization complete');
    this.isReady = true;
  }

  async getSurvey(id: string): Promise<Survey | null> {
    return new Promise((resolve, reject) => {
      this.db.get(
        'SELECT * FROM surveys WHERE id = ?',
        [id],
        (err, survey: any) => {
          if (err) {
            reject(err);
            return;
          }

          if (!survey) {
            resolve(null);
            return;
          }

          // Get questions for this survey
          this.db.all(
            'SELECT * FROM questions WHERE survey_id = ? ORDER BY order_index',
            [id],
            (err, questions: any[]) => {
              if (err) {
                reject(err);
                return;
              }

              const formattedQuestions: Question[] = questions.map(q => ({
                id: q.id,
                type: q.type,
                text: q.text,
                options: q.options ? JSON.parse(q.options) : undefined,
                required: q.required === 1,
                order: q.order_index
              }));

              resolve({
                id: survey.id,
                title: survey.title,
                description: survey.description,
                questions: formattedQuestions,
                createdAt: survey.created_at
              });
            }
          );
        }
      );
    });
  }

  async saveResponse(response: Omit<SurveyResponse, 'id' | 'submittedAt'>): Promise<string> {
    return new Promise((resolve, reject) => {
      const responseId = `response-${Date.now()}`;
      const database = this.db;

      database.run(
        'INSERT INTO responses (id, survey_id, user_id) VALUES (?, ?, ?)',
        [responseId, response.surveyId, response.userId || null],
        function(err) {
          if (err) {
            reject(err);
            return;
          }

          // Insert answers
          let completedAnswers = 0;
          const totalAnswers = response.answers.length;
          
          if (totalAnswers === 0) {
            resolve(responseId);
            return;
          }

          response.answers.forEach((answer, index) => {
            database.run(
              'INSERT INTO answers (id, response_id, question_id, value) VALUES (?, ?, ?, ?)',
              [`answer-${responseId}-${index}`, responseId, answer.questionId, JSON.stringify(answer.value)],
              (err) => {
                if (err) {
                  reject(err);
                  return;
                }
                
                completedAnswers++;
                if (completedAnswers === totalAnswers) {
                  resolve(responseId);
                }
              }
            );
          });
        }
      );
    });
  }

  async getMetrics(surveyId: string): Promise<QuestionMetrics[]> {
    return new Promise((resolve, reject) => {
      // Get all questions for the survey
      this.db.all(
        'SELECT * FROM questions WHERE survey_id = ? ORDER BY order_index',
        [surveyId],
        (err, questions: any[]) => {
          if (err) {
            reject(err);
            return;
          }

          const metricsPromises = questions.map(question => {
            return new Promise<QuestionMetrics>((resolveMetric, rejectMetric) => {
              // Get all answers for this question
              this.db.all(`
                SELECT a.value 
                FROM answers a 
                JOIN responses r ON a.response_id = r.id 
                WHERE a.question_id = ? AND r.survey_id = ?
              `, [question.id, surveyId], (err, answers: any[]) => {
                if (err) {
                  rejectMetric(err);
                  return;
                }

                const responseDistribution: Record<string, number> = {};
                
                answers.forEach(answer => {
                  const value = JSON.parse(answer.value);
                  const key = Array.isArray(value) ? value.join(', ') : String(value);
                  responseDistribution[key] = (responseDistribution[key] || 0) + 1;
                });

                resolveMetric({
                  questionId: question.id,
                  questionText: question.text,
                  questionType: question.type,
                  totalResponses: answers.length,
                  responseDistribution
                });
              });
            });
          });

          Promise.all(metricsPromises)
            .then(resolve)
            .catch(reject);
        }
      );
    });
  }
}

const db = new Database();
export default db;