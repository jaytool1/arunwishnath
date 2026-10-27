import React, { useState } from 'react';
import {
  TrendingUp,
  Search,
  Award,
  AlertCircle,
  Printer,
  RotateCcw,
  BookOpen,
  Calendar,
  CheckCircle,
  FileCheck,
  Building,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const Results: React.FC = () => {
  const { language, t } = useLanguage();

  const [rollNumber, setRollNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [sessionId, setSessionId] = useState('session_2025_2026');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [resultData, setResultData] = useState<any | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setResultData(null);

    if (!rollNumber.trim()) {
      setErrorMsg(language === 'hi' ? 'कृपया रोल नंबर दर्ज करें।' : 'Please enter Roll Number.');
      return;
    }
    if (!dateOfBirth) {
      setErrorMsg(language === 'hi' ? 'कृपया जन्म तिथि दर्ज करें।' : 'Please enter Date of Birth.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/results/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rollNumber: rollNumber.trim(),
          dateOfBirth,
          sessionId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || t('resultNotFound'));
      }

      setResultData(data.result);
    } catch (err: any) {
      setErrorMsg(err.message || t('resultNotFound'));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResultData(null);
    setErrorMsg(null);
    setRollNumber('');
    setDateOfBirth('');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-widest block mb-2">
            Bihar School Examination Board (BSEB) Evaluation
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B2545] font-serif mb-2">
            {t('resultsHeader')}
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            {t('resultsSubheader')} · Arun Bishwanath High School, Aran
          </p>
        </div>

        {/* Search Query Form Card */}
        {!resultData ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 max-w-2xl mx-auto">
            {errorMsg && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3 text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSearch} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t('examSession')} *
                </label>
                <select
                  value={sessionId}
                  onChange={(e) => setSessionId(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B2545] focus:bg-white"
                >
                  <option value="session_2025_2026">BSEB Matriculation Annual / Practice 2025-26</option>
                  <option value="session_2024_2025">BSEB Secondary Examination 2024-25</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t('rollNumber')} *
                  </label>
                  <input
                    type="text"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    placeholder="e.g. 250101"
                    required
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B2545] focus:bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t('dateOfBirth')} *
                  </label>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B2545] focus:bg-white"
                  />
                </div>
              </div>

              {/* Sample Credentials Helper Pill */}
              <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-900 flex items-center justify-between">
                <span>
                  Demo Lookup: <strong className="font-mono">Roll: 250101</strong>, DOB: <strong className="font-mono">15/05/2010</strong> (or Roll: 250102, DOB: 22/08/2010)
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setRollNumber('250101');
                    setDateOfBirth('2010-05-15');
                  }}
                  className="text-xs text-blue-700 font-bold hover:underline shrink-0 ml-2"
                >
                  Auto-Fill
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#0B2545] hover:bg-blue-900 text-white font-bold text-sm rounded-xl transition-all shadow-md disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>{loading ? t('searchingResult') : t('searchResult')}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Official BSEB Marksheet Card (Print Optimized) */
          <div className="bg-white rounded-2xl border-2 border-[#0B2545]/30 shadow-lg p-6 sm:p-10 print:border print:border-black print:p-6 print:shadow-none">
            {/* Marksheet Seal & Header */}
            <div className="text-center pb-6 border-b-2 border-[#0B2545]/20">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Building className="w-8 h-8 text-[#0B2545]" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Government of Bihar · Secondary Education Dept.
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] font-serif uppercase tracking-tight">
                {resultData.schoolName}
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                Aran, Saharsa, Bihar - 852124 · Affiliated to {resultData.board}
              </p>
              <div className="mt-3 inline-block bg-[#0B2545] text-white px-4 py-1 rounded text-xs font-bold tracking-widest uppercase">
                {t('marksheetTitle')}
              </div>
            </div>

            {/* Candidate Metadata Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-slate-200 text-xs bg-slate-50/50 p-4 rounded-xl my-4">
              <div>
                <span className="text-slate-500 block">Candidate Name</span>
                <span className="text-sm font-bold text-slate-900">{resultData.studentName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Roll Number / क्रमांक</span>
                <span className="text-sm font-mono font-bold text-slate-900">{resultData.rollNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Class / कक्षा</span>
                <span className="text-sm font-bold text-slate-900">Class {resultData.class}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Session / सत्र</span>
                <span className="text-xs font-semibold text-slate-800">{resultData.sessionName}</span>
              </div>
            </div>

            {/* Subject Marks Table */}
            <div className="overflow-x-auto my-6">
              <table className="w-full text-xs text-left border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-[#0B2545] text-white">
                    <th className="border border-slate-300 px-3 py-2 font-bold">Code</th>
                    <th className="border border-slate-300 px-4 py-2 font-bold">Subject Name</th>
                    <th className="border border-slate-300 px-3 py-2 text-center font-bold">{t('theory')}</th>
                    <th className="border border-slate-300 px-3 py-2 text-center font-bold">{t('practical')}</th>
                    <th className="border border-slate-300 px-3 py-2 text-center font-bold">{t('marksObtained')}</th>
                    <th className="border border-slate-300 px-3 py-2 text-center font-bold">{t('maxMarks')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {resultData.subjects.map((s: any, idx: number) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="border border-slate-300 px-3 py-2 font-mono font-bold text-slate-700">
                        {s.code}
                      </td>
                      <td className="border border-slate-300 px-4 py-2 font-medium text-slate-900">
                        {s.name}
                      </td>
                      <td className="border border-slate-300 px-3 py-2 text-center font-mono tabular-nums text-slate-800">
                        {s.theory}
                      </td>
                      <td className="border border-slate-300 px-3 py-2 text-center font-mono tabular-nums text-slate-800">
                        {s.practical > 0 ? s.practical : '-'}
                      </td>
                      <td className="border border-slate-300 px-3 py-2 text-center font-mono font-bold tabular-nums text-[#0B2545]">
                        {s.total}
                      </td>
                      <td className="border border-slate-300 px-3 py-2 text-center font-mono tabular-nums text-slate-500">
                        {s.max}
                      </td>
                    </tr>
                  ))}
                  {/* Totals Row */}
                  <tr className="bg-slate-100 font-bold">
                    <td colSpan={4} className="border border-slate-300 px-4 py-2 text-right uppercase tracking-wider">
                      Aggregate Total
                    </td>
                    <td className="border border-slate-300 px-3 py-2 text-center font-mono text-sm text-[#0B2545] font-extrabold">
                      {resultData.totalMarks}
                    </td>
                    <td className="border border-slate-300 px-3 py-2 text-center font-mono text-sm text-slate-700">
                      {resultData.maximumMarks}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Performance Summary Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-center my-6">
              <div>
                <span className="text-[11px] text-slate-500 block uppercase font-semibold">
                  Percentage
                </span>
                <span className="text-xl font-bold font-mono text-slate-900">
                  {resultData.percentage}%
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block uppercase font-semibold">
                  {t('division')}
                </span>
                <span className="text-base font-bold text-blue-800">
                  {resultData.division}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block uppercase font-semibold">
                  Result
                </span>
                <span className="text-base font-extrabold text-emerald-700">
                  {resultData.resultStatus}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block uppercase font-semibold">
                  Issue Date
                </span>
                <span className="text-xs font-medium text-slate-700 font-mono">
                  {resultData.issueDate}
                </span>
              </div>
            </div>

            {/* Verification Signatures */}
            <div className="pt-10 flex items-center justify-between text-xs text-slate-600 border-t border-slate-200 mt-8">
              <div className="text-center">
                <span className="block border-t border-slate-400 pt-1 w-32 font-semibold">
                  Controller of Exams
                </span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full border border-dashed border-[#0B2545]/40 flex items-center justify-center text-[10px] text-slate-400 mx-auto mb-1">
                  OFFICIAL SEAL
                </div>
                <span className="text-[10px] text-slate-400">School Stamp</span>
              </div>
              <div className="text-center">
                <span className="block border-t border-slate-400 pt-1 w-32 font-semibold">
                  Principal Signature
                </span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between print:hidden">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-[#0B2545] hover:bg-blue-900 text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>{t('printMarksheet')}</span>
              </button>

              <button
                onClick={handleReset}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Check Another Result</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
