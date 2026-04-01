import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TextToDiagrams = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [diagramType, setDiagramType] = useState('flowchart');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDiagram, setGeneratedDiagram] = useState(null);

  const diagramTypes = [
    { id: 'flowchart', name: 'Flowchart', icon: '🔄', description: 'Process flow diagrams' },
    { id: 'block', name: 'Block Diagram', icon: '▪️', description: 'System architecture diagrams' },
    { id: 'mindmap', name: 'Mind Map', icon: '🧠', description: 'Hierarchical information maps' },
    { id: 'sequence', name: 'Sequence Diagram', icon: '📋', description: 'Interaction sequence diagrams' },
    { id: 'orgchart', name: 'Org Chart', icon: '🏢', description: 'Organizational structure charts' },
    { id: 'network', name: 'Network Diagram', icon: '🌐', description: 'Network topology diagrams' }
  ];

  const sampleTexts = {
    flowchart: `Start → Check Input → Process Data → Generate Output → End`,
    block: `[Input] → [Processor] → [Memory] → [Output]`,
    mindmap: `Main Topic → Subtopic 1 → Detail 1\nMain Topic → Subtopic 2 → Detail 2`,
    sequence: `User → System → Database → Response`,
    orgchart: `CEO → Manager → Team Lead → Developer`,
    network: `Router → Switch → Computer 1, Computer 2, Computer 3`
  };

  const generateDiagram = () => {
    if (!inputText.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate diagram generation
    setTimeout(() => {
      const diagramData = {
        type: diagramType,
        input: inputText,
        elements: parseTextToElements(inputText, diagramType),
        timestamp: new Date().toISOString()
      };
      
      setGeneratedDiagram(diagramData);
      setIsGenerating(false);
    }, 2000);
  };

  const parseTextToElements = (text, type) => {
    // Simple text parsing for demonstration
    const elements = text.split(/\s*→\s*|\s*->\s*|\s*\n\s*/).filter(item => item.trim());
    return elements.map((element, index) => ({
      id: index + 1,
      text: element.trim(),
      type: getNode(type, index),
      position: calculatePosition(index, elements.length, type)
    }));
  };

  const getNode = (diagramType, index) => {
    const nodeTypes = {
      flowchart: index === 0 ? 'start' : index === parseTextToElements(inputText, diagramType).length - 1 ? 'end' : 'process',
      block: 'block',
      mindmap: index === 0 ? 'root' : 'node',
      sequence: index % 2 === 0 ? 'actor' : 'system',
      orgchart: 'position',
      network: 'device'
    };
    return nodeTypes[diagramType] || 'node';
  };

  const calculatePosition = (index, total, type) => {
    const positions = {
      flowchart: { x: 100 + (index * 150), y: 200 },
      block: { x: 100 + (index * 120), y: 150 },
      mindmap: { x: 200 + (index * 100), y: 100 + (index % 2) * 100 },
      sequence: { x: 100 + (index * 100), y: 150 + (index % 2) * 50 },
      orgchart: { x: 200 + (index % 3) * 150, y: 100 + Math.floor(index / 3) * 100 },
      network: { x: 100 + (index % 2) * 200, y: 100 + Math.floor(index / 2) * 150 }
    };
    return positions[type] || { x: 100, y: 100 };
  };

  const clearForm = () => {
    setInputText('');
    setGeneratedDiagram(null);
  };

  const loadSample = () => {
    setInputText(sampleTexts[diagramType]);
  };

  const exportDiagram = () => {
    if (!generatedDiagram) return;
    
    // Create a simple text representation for export
    const exportText = `Diagram Type: ${generatedDiagram.type}\nInput: ${generatedDiagram.input}\nElements:\n${generatedDiagram.elements.map(el => `- ${el.text}`).join('\n')}`;
    
    const blob = new Blob([exportText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diagram-${generatedDiagram.type}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-12">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-5xl font-bold text-white">Text to Diagrams</h2>
            <button
              onClick={() => navigate('/')}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl transition-colors text-xl"
            >
              ✕ Close
            </button>
          </div>

          <div className="space-y-8 mb-10">
            {/* Diagram Type Selection */}
            <div>
              <label className="block text-white text-2xl font-bold mb-6">Select Diagram Type</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {diagramTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => setDiagramType(type.id)}
                    className={`bg-white/10 rounded-2xl p-6 cursor-pointer transition-all ${
                      diagramType === type.id ? 'ring-4 ring-white/50 bg-white/20' : 'hover:bg-white/20'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-5xl mb-3">{type.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{type.name}</h3>
                      <p className="text-white/80 text-sm">{type.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Text Input */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-white text-2xl font-bold">Input Text</label>
                <button
                  onClick={loadSample}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl text-lg transition-colors"
                >
                  📝 Load Sample
                </button>
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter your text here. Use '→' or '->' to connect elements. Use new lines for separate branches."
                className="w-full h-48 px-6 py-4 rounded-xl text-xl bg-white/20 text-white placeholder-white/50 border-4 border-white/30 focus:outline-none focus:border-white resize-none"
              />
              <p className="text-white/60 text-lg mt-2">
                Example: Start → Process → Check → End
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-8">
              <button
                onClick={generateDiagram}
                disabled={!inputText.trim() || isGenerating}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-8 rounded-2xl text-4xl transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Generating...' : '🎨 Generate Diagram'}
              </button>
              <button
                onClick={clearForm}
                className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-8 rounded-2xl text-4xl transition-all transform hover:scale-105"
              >
                🗑️ Clear
              </button>
            </div>
          </div>

          {/* Generated Diagram Display */}
          {generatedDiagram && (
            <div className="mt-12 bg-white/10 rounded-3xl p-12">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-4xl font-bold text-white">Generated Diagram</h3>
                <button
                  onClick={exportDiagram}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl text-lg transition-colors"
                >
                  📥 Export
                </button>
              </div>
              
              <div className="bg-white rounded-3xl p-10">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{diagramTypes.find(t => t.id === generatedDiagram.type)?.icon}</div>
                  <h4 className="text-3xl font-bold text-gray-800 mb-2 capitalize">{generatedDiagram.type} Diagram</h4>
                </div>
                
                {/* Visual Diagram Representation */}
                <div className="bg-gray-50 rounded-2xl p-8 mb-6 min-h-96 relative">
                  <svg className="w-full h-full" viewBox="0 0 800 400">
                    {/* Draw connections */}
                    {generatedDiagram.elements.map((element, index) => {
                      if (index === 0) return null;
                      const prevElement = generatedDiagram.elements[index - 1];
                      return (
                        <line
                          key={`line-${index}`}
                          x1={prevElement.position.x + 60}
                          y1={prevElement.position.y + 30}
                          x2={element.position.x + 60}
                          y2={element.position.y + 30}
                          stroke="#4B5563"
                          strokeWidth="2"
                          markerEnd="url(#arrowhead)"
                        />
                      );
                    })}
                    
                    {/* Arrow marker definition */}
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#4B5563" />
                      </marker>
                    </defs>
                    
                    {/* Draw nodes */}
                    {generatedDiagram.elements.map((element, index) => (
                      <g key={element.id}>
                        <rect
                          x={element.position.x}
                          y={element.position.y}
                          width="120"
                          height="60"
                          rx="8"
                          fill={getNodeColor(element.type)}
                          stroke="#1F2937"
                          strokeWidth="2"
                        />
                        <text
                          x={element.position.x + 60}
                          y={element.position.y + 35}
                          textAnchor="middle"
                          fill="white"
                          fontSize="14"
                          fontWeight="bold"
                        >
                          {element.text.length > 15 ? element.text.substring(0, 15) + '...' : element.text}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
                
                {/* Elements List */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h5 className="text-xl font-bold text-gray-800 mb-4">Diagram Elements</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {generatedDiagram.elements.map((element, index) => (
                      <div key={element.id} className="bg-white rounded-xl p-4 border-2 border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                            {element.id}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{element.text}</p>
                            <p className="text-sm text-gray-600 capitalize">{element.type}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isGenerating && (
            <div className="mt-12 bg-white/10 rounded-3xl p-12">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-20 w-20 border-4 border-white border-t-transparent mb-8"></div>
                <h3 className="text-4xl font-bold text-white mb-6">Generating Diagram...</h3>
                <p className="text-white/80 text-2xl mb-8">Converting your text to visual diagram</p>
                <div className="mt-8 bg-white/20 rounded-full h-6 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full animate-pulse" style={{width: '70%'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  function getNodeColor(type) {
    const colors = {
      start: '#10B981',
      end: '#EF4444',
      process: '#3B82F6',
      block: '#8B5CF6',
      root: '#F59E0B',
      node: '#06B6D4',
      actor: '#EC4899',
      system: '#6366F1',
      position: '#84CC16',
      device: '#F97316'
    };
    return colors[type] || '#6B7280';
  }
};

export default TextToDiagrams;
