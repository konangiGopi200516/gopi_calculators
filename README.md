# Professional Calculator

A modern, feature-rich calculator built with React and TailwindCSS. This calculator features a professional dark theme design with smooth animations, keyboard support, and full functionality.

## Features

- **Modern UI**: Beautiful dark theme with gradient background
- **Full Calculator Functionality**: Addition, subtraction, multiplication, and division
- **Keyboard Support**: Use your keyboard for quick calculations
- **Responsive Design**: Works perfectly on all screen sizes
- **Smooth Animations**: Button press effects and transitions
- **History Display**: Shows the current operation being performed
- **Accessibility**: Focus states and keyboard navigation

## Keyboard Shortcuts

- **Numbers 0-9**: Input numbers
- **+ - * /**: Perform operations
- **Enter or =**: Calculate result
- **Escape or C**: Clear calculator
- **Backspace**: Delete last digit
- **.**: Input decimal point

## Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

The app will open in your default browser at `http://localhost:3000`.

## Technologies Used

- **React 18**: Modern React with hooks
- **TailwindCSS**: Utility-first CSS framework
- **React Scripts**: Build tooling and development server

## Project Structure

```
simple-calculator/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Calculator.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Usage

1. Open the calculator in your browser
2. Use the on-screen buttons or keyboard to perform calculations
3. The display shows the current input and result
4. History display shows the current operation

## Building for Production

To create an optimized production build:

```bash
npm run build
```

This will create a `build` folder with the optimized application ready for deployment.
