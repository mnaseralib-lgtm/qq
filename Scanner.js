
import React from "https://esm.sh/react@18.2.0";

const API_URL = "https://script.google.com/macros/s/AKfycbwRtPYKLPkl58atPByBKtMx6aNy4-yklZypgs3c7vOl-hQknJ8G-itvemHp5cHpnhJl/exec";

const Scanner = ({ onScanSuccess }) => {
  const [message, setMessage] = React.useState(null);
  const readerRef = React.useRef(null);

  React.useEffect(()=>{ 
    if (!window.Html5Qrcode) return;
    const html5QrCode = new window.Html5Qrcode('qr-reader');
    readerRef.current = html5QrCode;
    html5QrCode.start({ facingMode: "environment" }, { fps: 10, qrbox: 250 },
      async (decodedText) => {
        setMessage('تم المسح: ' + decodedText);
        try {
          const res = await fetch(API_URL + '?action=post&code=' + encodeURIComponent(decodedText));
          const data = await res.json();
          console.log('post result', data);
          onScanSuccess && onScanSuccess();
        } catch (err) {
          console.error(err);
          setMessage('خطأ في الاتصال بخدمة التخزين');
        }
      },
      (err)=>{ /* ignore parse errors */ }
    ).catch(e=> setMessage('فشل تشغيل الماسح: ' + (e.message || e)));
    return ()=>{ if (readerRef.current) readerRef.current.stop().catch(()=>{}); };
  },[]);

  return React.createElement('div', {className:'space-y-4 max-w-2xl mx-auto'},
    React.createElement('div', {className:'p-4 bg-white rounded-xl shadow-md space-y-4'},
      React.createElement('h2', {className:'text-lg font-bold text-gray-700'}, '1. اختر الإجراء'),
      React.createElement('div', {className:'relative'},
        React.createElement('select', {className:'w-full appearance-none bg-green-600 text-white font-bold py-3 px-4 rounded-md', 'aria-label':'اختر نوع التسجيل'},
          React.createElement('option', {value:'دخول'}, 'دخول'),
          React.createElement('option', {value:'خروج'}, 'خروج'),
          React.createElement('option', {value:'خروج مسائي'}, 'خروج مسائي')
        )
      )
    ),
    React.createElement('div', {className:'p-4 bg-white rounded-xl shadow-md space-y-4'},
      React.createElement('div', {className:'flex justify-between items-center'},
        React.createElement('h2', {className:'text-lg font-bold text-gray-700'}, '2. امسح الرمز')
      ),
      React.createElement('div', {id:'qr-reader', className:'w-full rounded-lg overflow-hidden border-2 border-gray-200 aspect-square max-h-[50vh]'}),
      message ? React.createElement('div', {className:'p-3 text-center rounded-md text-white font-semibold bg-green-500'}, message) : null
    )
  );
};

export default Scanner;
