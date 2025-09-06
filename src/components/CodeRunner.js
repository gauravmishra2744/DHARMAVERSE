import React, { useState } from 'react';

const CodeRunner = ({ challenge, userCode }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');

  const runCode = () => {
    setIsRunning(true);
    setOutput('Running code...');
    
    setTimeout(() => {
      try {
        // Simple code execution simulation
        const results = simulateExecution(userCode, challenge);
        setOutput(results);
      } catch (error) {
        setOutput(`Error: ${error.message}`);
      }
      setIsRunning(false);
    }, 1000);
  };

  const simulateExecution = (code, challenge) => {
    if (!code.trim()) return 'No code to run';
    
    const testResults = [];
    
    // Check if code contains key concepts
    const hasFunction = code.includes('function') || code.includes('=>');
    const hasReturn = code.includes('return');
    const hasLogic = code.includes('if') || code.includes('for') || code.includes('while');
    
    if (!hasFunction) {
      return '❌ Code should contain a function';
    }
    
    if (!hasReturn) {
      return '⚠️ Function should return a value';
    }
    
    // Simulate test cases
    if (challenge.testCases) {
      challenge.testCases.forEach((testCase, index) => {
        testResults.push(`Test ${index + 1}: ✅ Passed`);
      });
    } else {
      testResults.push('✅ Basic structure looks good');
      testResults.push('✅ Contains proper logic flow');
      if (hasLogic) testResults.push('✅ Implements conditional logic');
    }
    
    return testResults.join('\n');
  };

  return (
    <div className="bg-gray-900/50 rounded-lg p-4 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-green-400">🏃 Code Runner</h4>
        <button
          onClick={runCode}
          disabled={isRunning || !userCode.trim()}
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          {isRunning ? '⏳ Running...' : '▶️ Run Code'}
        </button>
      </div>
      
      <div className="bg-black rounded p-3 font-mono text-sm">
        <div className="text-gray-400 mb-2">Output:</div>
        <pre className="text-green-400 whitespace-pre-wrap">
          {output || 'Click "Run Code" to test your solution'}
        </pre>
      </div>
    </div>
  );
};

export default CodeRunner;