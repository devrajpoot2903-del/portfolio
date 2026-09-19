// ============================================================
// renderContent.js — Vanilla JS rendering engine
// Imports data arrays, generates HTML, injects into DOM,
// and wires the single global modal for cert/LOR images.
// Loaded as type="module" — executes after DOM is ready,
// before DOMContentLoaded listeners in plain scripts fire.
// ============================================================

import { experienceData, certificateData } from './data.js';

// ─── Accent color token maps ────────────────────────────────
const accentTokens = {
    emerald: {
        iconBg: 'bg-[#10241b]',
        iconText: 'text-emerald-400',
        badgeText: 'text-emerald-400',
        dot: 'bg-emerald-400',
        border: 'border-emerald-400/20',
        tag: 'text-emerald-400'
    },
    blue: {
        iconBg: 'bg-[#111827]',
        iconText: 'text-blue-400',
        badgeText: 'text-blue-400',
        dot: 'bg-blue-400',
        border: 'border-blue-400/20',
        tag: 'text-blue-400'
    },
    violet: {
        iconBg: 'bg-[#1a1030]',
        iconText: 'text-violet-400',
        badgeText: 'text-violet-400',
        dot: 'bg-violet-400',
        border: 'border-violet-400/20',
        tag: 'text-violet-400'
    }
};

// ─── SVG icon paths per accent ──────────────────────────────
const certIconSVG = {
    emerald: `<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" />`,
    blue: `<path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />`,
    violet: `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />`
};

// ─── Render Experience ───────────────────────────────────────
function renderExperience() {
    const container = document.getElementById('experience-container');
    if (!container) return;

    if (!experienceData || experienceData.length === 0) {
        container.innerHTML = '';
        return;
    }

    const html = experienceData.map(exp => {
        const bulletPoints = exp.description
            .map(point => `<li class="text-gray-400 text-[14px] leading-[1.8]">${point}</li>`)
            .join('');

        const lorButton = exp.lorImagePath
            ? `<button
                    class="cert-modal-trigger inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded border border-[#1f222e] text-gray-300 hover:text-white hover:border-white/30 text-[13px] font-semibold transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    data-image="${exp.lorImagePath}"
                    data-title="Letter of Recommendation — ${exp.company}"
                    aria-label="View Letter of Recommendation from ${exp.company}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                    </svg>
                    View LOR
                </button>`
            : '';

        return `
        <div class="relative pl-6 border-l border-[#2a2d3d]/50 ml-1.5 mt-2 pb-2">
            <!-- Timeline Dot -->
            <div class="absolute w-2.5 h-2.5 bg-accent rounded-full -left-[5.5px] top-1.5 shadow-[0_0_10px_rgba(130,149,255,0.4)]"></div>

            <!-- Meta -->
            <div class="mb-3 flex flex-wrap items-center gap-3">
                <span class="font-mono text-[10px] font-bold tracking-[0.2em] text-accent uppercase">${exp.duration}</span>
                <span class="font-mono text-[10px] font-bold tracking-[0.18em] text-gray-600 uppercase border border-[#1f222e] px-2 py-0.5 rounded-full">${exp.type}</span>
            </div>

            <h3 class="text-[19px] font-bold text-gray-100 mb-1">${exp.role}</h3>
            <p class="text-gray-300 text-[14px] mb-4">${exp.company}</p>

            <ul class="space-y-1.5 list-disc list-inside">
                ${bulletPoints}
            </ul>

            ${lorButton}
        </div>`;
    }).join('');

    container.innerHTML = html;
}

// ─── Render Certificates ─────────────────────────────────────
function renderCertificates() {
    const container = document.getElementById('certificates-container');
    if (!container) return;

    if (!certificateData || certificateData.length === 0) {
        container.innerHTML = '';
        return;
    }

    const html = certificateData.map(cert => {
        const tokens = accentTokens[cert.accentColor] || accentTokens.emerald;
        const iconPath = certIconSVG[cert.accentColor] || certIconSVG.emerald;

        return `
        <button
            class="cert-modal-trigger w-full text-left bg-[#0c0d11] p-6 rounded flex flex-col h-full border border-[#1f222e] hover:border-[#33384a] transition-colors group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            data-image="${cert.imagePath}"
            data-title="${cert.title} — ${cert.issuer}"
            aria-label="View certificate: ${cert.title}">

            <!-- Icon -->
            <div class="w-10 h-10 rounded ${tokens.iconBg} ${tokens.iconText} flex items-center justify-center mb-6 flex-shrink-0">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    ${iconPath}
                </svg>
            </div>

            <!-- Title & Issuer -->
            <div class="flex-1">
                <h3 class="text-[15px] font-bold text-white mb-2 tracking-wide leading-snug">${cert.title}</h3>
                <p class="text-[12px] text-gray-500 mb-4">${cert.issuer}</p>
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-between border-t border-[#1f222e] pt-4 mt-auto">
                <span class="font-mono text-[9px] font-bold tracking-widest ${tokens.badgeText} uppercase">${cert.date}</span>
                <span class="text-[11px] text-gray-400 font-semibold group-hover:text-white transition-colors flex items-center gap-1">
                    View
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                </span>
            </div>
        </button>`;
    }).join('');

    container.innerHTML = html;
}

// ─── Modal Logic ─────────────────────────────────────────────
function initModal() {
    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('cert-modal-img');
    const modalTitle = document.getElementById('cert-modal-title');
    const modalClose = document.getElementById('cert-modal-close');

    if (!modal || !modalImg || !modalClose) return;

    // Open modal via event delegation — catches dynamically rendered buttons
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.cert-modal-trigger');
        if (!trigger) return;

        const imagePath = trigger.dataset.image;
        const title = trigger.dataset.title || '';

        modalImg.src = imagePath;
        modalImg.alt = title;
        if (modalTitle) modalTitle.textContent = title;

        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.classList.add('opacity-100');
        document.body.style.overflow = 'hidden';
    });

    // Close on button click
    modalClose.addEventListener('click', closeModal);

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    function closeModal() {
        modal.classList.add('opacity-0', 'pointer-events-none');
        modal.classList.remove('opacity-100');
        document.body.style.overflow = '';
        // Clear src after transition to avoid flash on next open
        setTimeout(() => { modalImg.src = ''; }, 300);
    }
}

// ─── Boot ────────────────────────────────────────────────────
// Modules are deferred — DOM is ready at this point.
renderExperience();
renderCertificates();
initModal();
