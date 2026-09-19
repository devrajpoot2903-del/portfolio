// ============================================================
// data.js — Centralized data layer for portfolio content
// To add/edit experience or certificates, only modify this file.
// ============================================================

export const experienceData = [
    {
        id: 1,
        role: "Front-end AI Engineering Intern",
        company: "FlyRank AI",
        duration: "July 2026 - September 2026",
        type: "Internship",
        description: [
            "Focused on Front-end AI Engineering, building interfaces for AI-driven organic growth tools.",
            "Worked closely with the Anthropic API and optimized AI prompts for real-world scaling."
        ],
        lorImagePath: "./assets/images/lor-internship.png"
    }
];

export const certificateData = [
    {
        id: 1,
        title: "FlyRank AI Internship — Front-end AI Engineering",
        issuer: "FlyRank AI",
        date: "Sep 2026",
        imagePath: "./assets/images/flyrank-cert.png",
        accentColor: "emerald"
    },
    {
        id: 2,
        title: "Claude 101",
        issuer: "Anthropic",
        date: "Aug 2026",
        imagePath: "./assets/images/anthropic-certs_claud101.png",
        accentColor: "violet"
    },
    {
        id: 3,
        title: "Claude Code 101",
        issuer: "Anthropic",
        date: "Aug 2026",
        imagePath: "./assets/images/anthropic-certs_claudcode101.png",
        accentColor: "violet"
    },
    {
        id: 4,
        title: "Building with the Claude API",
        issuer: "Anthropic",
        date: "Aug 2026",
        imagePath: "./assets/images/anthropic-certs_buildingwithclaudeapi.png",
        accentColor: "violet"
    },
    {
        id: 5,
        title: "Python for Data Science",
        issuer: "NPTEL",
        date: "Aug 2024",
        imagePath: "./assets/images/python-cert.png",
        accentColor: "blue"
    },
    {
        id: 6,
        title: "Programming In Java",
        issuer: "NPTEL",
        date: "Apr 2026",
        imagePath: "./assets/images/java-cert.png",
        accentColor: "emerald"
    }
];
