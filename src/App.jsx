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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/40">
        <div className="mb-6 rounded-3xl bg-slate-800 p-5 text-right text-slate-100 shadow-inner shadow-slate-950/30">
          <div className="text-sm text-slate-400">Calculator</div>
          <div className="mt-3 min-h-[3rem] break-words text-3xl font-semibold">{expression || '0'}</div>
          <div className="mt-2 text-right text-slate-400">= {result}</div>
        </div>
        <div className="grid gap-3 sm:grid-cols-4">
          <button
            type="button"
            className="rounded-2xl bg-slate-700 py-4 text-lg font-semibold text-slate-100 transition hover:bg-slate-600"
            onClick={clear}
          >
            AC
          </button>
          <button
            type="button"
            className="rounded-2xl bg-slate-700 py-4 text-lg font-semibold text-slate-100 transition hover:bg-slate-600"
            onClick={removeLast}
          >
            DEL
          </button>
          <button
            type="button"
            className="rounded-2xl bg-slate-700 py-4 text-lg font-semibold text-slate-100 transition hover:bg-slate-600"
            onClick={() => append('(')}
          >
            (
          </button>
          <button
            type="button"
            className="rounded-2xl bg-orange-500 py-4 text-lg font-semibold text-white transition hover:bg-orange-400"
            onClick={() => append(')')}
          >
            )
          </button>
          {buttons.map((value) => (
            <button
              key={value}
              type="button"
              className={`rounded-2xl py-4 text-xl font-semibold transition ${value === '=' ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400' : /[/*\-+]/.test(value) ? 'bg-orange-500 text-white hover:bg-orange-400' : 'bg-slate-700 text-slate-100 hover:bg-slate-600'}`}
              onClick={() => append(value)}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
