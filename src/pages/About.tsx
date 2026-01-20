import React from 'react';
import './About.css';

const About: React.FC = () => {
    return (
        <div className="about-page container">
            <section className="about-hero">
                <h1>Our Story</h1>
                <p className="subtitle">Crafting excellence for the next generation.</p>
            </section>

            <section className="about-content">
                <div className="about-grid">
                    <div className="about-text">
                        <h2>The ORIXA Vision</h2>
                        <p>
                            Founded in 2026, ORIXA was born from a simple realization: young gentlemen deserve the same
                            quality, tailoring, and sophistication as their elders. We specialize in premium boys'
                            fashion that bridges the gap between playfulness and prestige.
                        </p>
                        <p>
                            Our designs are minimal, yet impactful. Every stitch in an ORIXA garment is a testament
                            to our commitment to luxury and durability. We don't just make clothes; we craft confidence.
                        </p>
                    </div>
                    <div className="about-image">
                        <div className="placeholder-img" style={{ background: '#f5f5f5', aspectRatio: '4/5' }}></div>
                    </div>
                </div>

                <div className="values-grid">
                    <div className="value-card">
                        <h3>Quality</h3>
                        <p>We use only the finest fabrics sourced from sustainable mills across the globe.</p>
                    </div>
                    <div className="value-card">
                        <h3>Tailoring</h3>
                        <p>Our patterns are designed specifically for the growing frames of young boys.</p>
                    </div>
                    <div className="value-card">
                        <h3>Legacy</h3>
                        <p>Garments built to be passed down, maintaining their elegance through generations.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
