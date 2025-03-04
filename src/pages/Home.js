import React, { useState } from "react";
import "../CSS/Home.css";

const Home = () => {
  const [email, setEmail] = useState('');
  const [selectedPoll, setSelectedPoll] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    try {
      if (!email || !email.includes('@')) {
        throw new Error('Invalid email address');
      }
      console.log('Email submitted:', email);
      alert('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  };

  const handlePollSubmit = (e) => {
    e.preventDefault();
    if (!selectedPoll) {
      alert('Please select a beekeeping practice');
      return;
    }
    console.log('Poll vote:', selectedPoll);
    alert(`You voted for: ${selectedPoll}`);
  };

  return (
    <div className="home-container">
      {/* Welcome Section */}
      <section className="welcome-section">
        <h1>Welcome to BeeKeeping Platform</h1>
        <p>Promoting sustainable beekeeping through technology and innovation.</p>
      </section>

      {/* Grid Container */}
      <div className="section-container">
        {/* Project Overview */}
        <section className="section">
          <h2>Project Overview</h2>
          <p>Our platform enhances hive management through continuous monitoring and data-driven insights.</p>
        </section>

        {/* Mission and Vision */}
        <section className="section">
          <h2>Our Mission & Vision</h2>
          <p>Empowering beekeepers with sustainable solutions through technology and data analytics.</p>
        </section>

        {/* User Testimonials */}
        <section className="section">
          <h2>What Beekeepers Say</h2>
          <blockquote className="testimonial">"This platform transformed the way I manage my beehives!"</blockquote>
        </section>

        {/* Featured Resources */}
        <section className="section">
          <h2>Featured Resources</h2>
          <ul className="list">
            <li>Beginner's Guide to Beekeeping</li>
            <li>Hive Management Best Practices</li>
            <li>Advanced Predictive Analysis Tools</li>
          </ul>
        </section>

        {/* Latest News and Updates */}
        <section className="section">
          <h2>Latest News</h2>
          <p>Join our upcoming webinar on beekeeping innovations.</p>
        </section>

        {/* Visual Gallery */}
        <section className="section">
          <h2>Beekeeping in Action</h2>
          <div className="gallery">
            <img src="/assets/beehive1.jpg" alt="Healthy beehive with active bees" loading="lazy" />
            <img src="/assets/beekeeping2.jpg" alt="Beekeeper inspecting hive" loading="lazy" />
          </div>
        </section>
      </div>

      {/* Side-by-Side Sections */}
      <div className="side-by-side-container">
        <div className="row">
          {/* How to Get Started */}
          <section className="section half-width">
            <h2>How to Get Started</h2>
            <ul className="list">
              <li>Create an account</li>
              <li>Set up your hive monitoring dashboard</li>
              <li>Explore data-driven insights</li>
            </ul>
          </section>

          {/* Poll Section */}
          <section className="section half-width">
            <h2>Poll: Best Beekeeping Practice?</h2>
            <form onSubmit={handlePollSubmit} className="poll-form">
              <label>
                <input 
                  type="radio" 
                  checked={selectedPoll === 'organic'}
                  onChange={() => setSelectedPoll('organic')}
                  name="poll" 
                  value="organic" 
                /> Organic Beekeeping
              </label>
              <label>
                <input 
                  type="radio" 
                  checked={selectedPoll === 'monitoring'}
                  onChange={() => setSelectedPoll('monitoring')}
                  name="poll" 
                  value="monitoring" 
                /> Tech-Driven Monitoring
              </label>
              <button type="submit">Submit Vote</button>
            </form>
          </section>
        </div>
      </div>

      {/* Additional Information Sections */}
      <div className="additional-info-container">
        <div className="row">
          {/* Upcoming Events */}
          <section className="section half-width">
            <h2>Upcoming Events</h2>
            <p>Join our next webinar on sustainable beekeeping!</p>
            <a href="#" className="btn">View Events</a>
          </section>

          {/* Resource of the Month */}
          <section className="section half-width">
            <h2>Resource of the Month</h2>
            <p>Check out our exclusive guide on hive inspections.</p>
            <a href="#" className="btn">Explore Resource</a>
          </section>
        </div>

        <div className="row">
          {/* Newsletter Signup */}
          <section className="section half-width">
            <h2>Stay Updated</h2>
            <form onSubmit={handleEmailSubmit} className="newsletter-form">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </section>

          {/* FAQs */}
          <section className="section half-width">
            <h2>FAQs</h2>
            <p>Got questions? Find quick answers here.</p>
            <a href="#" className="btn">View FAQs</a>
          </section>
        </div>
      </div>

      {/* Footer Sections */}
<footer className="footer">
  <div className="footer-content">
    {/* Social Media Section */}
    <section className="social-media">
      <h2>Follow Us</h2>
      <div className="social-links">
        <a href="#" className="facebook">Facebook</a>
        <a href="#" className="twitter">Twitter</a>
        <a href="#" className="youtube">YouTube</a>
      </div>
    </section>
    
    {/* Contact Section */}
    <section className="contact-section">
      <h2>Need Help?</h2>
      <p>Email us at: support@beekeeping.com</p>
    </section>
  </div>
</footer>
    </div>
  );
};

export default Home;