import React, {useState} from 'react';
import './App.css';


function InputFiled({name, label, type = 'text', value, onChange, onFocus, onBlur, isRequiredError = false}) {

  const [focused, setFocused] = useState(false);

  const determineColor = () => {
    if(isRequiredError) return 'red';
    if(focused) return '#000';
    return '#ccc';
  }

  const borderBottomColor = determineColor();
  const labelColor = determineColor();


  const handleFocus = (e) => {
    setFocused(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e) => {
    setFocused(false);
    onBlur && onBlur(e);
  };

  return (
    <div className="form-group">
      <label style={{ color: labelColor}}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={`Enter your ${label}`}
        style={{
          borderBottomColor: borderBottomColor
        }}
      />
      {isRequiredError && (
        <div className="required-text">Поле необходимо заполнить</div>
      )}
    </div>
  )

}


export default function ContactPage() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [required, setRequired] = useState({})

  const handleChange = (e) => {
    const { name, value} = e.target;
    setFormData({ ...formData, [name]: value});
    if(required[name]) setRequired({...required, [name]: false});
  };

  const handleSubjectChange = (e) => {
    setFormData({
      ...formData,
      subject: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, subject, message } = formData;
    const newRequired = {};

    if(!formData.firstName.trim()) newRequired.firstName = true;
    if(!formData.lastName.trim()) newRequired.lastName = true;
    if(!formData.phone.trim()) newRequired.phone = true;

    if(Object.keys(newRequired).length) {
      setRequired(newRequired);
      return;
    }

    setRequired({});
    alert(`Message Sent!\n\nName: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\nMessage: ${message}`);
  };

  return (
    <div className="contact-page">
      {/* Header */}
      <header className="header">
        <div className="logo">Logo Here</div>
        <nav className="nav">
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">Blog</a>
          <a href="#">Shop</a>
          <a href="#" className="active">Contact</a>
          <a href="#"><img src={require('./Mask_group.png')}/></a>
          <a href="#"><img src={require('./bi_cart.png')}/></a>
        </nav>
      </header>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-title">
          <h2>Contact Us</h2>
          <p className="sub-text">Any question or remark? Just write us a message!</p>
        </div>
        <div className="contact-container">
          {/* Left Panel */}
          <div className="contact-info">
            <div>
              <h3>Contact Information</h3>
              <h4>Say something to start a live chat!</h4>
            </div>
            <div className="info-details">
              <p><img src={require('./bxs_phone-call.png')} /> +012 3456 789</p>
              <p><img src={require('./ic_sharp-email.png')}/> demo@gmail.com</p>
              <p className="adress-line">
                <img src={require('./carbon_location-filled.png')}/>
                <span>
                    132 Dartmouth Street Boston,<br /> 
                    Massachusetts 02156 United States
                </span>
              </p>
            </div>
            <div className="social-icons">
              <div className="ellipse-container">
                <a href="#"><img src={require('./twit.png')} className="ellipse-icon" /></a>
              </div>
              <div className="ellipse-container">
                <a href="#"><img src={require('./inst.png')} className="ellipse-icon" /></a>
              </div>
              <div className="ellipse-container">
              <a href="#"><img src={require('./dis.png')} className="ellipse-icon" /></a>
              </div>
            </div>
            <div className="decor-circle circle-1"></div>
            <div className="decor-circle circle-2"></div>
          </div>

          {/* Right Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <InputFiled
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleChange}
                isRequiredError={required.firstName}  
              />
              <InputFiled
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                isRequiredError={required.lastName}  
              />
            </div>
            <div className="form-row">
            <InputFiled
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                isRequiredError={required.email}  
              />
              <InputFiled
                name="phone"
                label="Phone"
                value={formData.phone}
                onChange={handleChange}
                isRequiredError={required.phone}  
              />
            </div>
            <div className="form-radio-group">
              <label className="label-select">Select Subject?</label>
              <div className="radio-options">
                <label><input
                  type="radio" 
                  name="subject" 
                  value="General Inquiry"
                  checked={formData.subject === 'General Inquiry'}
                  onChange={handleSubjectChange}
                  /> General Inquiry</label>
                <label><input 
                  type="radio" 
                  name="subject"
                  value="Support"
                  checked={formData.subject === 'Support'}
                  onChange={handleSubjectChange}
                  /> Support</label>
                <label><input 
                  type="radio" 
                  name="subject"
                  value="Feedback"
                  checked={formData.subject === 'Feedback'}
                  onChange={handleSubjectChange}
                  /> Feedback</label>
                <label><input 
                  type="radio" 
                  name="subject" 
                  value="Other"
                  checked={formData.subject === 'Other'}
                  onChange={handleSubjectChange}
                  /> Other</label>
              </div>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
               rows="4"
               name="message"
               value={formData.message}
               onChange={handleChange}
               placeholder="Write your message..."
              ></textarea>
            </div>
            <button type="submit" className="submit-button">Send Message</button>
            <img className="paper" src={require('./letter_send.png')}/>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-logo">Logo Here</p>
        <div className="footer-container">
          <div className="wrapper-1">
            <div className="footer-column">
              <ul>              
                <li>Reach us</li>
                <li><img src={require('./bxs_phone-call.png')} />+012 3456 789</li>
                <li><img src={require('./ic_sharp-email.png')}/>demo@gmail.com</li>
                <li className="adress-line">
                  <img src={require('./carbon_location-filled.png')}/>
                  <span>
                    132 Dartmouth Street Boston,<br /> 
                    Massachusetts 02156 United States
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="wrapper-2">
            <div className="footer-column">
              <ul>
                <li>Company</li>
                <li>About</li>
                <li>Contact</li>
                <li>Blogs</li>
              </ul>
            </div>
            <div className="footer-column">
              <ul>
                <li>Legal</li>
                <li>Privacy Policy</li>
                <li>Terms & Services</li>
                <li>Terms of Use</li>
                <li>Refund Policy</li>
              </ul>
            </div>
            <div className="footer-column">
              <ul>
                <li>Quick Links</li>
                <li>Techlabz Keybox</li>
                <li>Downloads</li>
                <li>Forum</li>
              </ul>
            </div>
          </div>
          <div className="wrapper-3">
            <div className="container-footer">
              <h4 className="footer-h4">Join Our Newsletter</h4>
              <div className="footer-form">
                <input type="email" placeholder="Your email address" />
                <button>Subscribe</button>
              </div>
              <p className="footer-description">* Will send you weekly updates for your better food management</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}