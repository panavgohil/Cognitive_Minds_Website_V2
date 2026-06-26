import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      alert(error.message);
      setStatus('idle');
    } else {
      alert("Password updated successfully!");
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-8 bg-background">
      <form onSubmit={handleUpdate} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-serif mb-6 text-primary">Set New Password</h2>
        <input 
          type="password" 
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 border border-primary/10 rounded-xl mb-4"
          required
        />
        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="w-full bg-primary text-white py-4 rounded-xl font-semibold"
        >
          {status === 'loading' ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;