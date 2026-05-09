import { useState } from 'react';

const buttons = [
  '7', '8', '9', '/',
  '4', '5', '6', '*',
  '1', '2', '3', '-',
  '0', '.', '=', '+',
];

function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const append = (value) => {
    if (value === '=' ) {
      calculate();
      return;
    }
    setExpression((prev) => {
      const next = prev + value;
      return next;
    });
  };

  const calculate = () => {
    if (!expression) return;
    try {
      const sanitized = expression.replace(/[^0-9.+\-*/()]/g, '');
      const value = Function(`return ${sanitized}`)();
      setResult(String(value));
      setExpression(String(value));
    } catch (error) {
      setResult('Error');
    }
  };

  const clear = () => {
    setExpression('');
    setResult('0');
  };

  const removeLast = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'} flex items-center justify-center px-4 py-10`}>
      <div className={`w-full max-w-md rounded-3xl border ${isDarkMode ? 'border-slate-700 bg-slate-900/90' : 'border-slate-300 bg-white/90'} p-6 shadow-2xl ${isDarkMode ? 'shadow-slate-950/40' : 'shadow-slate-200/40'}`}>
        <div className="flex justify-end gap-2 mb-4">
          <button
            type="button"
            className={`rounded-full p-2 text-xl transition ${isDarkMode ? 'text-slate-100 hover:bg-white/10' : 'text-slate-900 hover:bg-black/10'}`}
            onClick={() => setIsDarkMode(false)}
          >
            ☀️
          </button>
          <button
            type="button"
            className={`rounded-full p-2 text-xl transition ${isDarkMode ? 'text-slate-100 hover:bg-white/10' : 'text-slate-900 hover:bg-black/10'}`}
            onClick={() => setIsDarkMode(true)}
          >
            🌙
          </button>
        </div>
        <div className={`mb-6 rounded-3xl ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'} p-5 text-right ${isDarkMode ? 'text-slate-100' : 'text-slate-900'} shadow-inner ${isDarkMode ? 'shadow-slate-950/30' : 'shadow-slate-200/30'}`}>
          <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Calculator</div>
          <div className={`mt-3 min-h-[3rem] break-words text-3xl font-semibold ${isDarkMode ? '' : 'text-slate-900'}`}>{expression || '0'}</div>
          <div className={`mt-2 text-right ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}> = {result}</div>
        </div>
        <div className="grid gap-3 sm:grid-cols-4">
          <button
            type="button"
            className={`rounded-2xl ${isDarkMode ? 'bg-white/10 backdrop-blur-sm border border-white/20 text-slate-100 hover:bg-white/20 active:bg-white/25' : 'bg-black/10 backdrop-blur-sm border border-black/20 text-slate-900 hover:bg-black/20 active:bg-black/25'} py-4 text-lg font-semibold transition shadow-lg`}
            onClick={clear}
          >
            AC
          </button>
          <button
            type="button"
            className={`rounded-2xl ${isDarkMode ? 'bg-white/10 backdrop-blur-sm border border-white/20 text-slate-100 hover:bg-white/20 active:bg-white/25' : 'bg-black/10 backdrop-blur-sm border border-black/20 text-slate-900 hover:bg-black/20 active:bg-black/25'} py-4 text-lg font-semibold transition shadow-lg`}
            onClick={removeLast}
          >
            ⌫
          </button>
          <button
            type="button"
            className="rounded-2xl bg-orange-500/50 backdrop-blur-sm border border-orange-400/30 py-4 text-lg font-semibold text-white transition hover:bg-orange-500/70 active:bg-orange-500/80 shadow-lg"
            onClick={() => append('(')}
          >
            (
          </button>
          <button
            type="button"
            className="rounded-2xl bg-orange-500/50 backdrop-blur-sm border border-orange-400/30 py-4 text-lg font-semibold text-white transition hover:bg-orange-500/70 active:bg-orange-500/80 shadow-lg"
            onClick={() => append(')')}
          >
            )
          </button>
          {buttons.map((value) => (
            <button
              key={value}
              type="button"
              className={`rounded-2xl py-4 text-xl font-semibold transition shadow-lg ${
                value === '='
                  ? 'bg-cyan-500/50 backdrop-blur-sm border border-cyan-400/30 text-slate-950 hover:bg-cyan-500/70 active:bg-cyan-500/80'
                  : /[/*\-+]/.test(value)
                  ? 'bg-orange-500/50 backdrop-blur-sm border border-orange-400/30 text-white hover:bg-orange-500/70 active:bg-orange-500/80'
                  : isDarkMode
                  ? 'bg-white/10 backdrop-blur-sm border border-white/20 text-slate-100 hover:bg-white/20 active:bg-white/25'
                  : 'bg-black/10 backdrop-blur-sm border border-black/20 text-slate-900 hover:bg-black/20 active:bg-black/25'
              }`}
              onClick={() => append(value)}
            >
              {value === '*' ? '×' : value === '/' ? '÷' : value === '-' ? '−' : value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
