import { useNavigate } from 'react-router-dom';
import videoBg from '../Videos/Photo_video.mp4';
import './pageGeneral.css';
import Button from '@mui/material/Button';

function MainLogin() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };
    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className='main-screen'>
            <div style={{ position: 'relative' }}>
                <video src={videoBg} autoPlay loop muted />
                <Button
                    type="submit"
                    variant="outlined"
                    sx={{ 
                        mt: 40, 
                        ml: 5, 
                        width: '100px', 
                        height: '50px', 
                        position: 'absolute',
                        backgroundColor: '#4CAF50',
                        color: 'black'
                    }}
                    onClick={handleLogin}
                >
                    Login
                </Button>
                <Button
                    type="submit"
                    variant="outlined"
                    sx={{ 
                        mt: 40, 
                        ml: 22, 
                        width: '100px', 
                        height: '50px', 
                        position: 'absolute',
                        backgroundColor: '#40A2E3',
                        color: 'black'
                    }}
                    onClick={handleRegister}
                >
                    Sign-up
                </Button>
            </div>
    </div>
    );
}

export default MainLogin;
