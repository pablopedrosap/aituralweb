import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link, Element, animateScroll as scroll } from 'react-scroll';
import Spline from '@splinetool/react-spline';
import {FaTimes, FaChevronLeft, FaChevronRight, FaRocket, FaCheckCircle, FaChartLine, FaUsers, FaComments, FaHandshake, FaBuilding, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { FiActivity, FiCheckCircle, FiTrendingUp, FiUsers, FiMessageSquare, FiHeart, FiHome, FiAward, FiStar, FiLayers } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { RiRocketLine, RiCheckLine, RiBarChartLine, RiArrowDropDownLine, RiArrowDropUpLine, RiTeamLine, RiMessage2Line, RiHandHeartLine, RiBuildingLine, RiLeafLine } from 'react-icons/ri';


const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

  :root {
    --primary-color: #0a0e2a;
    --secondary-color: #ffd700;
    // --secondary-color: #50c878;
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

  h1, h2, h3, p, button, .icon {
    z-index: 2;
    position: relative;
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

const Logo = styled.div`
  left: 100px;
  z-index: 2;
  font-size: 24px;
  font-weight: bold;
  color: var(--text-color);
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }
`;

const BenefitCard = styled(motion.div)`
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
    color: var(--secondary-color);
  }
`;

const ProcessTimeline = styled.div`
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

const ProcessStep = styled(motion.div)`
  position: relative;
  margin-bottom: 50px;
  max-width: 45%;  // Limit the width of each step to 45% of the container
  word-wrap: break-word;

  &:nth-child(odd) {
    padding-left: 60px;
    margin-right: auto;  // Align odd steps to the left
    text-align: left;
  }

  &:nth-child(even) {
    padding-right: 60px;
    margin-left: auto;  // Align even steps to the right
    text-align: right;
  }

  .step-number {
    position: absolute;
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

  &:nth-child(odd) .step-number {
    left: -20px;  // Position the step number to the left for odd steps
  }

  &:nth-child(even) .step-number {
    right: -20px;  // Position the step number to the right for even steps
  }
`;



const PricingCard = styled.div`
  z-index: 2;
  background-color: var(--card-bg);
  padding: 30px;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  h3 {
    margin-bottom: 20px;
    font-size: 24px;
  }

  .price {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .icon {
    font-size: 48px;
    color: var(--secondary-color);
    margin-bottom: 20px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin-bottom: 20px;

    li {
      margin-bottom: 10px;
      display: flex;
      align-items: center;

      svg {
        margin-right: 10px;
        color: var(--secondary-color);
      }
    }
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

  .highlight {
    color: var(--secondary-color);
  }
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
`;

const Reviews = styled(motion.section)`
  z-index: 2;
  background-color: transparent;
  color: var(--text-color);
  text-align: center;
  position: relative;
  padding: 50px 0;

  .review-container {
    max-width: 600px;
    margin: 0 auto;
    position: relative;
  }

  .review-card {
    z-index: 2;
    background-color: var(--card-bg);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .client-name {
    font-size: 18px;
    font-weight: bold;
    margin-top: 20px;
  }

  .client-role {
    font-size: 14px;
    opacity: 0.8;
  }

  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px;
    background: none;
    border: none;
    color: var(--text-color);
    cursor: pointer;
    z-index: 3;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.7;
    }

    &.left {
      left: -40px;
    }

    &.right {
      right: -40px;
    }
  }
`;


const FAQ = styled(Section)`

background-color: var(--primary-color);
  color: var(--text-color);
  text-align: center;

  .faq-item {
    margin-bottom: 20px;
  }

  h3, h2 {
    margin-bottom: 10px;
  }

  p {
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


const ReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextReview = () => {
    setDirection(1); // Set direction to 1 for right movement
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviewsData.length);
  };

  const prevReview = () => {
    setDirection(-1); // Set direction to -1 for left movement
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviewsData.length) % reviewsData.length);
  };

  return (
    <Reviews
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>From Our Clients</h2>
      <div className="review-container">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            className="review-card"
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
            transition={{ duration: 0.3 }}
          >
            <p>"{reviewsData[currentIndex].review}"</p>
            <p className="client-name">{reviewsData[currentIndex].name}</p>
            <p className="client-role">{reviewsData[currentIndex].role}</p>
          </motion.div>
        </AnimatePresence>
        <button className="arrow left" onClick={prevReview}><FaChevronLeft /></button>
        <button className="arrow right" onClick={nextReview}><FaChevronRight /></button>
      </div>
    </Reviews>
  );
};


const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <FAQ>
      <Container>
        <h2>Frequently Asked Questions</h2>
        {faqData.map((faq, index) => (
          <FAQItem
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <FAQQuestion onClick={() => toggleFAQ(index)}>
              {faq.question}
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.1 }}
              >
                {openIndex === index ? <RiArrowDropUpLine size={24} /> : <RiArrowDropDownLine size={24} />}
              </motion.div>
            </FAQQuestion>
            <AnimatePresence>
              {openIndex === index && (
                <FAQAnswer
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </FAQAnswer>
              )}
            </AnimatePresence>
          </FAQItem>
        ))}
      </Container>
    </FAQ>
  );
};



const FAQItem = styled(motion.div)`
  position: relative;
  z-index: 200;
  background-color: var(--card-bg);
  color: var(--text-color);
  margin-bottom: 16px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3) !important;
  width: 50%;
  margin: 0 auto;
  text-align: left;
`;

const FAQQuestion = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
`;

const FAQAnswer = styled(motion.div)`
  position: relative;
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.05);
  font-size: 14px;
  line-height: 1.4;
  text-align: left;
`;

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

const reviewsData = [
  { name: 'Eugene Mann', role: 'Product Lead, Stripe', review: 'Partnering with Pablo and Aitural has been transformative for our team. His clear and timely communication, along with tailor-made AI solutions, keeps us at the cutting edge.' },
  { name: 'Sarah Johnson', role: 'CTO, TechInnovate', review: 'Aitural\'s AI agent teams have revolutionized our workflow. The efficiency gains are remarkable, and the support is top-notch.' },
  { name: 'Michael Chen', role: 'Operations Manager, GlobalCorp', review: 'Implementing Aitural\'s AI solutions was seamless. Our productivity has soared, and we\'re now able to tackle projects we never thought possible.' },
  { name: 'Emma Rodriguez', role: 'Head of AI, FutureTech', review: 'The expertise at Aitural is unparalleled. They don\'t just provide AI agents; they offer strategic insights that have helped us stay ahead in a competitive market.' }
];

const faqData = [
  { question: 'Who is this service ideally for?', answer: 'Our AI agent teams are ideal for businesses looking to scale operations efficiently.' },
  { question: 'Why wouldn\'t I just develop AI solutions in-house?', answer: 'Developing AI in-house can be costly and time-consuming. Our solution offers expertise and quick implementation.' },
  { question: 'Is there a limit to how many agents I can request?', answer: 'We offer flexible solutions based on your needs. Contact us for custom configurations.' },
  { question: 'What if I don\'t know what AI agents I need?', answer: 'Our team can help assess your needs and recommend the best AI solutions for your business.' },
  { question: 'How long does it take to deliver my agents?', answer: 'Delivery time varies based on complexity, but we strive for quick turnarounds.' },
  { question: 'What technology stack do you use?', answer: 'We use cutting-edge AI technologies, tailored to each client\'s specific needs.' },
  { question: 'Do you support Open Source models?', answer: 'Yes, we work with both proprietary and open-source models based on project requirements.' },
  { question: 'What if my agents are underperforming?', answer: 'We offer ongoing support and optimization to ensure your agents meet performance expectations.' },
  { question: 'What if I only have a single request?', answer: 'We offer consultation services for single requests or smaller projects.' },
  { question: 'What services are included in the subscription?', answer: 'Our subscriptions include agent development, integration, ongoing support, and optimization.' },
  { question: 'Is there any development work you don\'t cover?', answer: 'We cover most AI-related development, but some specialized tasks may require additional consultation.' },
  { question: 'Who will own the codebase and IP rights?', answer: 'Typically, clients own the codebase and IP rights for custom-developed solutions.' },
  { question: 'What kind of support do you offer?', answer: 'We offer comprehensive support, including technical assistance, performance optimization, and strategic guidance.' }
];


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  color: black !important;
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  z-index: 1001;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

const App = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [showTerms, setShowTerms] = useState(false); // Add this state
  const [showPrivacy, setShowPrivacy] = useState(false); // Add this state


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
    { icon: <FiActivity />, title: 'Accelerate Growth', description: 'Leverage AI to streamline operations and drive rapid business expansion.' },
    { icon: <FiCheckCircle />, title: 'Enhance Accuracy', description: 'Minimize errors with precisely calibrated AI agents requiring minimal oversight.' },
    { icon: <FiTrendingUp />, title: 'Maintain Competitive Edge', description: 'Stay ahead of the curve by swiftly integrating cutting-edge AI advancements.' },
    { icon: <FiUsers />, title: 'Effortless Scaling', description: 'Expand your AI workforce seamlessly without increasing overhead costs.' }
  ];

  const processSteps = [
    { title: 'AI Readiness Assessment', description: 'We begin with a comprehensive evaluation of your business goals and current AI capabilities.' },
    { title: 'Custom Solution Design', description: 'Our experts craft a bespoke AI strategy tailored to your unique business needs.' },
    { title: 'Seamless Integration', description: 'We implement your new AI agents, ensuring smooth incorporation into your existing workflows.' },
    { title: 'Continuous Optimization', description: 'Our team provides ongoing support, refining and expanding your AI capabilities as your business evolves.' }
  ];

  const pricingData = [
    { 
      title: 'Consulting', 
      price: '$247/h', 
      icon: <RiMessage2Line />,
      features: [
        'Strategic roadmap development',
        'AI readiness assessment',
        'Custom solution recommendations',
        'ROI projections'
      ],
      calendlyLink: 'https://calendly.com/your-consulting-link'
    },
    { 
      title: 'Business', 
      price: '$5400/mo', 
      icon: <RiHandHeartLine />,
      features: [
        'Custom AI agent development',
        'Dedicated project manager',
        'Private communication channel',
        'Full stack implementation'
      ],
      calendlyLink: 'https://calendly.com/your-business-link'
    },
    { 
      title: 'Enterprise', 
      price: 'Custom Pricing', 
      icon: <RiBuildingLine />,
      features: [
        'Multiple AI agent development',
        'End-to-end solution architecture',
        '24/7 priority support',
        'Customized scaling strategies'
      ],
      calendlyLink: 'https://calendly.com/your-enterprise-link'
    }
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
          <Logo>
            <RiLeafLine /> AITURAL
          </Logo>
          <NavLinks>
            <Link to="hero" smooth={true} duration={500}>Home</Link>
            <Link to="benefits" smooth={true} duration={500}>Benefits</Link>
            <Link to="process" smooth={true} duration={500}>Process</Link>
            <Link to="pricing" smooth={true} duration={500}>Pricing</Link>
            <Link to="reviews" smooth={true} duration={500}>Reviews</Link>
            <Link to="faq" smooth={true} duration={500}>FAQ</Link>
            <Link to="contact" smooth={true} duration={500}>Contact</Link>
          </NavLinks>
          <Button onClick={() => scroll.scrollTo('pricing', { smooth: true, duration: 500 })}>Get Started</Button>
        </Container>
      </Header>

      <Element name="hero">
        <Hero>
          <Container>
            <h1>Scale Your Business With <span className="highlight">AI Agent Teams</span></h1>
            <p className="subtitle">Expand your operations without raising overhead costs.</p>
            <Button onClick={() => scroll.scrollTo('pricing', { smooth: true, duration: 500 })}>Get Started</Button>
            <Button secondary style={{ marginLeft: '10px' }} onClick={() => scroll.scrollTo('faq', { smooth: true, duration: 500 })}>Learn More</Button>
          </Container>
        </Hero>
      </Element>

      <Element name="benefits">
        <Section>
          <Container>
            <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>Empower Your Business with AI</h2>
            <BenefitsGrid>
              {benefitsData.map((benefit, index) => (
                <BenefitCard
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
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
            <h2 style={{ textAlign: 'center', marginBottom: '50px', flexWrap: 'wrap' }}>Our AI Integration Process</h2>
            <ProcessTimeline>
              {processSteps.map((step, index) => (
                <ProcessStep
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="step-number"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    {index + 1}
                  </motion.div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </ProcessStep>
              ))}
            </ProcessTimeline>
          </Container>
        </Section>
      </Element>

      <Element name="pricing">
        <Section>
          <Container>
            <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>Flexible Pricing Solutions</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
              {pricingData.map((plan, index) => (
                <PricingCard key={index}>
                  <div className="icon">{plan.icon}</div>
                  <h3>{plan.title}</h3>
                  <p className="price">{plan.price}</p>
                  <ul>
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex}><FaCheckCircle /> {feature}</li>
                    ))}
                  </ul>
                  <Button secondary>Get Started</Button>
                </PricingCard>
              ))}
            </div>
          </Container>
        </Section>
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

      {/* Terms and Conditions Modal */}
      <Modal show={showTerms} onClose={() => setShowTerms(false)}>
        <h1><strong>TERMS OF SERVICE</strong></h1>
<p><strong>Last updated [Date]</strong></p>
<h2>AGREEMENT TO OUR LEGAL TERMS</h2>
<p>We are&nbsp;<strong>Aitural</strong>&nbsp;("Company," "we," "us," "our"), operating out of Madrid, Spain. These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you"), and Aitural, concerning your access to and use of our website, as well as any other related products and services that refer or link to these Legal Terms (collectively, the "Services").</p>
<p>By accessing the Services, you agree to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.</p>
<p>We reserve the right to make changes or modifications to these Legal Terms at any time and for any reason. We will alert you about any changes by updating the "Last updated" date of these Legal Terms, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Legal Terms to stay informed of updates. Your continued use of the Services after the date such revised Legal Terms are posted will constitute your acceptance of the changes.</p>
<p>The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services.</p>
<p>We recommend that you print a copy of these Legal Terms for your records.</p>
<h2>TABLE OF CONTENTS</h2>
<ol>
<li>OUR SERVICES</li>
<li>INTELLECTUAL PROPERTY RIGHTS</li>
<li>USER REPRESENTATIONS</li>
<li>PURCHASES AND PAYMENT</li>
<li>SUBSCRIPTIONS</li>
<li>REFUND POLICY</li>
<li>PROHIBITED ACTIVITIES</li>
<li>USER GENERATED CONTRIBUTIONS</li>
<li>CONTRIBUTION LICENSE</li>
<li>THIRD-PARTY WEBSITES AND CONTENT</li>
<li>SERVICES MANAGEMENT</li>
<li>PRIVACY POLICY</li>
<li>TERM AND TERMINATION</li>
<li>MODIFICATIONS AND INTERRUPTIONS</li>
<li>GOVERNING LAW</li>
<li>DISPUTE RESOLUTION</li>
<li>CORRECTIONS</li>
<li>DISCLAIMER</li>
<li>LIMITATIONS OF LIABILITY</li>
<li>INDEMNIFICATION</li>
<li>USER DATA</li>
<li>ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</li>
<li>CALIFORNIA USERS AND RESIDENTS</li>
<li>MISCELLANEOUS</li>
<li>CONTACT US</li>
</ol>
<h2>1. OUR SERVICES</h2>
<p>The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.</p>
<p>The Services are not tailored to comply with industry-specific regulations (e.g., Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use the Services. You may not use the Services in a way that would violate the Gramm-Leach-Bliley Act (GLBA).</p>
<h2>2. INTELLECTUAL PROPERTY RIGHTS</h2>
<h3>Our intellectual property</h3>
<p>We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the "Content"), as well as the trademarks, service marks, and logos contained therein (the "Marks").</p>
<p>Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in Spain and around the world.</p>
<p>The Content and Marks are provided in or through the Services "AS IS" for your personal, non-commercial use or internal business purpose only.</p>
<h3>Your use of our Services</h3>
<p>Subject to your compliance with these Legal Terms, including the "PROHIBITED ACTIVITIES" section below, we grant you a non-exclusive, non-transferable, revocable license to:</p>
<ul>
<li>access the Services; and</li>
<li>download or print a copy of any portion of the Content to which you have properly gained access solely for your personal, non-commercial use or internal business purpose.</li>
</ul>
<p>Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.</p>
<p>If you wish to make any use of the Services, Content, or Marks other than as set out in this section or elsewhere in our Legal Terms, please address your request to:&nbsp;<strong>[<a rel="noopener">your-email@example.com</a>]</strong>. If we ever grant you the permission to post, reproduce, or publicly display any part of our Services or Content, you must identify us as the owners or licensors of the Services, Content, or Marks and ensure that any copyright or proprietary notice appears or is visible on posting, reproducing, or displaying our Content.</p>
<p>We reserve all rights not expressly granted to you in and to the Services, Content, and Marks.</p>
<p>Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms and your right to use our Services will terminate immediately.</p>
<h3>Your submissions</h3>
<p>By directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services ("Submissions"), you agree to assign to us all intellectual property rights in such Submission. You agree that we shall own this Submission and be entitled to its unrestricted use and dissemination for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.</p>
<p>You are responsible for what you post or upload: By sending us Submissions through any part of the Services you:</p>
<ul>
<li>confirm that you have read and agree with our "PROHIBITED ACTIVITIES" and will not post, send, publish, upload, or transmit through the Services any Submission that is illegal, harassing, hateful, harmful, defamatory, obscene, bullying, abusive, discriminatory, threatening to any person or group, sexually explicit, false, inaccurate, deceitful, or misleading;</li>
<li>to the extent permissible by applicable law, waive any and all moral rights to any such Submission;</li>
<li>warrant that any such Submission is original to you or that you have the necessary rights and licenses to submit such Submissions and that you have full authority to grant us the above-mentioned rights in relation to your Submissions; and</li>
<li>warrant and represent that your Submissions do not constitute confidential information.</li>
</ul>
<p>You are solely responsible for your Submissions and you expressly agree to reimburse us for any and all losses that we may suffer because of your breach of (a) this section, (b) any third party&rsquo;s intellectual property rights, or (c) applicable law.</p>
<h2>3. USER REPRESENTATIONS</h2>
<p>By using the Services, you represent and warrant that:</p>
<ol>
<li>you have the legal capacity and you agree to comply with these Legal Terms;</li>
<li>you are not a minor in the jurisdiction in which you reside;</li>
<li>you will not access the Services through automated or non-human means, whether through a bot, script or otherwise;</li>
<li>you will not use the Services for any illegal or unauthorized purpose; and</li>
<li>your use of the Services will not violate any applicable law or regulation.</li>
</ol>
<p>If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).</p>
<h2>4. PURCHASES AND PAYMENT</h2>
<h3>Accepted Payment Methods</h3>
<p>We accept the following forms of payment:</p>
<ul>
<li>Visa</li>
<li>Mastercard</li>
<li>Discover</li>
<li>American Express</li>
</ul>
<p>You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed. Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in [currency, e.g., EUR].</p>
<p>You agree to pay all charges at the prices then in effect for your purchases and any applicable shipping fees, and you authorize us to charge your chosen payment provider for any such amounts upon placing your order. We reserve the right to correct any errors or mistakes in pricing, even if we have already requested or received payment.</p>
<p>We reserve the right to refuse any order placed through the Services. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. These restrictions may include orders placed by or under the same customer account, the same payment method, and/or orders that use the same billing or shipping address. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers, or distributors.</p>
<h2>5. SUBSCRIPTIONS</h2>
<h3>Billing and Renewal</h3>
<p>Your subscription will continue and automatically renew unless canceled. You consent to our charging your payment method on a recurring basis without requiring your prior approval for each recurring charge, until such time as you cancel the applicable order. The length of your billing cycle will depend on the type of subscription plan you choose when you subscribed to the Services.</p>
<h3>Fee Changes</h3>
<p>We may, from time to time, make changes to the subscription fee and will communicate any price changes to you in accordance with applicable law.</p>
<h2>6. REFUND POLICY</h2>
<p>All sales are final, and no refund will be issued unless otherwise stated. If a refund is issued, it will be at our sole discretion and will be returned using the same method of payment that was used to make the purchase.</p>
<h2>7. PROHIBITED ACTIVITIES</h2>
<p>You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>
<p>As a user of the Services, you agree not to:</p>
<ul>
<li>Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
<li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
<li>Circumvent, disable, or otherwise interfere with security-related features of the Services, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Services and/or the Content contained therein.</li>
<li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.</li>
<li>Use any information obtained from the Services in order to harass, abuse, or harm another person.</li>
<li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
<li>Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
<li>Engage in unauthorized framing of or linking to the Services.</li>
<li>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party&rsquo;s uninterrupted use and enjoyment of the Services or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Services.</li>
<li>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
<li>Delete the copyright or other proprietary rights notice from any Content.</li>
<li>Attempt to impersonate another user or person or use the username of another user.</li>
<li>Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats ("gifs"), 1&times;1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as "spyware" or "passive collection mechanisms" or "pcms").</li>
<li>Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services.</li>
<li>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you.</li>
<li>Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, or any portion of the Services.</li>
<li>Copy or adapt the Services' software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.</li>
<li>Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Services.</li>
<li>Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Services, or use or launch any unauthorized script or other software.</li>
<li>Use a buying agent or purchasing agent to make purchases on the Services.</li>
<li>Make any unauthorized use of the Services, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.</li>
<li>Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for any revenue-generating endeavor or commercial enterprise.</li>
</ul>
<h2>8. USER GENERATED CONTRIBUTIONS</h2>
<p>The Services do not offer users the ability to submit or post content. We may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Services, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions"). Contributions may be viewable by other users of the Services and through third-party websites. When you create or make available any Contributions, you thereby represent and warrant that:</p>
<ul>
<li>The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.</li>
<li>You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the Services, and other users of the Services to use your Contributions in any manner contemplated by the Services and these Legal Terms.</li>
<li>You have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness of each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the Services and these Legal Terms.</li>
<li>Your Contributions are not false, inaccurate, or misleading.</li>
<li>Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.</li>
<li>Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable (as determined by us).</li>
<li>Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.</li>
<li>Your Contributions are not used to harass or threaten (in the legal sense of those terms) any other person and to promote violence against a specific person or class of people.</li>
<li>Your Contributions do not violate any applicable law, regulation, or rule.</li>
<li>Your Contributions do not violate the privacy or publicity rights of any third party.</li>
<li>Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to protect the health or well-being of minors.</li>
<li>Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.</li>
<li>Your Contributions do not otherwise violate, or link to material that violates, any provision of these Legal Terms, or any applicable law or regulation.</li>
</ul>
<p>Any use of the Services in violation of the foregoing violates these Legal Terms and may result in, among other things, termination or suspension of your rights to use the Services.</p>
<h2>9. CONTRIBUTION LICENSE</h2>
<p>You and Services agree that we may access, store, process, and use any information and personal data that you provide and your choices (including settings).</p>
<p>By submitting suggestions or other feedback regarding the Services, you agree that we can use and share such feedback for any purpose without compensation to you.</p>
<p>We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area on the Services. You are solely responsible for your Contributions to the Services and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions.</p>
<h2>10. THIRD-PARTY WEBSITES AND CONTENT</h2>
<p>The Services may contain (or you may be sent via the Services) links to other websites ("Third-Party Websites") as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties ("Third-Party Content"). Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through the Services or any Third-Party Content posted on, available through, or installed from the Services, including the content, accuracy, offensiveness, opinions, reliability, privacy practices, or other policies of or contained in the Third-Party Websites or the Third-Party Content. Inclusion of, linking to, or permitting the use or installation of any Third-Party Websites or any Third-Party Content does not imply approval or endorsement thereof by us. If you decide to leave the Services and access the Third-Party Websites or to use or install any Third-Party Content, you do so at your own risk, and you should be aware these Legal Terms no longer govern. You should review the applicable terms and policies, including privacy and data gathering practices, of any website to which you navigate from the Services or relating to any applications you use or install from the Services. Any purchases you make through Third-Party Websites will be through other websites and from other companies, and we take no responsibility whatsoever in relation to such purchases which are exclusively between you and the applicable third party. You agree and acknowledge that we do not endorse the products or services offered on Third-Party Websites and you shall hold us blameless from any harm caused by your purchase of such products or services. Additionally, you shall hold us blameless from any losses sustained by you or harm caused to you relating to or resulting in any way from any Third-Party Content or any contact with Third-Party Websites.</p>
<h2>11. SERVICES MANAGEMENT</h2>
<p>We reserve the right, but not the obligation, to:</p>
<ol>
<li>monitor the Services for violations of these Legal Terms;</li>
<li>take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms, including without limitation, reporting such user to law enforcement authorities;</li>
<li>in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof;</li>
<li>in our sole discretion and without limitation, notice, or liability, to remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and</li>
<li>otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.</li>
</ol>
<h2>12. PRIVACY POLICY</h2>
<p>We care about data privacy and security. By using the Services, you agree to be bound by our Privacy Policy posted on the Services, which is incorporated into these Legal Terms. Please be advised the Services are hosted in Spain. If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in Spain, then through your continued use of the Services, you are transferring your data to Spain, and you expressly consent to have your data transferred to and processed in Spain.</p>
<h2>13. TERM AND TERMINATION</h2>
<p>These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES OR DELETE ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.</p>
<p>If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.</p>
<h2>14. MODIFICATIONS AND INTERRUPTIONS</h2>
<p>We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Services.</p>
<p>We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Services at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Services during any downtime or discontinuance of the Services. Nothing in these Legal Terms will be construed to obligate us to maintain and support the Services or to supply any corrections, updates, or releases in connection therewith.</p>
<h2>15. GOVERNING LAW</h2>
<p>These Legal Terms shall be governed by and defined following the laws of Spain. Aitural and yourself irrevocably consent that the courts of Madrid, Spain, shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Legal Terms.</p>
<h2>16. DISPUTE RESOLUTION</h2>
<h3>Informal Negotiations</h3>
<p>To expedite resolution and control the cost of any dispute, controversy, or claim related to these Legal Terms (each a "Dispute" and collectively, the "Disputes") brought by either you or us (individually, a "Party" and collectively, the "Parties"), the Parties agree to first attempt to negotiate any Dispute (except those Disputes expressly provided below) informally for at least thirty (30) days before initiating arbitration. Such informal negotiations commence upon written notice from one Party to the other Party.</p>
<h3>Binding Arbitration</h3>
<p>If the Parties are unable to resolve a Dispute through informal negotiations, the Dispute (except those Disputes expressly excluded below) will be finally and exclusively resolved by binding arbitration. YOU UNDERSTAND THAT WITHOUT THIS PROVISION, YOU WOULD HAVE THE RIGHT TO SUE IN COURT AND HAVE A JURY TRIAL. The arbitration shall be commenced and conducted under the Commercial Arbitration Rules of the Spanish Arbitration Association ("SAA") and, where appropriate, the SAA&rsquo;s Supplementary Procedures for Consumer Related Disputes ("SAA Consumer Rules"), both of which are available at the SAA website&nbsp;<a href="http://www.adr.org/" rel="noopener" target="_new">www.adr.org</a>. Your arbitration fees and your share of arbitrator compensation shall be governed by the SAA Consumer Rules and, where appropriate, limited by the SAA Consumer Rules. The arbitration may be conducted in person, through the submission of documents, by phone, or online. The arbitrator will make a decision in writing, but need not provide a statement of reasons unless requested by either Party. The arbitrator must follow applicable law, and any award may be challenged if the arbitrator fails to do so. Except where otherwise required by the applicable SAA rules or applicable law, the arbitration will take place in Madrid, Spain. Except as otherwise provided herein, the Parties may litigate in court to compel arbitration, stay proceedings pending arbitration, or to confirm, modify, vacate, or enter judgment on the award entered by the arbitrator.</p>
<p>If for any reason, a Dispute proceeds in court rather than arbitration, the Dispute shall be commenced or prosecuted in the state and federal courts located in Madrid, Spain, and the Parties hereby consent to, and waive all defenses of lack of personal jurisdiction, and forum non-conveniens with respect to venue and jurisdiction in such state and federal courts. Application of the United Nations Convention on Contracts for the International Sale of Goods and the Uniform Computer Information Transaction Act (UCITA) is excluded from these Legal Terms.</p>
<p>In no event shall any Dispute brought by either Party related in any way to the Services be commenced more than one (1) year after the cause of action arose. If this provision is found to be illegal or unenforceable, then neither Party will elect to arbitrate any Dispute falling within that portion of this provision found to be illegal or unenforceable, and such Dispute shall be decided by a court of competent jurisdiction within the courts listed for jurisdiction above, and the Parties agree to submit to the personal jurisdiction of that court.</p>
<h3>Restrictions</h3>
<p>The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. To the full extent permitted by law, (a) no arbitration shall be joined with any other proceeding; (b) there is no right or authority for any Dispute to be arbitrated on a class-action basis or to utilize class action procedures; and (c) there is no right or authority for any Dispute to be brought in a purported representative capacity on behalf of the general public or any other persons.</p>
<h3>Exceptions to Informal Negotiations and Arbitration</h3>
<p>The Parties agree that the following Disputes are not subject to the above provisions concerning informal negotiations and binding arbitration: (a) any Disputes seeking to enforce or protect, or concerning the validity of, any of the intellectual property rights of a Party; (b) any Dispute related to, or arising from, allegations of theft, piracy, invasion of privacy, or unauthorized use; and (c) any claim for injunctive relief. If this provision is found to be illegal or unenforceable, then neither Party will elect to arbitrate any Dispute falling within that portion of this provision found to be illegal or unenforceable and such Dispute shall be decided by a court of competent jurisdiction within the courts listed for jurisdiction above, and the Parties agree to submit to the personal jurisdiction of that court.</p>
<h2>17. CORRECTIONS</h2>
<p>There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.</p>
<h2>18. DISCLAIMER</h2>
<p>THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES' CONTENT OR THE CONTENT OF ANY WEBSITES LINKED TO THE SERVICES AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICES, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SERVICES, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.</p>
<h2>19. LIMITATIONS OF LIABILITY</h2>
<p>IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE ONE (1) MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING. CERTAIN EU STATE LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.</p>
<h2>20. INDEMNIFICATION</h2>
<p>You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys&rsquo; fees and expenses, made by any third party due to or arising out of:</p>
<ol>
<li>use of the Services;</li>
<li>breach of these Legal Terms;</li>
<li>any breach of your representations and warranties set forth in these Legal Terms;</li>
<li>your violation of the rights of a third party, including but not limited to intellectual property rights; or</li>
<li>any overt harmful act toward any other user of the Services with whom you connected via the Services.</li>
</ol>
<p>Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.</p>
<h2>21. USER DATA</h2>
<p>We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.</p>
<h2>22. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</h2>
<p>Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Services, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES. You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means.</p>
<h2>23. CALIFORNIA USERS AND RESIDENTS</h2>
<p>If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.</p>
<h2>24. MISCELLANEOUS</h2>
<p>These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision. These Legal Terms operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Legal Terms and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment, or agency relationship created between you and us as a result of these Legal Terms or use of the Services. You agree that these Legal Terms will not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have based on the electronic form of these Legal Terms and the lack of signing by the parties hereto to execute these Legal Terms.</p>
<h2>25. CONTACT US</h2>
<p>In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:</p>
<p><strong>Aitural</strong>&nbsp;[Your Full Address, Madrid, Spain]&nbsp;<strong>Email</strong>: [<a rel="noopener">your-email@example.com</a>]</p>
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal show={showPrivacy} onClose={() => setShowPrivacy(false)}>
      <h1>PRIVACY POLICY</h1>
<p><strong>Last updated January 14, 2024</strong></p>
<p>This privacy notice for&nbsp;<strong>Aitural</strong>&nbsp;("we," "us," or "our"), describes how and why we might collect, store, use, and/or share ("process") your information when you use our services ("Services"), such as when you:</p>
<ul>
<li>Visit our website at&nbsp;<a href="https://aitural.com/" rel="noopener" target="_new">https://aitural.com</a>, or any website of ours that links to this privacy notice</li>
<li>Engage with us in other related ways, including any sales, marketing, or events</li>
</ul>
<p><strong>Questions or concerns?</strong>&nbsp;Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at&nbsp;<a rel="noopener">your-email@example.com</a>.</p>
<h2>SUMMARY OF KEY POINTS</h2>
<p>This summary provides key points from our privacy notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.</p>
<ul>
<li>
<p><strong>What personal information do we process?</strong>&nbsp;When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.&nbsp;<a href="#what-information-do-we-collect" rel="noopener">Learn more</a>&nbsp;about personal information you disclose to us.</p>
</li>
<li>
<p><strong>Do we process any sensitive personal information?</strong>&nbsp;We do not process sensitive personal information.</p>
</li>
<li>
<p><strong>Do we receive any information from third parties?</strong>&nbsp;We do not receive any information from third parties.</p>
</li>
<li>
<p><strong>How do we process your information?</strong>&nbsp;We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with the law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so.&nbsp;<a href="#how-do-we-process-your-information" rel="noopener">Learn more</a>&nbsp;about how we process your information.</p>
</li>
<li>
<p><strong>In what situations and with which parties do we share personal information?</strong>&nbsp;We may share information in specific situations and with specific third parties.&nbsp;<a href="#when-and-with-whom-do-we-share-your-personal-information" rel="noopener">Learn more</a>&nbsp;about when and with whom we share your personal information.</p>
</li>
<li>
<p><strong>How do we keep your information safe?</strong>&nbsp;We have organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.&nbsp;<a href="#how-do-we-keep-your-information-safe" rel="noopener">Learn more</a>&nbsp;about how we keep your information safe.</p>
</li>
<li>
<p><strong>What are your rights?</strong>&nbsp;Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.&nbsp;<a href="#what-are-your-privacy-rights" rel="noopener">Learn more</a>&nbsp;about your privacy rights.</p>
</li>
<li>
<p><strong>How do you exercise your rights?</strong>&nbsp;The easiest way to exercise your rights is by submitting a data subject access request or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.</p>
</li>
</ul>
<p>Want to learn more about what we do with any information we collect?&nbsp;<a href="#table-of-contents" rel="noopener">Review the privacy notice in full</a>.</p>
<h2>TABLE OF CONTENTS</h2>
<ol>
<li><a href="#what-information-do-we-collect" rel="noopener">WHAT INFORMATION DO WE COLLECT?</a></li>
<li><a href="#how-do-we-process-your-information" rel="noopener">HOW DO WE PROCESS YOUR INFORMATION?</a></li>
<li><a href="#what-legal-bases-do-we-rely-on-to-process-your-personal-information" rel="noopener">WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?</a></li>
<li><a href="#when-and-with-whom-do-we-share-your-personal-information" rel="noopener">WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a></li>
<li><a href="#do-we-use-cookies-and-other-tracking-technologies" rel="noopener">DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a></li>
<li><a href="#how-long-do-we-keep-your-information" rel="noopener">HOW LONG DO WE KEEP YOUR INFORMATION?</a></li>
<li><a href="#how-do-we-keep-your-information-safe" rel="noopener">HOW DO WE KEEP YOUR INFORMATION SAFE?</a></li>
<li><a href="#do-we-collect-information-from-minors" rel="noopener">DO WE COLLECT INFORMATION FROM MINORS?</a></li>
<li><a href="#what-are-your-privacy-rights" rel="noopener">WHAT ARE YOUR PRIVACY RIGHTS?</a></li>
<li><a href="#controls-for-do-not-track-features" rel="noopener">CONTROLS FOR DO-NOT-TRACK FEATURES</a></li>
<li><a href="#do-residents-of-the-european-union-united-kingdom-or-switzerland-have-specific-privacy-rights" rel="noopener">DO RESIDENTS OF THE EUROPEAN UNION, UNITED KINGDOM, OR SWITZERLAND HAVE SPECIFIC PRIVACY RIGHTS?</a></li>
<li><a href="#do-we-make-updates-to-this-notice" rel="noopener">DO WE MAKE UPDATES TO THIS NOTICE?</a></li>
<li><a href="#how-can-you-contact-us-about-this-notice" rel="noopener">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a></li>
<li><a href="#how-can-you-review-update-or-delete-the-data-we-collect-from-you" rel="noopener">HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</a></li>
</ol>
<h2>1. WHAT INFORMATION DO WE COLLECT?</h2>
<h3>Personal information you disclose to us</h3>
<p><strong>In Short:</strong>&nbsp;We collect personal information that you provide to us.</p>
<p>We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</p>
<p><strong>Personal Information Provided by You:</strong>&nbsp;The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
<ul>
<li>Names</li>
<li>Phone numbers</li>
<li>Email addresses</li>
<li>Mailing addresses</li>
<li>Job titles</li>
<li>Contact preferences</li>
<li>Contact or authentication data</li>
<li>Billing addresses</li>
<li>Debit/credit card numbers</li>
</ul>
<p><strong>Sensitive Information:</strong>&nbsp;We do not process sensitive information.</p>
<p><strong>Payment Data:</strong>&nbsp;We may collect data necessary to process your payment if you make purchases, such as your payment instrument number and the security code associated with your payment instrument. All payment data is stored by Stripe. You may find their privacy notice link(s) here:&nbsp;<a href="https://stripe.com/privacy" rel="noopener" target="_new">https://stripe.com/privacy</a>.</p>
<p>All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.</p>
<h3>Information automatically collected</h3>
<p><strong>In Short:</strong>&nbsp;Some information &mdash; such as your Internet Protocol (IP) address and/or browser and device characteristics &mdash; is collected automatically when you visit our Services.</p>
<p>We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.</p>
<p>Like many businesses, we also collect information through cookies and similar technologies.</p>
<p>The information we collect includes:</p>
<ul>
<li>
<p><strong>Log and Usage Data:</strong>&nbsp;Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings, and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called "crash dumps"), and hardware settings).</p>
</li>
<li>
<p><strong>Device Data:</strong>&nbsp;We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier, operating system, and system configuration information.</p>
</li>
<li>
<p><strong>Location Data:</strong>&nbsp;We collect location data such as information about your device's location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. However, if you choose to opt out, you may not be able to use certain aspects of the Services.</p>
</li>
</ul>
<h2>2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
<p><strong>In Short:</strong>&nbsp;We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with the law. We may also process your information for other purposes with your consent.</p>
<p>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</p>
<ul>
<li>
<p><strong>To deliver and facilitate delivery of services to the user:</strong>&nbsp;We may process your information to provide you with the requested service.</p>
</li>
<li>
<p><strong>To respond to user inquiries/offer support to users:</strong>&nbsp;We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.</p>
</li>
<li>
<p><strong>To send administrative information to you:</strong>&nbsp;We may process your information to send you details about our products and services, changes to our terms and policies, and other similar information.</p>
</li>
<li>
<p><strong>To fulfill and manage your orders:</strong>&nbsp;We may process your information to fulfill and manage your orders, payments, returns, and exchanges made through the Services.</p>
</li>
<li>
<p><strong>To save or protect an individual's vital interest:</strong>&nbsp;We may process your information when necessary to save or protect an individual&rsquo;s vital interest, such as to prevent harm.</p>
</li>
</ul>
<h2>3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</h2>
<p><strong>In Short:</strong>&nbsp;We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter into or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.</p>
<p><strong>If you are located in the EU or UK, this section applies to you.</strong></p>
<p>The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases to process your personal information:</p>
<ul>
<li>
<p><strong>Consent:</strong>&nbsp;We may process your information if you have given us permission (i.e., consent) to use your personal information for a specific purpose. You can withdraw your consent at any time.&nbsp;<a href="#how-can-you-contact-us-about-this-notice" rel="noopener">Learn more</a>&nbsp;about withdrawing your consent.</p>
</li>
<li>
<p><strong>Performance of a Contract:</strong>&nbsp;We may process your personal information when we believe it is necessary to fulfill our contractual obligations to you, including providing our Services or at your request prior to entering into a contract with you.</p>
</li>
<li>
<p><strong>Legal Obligations:</strong>&nbsp;We may process your information where we believe it is necessary for compliance with our legal obligations, such as to cooperate with a law enforcement body or regulatory agency, exercise or defend our legal rights, or disclose your information as evidence in litigation in which we are involved.</p>
</li>
<li>
<p><strong>Vital Interests:</strong>&nbsp;We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party, such as situations involving potential threats to the safety of any person.</p>
</li>
</ul>
<p><strong>If you are located in Canada, this section applies to you.</strong></p>
<p>We may process your information if you have given us specific permission (i.e., express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (i.e., implied consent). You can withdraw your consent at any time.</p>
<p>In some exceptional cases, we may be legally permitted under applicable law to process your information without your consent, including, for example:</p>
<ul>
<li>If collection is clearly in the interests of an individual and consent cannot be obtained in a timely way</li>
<li>For investigations and fraud detection and prevention</li>
<li>For business transactions provided certain conditions are met</li>
<li>If it is contained in a witness statement and the collection is necessary to assess, process, or settle an insurance claim</li>
<li>For identifying injured, ill, or deceased persons and communicating with next of kin</li>
<li>If we have reasonable grounds to believe an individual has been, is, or may be victim of financial abuse</li>
<li>If it is reasonable to expect collection and use with consent would compromise the availability or the accuracy of the information and the collection is reasonable for purposes related to investigating a breach of an agreement or a contravention of the laws of Canada or a province</li>
<li>If disclosure is required to comply with a subpoena, warrant, court order, or rules of the court relating to the production of records</li>
<li>If it was produced by an individual in the course of their employment, business, or profession and the collection is consistent with the purposes for which the information was produced</li>
<li>If the collection is solely for journalistic, artistic, or literary purposes</li>
<li>If the information is publicly available and is specified by the regulations</li>
</ul>
<h2>4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
<p><strong>In Short:</strong>&nbsp;We may share information in specific situations described in this section and/or with the following third parties.</p>
<p>We may need to share your personal information in the following situations:</p>
<ul>
<li><strong>Business Transfers:</strong>&nbsp;We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
</ul>
<h2>5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
<p><strong>In Short:</strong>&nbsp;We may use cookies and other tracking technologies to collect and store your information.</p>
<p>We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our&nbsp;<a href="#" rel="noopener">Cookie Notice</a>.</p>
<h2>6. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
<p><strong>In Short:</strong>&nbsp;We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.</p>
<p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).</p>
<p>When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</p>
<h2>7. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
<p><strong>In Short:</strong>&nbsp;We aim to protect your personal information through a system of organizational and technical security measures.</p>
<p>We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.</p>
<h2>8. DO WE COLLECT INFORMATION FROM MINORS?</h2>
<p><strong>In Short:</strong>&nbsp;We do not knowingly collect data from or market to children under 18 years of age.</p>
<p>We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent&rsquo;s use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at&nbsp;<a rel="noopener">your-email@example.com</a>.</p>
<h2>9. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
<p><strong>In Short:</strong>&nbsp;In some regions, such as the European Economic Area (EEA), United Kingdom (UK), Switzerland, and Canada, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.</p>
<p>In some regions (like the EEA, UK, Switzerland, and Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; (iv) if applicable, to data portability; and (v) not to be subject to automated decision-making. In certain circumstances, you may also have the right to object to the processing of your personal information. You can make such a request by contacting us by using the contact details provided in the section&nbsp;<a href="#how-can-you-contact-us-about-this-notice" rel="noopener">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>&nbsp;below.</p>
<p>We will consider and act upon any request in accordance with applicable data protection laws.</p>
<ul>
<li>
<p><strong>Withdrawing your consent:</strong>&nbsp;If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section&nbsp;<a href="#how-can-you-contact-us-about-this-notice" rel="noopener">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>&nbsp;below. However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.</p>
</li>
<li>
<p><strong>Opting out of marketing and promotional communications:</strong>&nbsp;You can unsubscribe from our marketing and promotional communications at any time by clicking on the unsubscribe link in the emails that we send, or by contacting us using the details provided in the section&nbsp;<a href="#how-can-you-contact-us-about-this-notice" rel="noopener">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>below. You will then be removed from the marketing lists. However, we may still communicate with you &mdash; for example, to send you service-related messages that are necessary for the administration and use of your account, to respond to service requests, or for other non-marketing purposes.</p>
</li>
<li>
<p><strong>Cookies and similar technologies:</strong>&nbsp;Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services. If you have questions or comments about your privacy rights, you may email us at&nbsp;<a rel="noopener">your-email@example.com</a>.</p>
</li>
</ul>
<h2>10. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
<p>Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.</p>
<h2>11. DO RESIDENTS OF THE EUROPEAN UNION, UNITED KINGDOM, OR SWITZERLAND HAVE SPECIFIC PRIVACY RIGHTS?</h2>
<p><strong>In Short:</strong>&nbsp;If you are a resident of the European Economic Area (EEA), United Kingdom (UK), or Switzerland, you are granted specific rights regarding access to your personal information.</p>
<p>What categories of personal information do we collect?</p>
<p>We have collected the following categories of personal information in the past twelve (12) months:</p>
<table>
<thead>
<tr><th>Category</th><th>Examples</th><th>Collected</th></tr>
</thead>
<tbody>
<tr>
<td>A. Identifiers</td>
<td>Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name</td>
<td>YES</td>
</tr>
<tr>
<td>B. Personal information as defined in the California Customer Records statute</td>
<td>Name, contact information, education, employment, employment history, and financial information</td>
<td>YES</td>
</tr>
<tr>
<td>C. Protected classification characteristics under state or federal law</td>
<td>Gender and date of birth</td>
<td>NO</td>
</tr>
<tr>
<td>D. Commercial information</td>
<td>Transaction information, purchase history, financial details, and payment information</td>
<td>NO</td>
</tr>
<tr>
<td>E. Biometric information</td>
<td>Fingerprints and voiceprints</td>
<td>NO</td>
</tr>
<tr>
<td>F. Internet or other similar network activity</td>
<td>Browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems, and advertisements</td>
<td>NO</td>
</tr>
<tr>
<td>G. Geolocation data</td>
<td>Device location</td>
<td>NO</td>
</tr>
<tr>
<td>H. Audio, electronic, visual, thermal, olfactory, or similar information</td>
<td>Images and audio, video, or call recordings created in connection with our business activities</td>
<td>NO</td>
</tr>
<tr>
<td>I. Professional or employment-related information</td>
<td>Business contact details in order to provide you our Services at a business level or job title, work history, and professional qualifications if you apply for a job with us</td>
<td>NO</td>
</tr>
<tr>
<td>J. Education Information</td>
<td>Student records and directory information</td>
<td>NO</td>
</tr>
<tr>
<td>K. Inferences drawn from collected personal information</td>
<td>Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual&rsquo;s preferences and characteristics</td>
<td>NO</td>
</tr>
<tr>
<td>L. Sensitive personal Information</td>
<td>&nbsp;</td>
<td>NO</td>
</tr>
</tbody>
</table>
<p>We will use and retain the collected personal information as needed to provide the Services or for:</p>
<ul>
<li><strong>Category A</strong>&nbsp;- 6 months</li>
<li><strong>Category B</strong>&nbsp;- 6 months</li>
</ul>
<p>We may also collect other personal information outside of these categories through instances where you interact with us in person, online, or by phone or mail in the context of:</p>
<ul>
<li>Receiving help through our customer support channels;</li>
<li>Participation in customer surveys or contests; and</li>
<li>Facilitation in the delivery of our Services and to respond to your inquiries.</li>
</ul>
<h2>12. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
<p><strong>In Short:</strong>&nbsp;Yes, we will update this notice as necessary to stay compliant with relevant laws.</p>
<p>We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.</p>
<h2>13. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
<p>If you have questions or comments about this notice, you may email us at&nbsp;<a rel="noopener">your-email@example.com</a>&nbsp;or contact us by post at:</p>
<p><strong>Aitural</strong>&nbsp;Pablo Pedrosa<br />Madrid, Spain<br />[Email Address]</p>
<h2>14. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>
<p>Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it. To request to review, update, or delete your personal information, please fill out and submit a data subject access request.</p>
      </Modal>

      <Footer>
        <Container>
          <p>&copy; 2024. Aitural. All rights reserved.</p>
          <p>
            <span onClick={() => setShowTerms(true)} style={{ cursor: 'pointer', color: 'var(--secondary-color)', textDecoration: 'underline' }}>
              Terms & Conditions
            </span> | 
            <span onClick={() => setShowPrivacy(true)} style={{ cursor: 'pointer', color: 'var(--secondary-color)', textDecoration: 'underline', marginLeft: '10px' }}>
              Privacy Policy
            </span>
          </p>
        </Container>
      </Footer>

    </>
  );
};

export default App;



// npm run build
// gcloud app deploy
// gcloud app browse
