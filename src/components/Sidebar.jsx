import { 
  // Menu,
  ChevronRight,
  FileText,
  Search,
  PenTool,
  // MessageSquare,
  // Save,
  // Upload
} from 'lucide-react';

import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';


const Sidebar = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [activePage, setActivePage] = useState(null);

  // Define pages configuration
  const pages = [
    {
      id: 'extract',
      title: 'Extract',
      icon: <FileText size={20} />,
      description: 'Extract key information from legal documents',
      points: [
        'Automated text extraction',
        'Key clause identification',
        'Document summarization',
        'Entity recognition'
      ],
      url:"/ExtractChat"
    },
    {
      id: 'research',
      title: 'Research Memo',
      icon: <Search size={20} />,
      description: 'Generate comprehensive legal research memos',
      points: [
        'Case law analysis',
        'Jurisdiction-specific research',
        'Citation formatting',
        'Legal precedent search'
      ],
      url:"/ResearchChat"

    },
    {
      id: 'autodraft',
      title: 'AutoDraft',
      icon: <PenTool size={20} />,
      description: 'Automated legal document drafting',
      points: [
        'Template-based drafting',
        'Custom clause library',
        'Multiple format support',
        'Version control'
      ],
      url:"/AutoDraftChat"  
    },
    // {
    //   id: 'doctalk',
    //   title: 'DocTalk',
    //   icon: <MessageSquare size={20} />,
    //   description: 'Interactive document analysis and Q&A',
    //   points: [
    //     'Document Q&A',
    //     'Contextual analysis',
    //     'Multi-document linking',
    //     'Smart suggestions'
    //   ],
    //   url:"/DocTalkChat"
    // }
  ];

  return (
    <div className="flex h-screen bg-gray-100 z-[3] border">
      {/* Sidebar */}
      <div 
        className={`bg-white h-full shadow-lg transition-all duration-300 flex flex-col ${
          isSidebarExpanded ? 'w-64' : 'w-20'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            {isSidebarExpanded && <img 
                                src="https://www.infrahive.io/_next/image?url=%2Fimages%2Flogo%2Flogo.png&w=640&q=75"
                               
                                className=" w-[100px] mx-auto"
                              />}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
              className="ml-auto"
            >
              {isSidebarExpanded ? <ChevronRight /> : <img 
                                src="https://infrahive-ai-search.vercel.app/Logo%20(Digest).png"
                                className=" w-[40px] mx-auto"
                              />}
            </Button>
          </div>
        </div>
        
        {/* Sidebar Navigation */}
        <nav className="flex-1 p-2">
          {pages.map((page) => (
            <NavLink to={page.url} key={page.id}>
              <div
              key={page.id}
              onClick={() => setActivePage(page)}
              className={`
                flex items-center w-full p-2 my-1 rounded-lg cursor-pointer
                transition-colors duration-200
                ${activePage?.id === page.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}
                ${isSidebarExpanded ? 'px-4' : 'px-2 justify-center'}
              `}
            >
              <div className="min-w-[24px]">{page.icon}</div>
              {isSidebarExpanded && (
                <span className="ml-3 text-sm">{page.title}</span>
              )}
            </div>
            </NavLink>
          ))}
        </nav>
      </div>

      
    </div>
  );
};

export default Sidebar;