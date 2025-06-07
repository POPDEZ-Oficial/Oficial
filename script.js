// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Store the deferred prompt for later use
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

// Function to trigger APK installation
async function installApp() {
    try {
        const apkUrl = 'images/POPDEZ_300038.apk';
        
        // Try to use the modern installation API first
        if ('getInstalledRelatedApps' in navigator) {
            const relatedApps = await navigator.getInstalledRelatedApps();
            if (!relatedApps.some(app => app.id === 'com.popdez.app')) {
                // App not installed, proceed with installation
                if (deferredPrompt) {
                    await deferredPrompt.prompt();
                    const { outcome } = await deferredPrompt.userChoice;
                    deferredPrompt = null;
                    
                    if (outcome === 'accepted') {
                        console.log('App installation accepted');
                        return;
                    }
                }
            }
        }

        // Fallback: Create a hidden iframe for installation
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = apkUrl;
        document.body.appendChild(iframe);
        
        // Remove iframe after a short delay
        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 1000);
        
    } catch (error) {
        console.log('Installation failed, falling back to direct download');
        window.location.href = 'images/POPDEZ_300038.apk';
    }
}

// Function to check if the user is on Android
function isAndroid() {
    return /Android/i.test(navigator.userAgent);
}

// Function to trigger direct APK download
async function downloadAPK() {
    try {
        const downloadLink = document.createElement('a');
        downloadLink.style.display = 'none';
        downloadLink.href = 'images/POPDEZ_300038.apk';
        downloadLink.download = 'POPDEZ.apk'; // This renames the download file
        downloadLink.setAttribute('target', '_blank');
        downloadLink.setAttribute('rel', 'noopener');
        
        // Add download attributes
        downloadLink.setAttribute('download', '');
        downloadLink.setAttribute('data-downloadurl', ['application/vnd.android.package-archive', 'POPDEZ.apk', downloadLink.href].join(':'));

        // Trigger click programmatically
        document.body.appendChild(downloadLink);
        downloadLink.click();
        
        // Clean up
        setTimeout(() => {
            document.body.removeChild(downloadLink);
        }, 100);
    } catch (error) {
        console.error('Download failed:', error);
    }
}

// When the page loads
window.addEventListener('load', () => {
    const downloadButton = document.querySelector('.btn-google');
    
    if (downloadButton) {
        downloadButton.addEventListener('click', (e) => {
            e.preventDefault();
            downloadAPK();
            
            // Track download event if you have Facebook Pixel
            if (typeof fbq === 'function') {
                fbq('track', 'CompleteInstallation', {
                    eventID: generateEventId()
                });
            }
        });
    }
    
    // Arrow navigation functionality
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    
    if (leftArrow) {
        leftArrow.addEventListener('click', function() {
            console.log('Navigate left');
            // Add slide functionality here if needed
        });
    }
    
    if (rightArrow) {
        rightArrow.addEventListener('click', function() {
            console.log('Navigate right');
            // Add slide functionality here if needed
        });
    }
    
    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 