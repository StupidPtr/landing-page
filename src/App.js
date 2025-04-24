import React, {useState, createContext, useContext} from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import './App.css';
import checkPng from './Vector.png';

function InputField({label, ...props}) {
  const [field, meta] = useField(props)
  const isError = meta.touched && meta.error;

  const determineColor = (focused) => {
    if(isError) return 'red';
    if(focused) return '#000';
    return '#ccc';
  }

  const[focused, setFocused] = React.useState(false);
  const errorColor = determineColor(focused);

  
  return (
    <div className="form-group">
      <label style={{ color: errorColor}}>{label}</label>
      <input
        {...field}
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={(e) =>{
          setFocused(false);
          field.onBlur(e);
        }}
        placeholder={`Enter your ${label}`}
        style={{
          borderBottomColor: errorColor
        }}
      />
      {isError && (
        <div className="required-text">{meta.error}</div>
      )}
    </div>
  );
}

const validationSchema = Yup.object({
  firstName: Yup.string().required('Поле необходимо заполнить'),
  lastName: Yup.string().required('Поле необходимо заполнить'),
  phone: Yup.string().required('Поле необходимо заполнить'),
});


const RadioGroupContext = createContext(null);
const useRadioGroup = () => {
  const ctx = useContext(RadioGroupContext);
  return ctx;
}

function RadioButtonsContainer({value, onChange, children}) {
  return (
    <RadioGroupContext.Provider value={{value, onChange}}>
      <div role="radiogroup" className="radio-options">
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

function RadioButton({ name, value, label}) {
  const {value: groupValue, onChange} = useRadioGroup();
  const checked = groupValue === value;
  return (
    <label className="custom-radio">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange({ target: {name, value}})}
      />
      <span className={`radio-icon ${checked ? 'checked' : ''}`}>
        {checked && <img src={checkPng} alt="" className='check-icon' />}
      </span>
      <span className="radio-label">{label}</span>
    </label>
  );
}

export default function ContactPage() {

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
          <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            alert(`Message Sent!\n\nFirst Name: ${values.firstName}\nLast Name: ${values.lastName}\nEmail: ${values.email}\nPhone: ${values.phone}\nSubject: ${values.subject}\nMessage: ${values.message}`);
          }}
          >
            {({values, handleChange}) =>(
            <Form className="contact-form">
              <div className="form-row">
                <InputField
                  name="firstName"
                  label="First Name" 
                />
                <InputField
                  name="lastName"
                  label="Last Name"
                />
              </div>
              <div className="form-row">
              <InputField
                  name="email"
                  label="Email"
                  type="email"
                />
                <InputField
                  name="phone"
                  label="Phone"  
                />
              </div>
              <div className="form-radio-group">
                <label className="label-select">Select Subject?</label>
                <RadioButtonsContainer
                  value={values.subject}
                  onChange={handleChange}
                >
                  <RadioButton
                    name="subject"
                    value="General Inquiry"
                    label="General Inquiry"
                  />
                  <RadioButton
                    name="subject"
                    value="Support"
                    label="Support"
                  />
                  <RadioButton
                    name="subject"
                    value="Feedback"
                    label="Feedback"
                  />
                  <RadioButton
                    name="subject"
                    value="Other"
                    label="Other"
                  />
                </RadioButtonsContainer>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                rows="4"
                name="message"
                value={values.message}
                onChange={handleChange}
                placeholder="Write your message..."
                ></textarea>
              </div>
              <button type="submit" className="submit-button">Send Message</button>
              <img className="paper" src={require('./letter_send.png')}/>
            </Form>
            )}
          </Formik>
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