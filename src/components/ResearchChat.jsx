import { useState, useRef, useEffect } from 'react';
import { 
  Sun, Moon, HelpCircle, Bot, ThumbsUp, 
  ThumbsDown, RotateCcw, Send, Loader, Link, ExternalLink,
  // Scale, Book,
  Building2 
} from 'lucide-react';

const ResearchChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentResources, setCurrentResources] = useState([]);
  const [showSources, setShowSources] = useState(false);
  const [messageIdCounter, setMessageIdCounter] = useState(1);

  const messagesEndRef = useRef(null);
  

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessageId = messageIdCounter;
      setMessageIdCounter(prev => prev + 1);

      setMessages(prev => [...prev, { 
        role: 'user', 
        content: input.trim(),
        id: userMessageId
      }]);
      setLoading(true);
      setInput('');
      setShowSources(false);

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}legal/research/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_prompt: input.trim()
          })
        });

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        
        const assistantMessageId = messageIdCounter + 1;
        setMessageIdCounter(prev => prev + 1);

        const formattedResponse = {
          role: 'assistant',
          content: {
            legal_info: data.legal_info,
            resources: data.legal_info.map(info => ({
              title: info.title,
              meta_title: info.jurisdiction,
              heading: info.summary,
              link: info.doc_link
            }))
          },
          id: assistantMessageId
        };
        
        setMessages(prev => [...prev, formattedResponse]);
        setCurrentResources(formattedResponse.content.resources);
      } catch (error) {
        console.error('Error:', error);
        const errorMessageId = messageIdCounter + 1;
        setMessageIdCounter(prev => prev + 1);
        
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: {
            legal_info: [{
              title: 'Error',
              summary: `Error: ${error.message}. Please try again.`,
              jurisdiction: 'System Error',
              implications: 'Please try your query again.',
              doc_link: '#'
            }],
            resources: []
          },
          id: errorMessageId
        }]);
      } finally {
        setLoading(false);
      }
    }
  };


  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSources = () => {
    setShowSources(!showSources);
  };

  const isEmpty = messages.length === 0 && !loading;

 
  const renderAssistantContent = (content) => {
    if (typeof content === 'string') return content;

    const legalInfo = content?.legal_info;

    if (!Array.isArray(legalInfo) || legalInfo.length === 0) {
      return (
        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          No results found.
        </div>
      );
    }

    return (
      <div className={`space-y-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {/* Found {legalInfo.length} results */}
          Results:
        </div>

        {legalInfo.map((info, index) => (
          <div 
            key={index}
            className={`border rounded-lg p-4 ${
              isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex justify-between items-start gap-4 mb-3">
              <a 
                href={info.doc_link}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-semibold text-lg hover:underline ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}
              >
                {info.title}
              </a>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-3">
              <div className={`flex items-center gap-2 text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <Building2 size={16} />
                {info.jurisdiction}
              </div>
            </div>

            <div className={`mt-4 text-sm leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <div className="mb-2">
                <strong>Summary:</strong> {info.summary}
              </div>
              <div className="mb-2">
                <strong>Key Terms:</strong> {info.key_terms}
              </div>
              <div>
                <strong>Implications:</strong> {info.implications}
              </div>
            </div>

            <div className="mt-4">
              <a
                href={info.doc_link}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-sm ${
                  isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                <ExternalLink size={14} />
                View full document
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-screen" style={{ backgroundColor: isDarkMode ? '#212121' : '#ffffff' }}>
      <div className="flex-1 flex flex-col relative">
        {/* Navigation Bar */}
        <nav 
          className={`border-b p-2 flex items-center justify-end sticky top-0 z-20 ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}
          style={{ backgroundColor: isDarkMode ? '#212121' : '#ffffff' }}
        >
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className={`p-2 rounded-md ${
              isDarkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-800'
            }`}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className={`p-2 rounded-md ${
              isDarkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-800'
            }`}>
              <HelpCircle size={20} />
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {isEmpty ? (
            // Empty State
            <div className="h-full flex flex-col justify-center items-center p-4">
              <h1 className={`text-4xl font-bold text-center mb-8 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Legal Research Assistant
              </h1>
              <div className="w-full max-w-2xl">
                <form onSubmit={handleSubmit} className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about legal cases..."
                    className={`w-full p-4 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      isDarkMode 
                        ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                    }`}
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || loading}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 disabled:opacity-50 ${
                      isDarkMode
                        ? 'text-gray-400 hover:text-gray-200'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </div>
          ) : (
            // Chat Interface
            <div className="flex">
              <div className="flex-1">
                <div className="pb-32">
                  {messages.map((message) => (
                    <div key={message.id}>
                      <div className="max-w-2xl ml-[200px] p-4">
                        {message.role === 'assistant' ? (
                          <div className="flex gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 ${
                              isDarkMode ? 'bg-gray-700' : 'bg-gray-600'
                            }`}>
                              <img 
                                src="https://infrahive-ai-search.vercel.app/Logo%20(Digest).png"
                                alt="Bot"
                                className="w-full h-full object-cover rounded-full"
                              />
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                                {renderAssistantContent(message.content)}
                              </div>
                              <div className="flex items-center gap-2 mt-2 ">
                                <button className={`p-1 rounded ${
                                  isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'hover:bg-gray-100'
                                }`}>
                                  <ThumbsUp size={16} />
                                </button>
                                <button className={`p-1 rounded ${
                                  isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'hover:bg-gray-100'
                                }`}>
                                  <ThumbsDown size={16} />
                                </button>
                                <button className={`p-1 rounded ${
                                  isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'hover:bg-gray-100'
                                }`}>
                                  <RotateCcw size={16} />
                                </button>
                                {message.content.resources?.length > 0 && (
                                  <button 
                                    onClick={toggleSources}
                                    className={`flex items-center gap-1 p-1 px-2 rounded border text-sm ${
                                      isDarkMode 
                                        ? 'border-white bg-gray-700 hover:bg-gray-800 text-blue-400 hover:text-blue-300' 
                                        : 'border-black bg-gray-200 hover:bg-gray-100 text-blue-600 hover:text-blue-700'
                                    }`}
                                  >
                                    <Link size={14} />
                                    Sources ({message.content.resources.length})
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-end gap-4">
                            <div className="max-w-[85%] space-y-2">
                              <div className="bg-[#303030] text-white p-3 rounded-full">
                                {message.content}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="max-w-2xl ml-[200px] p-4 flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
                          <Bot size={16} />
                         <img src="https://infrahive-ai-search.vercel.app/Logo%20(Digest).png"/>
                      </div>
                      <div className={`flex items-center ${
                                  isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'hover:bg-gray-100'
                                }`}>
                        <Loader className="animate-spin" size={16} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Box */}
                <div 
                  className={`fixed left-[47%] transform -translate-x-1/2 bottom-0 w-full p-4 z-10 ${
                    isDarkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: isDarkMode ? '#212121' : '#ffffff' }}
                >
                  <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="relative">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about legal cases..."
                        className={`w-full p-4 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          isDarkMode 
                            ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
                            : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                        }`}
                      />
                      <button 
                        type="submit"
                        disabled={!input.trim() || loading}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 disabled:opacity-50 ${
                          isDarkMode
                            ? 'text-gray-400 hover:text-gray-200'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <Send size={20} />
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Sources Panel */}
              {showSources && currentResources.length > 0 && (
                <div 
                  className={`w-72 border-l p-4 overflow-y-auto fixed right-0 top-0 h-screen z-40 ${
                    isDarkMode ? 'border-gray-700 bg-[#212121] text-white' : 'border-gray-200 bg-white text-gray-900'
                  }`}
                >
                  <div className="space-y-4 pb-24">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Link size={20} />
                        Sources
                      </h2>
                      <button 
                        onClick={toggleSources}
                        className={`p-1 rounded-full ${
                          isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                        }`}
                      >
                        ×
                      </button>
                    </div>
                    {currentResources.map((resource, index) => (
                      <div
                         key={`${resource.link}-${index}`}
                        className={`space-y-2 p-3 rounded-lg border ${
                          isDarkMode 
                            ? 'border-gray-700 bg-gray-800/50' 
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="font-medium">
                          {resource.meta_title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {resource.heading}
                        </div>
                        <a
                          href={resource.link}
                          className={`flex items-center gap-2 mt-2 text-sm ${
                            isDarkMode 
                              ? 'text-blue-400 hover:text-blue-300' 
                              : 'text-blue-600 hover:text-blue-700'
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={14} />
                          View source
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchChat;



