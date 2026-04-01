// Modal Logic
const modalOverlay = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');

function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    // Build the modal contents dynamically
    let tagsHTML = data.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('');
    
    // Check external links
    let linksHTML = '';
    if (data.liveLink) {
        linksHTML += `<a href="${data.liveLink}" target="_blank" class="link-live"><i class="fa-solid fa-earth-americas"></i> Live Link</a>`;
    }
    if (data.githubLink) {
        linksHTML += `<a href="${data.githubLink}" target="_blank" class="link-github"><i class="fa-brands fa-github"></i> Repository</a>`;
    }

    if (!data.liveLink && !data.githubLink) {
        linksHTML = `<p style="color: #94A3B8; font-size: 0.9rem; font-style: italic;">No links provided yet.</p>`;
    }

    // Build screenshot gallery
    let galleryHTML = '';
    if (data.images && data.images.length > 0) {
        galleryHTML = data.images.map(img => `<img src="${img}" style="width: 100%; border-radius: 12px; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 10px 30px rgba(0,0,0,0.5);" alt="Screenshot">`).join('');
    } else {
        galleryHTML = `<div class="image-placeholder-box">
                <i class="fa-regular fa-image" style="font-size: 3rem;"></i>
                <p>Upload screenshots in f:/portfolio/ folder and link here.</p>
            </div>`;
    }

    modalBody.innerHTML = `
        <h2 class="modal-title">${data.title}</h2>
        <div class="modal-tags">${tagsHTML}</div>
        <p class="modal-desc">${data.description}</p>
        
        <div class="modal-links">
            ${linksHTML}
        </div>

        <div class="modal-gallery">
            <h3 style="margin-bottom: 1.5rem; font-family: 'JetBrains Mono', monospace; font-size: 1.2rem; color: #00F0FF; letter-spacing: 1px;"># Screenshots</h3>
            ${galleryHTML}
        </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal(eventOrForce) {
    if (eventOrForce === true || event.target.id === 'projectModal') {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore background scrolling
    }
}

// Ensure escape key also closes modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal(true);
    }
});

// Smooth scroll implementation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
