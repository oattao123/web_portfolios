const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });

    // Resume PDF
    const resumePage = await browser.newPage();
    await resumePage.goto('file://' + path.resolve(__dirname, 'public/resume.html'), { waitUntil: 'networkidle0' });
    await resumePage.pdf({
        path: path.resolve(__dirname, 'public/Dollatham_Resume.pdf'),
        format: 'A4',
        printBackground: true,
        margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });
    console.log('✅ Resume PDF generated: public/Dollatham_Resume.pdf');

    // CV PDF
    const cvPage = await browser.newPage();
    await cvPage.goto('file://' + path.resolve(__dirname, 'public/cv.html'), { waitUntil: 'networkidle0' });
    await cvPage.pdf({
        path: path.resolve(__dirname, 'public/Dollatham_CV.pdf'),
        format: 'A4',
        printBackground: true,
        margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });
    console.log('✅ CV PDF generated: public/Dollatham_CV.pdf');

    await browser.close();
    console.log('🎉 Both PDFs generated successfully!');
})();
