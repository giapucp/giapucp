import { NextResponse } from 'next/server';

const DEFAULT_SHEET_ID = '1U-bJoLNI-1LsCufD3uHBSWFN2TBu9krZ4v7SyilVOrg';
const DEFAULT_GID = process.env.SHEET_GID || '1027941785';

function parseCSV(text: string): Array<Record<string, string>> {
  const lines = text.replace(/\r\n/g, '\n').split(/\n/);
  while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();
  if (lines.length === 0) return [];

  const parseLine = (line: string) => {
    const result: string[] = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === ',' && !inQuotes) {
        result.push(cur);
        cur = '';
      } else {
        cur += ch;
      }
    }
    result.push(cur);
    return result;
  };

  const header = parseLine(lines[0]).map(h => h.trim());
  const rows: Array<Record<string, string>> = [];
  for (let i = 1; i < lines.length; i++) {
    const row = parseLine(lines[i]);
    while (row.length < header.length) row.push('');
    const obj: Record<string, string> = {};
    for (let j = 0; j < header.length; j++) {
      obj[header[j] || `col_${j}`] = row[j] ?? '';
    }
    const allEmpty = Object.values(obj).every(v => v.trim() === '');
    if (!allEmpty) rows.push(obj);
  }
  return rows;
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const sheetId = process.env.SHEET_ID || url.searchParams.get('sheetId') || DEFAULT_SHEET_ID;
    const gid = url.searchParams.get('gid') || process.env.SHEET_GID || DEFAULT_GID;

    const csvUrl = `https://docs.google.com/spreadsheets/d/${encodeURIComponent(
      sheetId
    )}/export?format=csv&gid=${encodeURIComponent(gid)}`;
    const resp = await fetch(csvUrl);
    if (!resp.ok) {
      return NextResponse.json({ error: 'Failed to fetch spreadsheet', status: resp.status }, { status: 502 });
    }
    const text = await resp.text();
    const parsed = parseCSV(text);

    // map and normalize only the required fields
    const NAME_KEY = 'Nombre completo';
    const AMOUNT_KEY = 'Monto total transferido';

    function parseAmount(raw: string | undefined): number | string | null {
      if (!raw) return null;
      const s = String(raw).trim();
      if (s === '') return null;
      // remove currency symbols and spaces
      let cleaned = s.replace(/\s+/g, '').replace(/[^0-9.,-]/g, '');

      // heuristics: determine decimal separator
      const lastComma = cleaned.lastIndexOf(',');
      const lastDot = cleaned.lastIndexOf('.');
      if (lastComma > lastDot) {
        // comma as decimal separator: remove dots (thousands), replace commas accordingly
        cleaned = cleaned.replace(/\./g, '').replace(/,/g, (m, offset, str) => (offset === str.lastIndexOf(',') ? '.' : ''));
      } else if (lastDot > lastComma) {
        // dot decimal separator: remove commas
        cleaned = cleaned.replace(/,/g, '');
      } else {
        // only one type or none: remove commas
        cleaned = cleaned.replace(/,/g, '');
      }

      const num = Number(cleaned);
      return Number.isFinite(num) ? num : s;
    }

    const rows = parsed.map(r => {
      // Use ONLY the exact requested headers
      const nombre = (r[NAME_KEY] ?? '').trim();
      const montoRaw = (r[AMOUNT_KEY] ?? '').trim();
      const monto = parseAmount(montoRaw);
      return { nombre, monto };
    }).filter(x => x.nombre || x.monto);

    return NextResponse.json(
      { meta: { source: 'google-csv-export', sheetId, gid, rows: rows.length }, data: rows },
      {
        status: 200,
        headers: { 'Cache-Control': 'public, max-age=300' }
      }
    );
  } catch (err) {
    return NextResponse.json({ error: 'Internal error', details: (err as Error).message }, { status: 500 });
  }
}
