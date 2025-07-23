import React, { useState, useEffect } from 'react';
import './AutofillForm.css';

interface Props {
  userData: any;
  manual: boolean;
}

const AutofillForm: React.FC<Props> = ({ userData, manual }) => {
  const [form, setForm] = useState(userData || {});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    useEffect(() => {
      if (userData) {
        setForm(userData);
      }
    }, [userData,
        manual]);


  return (
    <div className="autofill-form">

      <text style={{alignSelf: "start"}}>First Name</text>
      <input type="text" name="firstName" value={form.firstName || ''} onChange={handleChange} placeholder="First Name" />
      <text style={{alignSelf: "start"}}>Last Name</text>
      <input type="text" name="lastName" value={form.lastName || ''} onChange={handleChange} placeholder="Last Name" />
      <text style={{alignSelf: "start"}}>Phone Number</text>
      <input type="text" name="phoneNumber" value={form.phoneNumber || ''} onChange={handleChange} placeholder="Phone Number" />
      <text style={{alignSelf: "start"}}>Age</text>
      <input type="text" name="age" value={form.age || ''} onChange={handleChange} placeholder="Age" />
      <text style={{alignSelf: "start"}}>Email ID</text>
      <input type="text" name="email" value={form.email || ''} onChange={handleChange} placeholder="Email ID" />
      <text style={{alignSelf: "start"}}>Address</text>
      <input type="text" name="address" value={form.address || ''} onChange={handleChange} placeholder="Address" />
      <text style={{alignSelf: "start"}}>Profession</text>
      <input type="text" name="profession" value={form.profession || ''} onChange={handleChange} placeholder="Profession" />
      <text style={{alignSelf: "start"}}>Account Number</text>
      <input type="text" name="accountNumber" value={form.accountNumber || ''} onChange={handleChange} placeholder="Account Number" />
      <text style={{alignSelf: "start"}}>IFSC Code</text>
      <input type="text" name="ifscCode" value={form.ifscCode || ''} onChange={handleChange} placeholder="IFSC  Code" />
      <text style={{alignSelf: "start"}}>Income</text>
      <input type="text" name="income" value={form.income || ''} onChange={handleChange} placeholder="Income" />


      <button className="submit-btn">Submit</button>
    </div>
  );
};

export default AutofillForm;