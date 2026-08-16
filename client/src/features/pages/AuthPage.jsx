import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, register, setError } from '../../store/authSlice';

export default function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [isLogin, setIsLogin] = useState(true);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regStudentId, setRegStudentId] = useState('');
  const [regDepartment, setRegDepartment] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(setError(null));
  }, [dispatch, isLogin]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email: loginEmail, password: loginPassword }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const userData = {
      name: regName,
      email: regEmail,
      password: regPassword,
    };
    if (regStudentId.trim()) userData.studentId = regStudentId.trim();
    if (regDepartment.trim()) userData.department = regDepartment.trim();
    dispatch(register(userData));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8">
          <div className="flex bg-surface-container rounded-full p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-label-md font-medium rounded-full transition-colors ${
                isLogin
                  ? 'bg-primary text-on-primary'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-label-md font-medium rounded-full transition-colors ${
                !isLogin
                  ? 'bg-primary text-on-primary'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Register
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-error-container text-on-error-container px-4 py-3 rounded-lg mb-6 text-body-sm">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </div>
          )}

          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-label-md text-on-surface mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="you@ruet.ac.bd"
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface placeholder-on-surface-variant outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-label-md text-on-surface mb-1.5">Password</label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface placeholder-on-surface-variant outline-none focus:border-primary transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-[#7c69b5] text-on-primary text-label-md font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
              <p className="text-center text-body-sm text-on-surface-variant">
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-primary hover:text-on-primary-container font-medium transition-colors"
                >
                  Sign up
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-label-md text-on-surface mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface placeholder-on-surface-variant outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-label-md text-on-surface mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="you@ruet.ac.bd"
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface placeholder-on-surface-variant outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-label-md text-on-surface mb-1.5">Password</label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface placeholder-on-surface-variant outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-label-md text-on-surface mb-1.5">
                  Student ID <span className="text-on-surface-variant font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={regStudentId}
                  onChange={(e) => setRegStudentId(e.target.value)}
                  placeholder="e.g. 1905001"
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface placeholder-on-surface-variant outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-label-md text-on-surface mb-1.5">
                  Department <span className="text-on-surface-variant font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={regDepartment}
                  onChange={(e) => setRegDepartment(e.target.value)}
                  placeholder="e.g. CSE"
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface placeholder-on-surface-variant outline-none focus:border-primary transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-[#7c69b5] text-on-primary text-label-md font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
              <p className="text-center text-body-sm text-on-surface-variant">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-primary hover:text-on-primary-container font-medium transition-colors"
                >
                  Sign in
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
