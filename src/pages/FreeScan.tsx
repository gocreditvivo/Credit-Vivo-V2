import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowRight, CheckCircle, FileText, Loader2, Upload } from 'lucide-react';
import { parseCreditReports } from '../lib/scannerApi';
import { parseCreditReportText } from '../lib/creditParser';
import { getDemoScanResult, saveLastScanResult } from '../lib/scanStorage';

export default function FreeScan() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [reportText, setReportText] = useState('');
  const [isReviewing, setIsReviewing] = useState(false);
  const [error, setError] = useState('');

  const selectedFileText = useMemo(() => {
    if (!files.length) return 'No files selected yet';
    if (files.length === 1) return files[0].name;
    return `${files.length} files selected`;
  }, [files]);

  async function parseTextFiles(selectedFiles: File[]) {
    const textFiles = selectedFiles.filter((file) => /\.txt$/i.test(file.name) || file.type.startsWith('text/'));
    if (!textFiles.length) return '';
    const chunks = await Promise.all(
      textFiles.map(async (file) => {
        const text = await file.text();
        return `\n\n--- FILE: ${file.name} ---\n\n${text}`;
      })
    );
    return chunks.join('\n');
  }

  async function handleStartCheckIn() {
    setError('');

    const pastedText = reportText.trim();

    if (!files.length && pastedText.length < 50) {
      setError('Paste report text, upload a TXT report, or choose at least one credit report PDF.');
      return;
    }

    setIsReviewing(true);

    try {
      const textFromFiles = await parseTextFiles(files);
      const combinedText = [pastedText, textFromFiles].filter(Boolean).join('\n\n');

      if (combinedText.trim().length >= 50) {
        const result = parseCreditReportText(
          combinedText,
          files.find((file) => /\.txt$/i.test(file.name))?.name || 'pasted-credit-report.txt'
        );
        saveLastScanResult(result);
        navigate('/findings');
        return;
      }

      const pdfFiles = files.filter((file) => file.type === 'application/pdf' || /\.pdf$/i.test(file.name));
      if (!pdfFiles.length) {
        throw new Error('No readable report text found. Paste report text or upload a TXT file for the parser MVP.');
      }

      const result = await parseCreditReports(pdfFiles, false);
      saveLastScanResult(result);
      navigate('/findings');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Scanner request failed.';
      setError(
        `${message} Parser MVP can read pasted text or TXT files now. PDF parsing uses the scanner backend until browser PDF extraction is added.`
      );
    } finally {
      setIsReviewing(false);
    }
  }

  function handleDemo() {
    const demo = getDemoScanResult();
    saveLastScanResult(demo);
    navigate('/findings');
  }

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-sky-600 mb-1">
        Upload Reports
      </p>
      <h1 className="text-2xl font-black tracking-tight text-navy-950 mb-2">Build your score board.</h1>
      <p className="text-sm text-navy-400 mb-6 max-w-2xl">
        Paste or upload your report so CreditVivo can find score blockers, possible reporting issues, proof needed, and next actions.
      </p>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-5">
        <div className="bg-white rounded-xl p-6 border border-navy-100/60 max-w-2xl">
          <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center mb-4">
            <Upload size={20} className="text-sky-600" />
          </div>

          <h2 className="text-sm font-bold text-navy-900 mb-2">
            Start your parser scan
          </h2>
          <p className="text-xs text-navy-400 mb-5 leading-relaxed">
            MVP reads pasted report text and TXT files now. PDF support still uses the scanner backend.
          </p>

          <div className="mb-5 rounded-lg border border-amber-100 bg-amber-50 p-3">
            <div className="flex gap-2 text-xs leading-relaxed text-amber-900">
              <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />
              <p>
                Credit reports contain sensitive data. Use only your own report or a report
                you have permission to test. Do not put real reports into the repo.
              </p>
            </div>
          </div>

          <label className="block border border-dashed border-navy-200 rounded-xl p-5 bg-navy-50/40 cursor-pointer hover:bg-sky-50/40 transition-colors">
            <input
              type="file"
              accept="application/pdf,.pdf,text/plain,.txt"
              multiple
              className="hidden"
              onChange={(event) => {
                const selected = Array.from(event.target.files || []);
                setFiles(selected);
                setError('');
              }}
            />
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white border border-navy-100 flex items-center justify-center">
                <FileText size={16} className="text-sky-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-navy-800">
                  Choose TXT or PDF reports
                </p>
                <p className="text-[11px] text-navy-400">
                  Experian, Equifax, TransUnion, or multi-bureau reports
                </p>
              </div>
            </div>
          </label>

          <div className="mt-4 flex items-center gap-2 text-xs text-navy-500">
            <CheckCircle size={14} className="text-mint-600" />
            <span>{selectedFileText}</span>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-xs font-bold text-navy-800">
              Paste report text for parser MVP
            </label>
            <textarea
              value={reportText}
              onChange={(event) => {
                setReportText(event.target.value);
                setError('');
              }}
              placeholder="Paste Equifax, Experian, or TransUnion report text here..."
              className="min-h-[180px] w-full rounded-xl border border-navy-100 bg-navy-50/40 p-4 text-xs leading-relaxed text-navy-700 outline-none transition focus:border-sky-300 focus:bg-white"
            />
          </div>

          {error && (
            <div className="mt-4 flex gap-2 rounded-lg border border-red-100 bg-red-50 p-3 text-xs text-red-700">
              <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleStartCheckIn}
              disabled={isReviewing}
              className="btn-primary text-xs py-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isReviewing ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Building your score board...
                </>
              ) : (
                <>
                  Find Score Blockers
                  <ArrowRight size={14} />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDemo}
              disabled={isReviewing}
              className="px-4 py-2.5 rounded-full border border-navy-100 text-xs font-semibold text-navy-600 hover:bg-navy-50 transition-colors"
            >
              Load Demo Score Board
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-navy-100/60 h-fit">
          <h2 className="text-sm font-bold text-navy-900 mb-3">What happens next</h2>
          <div className="space-y-3">
            {[
              'Parser turns the report into account cards.',
              'Score Impact Engine ranks the biggest blockers.',
              'FCRA / Metro 2 flags are shown as possible issues.',
              'Proof needed and next action are organized.',
              'Nothing is sent without customer approval.',
            ].map((step, index) => (
              <div key={step} className="flex gap-3">
                <div className="w-6 h-6 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center text-[11px] font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-xs text-navy-500 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
