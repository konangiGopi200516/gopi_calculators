import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PDFConverter = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [conversionType, setConversionType] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedFile, setConvertedFile] = useState(null);
  const fileInputRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setConvertedFile(null);
      
      // Automatically detect file type and set conversion direction
      const fileName = file.name.toLowerCase();
      if (fileName.endsWith('.pdf')) {
        setConversionType('pdf-to-word');
      } else if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
        setConversionType('word-to-pdf');
      }
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setConvertedFile(null);
      
      // Automatically detect file type and set conversion direction
      const fileName = file.name.toLowerCase();
      if (fileName.endsWith('.pdf')) {
        setConversionType('pdf-to-word');
      } else if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
        setConversionType('word-to-pdf');
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const simulateConversion = () => {
    if (!selectedFile || !conversionType) return;
    
    setIsConverting(true);
    
    // Simulate conversion process
    setTimeout(() => {
      setIsConverting(false);
      setConvertedFile({
        name: conversionType === 'pdf-to-word' 
          ? selectedFile.name.replace('.pdf', '.docx')
          : selectedFile.name.replace(/\.(doc|docx)$/, '.pdf'),
        size: selectedFile.size,
        type: conversionType === 'pdf-to-word' ? 'docx' : 'pdf'
      });
    }, 2000);
  };

  const clearForm = () => {
    setSelectedFile(null);
    setConversionType(null);
    setConvertedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadFile = () => {
    if (!convertedFile) return;
    
    // Create a dummy file for demonstration
    const dummyContent = conversionType === 'pdf-to-word' 
      ? 'This is a converted Word document content.'
      : 'This is a converted PDF content.';
    
    const blob = new Blob([dummyContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = convertedFile.name;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const getConversionIcon = () => {
    if (conversionType === 'pdf-to-word') return '📄➡️📝';
    if (conversionType === 'word-to-pdf') return '📝➡️📄';
    return '📁';
  };

  const getConversionTitle = () => {
    if (conversionType === 'pdf-to-word') return 'PDF to Word';
    if (conversionType === 'word-to-pdf') return 'Word to PDF';
    return 'Select File';
  };

  const getConversionDescription = () => {
    if (conversionType === 'pdf-to-word') return 'Convert PDF document to Word format';
    if (conversionType === 'word-to-pdf') return 'Convert Word document to PDF format';
    return 'Drop any PDF or Word file here';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-rose-900 to-pink-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-12">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-5xl font-bold text-white">I Love PDF</h2>
            <button
              onClick={() => navigate('/')}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl transition-colors text-xl"
            >
              ✕ Close
            </button>
          </div>

          <div className="space-y-8 mb-10">
            {/* Conversion Type Display - Auto-detected */}
            {conversionType && (
              <div className="bg-white/20 rounded-2xl p-10 ring-4 ring-white/50">
                <div className="text-center">
                  <div className="text-8xl mb-6">{getConversionIcon()}</div>
                  <h3 className="text-4xl font-bold text-white mb-4">{getConversionTitle()}</h3>
                  <p className="text-white/80 text-2xl">{getConversionDescription()}</p>
                </div>
              </div>
            )}

            {/* File Upload Area */}
            <div>
              <label className="block text-white text-2xl font-bold mb-6">
                {selectedFile ? 'Selected File' : 'Select PDF or Word File'}
              </label>
              <div
                className="bg-white/10 rounded-2xl p-16 border-4 border-dashed border-white/30 text-center cursor-pointer hover:bg-white/20 transition-all"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div className="text-8xl mb-6">{getConversionIcon()}</div>
                <p className="text-3xl text-white font-bold mb-4">
                  {selectedFile ? selectedFile.name : 'Drop file here or click to browse'}
                </p>
                <p className="text-white/60 text-xl">
                  PDF files (.pdf) or Word files (.doc, .docx)
                </p>
                {selectedFile && (
                  <div className="mt-6 text-white/80 text-xl">
                    <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    <p>Type: {selectedFile.name.toLowerCase().endsWith('.pdf') ? 'PDF Document' : 'Word Document'}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Conversion Options - Only show when file is selected */}
            {selectedFile && conversionType && (
              <div className="bg-white/10 rounded-2xl p-8">
                <h4 className="text-2xl font-bold text-white mb-6">Conversion Options</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">📄</div>
                      <div>
                        <p className="text-white font-bold text-xl">Original File</p>
                        <p className="text-white/80 text-lg">{selectedFile.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">🔄</div>
                      <div>
                        <p className="text-white font-bold text-xl">Convert To</p>
                        <p className="text-white/80 text-lg">
                          {conversionType === 'pdf-to-word' ? 'Word Document (.docx)' : 'PDF Document (.pdf)'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-8">
              <button
                onClick={simulateConversion}
                disabled={!selectedFile || !conversionType || isConverting}
                className="flex-1 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-8 rounded-2xl text-4xl transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {isConverting ? 'Converting...' : `Convert to ${conversionType === 'pdf-to-word' ? 'Word' : 'PDF'}`}
              </button>
              <button
                onClick={clearForm}
                className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-8 rounded-2xl text-4xl transition-all transform hover:scale-105"
              >
                Clear
              </button>
            </div>
          </div>

          {convertedFile && (
            <div className="mt-12 bg-white/10 rounded-3xl p-12">
              <h3 className="text-4xl font-bold text-white mb-10 text-center">Conversion Complete!</h3>
              
              <div className="bg-white rounded-3xl p-12 mb-8">
                <div className="text-center">
                  <div className="text-8xl mb-6">✅</div>
                  <h4 className="text-4xl font-bold text-gray-800 mb-6">File Converted Successfully</h4>
                  <div className="space-y-4 text-gray-600 text-2xl">
                    <p><strong>Original:</strong> {selectedFile.name}</p>
                    <p><strong>Converted:</strong> {convertedFile.name}</p>
                    <p><strong>Size:</strong> {(convertedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    <p><strong>Type:</strong> {convertedFile.type.toUpperCase()}</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={downloadFile}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-8 px-16 rounded-2xl text-4xl transition-all transform hover:scale-105"
                >
                  📥 Download Converted File
                </button>
                <p className="text-white/80 text-2xl mt-6">Click to download your converted file</p>
              </div>
            </div>
          )}

          {isConverting && (
            <div className="mt-12 bg-white/10 rounded-3xl p-12">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-20 w-20 border-4 border-white border-t-transparent mb-8"></div>
                <h3 className="text-4xl font-bold text-white mb-6">
                  Converting {conversionType === 'pdf-to-word' ? 'PDF to Word' : 'Word to PDF'}...
                </h3>
                <p className="text-white/80 text-2xl mb-8">Please wait while we convert your file</p>
                <div className="mt-8 bg-white/20 rounded-full h-6 overflow-hidden">
                  <div className="bg-gradient-to-r from-red-500 to-rose-500 h-full rounded-full animate-pulse" style={{width: '60%'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFConverter;
