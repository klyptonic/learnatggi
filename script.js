// Alternative: Visual PDF Export using html2canvas
function exportCalendarToPDF() {
    const pdfButton = document.querySelector('.btn-primary');
    const originalText = pdfButton.innerHTML;
    pdfButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    pdfButton.disabled = true;
    
    // Get the calendar grid element
    const calendarGrid = document.querySelector('.calendar-grid');
    
    if (!calendarGrid) {
        alert('Calendar not found!');
        pdfButton.innerHTML = originalText;
        pdfButton.disabled = false;
        return;
    }
    
    // Use html2canvas to capture the calendar
    html2canvas(calendarGrid, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false
    }).then(canvas => {
        try {
            // Create PDF
            const { jsPDF } = window.jspdf;
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 190; // A4 width minus margins
            const pageHeight = 275; // A4 height minus margins
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 15; // Start position
            
            // Add title page
            pdf.setFontSize(22);
            pdf.setTextColor(44, 62, 80);
            pdf.text('Gordon Granger Institute', 105, 20, null, null, 'center');
            
            pdf.setFontSize(16);
            pdf.setTextColor(102, 126, 234);
            pdf.text('Academic Calendar 2025-2026', 105, 30, null, null, 'center');
            
            pdf.setFontSize(12);
            pdf.setTextColor(127, 140, 141);
            pdf.text('Important dates, events, and deadlines', 105, 38, null, null, 'center');
            
            // Add horizontal line
            pdf.setDrawColor(221, 221, 221);
            pdf.line(20, 45, 190, 45);
            
            // Add generated date
            const date = new Date();
            pdf.setFontSize(10);
            pdf.setTextColor(150, 150, 150);
            pdf.text(`Generated on: ${date.toLocaleDateString()}`, 20, 280);
            
            // Add calendar image
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            
            heightLeft -= pageHeight;
            
            // Add additional pages if needed
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            
            // Save PDF
            pdf.save('gordon-granger-calendar-2025-2026.pdf');
            
        } catch (error) {
            console.error('PDF generation error:', error);
            alert('Error generating PDF. Please try again.');
        } finally {
            pdfButton.innerHTML = originalText;
            pdfButton.disabled = false;
        }
    }).catch(error => {
        console.error('Canvas generation error:', error);
        alert('Error generating PDF. Please try again.');
        pdfButton.innerHTML = originalText;
        pdfButton.disabled = false;
    });
}

// Enhanced Navigation with Dropdown Support
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Mobile Menu Toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Dropdown Toggle for Mobile
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
                
                // Close dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    });
    
    // Form submission (prevent default for demo)
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! In a real implementation, this would be sent to our team.');
            this.reset();
        });
    }
    
    // Add active class to navigation based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.main-nav a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Close menus when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown') && window.innerWidth > 768) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
        
        if (!e.target.closest('.main-nav') && !e.target.closest('.mobile-menu-btn')) {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        }
    });
});