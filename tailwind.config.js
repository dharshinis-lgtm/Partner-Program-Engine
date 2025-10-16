/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // SaaS22 Brand Colors
        'theme-blue': '#5d5ff3',
        'theme-green': '#55af68',
        'theme-yellow': '#f7cf66',
        'theme-red': '#ea5a54',
        'royal-blue': '#1e40af',
        'midnight-blue': '#1f2937',
        'steel-gray': '#6b7280',
        'light-gray': '#e5e7eb',
        'dark-gray': '#374151',
        'charcoal-gray': '#4b5563',
        'sunshine-yellow': '#fbbf24',
        'powder-blue': '#dbeafe',
        'mint': '#a7f3d0',
        'forest-green': '#059669',
        'goldenrod': '#d97706',
        'silver': '#9ca3af',
        'medium-blue': '#3b82f6',
        'slate-blue': '#475569',
        'tertiary': '#64748b',
        'transparent-black': 'rgba(0, 0, 0, 0.1)',
        'translucent-black': 'rgba(0, 0, 0, 0.5)',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'saas22-primary': '4px 5px 0px 0px #fbbf24',
        'saas22-secondary': '4px 5px 0px 0px #4b5563',
        'saas22-card': '5px 7px 1px 4px #d97706',
        'saas22-hover': '10px 10px 0px 0px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
