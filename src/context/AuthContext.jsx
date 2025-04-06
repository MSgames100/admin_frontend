import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { authApi } from '@/services/api';

// Create auth context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedAuth = localStorage.getItem('msGamesAuth');
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      setIsAuthenticated(true);
      setUser(authData.user);
      setToken(authData.token);
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // For development, keep dummy login for testing
      if (email === 'admin@msgames.com' && password === 'password') {
        const userData = {
          id: '1',
          name: 'Admin User',
          email: 'admin@msgames.com',
          role: 'admin'
        };
        
        setUser(userData);
        setToken('dummy-token');
        setIsAuthenticated(true);
        
        // Store in localStorage
        localStorage.setItem('msGamesAuth', JSON.stringify({
          isAuthenticated: true,
          user: userData,
          token: 'dummy-token'
        }));
        
        toast({
          title: "Login Successful",
          description: "Welcome to MSGames Admin Dashboard",
        });
        
        navigate('/');
        return true;
      }
      
      // Use actual API for all other login attempts
      const response = await authApi.login(email, password);
      
      if (response && response.access_token) {
        // Assuming we would get user data from token or another API call
        // For now, just use email
        const userData = {
          id: email,
          email: email,
          name: email.split('@')[0],
          role: 'user'
        };
        
        setUser(userData);
        setToken(response.access_token);
        setIsAuthenticated(true);
        
        // Store in localStorage
        localStorage.setItem('msGamesAuth', JSON.stringify({
          isAuthenticated: true,
          user: userData,
          token: response.access_token
        }));
        
        toast({
          title: "Login Successful",
          description: "Welcome to MSGames Admin Dashboard",
        });
        
        navigate('/');
        return true;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "Invalid email or password",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    setIsLoading(true);
    try {
      await authApi.register(userData);
      
      toast({
        title: "Registration Successful",
        description: "Please login with your new account",
      });
      
      navigate('/login');
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message || "Could not complete registration",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('msGamesAuth');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoading, 
      token,
      login, 
      logout,
      register 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
