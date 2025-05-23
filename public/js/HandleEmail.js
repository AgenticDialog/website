document.addEventListener('DOMContentLoaded', function() {
        console.log('Email link script loaded at', new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' }));
        console.log('Toastify available:', typeof Toastify !== 'undefined');
        document.querySelectorAll('.email-link').forEach(link => {
            link.addEventListener('click', function(event) {
                const email = this.getAttribute('data-email');
                console.log('Email link clicked:', this.href, 'Email:', email);
                
                // Allow native mailto behavior
                setTimeout(() => {
                    if (document.hasFocus()) {
                        console.log('Email client did not open for', email);
                        // Try to copy email to clipboard
                        navigator.clipboard.writeText(email).then(() => {
                            console.log('Email copied to clipboard:', email);
                            if (typeof Toastify === 'function') {
                                Toastify({
                                    text: `Unable to open email client. Email ${email} copied to clipboard!`,
                                    duration: 5000,
                                    gravity: "top",
                                    position: "center",
                                    backgroundColor: "#297bbf",
                                    stopOnFocus: true,
                                }).showToast();
                            } else {
                                console.error('Toastify not loaded');
                                alert(`Unable to open email client. Email ${email} copied to clipboard!`);
                            }
                        }).catch(err => {
                            console.error('Failed to copy email:', err);
                            if (typeof Toastify === 'function') {
                                Toastify({
                                    text: `Unable to open email client. Please email us at ${email} manually.`,
                                    duration: 5000,
                                    gravity: "top",
                                    position: "center",
                                    backgroundColor: "#297bbf",
                                    stopOnFocus: true,
                                }).showToast();
                            } else {
                                console.error('Toastify not loaded');
                                alert(`Unable to open email client. Please email us at ${email} manually.`);
                            }
                        });
                    } else {
                        console.log('Email client likely opened for', email);
                    }
                }, 1000);
            });
        });
    });