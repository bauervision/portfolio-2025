'use client';

import ContactForm from '@/components/ContactForm';
import { useTheme } from '@mui/material';

export default function ContactPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  return (
    <main
      className={`min-h-screen flex flex-col ${
        isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <ContactForm />
    </main>
  );
}
