
'use client';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';

export default function AiNarrativePage() {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/reports/ai-narrative?startDate=2023-01-01&endDate=2023-12-31');
      setReport(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">AI Business Narrative</h1>
      <Button onClick={generateReport} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Report'}
      </Button>
      {report && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Business Narrative Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{report.narrative}</p>
            <h4 className="font-semibold mt-4 mb-2">Key Insights:</h4>
            <ul className="list-disc pl-5">
              {report.insights.map((ins: string, idx: number) => (
                <li key={idx}>{ins}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
