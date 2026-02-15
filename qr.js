const qrInput = document.getElementById('qrText');
const qrBox = document.getElementById('qrBox');
const qrImage = document.getElementById('qrImage');

function generateQR() {
    const text = qrInput.value.trim();
    
    // Logic Error Check
    if (text.length === 0) {
        qrInput.classList.add('error'); // Visual Feedback
        setTimeout(() => qrInput.classList.remove('error'), 500);
        return;
    }

    // Button Animation
    const btn = document.querySelector('button');
    btn.innerHTML = 'Generating...';
    
    // API Call (Simple & Fast)
    // Ye API free hai aur seedha image deti hai
    const apiURL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;
    
    qrImage.src = apiURL;
    
    // Image load hone par show karo
    qrImage.onload = () => {
        qrBox.classList.remove('hidden');
        btn.innerHTML = 'Generate <i class="fa-solid fa-bolt"></i>';
    };
}

// Optional: Enter key se trigger karna
qrInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') generateQR();
});

// Download Logic
async function downloadQR() {
    const imageSrc = qrImage.src;
    const imageBlob = await fetch(imageSrc).then(response => response.blob());
    const imageURL = URL.createObjectURL(imageBlob);

    const link = document.createElement('a');
    link.href = imageURL;
    link.download = 'My-QR-Code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}