
import React from "https://esm.sh/react@18.2.0";

const API_URL = "https://script.google.com/macros/s/AKfycbwRtPYKLPkl58atPByBKtMx6aNy4-yklZypgs3c7vOl-hQknJ8G-itvemHp5cHpnhJl/exec";

function exportToExcel(headers, rows, title) {
  try {
    const ws = window.XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, 'Report');
    window.XLSX.writeFile(wb, (title||'report') + '.xlsx');
  } catch (e){ alert('فشل التصدير إلى Excel'); }
}

function exportToPdf(headers, rows, title) {
  try {
    const doc = new window.jspdf.jsPDF();
    doc.autoTable({ head: [headers], body: rows });
    doc.save((title||'report') + '.pdf');
  } catch(e){ alert('فشل التصدير إلى PDF'); }
}

const Reports = ({ goBack }) => {
  const [rows, setRows] = React.useState([]);
  const [headers, setHeaders] = React.useState(['اسم','وقت الدخول','وقت الخروج','ساعات','اضافي']);
  const [isLoading, setLoading] = React.useState(false);
  const [hrCode, setHrCode] = React.useState('');
  const [fromDate, setFromDate] = React.useState('');
  const [toDate, setToDate] = React.useState('');

  const fetchReports = React.useCallback(async ()=>{
    setLoading(true);
    try{
      const q = new URL(API_URL);
      q.searchParams.set('action','reports');
      if(hrCode) q.searchParams.set('hr', hrCode);
      if(fromDate) q.searchParams.set('from', fromDate);
      if(toDate) q.searchParams.set('to', toDate);
      const res = await fetch(q.toString());
      const data = await res.json();
      if(Array.isArray(data.rows)) setRows(data.rows);
    }catch(e){
      console.error(e);
      alert('فشل جلب التقارير');
    }finally{ setLoading(false); }
  },[hrCode, fromDate, toDate]);

  return React.createElement('div', {className:'max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6'},
    React.createElement('div', {className:'flex justify-between items-center'},
      React.createElement('h2', {className:'text-2xl font-bold text-center text-gray-700'}, 'التقارير'),
      React.createElement('div', null,
        React.createElement('button', {className:'mx-2 bg-gray-200 px-3 py-2 rounded', onClick: goBack}, 'العودة'),
        React.createElement('button', {className:'mx-2 bg-green-600 text-white px-3 py-2 rounded', onClick: fetchReports}, isLoading? 'جاري التحميل...' : 'جلب التقارير')
      )
    ),
    React.createElement('div', {className:'flex gap-2'},
      React.createElement('input', {placeholder:'رمز الموظف', value:hrCode, onChange:e=>setHrCode(e.target.value), className:'px-3 py-2 border rounded'}),
      React.createElement('input', {type:'date', value:fromDate, onChange:e=>setFromDate(e.target.value), className:'px-3 py-2 border rounded'}),
      React.createElement('input', {type:'date', value:toDate, onChange:e=>setToDate(e.target.value), className:'px-3 py-2 border rounded'})
    ),
    React.createElement('div', {className:'overflow-x-auto mt-4'},
      React.createElement('table', {className:'min-w-full divide-y divide-gray-200'},
        React.createElement('thead', null,
          React.createElement('tr', null, headers.map((h,i)=>React.createElement('th',{key:i,className:'px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase'},h)))
        ),
        React.createElement('tbody', null,
          rows.length===0 ? React.createElement('tr', null, React.createElement('td',{colSpan:5,className:'text-center py-4'}, 'لا توجد بيانات')) :
          rows.map((r,ri)=> React.createElement('tr',{key:ri,className:'hover:bg-gray-50'}, r.map((c,ci)=> React.createElement('td',{key:ci,className:'px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono text-right'}, String(c)))))
        )
      )
    ),
    React.createElement('div',{className:'flex gap-2 justify-end mt-4'},
      React.createElement('button',{className:'bg-green-600 text-white px-3 py-2 rounded', onClick:()=>exportToExcel(headers, rows, 'reports')}, 'تصدير Excel'),
      React.createElement('button',{className:'bg-red-600 text-white px-3 py-2 rounded', onClick:()=>exportToPdf(headers, rows, 'reports')}, 'تصدير PDF')
    )
  );
};

export default Reports;
