import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries'; 
import emailjs from '@emailjs/browser';
//import Auth from '../utils/auth';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
  });
  const { loading, data } = useQuery(QUERY_ME);
  // submit form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    emailjs.sendForm('service_oulp9q6', 'template_mrih84w', event.target, 'IkTrdLieRYa2rNf96')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    
    //console.log(formData);
    //console.log('User Email:', data.me.email); 
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
      {/* <div>
          <label htmlFor="email">Email From:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.me.email}
            onChange={handleInputChange}
            required
          />
        </div> */}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default Contact;
