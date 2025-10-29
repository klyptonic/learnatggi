// PDF Export Functionality
function exportCalendarToPDF() {
    // Show loading state
    const pdfButton = document.querySelector('.btn-primary');
    const originalText = pdfButton.innerHTML;
    pdfButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    pdfButton.disabled = true;
    
    // Use setTimeout to allow UI to update before heavy processing
    setTimeout(() => {
        try {
            // Create a simplified version of the calendar for PDF
            generateCalendarPDF();
        } catch (error) {
            console.error('PDF generation error:', error);
            alert('Error generating PDF. Please try again.');
        } finally {
            // Restore button state
            pdfButton.innerHTML = originalText;
            pdfButton.disabled = false;
        }
    }, 100);
}

function generateCalendarPDF() {
    // Create a new jsPDF instance
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    
    // Set document properties
    doc.setProperties({
        title: 'Academic Calendar 2025-2026 - Gordon Granger Institute',
        subject: 'Academic Calendar',
        author: 'Gordon Granger Institute',
        keywords: 'academic, calendar, school, education',
        creator: 'Gordon Granger Institute'
    });
    
    // Add header
    doc.setFontSize(22);
    doc.setTextColor(44, 62, 80);
    doc.text('Gordon Granger Institute', 105, 20, null, null, 'center');
    
    doc.setFontSize(16);
    doc.setTextColor(102, 126, 234);
    doc.text('Academic Calendar 2025-2026', 105, 30, null, null, 'center');
    
    doc.setFontSize(12);
    doc.setTextColor(127, 140, 141);
    doc.text('Important dates, events, and deadlines', 105, 38, null, null, 'center');
    
    // Add horizontal line
    doc.setDrawColor(221, 221, 221);
    doc.line(20, 45, 190, 45);
    
    // Add legend
    doc.setFontSize(10);
    doc.setTextColor(44, 62, 80);
    doc.text('Legend:', 20, 55);
    
    // Legend items
    doc.setFillColor(102, 126, 234);
    doc.rect(20, 60, 5, 5, 'F');
    doc.setTextColor(44, 62, 80);
    doc.text('Events', 28, 64);
    
    doc.setFillColor(255, 107, 107);
    doc.rect(50, 60, 5, 5, 'F');
    doc.text('Holidays', 58, 64);
    
    doc.setFillColor(78, 205, 196);
    doc.rect(85, 60, 5, 5, 'F');
    doc.text('Exams', 93, 64);
    
    doc.setFillColor(255, 217, 61);
    doc.rect(115, 60, 5, 5, 'F');
    doc.setTextColor(51, 51, 51);
    doc.text('Deadlines', 123, 64);
    
    // Add calendar months (simplified text version)
    let currentY = 75;
    
    // Group months by semester/quarter for better organization
    const monthsData = [
        { name: 'September 2025', events: [
            'Sep 2: First Day of School',
            'Sep 15: Placement Tests',
            'Sep 30: Course Selection Deadline'
        ]},
        { name: 'October 2025', events: [
            'Oct 13: Columbus Day (No School)',
            'Oct 20-24: Midterm Exams',
            'Oct 31: Halloween Spirit Day'
        ]},
        { name: 'November 2025', events: [
            'Nov 11: Veterans Day (No School)',
            'Nov 26-28: Thanksgiving Break',
            'Nov 15: College Application Workshop'
        ]},
        { name: 'December 2025', events: [
            'Dec 15-19: Final Exams',
            'Dec 22-Jan 5: Winter Break',
            'Dec 19: Holiday Concert'
        ]},
        { name: 'January 2026', events: [
            'Jan 1: New Year\'s Day (No School)',
            'Jan 19: MLK Day (No School)',
            'Jan 31: Q2 Grades Due'
        ]},
        { name: 'February 2026', events: [
            'Feb 16: Presidents\' Day (No School)',
            'Feb 23-27: Midterm Exams',
            'Feb 14: Valentine\'s Day Spirit Week'
        ]},
        { name: 'March 2026', events: [
            'Mar 17: St. Patrick\'s Day',
            'Mar 31: College Application Deadline',
            'Mar 9-13: Spring Break Makeup Classes'
        ]},
        { name: 'April 2026', events: [
            'Apr 13-17: Spring Break',
            'Apr 27-29: AP Exams',
            'Apr 1: April Fools\' Day'
        ]},
        { name: 'May 2026', events: [
            'May 11-22: Final Exams',
            'May 25: Memorial Day (No School)',
            'May 15: Senior Portraits Due'
        ]},
        { name: 'June 2026', events: [
            'Jun 11: Graduation Ceremony',
            'Jun 15: Last Day of School',
            'Jun 20: Summer Programs Begin'
        ]},
        { name: 'July 2026', events: [
            'Jul 4: Independence Day (No School)',
            'Jul 15: Teacher Professional Development',
            'Jul 28: New Student Orientation'
        ]},
        { name: 'August 2026', events: [
            'Aug 17: Faculty In-Service Day',
            'Aug 21: Supply List Distribution',
            'Aug 26: Open House'
        ]}
    ];
    
    // Add months to PDF
    monthsData.forEach((month, index) => {
        // Check if we need a new page
        if (currentY > 250) {
            doc.addPage();
            currentY = 20;
        }
        
        // Month header
        doc.setFontSize(14);
        doc.setTextColor(44, 62, 80);
        doc.text(month.name, 20, currentY);
        currentY += 8;
        
        // Events
        doc.setFontSize(10);
        month.events.forEach(event => {
            if (currentY > 270) {
                doc.addPage();
                currentY = 20;
            }
            doc.setTextColor(127, 140, 141);
            doc.text('• ' + event, 25, currentY);
            currentY += 6;
        });
        
        currentY += 5; // Space between months
    });
    
    // Add footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('Page ' + i + ' of ' + pageCount, 105, 290, null, null, 'center');
        doc.text('© 2025 Gordon Granger Institute. All rights reserved.', 105, 295, null, null, 'center');
    }
    
    // Save the PDF
    doc.save('gordon-granger-institute-calendar-2025-2026.pdf');
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