const fs = require('fs');
const content = fs.readFileSync('G:/CreateQuizForm.gs', 'utf8');

const match = content.match(/var data = (\[[\s\S]*?\n  \];)/);
if (!match) {
  console.error('Data not matched');
  process.exit(1);
}

const sandbox = {};
const script = 'sandbox.data = ' + match[1];
eval(script);

const rawData = sandbox.data;
let currentSection = 'General';
const questions = [];
let qIndex = 1;
const optionLetters = ['A', 'B', 'C', 'D'];

for (const item of rawData) {
  if (item[0] === 'S') {
    currentSection = item[1];
  } else {
    const [qText, options, correctIdx] = item;
    questions.push({
      id: 'q-' + qIndex,
      number: qIndex,
      section: currentSection,
      questionText: qText,
      options: options,
      correctIndex: correctIdx,
      correctLetter: optionLetters[correctIdx] || 'A',
      marks: 1,
    });
    qIndex++;
  }
}

const tsContent = `export interface AssessmentQuestion {
  id: string;
  number: number;
  section: string;
  questionText: string;
  options: string[];
  correctIndex: number;
  correctLetter: string;
  marks: number;
}

export const ASSESSMENT_METADATA = {
  id: "tech-assessment-100",
  title: "Technical Knowledge Assessment — Computer Programming & Web Technology",
  description: "100-question objective examination covering HTML, CSS, JavaScript, C Programming, Python, and SQL. Time allowed: 90 minutes. Maximum marks: 100. Each question carries 1 mark. Passing mark: 40. All questions are compulsory.",
  durationMinutes: 90,
  totalQuestions: 100,
  totalMarks: 100,
  passingMarks: 40,
  sections: [
    { id: "A", title: "SECTION A — HTML (Questions 1–15)", start: 1, end: 15 },
    { id: "B", title: "SECTION B — CSS (Questions 16–30)", start: 16, end: 30 },
    { id: "C", title: "SECTION C — JavaScript (Questions 31–50)", start: 31, end: 50 },
    { id: "D", title: "SECTION D — C Programming (Questions 51–65)", start: 51, end: 65 },
    { id: "E", title: "SECTION E — Python (Questions 66–80)", start: 66, end: 80 },
    { id: "F", title: "SECTION F — SQL (Questions 81–100)", start: 81, end: 100 },
  ],
};

export const ALL_ASSESSMENT_QUESTIONS: AssessmentQuestion[] = ${JSON.stringify(questions, null, 2)};
`;

fs.writeFileSync('src/lib/assessment-data.ts', tsContent, 'utf8');
console.log('Successfully wrote', questions.length, 'questions to src/lib/assessment-data.ts');

