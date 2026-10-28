export interface AssessmentQuestion {
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

export const ALL_ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    "id": "q-1",
    "number": 1,
    "section": "SECTION A — HTML (Questions 1–15)",
    "questionText": "What is the primary purpose of HTML?",
    "options": [
      "To manage databases",
      "To structure content on web pages",
      "To perform server-side calculations",
      "To design operating systems"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-2",
    "number": 2,
    "section": "SECTION A — HTML (Questions 1–15)",
    "questionText": "Which HTML tag is used to create a hyperlink?",
    "options": [
      "<link>",
      "<href>",
      "<a>",
      "<url>"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-3",
    "number": 3,
    "section": "SECTION A — HTML (Questions 1–15)",
    "questionText": "Which HTML element represents the largest heading by default?",
    "options": [
      "<h6>",
      "<heading>",
      "<head>",
      "<h1>"
    ],
    "correctIndex": 3,
    "correctLetter": "D",
    "marks": 1
  },
  {
    "id": "q-4",
    "number": 4,
    "section": "SECTION A — HTML (Questions 1–15)",
    "questionText": "Which attribute specifies the destination of a hyperlink?",
    "options": [
      "src",
      "href",
      "action",
      "target"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-5",
    "number": 5,
    "section": "SECTION A — HTML (Questions 1–15)",
    "questionText": "Which HTML element is used to display an image?",
    "options": [
      "<picturefile>",
      "<image>",
      "<img>",
      "<src>"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-6",
    "number": 6,
    "section": "SECTION A — HTML (Questions 1–15)",
    "questionText": "Which declaration identifies an HTML5 document?",
    "options": [
      "<html version=\"5\">",
      "<!DOCTYPE html>",
      "<doctype html5>",
      "<!HTML5>"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-7",
    "number": 7,
    "section": "SECTION A — HTML (Questions 1–15)",
    "questionText": "Which element creates an ordered list?",
    "options": [
      "<ul>",
      "<li>",
      "<dl>",
      "<ol>"
    ],
    "correctIndex": 3,
    "correctLetter": "D",
    "marks": 1
  },
  {
    "id": "q-8",
    "number": 8,
    "section": "SECTION A — HTML (Questions 1–15)",
    "questionText": "Which attribute provides alternative text for an image?",
    "options": [
      "title",
      "alt",
      "name",
      "description"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-9",
    "number": 9,
    "section": "SECTION A — HTML (Questions 1–15)",
    "questionText": "Which HTML element is used to create a table row?",
    "options": [
      "<td>",
      "<th>",
      "<tr>",
      "<table-row>"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-10",
    "number": 10,
    "section": "SECTION A — HTML (Questions 1–15)",
    "questionText": "Which attribute allows a form control to submit its value under a specified field name?",
    "options": [
      "id",
      "class",
      "name",
      "placeholder"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-11",
    "number": 11,
    "section": "SECTION A — HTML (Questions 1–15)",
    "questionText": "Which input type is most appropriate for validating an email address in a standard HTML form?",
    "options": [
      "type=\"text\"",
      "type=\"email\"",
      "type=\"mailbox\"",
      "type=\"address\""
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-12",
    "number": 12,
    "section": "SECTION A — HTML (Questions 1–15)",
    "questionText": "Which semantic HTML element represents a self-contained composition, such as a blog post?",
    "options": [
      "<article>",
      "<span>",
      "<div>",
      "<footer>"
    ],
    "correctIndex": 0,
    "correctLetter": "A",
    "marks": 1
  },
  {
    "id": "q-13",
    "number": 13,
    "section": "SECTION A — HTML (Questions 1–15)",
    "questionText": "Which attribute makes a form field mandatory before submission in normal browser validation?",
    "options": [
      "validate",
      "mandatory",
      "required",
      "mustfill"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-14",
    "number": 14,
    "section": "SECTION A — HTML (Questions 1–15)",
    "questionText": "Which HTML element is commonly used to embed video content?",
    "options": [
      "<media>",
      "<movie>",
      "<video>",
      "<play>"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-15",
    "number": 15,
    "section": "SECTION A — HTML (Questions 1–15)",
    "questionText": "What is the primary purpose of the defer attribute on a classic external script?",
    "options": [
      "To execute the script before HTML parsing starts",
      "To defer script execution until HTML parsing is complete",
      "To prevent the script from executing",
      "To execute the script repeatedly"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-16",
    "number": 16,
    "section": "SECTION B — CSS (Questions 16–30)",
    "questionText": "What is the primary purpose of CSS?",
    "options": [
      "To structure HTML documents",
      "To style and lay out web pages",
      "To store database records",
      "To compile Java programs"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-17",
    "number": 17,
    "section": "SECTION B — CSS (Questions 16–30)",
    "questionText": "Which CSS property changes the text color?",
    "options": [
      "font-color",
      "text-style",
      "color",
      "background-color"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-18",
    "number": 18,
    "section": "SECTION B — CSS (Questions 16–30)",
    "questionText": "Which selector targets an element with the ID header?",
    "options": [
      ".header",
      "header",
      "*header",
      "#header"
    ],
    "correctIndex": 3,
    "correctLetter": "D",
    "marks": 1
  },
  {
    "id": "q-19",
    "number": 19,
    "section": "SECTION B — CSS (Questions 16–30)",
    "questionText": "Which CSS property controls the space inside an element's border?",
    "options": [
      "margin",
      "padding",
      "outline",
      "gap"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-20",
    "number": 20,
    "section": "SECTION B — CSS (Questions 16–30)",
    "questionText": "Which declaration makes a flex container arrange its direct children in a row by default?",
    "options": [
      "display: block;",
      "position: flex;",
      "display: flex;",
      "flex-direction: column;"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-21",
    "number": 21,
    "section": "SECTION B — CSS (Questions 16–30)",
    "questionText": "Which CSS property controls the size of text?",
    "options": [
      "font-size",
      "text-weight",
      "font-style",
      "text-transform"
    ],
    "correctIndex": 0,
    "correctLetter": "A",
    "marks": 1
  },
  {
    "id": "q-22",
    "number": 22,
    "section": "SECTION B — CSS (Questions 16–30)",
    "questionText": "Which unit is relative to the font size of the element itself?",
    "options": [
      "px",
      "em",
      "vh",
      "cm"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-23",
    "number": 23,
    "section": "SECTION B — CSS (Questions 16–30)",
    "questionText": "Which CSS pseudo-class applies styles when the pointer is over an element?",
    "options": [
      ":focus",
      ":active",
      ":hover",
      ":visited"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-24",
    "number": 24,
    "section": "SECTION B — CSS (Questions 16–30)",
    "questionText": "Which property is commonly used to create a responsive layout with CSS Grid?",
    "options": [
      "grid-template-columns",
      "text-columns",
      "column-style",
      "grid-font"
    ],
    "correctIndex": 0,
    "correctLetter": "A",
    "marks": 1
  },
  {
    "id": "q-25",
    "number": 25,
    "section": "SECTION B — CSS (Questions 16–30)",
    "questionText": "Which value of position places an element relative to the nearest positioned ancestor?",
    "options": [
      "static",
      "fixed",
      "absolute",
      "relative"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-26",
    "number": 26,
    "section": "SECTION B — CSS (Questions 16–30)",
    "questionText": "Which CSS property controls the stacking order of positioned elements?",
    "options": [
      "layer",
      "z-index",
      "stack-order",
      "depth"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-27",
    "number": 27,
    "section": "SECTION B — CSS (Questions 16–30)",
    "questionText": "Which rule is used to apply CSS conditionally based on viewport width?",
    "options": [
      "@keyframes",
      "@import",
      "@media",
      "@font-face"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-28",
    "number": 28,
    "section": "SECTION B — CSS (Questions 16–30)",
    "questionText": "Which declaration prevents an element from being displayed and removes its layout space?",
    "options": [
      "visibility: hidden;",
      "opacity: 0;",
      "display: none;",
      "position: absolute;"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-29",
    "number": 29,
    "section": "SECTION B — CSS (Questions 16–30)",
    "questionText": "In the CSS box model, what does box-sizing: border-box mean?",
    "options": [
      "The width includes content, padding, and border",
      "The width includes margin but excludes padding",
      "The element has no border",
      "The element's width is always automatic"
    ],
    "correctIndex": 0,
    "correctLetter": "A",
    "marks": 1
  },
  {
    "id": "q-30",
    "number": 30,
    "section": "SECTION B — CSS (Questions 16–30)",
    "questionText": "Which selector has the highest specificity among the following, assuming no competing !important declarations or cascade-layer differences?",
    "options": [
      "p",
      ".content",
      "#main",
      "div p"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-31",
    "number": 31,
    "section": "SECTION C — JavaScript (Questions 31–50)",
    "questionText": "Which keyword declares a block-scoped variable that can be reassigned?",
    "options": [
      "const",
      "let",
      "static",
      "define"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-32",
    "number": 32,
    "section": "SECTION C — JavaScript (Questions 31–50)",
    "questionText": "Which operator checks equality without performing type coercion?",
    "options": [
      "=",
      "==",
      "===",
      "!="
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-33",
    "number": 33,
    "section": "SECTION C — JavaScript (Questions 31–50)",
    "questionText": "What is the output of the following code?\n\nconsole.log(typeof \"Hello\");",
    "options": [
      "text",
      "string",
      "char",
      "object"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-34",
    "number": 34,
    "section": "SECTION C — JavaScript (Questions 31–50)",
    "questionText": "Which method adds one or more elements to the end of an array?",
    "options": [
      "pop()",
      "shift()",
      "push()",
      "unshift()"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-35",
    "number": 35,
    "section": "SECTION C — JavaScript (Questions 31–50)",
    "questionText": "Which keyword is used to define a traditional JavaScript function?",
    "options": [
      "func",
      "method",
      "function",
      "def"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-36",
    "number": 36,
    "section": "SECTION C — JavaScript (Questions 31–50)",
    "questionText": "What is the result of Boolean(0)?",
    "options": [
      "true",
      "false",
      "0",
      "undefined"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-37",
    "number": 37,
    "section": "SECTION C — JavaScript (Questions 31–50)",
    "questionText": "Which statement skips the current iteration of a loop and proceeds to the next one?",
    "options": [
      "break",
      "exit",
      "continue",
      "return"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-38",
    "number": 38,
    "section": "SECTION C — JavaScript (Questions 31–50)",
    "questionText": "Which method converts a JSON-formatted string into a JavaScript value?",
    "options": [
      "JSON.stringify()",
      "JSON.parse()",
      "JSON.convert()",
      "JSON.decodeString()"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-39",
    "number": 39,
    "section": "SECTION C — JavaScript (Questions 31–50)",
    "questionText": "Which array method creates a new array by transforming each element?",
    "options": [
      "filter()",
      "find()",
      "map()",
      "forEach()"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-40",
    "number": 40,
    "section": "SECTION C — JavaScript (Questions 31–50)",
    "questionText": "What does DOM stand for?",
    "options": [
      "Data Object Management",
      "Document Object Model",
      "Digital Ordinance Method",
      "Document Orientation Mode"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-41",
    "number": 41,
    "section": "SECTION C — JavaScript (Questions 31–50)",
    "questionText": "Which method attaches an event listener to a DOM element?",
    "options": [
      "addEventListener()",
      "attachAction()",
      "onEvent()",
      "addHandlerOnly()"
    ],
    "correctIndex": 0,
    "correctLetter": "A",
    "marks": 1
  },
  {
    "id": "q-42",
    "number": 42,
    "section": "SECTION C — JavaScript (Questions 31–50)",
    "questionText": "What is the output of this code?\n\nconsole.log(2 + \"3\");",
    "options": [
      "5",
      "23",
      "6",
      "NaN"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-43",
    "number": 43,
    "section": "SECTION C — JavaScript (Questions 31–50)",
    "questionText": "Which keyword prevents reassignment of a variable binding?",
    "options": [
      "let",
      "var",
      "const",
      "mutable"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-44",
    "number": 44,
    "section": "SECTION C — JavaScript (Questions 31–50)",
    "questionText": "Which array method returns a new array containing elements that pass a test?",
    "options": [
      "filter()",
      "reduce()",
      "join()",
      "splice()"
    ],
    "correctIndex": 0,
    "correctLetter": "A",
    "marks": 1
  },
  {
    "id": "q-45",
    "number": 45,
    "section": "SECTION C — JavaScript (Questions 31–50)",
    "questionText": "What is a JavaScript Promise primarily used for?",
    "options": [
      "Defining CSS styles",
      "Representing the eventual result of an asynchronous operation",
      "Declaring a class property",
      "Creating HTML elements automatically"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-46",
    "number": 46,
    "section": "SECTION C — JavaScript (Questions 31–50)",
    "questionText": "What does === compare in JavaScript?",
    "options": [
      "Only the values after converting their types",
      "Only the data types",
      "Both value and type, without type coercion",
      "Only whether two variables have the same name"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-47",
    "number": 47,
    "section": "SECTION C — JavaScript (Questions 31–50)",
    "questionText": "What is the output of the following code?\n\nconsole.log(10 % 3);",
    "options": [
      "3",
      "1",
      "0",
      "3.33"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-48",
    "number": 48,
    "section": "SECTION C — JavaScript (Questions 31–50)",
    "questionText": "Which syntax correctly defines an arrow function that adds two numbers?",
    "options": [
      "function => (a, b) { a + b }",
      "(a, b) => a + b",
      "a, b -> a + b",
      "arrow(a, b) = a + b"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-49",
    "number": 49,
    "section": "SECTION C — JavaScript (Questions 31–50)",
    "questionText": "What does event.preventDefault() normally do in an event handler?",
    "options": [
      "Removes the event listener permanently",
      "Stops the browser's default action for that event",
      "Stops all JavaScript execution",
      "Automatically refreshes the page"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-50",
    "number": 50,
    "section": "SECTION C — JavaScript (Questions 31–50)",
    "questionText": "Which keyword is used inside an ES module to make a value available for import by another module?",
    "options": [
      "share",
      "public",
      "export",
      "include"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-51",
    "number": 51,
    "section": "SECTION D — C Programming (Questions 51–65)",
    "questionText": "Who developed the C programming language?",
    "options": [
      "James Gosling",
      "Dennis Ritchie",
      "Guido van Rossum",
      "Bjarne Stroustrup"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-52",
    "number": 52,
    "section": "SECTION D — C Programming (Questions 51–65)",
    "questionText": "Which header file is required for the standard printf() function?",
    "options": [
      "<stdlib.h>",
      "<string.h>",
      "<stdio.h>",
      "<math.h>"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-53",
    "number": 53,
    "section": "SECTION D — C Programming (Questions 51–65)",
    "questionText": "Which format specifier is commonly used with printf() to display an int value?",
    "options": [
      "%f",
      "%c",
      "%d",
      "%s"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-54",
    "number": 54,
    "section": "SECTION D — C Programming (Questions 51–65)",
    "questionText": "Which operator obtains the address of a variable?",
    "options": [
      "*",
      "&",
      "%",
      "#"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-55",
    "number": 55,
    "section": "SECTION D — C Programming (Questions 51–65)",
    "questionText": "Array indexing in C begins at which index?",
    "options": [
      "-1",
      "0",
      "1",
      "It depends on the array size"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-56",
    "number": 56,
    "section": "SECTION D — C Programming (Questions 51–65)",
    "questionText": "Which loop checks its condition before each iteration?",
    "options": [
      "while",
      "do-while only",
      "Both while and for",
      "Neither while nor for"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-57",
    "number": 57,
    "section": "SECTION D — C Programming (Questions 51–65)",
    "questionText": "Which keyword immediately terminates the innermost loop or switch statement?",
    "options": [
      "skip",
      "continue",
      "break",
      "stop"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-58",
    "number": 58,
    "section": "SECTION D — C Programming (Questions 51–65)",
    "questionText": "Which data type is designed to store a single basic character?",
    "options": [
      "int",
      "char",
      "float",
      "double"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-59",
    "number": 59,
    "section": "SECTION D — C Programming (Questions 51–65)",
    "questionText": "Which symbol is used to dereference a pointer?",
    "options": [
      "&",
      "*",
      "#",
      "@"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-60",
    "number": 60,
    "section": "SECTION D — C Programming (Questions 51–65)",
    "questionText": "Which function is used to allocate a block of memory dynamically in C?",
    "options": [
      "alloc()",
      "new()",
      "malloc()",
      "create()"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-61",
    "number": 61,
    "section": "SECTION D — C Programming (Questions 51–65)",
    "questionText": "Which function releases memory previously allocated dynamically?",
    "options": [
      "delete()",
      "remove()",
      "free()",
      "clear()"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-62",
    "number": 62,
    "section": "SECTION D — C Programming (Questions 51–65)",
    "questionText": "What is the result of 7 / 2 in C when both operands are integers?",
    "options": [
      "3.5",
      "3",
      "4",
      "2"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-63",
    "number": 63,
    "section": "SECTION D — C Programming (Questions 51–65)",
    "questionText": "Which preprocessor directive is commonly used to include a header file?",
    "options": [
      "#define",
      "#include",
      "#header",
      "#import"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-64",
    "number": 64,
    "section": "SECTION D — C Programming (Questions 51–65)",
    "questionText": "What is the main purpose of a function prototype?",
    "options": [
      "To execute a function immediately",
      "To declare a function's name, return type, and parameter types before its definition or use",
      "To allocate memory for every local variable",
      "To terminate the program"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-65",
    "number": 65,
    "section": "SECTION D — C Programming (Questions 51–65)",
    "questionText": "What is the standard return value from main() that conventionally indicates successful program termination?",
    "options": [
      "-1",
      "1",
      "0",
      "100"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-66",
    "number": 66,
    "section": "SECTION E — Python (Questions 66–80)",
    "questionText": "Who created the Python programming language?",
    "options": [
      "Dennis Ritchie",
      "Guido van Rossum",
      "James Gosling",
      "Brendan Eich"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-67",
    "number": 67,
    "section": "SECTION E — Python (Questions 66–80)",
    "questionText": "Which character begins a single-line comment in Python?",
    "options": [
      "//",
      "<!--",
      "#",
      "**"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-68",
    "number": 68,
    "section": "SECTION E — Python (Questions 66–80)",
    "questionText": "Which built-in function displays output in Python?",
    "options": [
      "echo()",
      "print()",
      "displayText()",
      "writeLine()"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-69",
    "number": 69,
    "section": "SECTION E — Python (Questions 66–80)",
    "questionText": "Which of the following is a mutable Python data type?",
    "options": [
      "tuple",
      "str",
      "list",
      "int"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-70",
    "number": 70,
    "section": "SECTION E — Python (Questions 66–80)",
    "questionText": "What is the result of 10 // 3 in Python?",
    "options": [
      "3.33",
      "3",
      "1",
      "4"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-71",
    "number": 71,
    "section": "SECTION E — Python (Questions 66–80)",
    "questionText": "Which keyword defines a function in Python?",
    "options": [
      "function",
      "fun",
      "def",
      "define"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-72",
    "number": 72,
    "section": "SECTION E — Python (Questions 66–80)",
    "questionText": "What is the output of this code?\n\nprint(len(\"Python\"))",
    "options": [
      "5",
      "6",
      "7",
      "TypeError"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-73",
    "number": 73,
    "section": "SECTION E — Python (Questions 66–80)",
    "questionText": "Which collection stores unique elements?",
    "options": [
      "List",
      "Tuple",
      "Set",
      "String"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-74",
    "number": 74,
    "section": "SECTION E — Python (Questions 66–80)",
    "questionText": "Which keyword is used to handle an exception in Python?",
    "options": [
      "catch",
      "except",
      "error",
      "handle"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-75",
    "number": 75,
    "section": "SECTION E — Python (Questions 66–80)",
    "questionText": "Which method adds a single element to the end of a list?",
    "options": [
      "add()",
      "insertEnd()",
      "append()",
      "extendOne()"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-76",
    "number": 76,
    "section": "SECTION E — Python (Questions 66–80)",
    "questionText": "What is the output of this code?\n\nprint(type(3.14).__name__)",
    "options": [
      "int",
      "float",
      "decimal",
      "number"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-77",
    "number": 77,
    "section": "SECTION E — Python (Questions 66–80)",
    "questionText": "Which operator performs exponentiation in Python?",
    "options": [
      "^",
      "**",
      "//",
      "%%"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-78",
    "number": 78,
    "section": "SECTION E — Python (Questions 66–80)",
    "questionText": "What does range(5) generate when iterated over?",
    "options": [
      "The integers 1 through 5",
      "The integers 0 through 5",
      "The integers 0 through 4",
      "The integers 1 through 4"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-79",
    "number": 79,
    "section": "SECTION E — Python (Questions 66–80)",
    "questionText": "Which keyword is used to create a class in Python?",
    "options": [
      "object",
      "struct",
      "class",
      "typeclass"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-80",
    "number": 80,
    "section": "SECTION E — Python (Questions 66–80)",
    "questionText": "What is the result of the expression bool([]) in Python?",
    "options": [
      "True",
      "False",
      "None",
      "An error"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-81",
    "number": 81,
    "section": "SECTION F — SQL (Questions 81–100)",
    "questionText": "What does SQL stand for?",
    "options": [
      "Structured Query Language",
      "Standard Question Logic",
      "Sequential Query Link",
      "System Quality Language"
    ],
    "correctIndex": 0,
    "correctLetter": "A",
    "marks": 1
  },
  {
    "id": "q-82",
    "number": 82,
    "section": "SECTION F — SQL (Questions 81–100)",
    "questionText": "Which SQL statement retrieves data from a table?",
    "options": [
      "GET",
      "SELECT",
      "FETCHTABLE",
      "OPEN"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-83",
    "number": 83,
    "section": "SECTION F — SQL (Questions 81–100)",
    "questionText": "Which clause filters rows according to a specified condition?",
    "options": [
      "ORDER BY",
      "GROUP BY",
      "WHERE",
      "FROM"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-84",
    "number": 84,
    "section": "SECTION F — SQL (Questions 81–100)",
    "questionText": "Which statement adds a new row to a table?",
    "options": [
      "ADD ROW",
      "INSERT INTO",
      "UPDATE",
      "CREATE ROW"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-85",
    "number": 85,
    "section": "SECTION F — SQL (Questions 81–100)",
    "questionText": "Which SQL statement modifies existing records in a table?",
    "options": [
      "CHANGE",
      "MODIFY TABLE",
      "UPDATE",
      "ALTER ROW"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-86",
    "number": 86,
    "section": "SECTION F — SQL (Questions 81–100)",
    "questionText": "Which statement removes selected rows from a table?",
    "options": [
      "DELETE FROM",
      "DROP DATABASE",
      "REMOVE TABLE",
      "CLEAR COLUMN"
    ],
    "correctIndex": 0,
    "correctLetter": "A",
    "marks": 1
  },
  {
    "id": "q-87",
    "number": 87,
    "section": "SECTION F — SQL (Questions 81–100)",
    "questionText": "Which clause sorts query results?",
    "options": [
      "SORT",
      "ORDER BY",
      "GROUP BY",
      "ARRANGE"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-88",
    "number": 88,
    "section": "SECTION F — SQL (Questions 81–100)",
    "questionText": "Which function counts the number of rows or non-NULL values, depending on its argument?",
    "options": [
      "SUM()",
      "AVG()",
      "COUNT()",
      "TOTAL()"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-89",
    "number": 89,
    "section": "SECTION F — SQL (Questions 81–100)",
    "questionText": "Which constraint uniquely identifies each row in a table and does not permit NULL values?",
    "options": [
      "DEFAULT",
      "CHECK",
      "PRIMARY KEY",
      "FOREIGN KEY"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-90",
    "number": 90,
    "section": "SECTION F — SQL (Questions 81–100)",
    "questionText": "Which constraint establishes a relationship with a candidate key in another table or, where supported, the same table?",
    "options": [
      "UNIQUE",
      "FOREIGN KEY",
      "NOT NULL",
      "DEFAULT"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-91",
    "number": 91,
    "section": "SECTION F — SQL (Questions 81–100)",
    "questionText": "Which operator tests whether a value matches any value in a specified list?",
    "options": [
      "BETWEEN",
      "LIKE",
      "IN",
      "IS"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-92",
    "number": 92,
    "section": "SECTION F — SQL (Questions 81–100)",
    "questionText": "Which SQL keyword removes duplicate rows from a query result?",
    "options": [
      "UNIQUE",
      "DISTINCT",
      "DIFFERENT",
      "SINGLE"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-93",
    "number": 93,
    "section": "SECTION F — SQL (Questions 81–100)",
    "questionText": "Which clause filters groups after aggregation?",
    "options": [
      "WHERE",
      "ORDER BY",
      "HAVING",
      "LIMIT"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-94",
    "number": 94,
    "section": "SECTION F — SQL (Questions 81–100)",
    "questionText": "Which join returns only rows that satisfy the join condition in both tables?",
    "options": [
      "INNER JOIN",
      "CROSS JOIN",
      "FULL OUTER JOIN",
      "LEFT JOIN"
    ],
    "correctIndex": 0,
    "correctLetter": "A",
    "marks": 1
  },
  {
    "id": "q-95",
    "number": 95,
    "section": "SECTION F — SQL (Questions 81–100)",
    "questionText": "Which join returns all rows from the left table and matching rows from the right table, with unmatched right-side columns represented by NULLs?",
    "options": [
      "INNER JOIN",
      "LEFT JOIN",
      "CROSS JOIN",
      "SELF JOIN"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-96",
    "number": 96,
    "section": "SECTION F — SQL (Questions 81–100)",
    "questionText": "Which statement changes the structure of an existing table, such as adding a column?",
    "options": [
      "UPDATE TABLE",
      "ALTER TABLE",
      "MODIFY ROW",
      "CHANGE DATABASE"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-97",
    "number": 97,
    "section": "SECTION F — SQL (Questions 81–100)",
    "questionText": "Which command removes a table definition and its data from a database?",
    "options": [
      "DELETE TABLE",
      "REMOVE TABLE",
      "DROP TABLE",
      "CLEAR TABLE"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-98",
    "number": 98,
    "section": "SECTION F — SQL (Questions 81–100)",
    "questionText": "Which condition correctly checks whether a column contains a NULL value?",
    "options": [
      "column = NULL",
      "column == NULL",
      "column IS NULL",
      "column EQUALS NULL"
    ],
    "correctIndex": 2,
    "correctLetter": "C",
    "marks": 1
  },
  {
    "id": "q-99",
    "number": 99,
    "section": "SECTION F — SQL (Questions 81–100)",
    "questionText": "Which transaction command makes the current transaction's changes permanent?",
    "options": [
      "SAVE",
      "COMMIT",
      "ROLLBACK",
      "LOCK"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  },
  {
    "id": "q-100",
    "number": 100,
    "section": "SECTION F — SQL (Questions 81–100)",
    "questionText": "Which SQL statement retrieves the average value of the salary column?",
    "options": [
      "SELECT MEAN(salary) FROM employees;",
      "SELECT AVG(salary) FROM employees;",
      "SELECT COUNT(salary) FROM employees;",
      "SELECT SUM(salary) FROM employees;"
    ],
    "correctIndex": 1,
    "correctLetter": "B",
    "marks": 1
  }
];
