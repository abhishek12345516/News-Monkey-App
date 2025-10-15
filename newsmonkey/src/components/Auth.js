import React, { useState } from 'react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setMessage('❌ Please fill in all required fields.');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setMessage('❌ Passwords do not match.');
      return;
    }

    if (isLogin) {
      // 🔐 Login logic (replace with real backend/Firebase)
      console.log('Logging in with:', email, password);
      setMessage('✅ Login successful!');
    } else {
      // 📝 Signup logic
      console.log('Signing up with:', email, password);
      setMessage('✅ Account created successfully!');
    }

    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setTimeout(() => setMessage(''), 4000);
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <h3 className="text-center mb-3">
          {isLogin ? 'Login to NewsMonkey' : 'Create Account'}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          {message && (
            <div
              className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-danger'
                } mt-2`}
            >
              {message}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100 mt-3">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            className="btn btn-link p-0"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
