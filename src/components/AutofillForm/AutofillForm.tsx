import React, { useState } from 'react';
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

  return (
    <div className="autofill-form">
      {manual && <p className="manual-note">Verification failed. Please fill the details manually.</p>}
      <input type="text" name="name" value={form.name || ''} onChange={handleChange} placeholder="Full Name" />
      <input type="text" name="dob" value={form.dob || ''} onChange={handleChange} placeholder="Date of Birth" />
      <input type="text" name="address" value={form.address || ''} onChange={handleChange} placeholder="Address" />
      <button className="submit-btn">Submit</button>
    </div>
  );
};

export default AutofillForm;