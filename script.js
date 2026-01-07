const dictionary = {
    en: {
        title: "Convert Drive Link to Direct Download",
        placeholder: "Paste Drive link here...",
        btn: "Generate Link",
        success: "Link Ready!",
        copy: "Copy",
        copied: "Copied!",
        error: "Invalid Google Drive Link",
        warning: '⚠️ Did you check file permissions: "Anyone with the link"?',
        langBtn: "AR",
        font: "var(--font-en)"
    },
    ar: {
        title: "تحويل رابط قوقل درايف الى رابط تحميل مباشر",
        placeholder: "إلصق رابط درايف هنا...",
        btn: "توليد الرابط",
        success: "!الرابط جاهز",
        copy: "نسخ",
        copied: "!تم النسخ",
        error: "رابط جوجل درايف غير صالح",
        warning: '⚠️ هل اخترت من صلاحيات الملف "أي شخص لديه الرابط"؟',
        langBtn: "EN",
        font: "var(--font-ar)"
    }
};

let currentLang = 'en';

const elements = {
    body: document.body,
    title: document.getElementById('app-title'),
    input: document.getElementById('drive-link'),
    convertBtn: document.getElementById('convert-btn'),
    btnText: document.getElementById('btn-text'),
    langBtn: document.getElementById('lang-toggle'),
    langText: document.querySelector('.lang-text'),
    resultArea: document.getElementById('result-area'),
    outputInput: document.getElementById('output-link'),
    copyBtn: document.getElementById('copy-btn'),
    successMsg: document.getElementById('success-msg'),
    errorMsg: document.getElementById('error-msg'),
    warningBox: document.getElementById('permission-warning'),
    warningText: document.getElementById('warning-text')
};

// Language Toggle
elements.langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    updateLanguage();
});

function updateLanguage() {
    const t = dictionary[currentLang];
    
    // Direction & Font
    if (currentLang === 'ar') {
        elements.body.classList.add('rtl');
        elements.body.dir = 'rtl';
    } else {
        elements.body.classList.remove('rtl');
        elements.body.dir = 'ltr';
    }

    // Text Content
    elements.title.textContent = t.title;
    elements.input.placeholder = t.placeholder;
    elements.btnText.textContent = t.btn;
    elements.btnText.textContent = t.btn;
    elements.successMsg.textContent = t.success;
    elements.warningText.textContent = t.warning;
    elements.langText.textContent = t.langBtn;
}

// Convert Logic
elements.convertBtn.addEventListener('click', () => {
    const url = elements.input.value.trim();
    const fileId = extractFileId(url);
    const t = dictionary[currentLang];

    elements.resultArea.classList.add('hidden');
    elements.errorMsg.classList.add('hidden');
    elements.errorMsg.textContent = '';

    if (fileId) {
        // Mock Loading
        const originalText = elements.btnText.textContent;
        elements.btnText.textContent = currentLang === 'en' ? 'Scanning...' : '...جاري الفحص';
        elements.convertBtn.style.opacity = '0.8';
        
        setTimeout(() => {
            const directLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
            elements.outputInput.value = directLink;
            elements.resultArea.classList.remove('hidden');
            elements.successMsg.classList.remove('hidden');
            
            elements.btnText.textContent = originalText;
            elements.convertBtn.style.opacity = '1';
            
            // Dopamine Effect (Simple Pulse)
            elements.outputInput.focus();
        }, 600);
    } else {
        elements.errorMsg.textContent = t.error;
        elements.errorMsg.classList.remove('hidden');
    }
});

function extractFileId(url) {
    const regex = /\/d\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Copy Function
elements.copyBtn.addEventListener('click', async () => {
    const t = dictionary[currentLang];
    
    try {
        await navigator.clipboard.writeText(elements.outputInput.value);
        
        // feedback
        const originalIcon = elements.copyBtn.innerHTML;
        elements.copyBtn.innerHTML = `<span>${t.copied}</span>`;
        elements.copyBtn.style.width = '100px'; // Expand for text
        
        setTimeout(() => {
            elements.copyBtn.innerHTML = originalIcon;
            elements.copyBtn.style.width = '50px';
        }, 1500);
        
    } catch (err) {
        console.error('Failed to copy', err);
    }
});

// Permission Warning Listener
elements.input.addEventListener('input', () => {
    const url = elements.input.value.trim();
    const fileId = extractFileId(url);
    const t = dictionary[currentLang];
    
    if (fileId) {
        elements.warningText.textContent = t.warning;
        elements.warningBox.classList.remove('hidden');
    } else {
        elements.warningBox.classList.add('hidden');
    }
});
