import { ShieldCheck, FileText } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-6 text-center">
      <p>© 2025 NT-SSHCL. All rights reserved.</p>
      <div className="flex justify-center items-center space-x-6 mt-4">
        <a href="/privacy-policy" className="flex items-center space-x-2 hover:text-blue-400"><ShieldCheck size={18} /><span>Privacy Policy</span></a>
        <a href="/terms-of-service" className="flex items-center space-x-2 hover:text-blue-400"><FileText size={18} /><span>Terms of Service</span></a>
      </div>
    </footer>
  );
}