import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link, Element, animateScroll as scroll } from 'react-scroll';
import Spline from '@splinetool/react-spline';


const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #0a0e2a;
    --secondary-color: #ffd700;
    --text-color: #ffffff;
    --card-bg: rgba(255, 255, 255, 0.1);
  }

  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    background-color: var(--primary-color);
    color: var(--text-color);
  }
  
  h1, h2, h3, p, button {
    z-index: 2; /* Set z-index to 2 for all h1, h2, h3, p, and button elements */
    position: relative; /* Ensure z-index works correctly */
  }
`;

const SplineWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1; 
`;



const Container = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  z-index: 2;
`;

const Button = styled.button`
  z-index: 2;
  background-color: ${props => props.secondary ? 'transparent' : 'var(--accent-color)'};
  color: var(--text-color);
  padding: 12px 24px;
  border: ${props => props.secondary ? '2px solid var(--accent-color)' : 'none'};
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  font-size: 16px; 

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(233, 69, 96, 0.2);
  }
`;


const BenefitCard = styled.div`
  z-index: 2; 
  background-color: var(--card-bg);
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-7px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .icon {
    font-size: 40px;
    margin-bottom: 20px;
  }
`;



const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--primary-color);
  z-index: 1000;
  transition: all 0.3s ease;

  ${props => props.sticky && `
    padding: 10px 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  `}
`;

const NavLinks = styled.nav`
  display: none;  // Hide all other nav links
  z-index: 2;
`;

const Logo = styled.div`
  z-index: 2;
  font-size: 24px;
  font-weight: bold;
  color: var(--text-color);
`;

const Section = styled.section`
  z-index: 2;
  padding: 100px 0;
`;

const Hero = styled.section`
  text-align: center;
  padding-top: 150px;
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
      z-index: 2;

    font-size: 48px;
    margin-bottom: 20px;
  }

  .subtitle {
    font-size: 24px;
    color: var(--accent-color);
    margin-bottom: 40px;
    z-index: 2;
  }
`;
const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  z-index: 2;
`;

const ProcessTimeline = styled.div`
  z-index: 2;
  position: relative;
  max-width: 800px;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background-color: var(--secondary-color);
  }
`;

const ProcessStep = styled.div`
  z-index: 2;
  position: relative;
  margin-bottom: 50px;
  padding-left: 60px;

  .step-number {
    position: absolute;
    left: 0;
    top: 0;
    width: 40px;
    height: 40px;
    background-color: var(--secondary-color);
    color: var(--primary-color);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }
`;

const Pricing = styled(Section)`
  z-index: 2;  
  background-color: var(--primary-color);
  color: var(--text-color);
  text-align: center;

  .pricing-grid {
    z-index: 2;
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
  }

  .pricing-card {
  z-index: 2;
    background-color: var(--card-bg);
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);  // Enhanced shadow for better feedback
  }

  h2 {
    z-index: 2;
    margin-bottom: 10px;
    font-size: 24px;
  }

  p {
    z-index: 2;
    font-size: 18px;
    margin-bottom: 20px;
  }

  .price {
    z-index: 2;
    font-size: 32px;
    font-weight: bold;
  }
  }
`;

const Reviews = styled(Section)`
  z-index: 2;
  background-color: var(--primary-color);
  color: var(--text-color);
  text-align: center;
  z-index: 2; 

  .review-card {
    z-index: 2;
    background-color: var(--card-bg);
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    max-width: 600px;
    margin: 0 auto 20px auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 2; 
  }

  .client-name {
    z-index: 2;
    font-size: 18px;
    font-weight: bold;
  }
`;

const FAQ = styled(Section)`
  z-index: 2;
  background-color: var(--primary-color);
  color: var(--text-color);
  text-align: center;

  .faq-item {
    z-index: 2;
    margin-bottom: 20px;
  }

  h3, h2 {
    z-index: 2;
    margin-bottom: 10px;
  }

  p {
    z-index: 2;  
    font-size: 16px;
  }
`;

const Contact = styled(Section)`
  z-index: 2;
  background-color: var(--primary-color);
  color: var(--text-color);
  text-align: center;

  form {
    z-index: 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    max-width: 800px;
    margin: 0 auto;

    input, textarea {
      z-index: 2;
      padding: 12px;
      border: none;
      border-radius: 5px;
      background-color: var(--card-bg);
      color: var(--text-color);
    }

    textarea {
      z-index: 2;
      grid-column: span 2;
      resize: none;
      height: 150px;
    }

    button {
      grid-column: span 2;
      background-color: var(--secondary-color);
      color: var(--primary-color);
      border: none;
      padding: 12px;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s ease;
      z-index: 2;

      &:hover {
        transform: translateY(-2px);
      }
    }
  }
`;

const Footer = styled.footer`
  z-index: 2;
  background-color: var(--primary-color);
  color: var(--text-color);
  text-align: center;
  padding: 20px 0;
  margin-top: 50px;
  z-index: 2; 

  p {
    z-index: 2;
    margin: 5px 0;
  }

  a {
    z-index: 2; 
    color: var(--secondary-color);
    text-decoration: none;
    margin: 0 10px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const PricingSection = () => (
  <Pricing>
    <Container>
      <h2>Simple Month-to-Month Pricing</h2>
      <div className="pricing-grid">
        {pricingData.map((plan, index) => (
          <div className="pricing-card" key={index}>
            <h3>{plan.title}</h3>
            <p className="price">{plan.price}</p>
            <p>{plan.description}</p>
            {/* Add Calendly button */}
            <a href="https://calendly.com/pablopedrosap/ai-prepared-consultation" target="_blank" rel="noopener noreferrer">
              <Button secondary style={{ marginTop: '20px' }}>Book a Consultation</Button>
            </a>
          </div>
        ))}
      </div>
    </Container>
  </Pricing>
);

const ReviewsSection = () => (
  <Reviews>
    <Container>
      <h2>From Our Clients</h2>
      {reviewsData.map((review, index) => (
        <div className="review-card" key={index}>
          <p>"{review.review}"</p>
          <p className="client-name">{review.name}</p>
          <p>{review.role}</p>
        </div>
      ))}
    </Container>
  </Reviews>
);

const FAQSection = () => (
  <FAQ>
    <Container>
      <h2>Frequently Asked Questions</h2>
      {faqData.map((faq, index) => (
        <div className="faq-item" key={index}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </Container>
  </FAQ>
);

const ContactSection = () => (
  <Contact>
    <Container>
      <h2>Still Have Questions?</h2>
      <form>
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Job Title/Role" />
        <input type="text" placeholder="Website" />
        <input type="text" placeholder="Number of employees" />
        <textarea placeholder="Message"></textarea>
        <button type="submit">Send</button>
      </form>
    </Container>
  </Contact>
);

const FooterSection = () => (
  <Footer>
    <Container>
      <p>&copy; 2024. All rights reserved.</p>
      <p>
        <Link to="terms">Terms & Conditions</Link> | <Link to="privacy">Privacy Policy</Link> | <Link to="careers">Careers</Link>
      </p>
    </Container>
  </Footer>
);

const pricingData = [
  { title: 'Consulting', price: '$247/h', description: 'Strategic roadmap development, dedicated project manager, etc.' },
  { title: 'Business', price: '$5400/mo', description: 'Custom AI agent development, private communication channel, etc.' },
  { title: 'Enterprise', price: 'Custom Pricing', description: 'Full stack development, ongoing support, multiple AI agents.' }
];

const reviewsData = [
  { name: 'Eugene Mann', role: 'Product Lead, Stripe', review: 'Partnering with Arsenii has been transformative for our team. His clear and timely communication, along with tailor-made AI solutions, keeps us at the cutting edge.' }
];

const faqData = [
  { question: 'How do I get started?', answer: 'Simply click the Get Started button and follow the instructions.' },
  { question: 'What is the pricing model?', answer: 'We offer flexible month-to-month pricing tailored to your needs.' }
];

const App = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Function to remove the Spline watermark
    const removeSplineWatermark = () => {
      const iframe = document.querySelector('iframe');
      if (iframe) {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const watermark = iframeDoc.querySelector('.logo');
        if (watermark) {
          watermark.style.display = 'none';
        }
      }
    };

    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.onload = removeSplineWatermark;
    }
    removeSplineWatermark();
    const interval = setInterval(removeSplineWatermark, 1000);
    setTimeout(() => clearInterval(interval), 5000);
  }, []);


  const benefitsData = [
    { icon: '⚡', title: 'Boost Efficiency', description: 'Outsource complex tasks in your business.' },
    { icon: '✅', title: 'Reduce Mistakes', description: 'Fine-tuned agents require minimal supervision.' },
    { icon: '🚀', title: 'Stay Ahead', description: 'Adapt quickly to new advancements in AI.' },
    { icon: '📈', title: 'Scale Seamlessly', description: 'Add more agents as needed without affecting overhead.' }
  ];

  const processSteps = [
    { title: 'AI Readiness Consultation', description: 'We start by understanding your vision and aligning our AI solutions with your business goals.' },
    { title: 'Transparent Progress Tracking', description: "Your dedicated customer portal allows for real-time progress tracking and feedback." },
    { title: 'Seamless Integration', description: "We'll embed your new AI agents into your business, ensuring they deliver real value from day one." },
    { title: 'Ongoing Support', description: "We'll keep adding more agents, refining and expanding their capabilities as your business grows." }
  ];

  return (
    <>
      <GlobalStyle />
      <SplineWrapper>
        <Spline
          scene="https://prod.spline.design/e8OHKRh01HGN4I1p/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </SplineWrapper>
      <Header sticky={isSticky}>
        <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Logo />
          <NavLinks>
            <Link to="hero" smooth={true} duration={500}>Home</Link>
            <Link to="benefits" smooth={true} duration={500}>Benefits</Link>
            <Link to="process" smooth={true} duration={500}>Process</Link>
            <Link to="pricing" smooth={true} duration={500}>Pricing</Link>
            <Link to="reviews" smooth={true} duration={500}>Reviews</Link>
            <Link to="faq" smooth={true} duration={500}>FAQ</Link>
            <Link to="contact" smooth={true} duration={500}>Contact</Link>
          </NavLinks>
          <Button onClick={() => scroll.scrollToTop()}>Get Started</Button>
        </Container>
      </Header>

      <Element name="hero">
          <Hero>
            <Container>
              <h1>Scale Your Business With AI Agent Teams</h1>
              <p className="subtitle">Expand your operations without raising overhead costs.</p>
              <Button onClick={() => scroll.scrollTo('contact', { smooth: true, duration: 500 })}>Get Started</Button>
              <Button secondary style={{ marginLeft: '10px' }} onClick={() => scroll.scrollTo('benefits', { smooth: true, duration: 500 })}>Learn More</Button>
            </Container>
          </Hero>
        </Element>

      <Element name="benefits">
        <Section>
          <Container>
            <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>Automate Roles, Not Just Tasks</h2>
            <BenefitsGrid>
              {benefitsData.map((benefit, index) => (
                <BenefitCard key={index}>
                  <div className="icon">{benefit.icon}</div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </BenefitCard>
              ))}
            </BenefitsGrid>
          </Container>
        </Section>
      </Element>

      <Element name="process">
        <Section>
          <Container>
            <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>How It Works: Our Process</h2>
            <ProcessTimeline>
              {processSteps.map((step, index) => (
                <ProcessStep key={index}>
                  <div className="step-number">{index + 1}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </ProcessStep>
              ))}
            </ProcessTimeline>
          </Container>
        </Section>
      </Element>

      <Element name="pricing">
        <PricingSection />
      </Element>

      <Element name="reviews">
        <ReviewsSection />
      </Element>

      <Element name="faq">
        <FAQSection />
      </Element>

      <Element name="contact">
        <ContactSection />
      </Element>

      <FooterSection />

    </>
  );
};

export default App;