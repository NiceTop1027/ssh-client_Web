'use client';

import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold">Contact Us</h1>
        <p className="mt-4 text-xl max-w-3xl mx-auto">
          Have a question or feedback? We'd love to hear from you.
        </p>
      </div>
      <motion.div
        className="mt-16 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <form className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="mb-6">
            <label htmlFor="name" className="block text-lg font-medium mb-2">Your Name</label>
            <input type="text" id="name" className="w-full px-4 py-3 text-white bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-medium mb-2">Your Email</label>
            <input type="email" id="email" className="w-full px-4 py-3 text-white bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div className="mb-8">
            <label htmlFor="message" className="block text-lg font-medium mb-2">Message</label>
            <textarea id="message" rows={6} className="w-full px-4 py-3 text-white bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="flex items-center justify-center space-x-3 w-full px-8 py-4 font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
              <Send size={24} />
              <span>Send Message</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}