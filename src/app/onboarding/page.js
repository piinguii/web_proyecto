"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const Onboarding = () => {
  const [step, setStep] = useState(''); // 'register', 'validate', 'login'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationCode, setValidationCode] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState(''); // Estado para mensajes de error
  const router = useRouter();

    // Retrieve token from local storage on component mount
    useEffect(() => {
      const storedToken = localStorage.getItem('jwt');
      if (storedToken) {
          setToken(storedToken);
      }
  }, []);

  // Función para validar el formato del correo
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar correos electrónicos
    return emailRegex.test(email);
  };

  // Función para validar la contraseña
  const isValidPassword = (password) => {
    return password.length >= 6; // La contraseña debe tener al menos 6 caracteres
  };

  // Manejo del registro
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos

    // Validaciones
    if (!isValidEmail(email)) {
      setError('Por favor, introduce un correo electrónico válido.');
      return;
    }
    if (!isValidPassword(password)) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    //Crear una cuenta usuario: POST /api/user/register
      const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        console.log(response);
    }

      const data = await response.json();
      console.log('Registration Response Data:', data); // Log the response data for debugging
      localStorage.setItem('jwt', data.token); // Guardar el token en localStorage
      setToken(data.token); // Set the token in state for later use
      alert('Usuario registrado. Por favor valida tu correo.');
      setStep('validate');

  };

  const handleValidate = async (e) => {
    e.preventDefault(); // Evitar comportamiento por defecto
    setError(''); // Limpiar errores previos
     // Log the token for debugging
     console.log('Token:', token);
    try {
      // Enviar la solicitud de validación
      const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user/validation', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Incluir el token en las cabeceras
        },
        body: JSON.stringify({ code: validationCode }), // Código de validación
      });

      console.log('Response Status:', response.status);
      const responseText = await response.text(); // Get the raw response text
      console.log('Response Text:', responseText); // Log the raw response

      if (!response.ok) {
            // Attempt to parse the response as JSON if it's not OK
            try {
                const errorData = JSON.parse(responseText); // Try to parse the response
                throw new Error(`Error al validar el correo: ${errorData.message || 'Error desconocido.'}`);
            } catch (parseError) {
                throw new Error(`Error al validar el correo: ${responseText}`); // Fallback to raw text
            }
    }

  
      alert('Correo validado correctamente.');
      setStep('login'); // Cambiar al paso de login
    } catch (error) {
      console.error(error); // Mostrar errores en la consola
      setError('Hubo un problema al validar el correo.');
    }
  };
  

  const handleLogin = async (e) => { // Añadir esta función
    e.preventDefault(); // Evitar comportamiento por defecto
    setError(''); // Limpiar errores previos

      const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        console.log(response)
      }

      const data = await response.json();
      console.log('Registration Response Data:', data); // Log the response data for debugging
      localStorage.setItem('jwt', data.token); // Guardar el token en localStorage
      setToken(data.token); // Set the token in state for later use
      alert('Inicio de sesión exitoso.');
      router.push('/');
  
  };




  return (
    <main className="container mx-auto p-6">
        {step === '' && ( // Show options for registration or login
            <div>
                <h1 className="text-2xl font-bold mb-4">Bienvenido</h1>
                <button onClick={() => setStep('register')} className="bg-blue-500 text-white p-2 rounded mr-4">
                    Registrarse
                </button>
                <button onClick={() => setStep('login')} className="bg-green-500 text-white p-2 rounded">
                    Iniciar Sesión
                </button>
            </div>
        )}

        {step === 'register' && (
            <form onSubmit={handleRegister}>
                <h1 className="text-2xl font-bold mb-4">Registro</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>} {/* Muestra errores */}
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border rounded p-2 w-full mb-4"
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border rounded p-2 w-full mb-4"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Registrar</button>
            </form>
        )}

        {step === 'validate' && (
            <form onSubmit={handleValidate}>
                <h1 className="text-2xl font-bold mb-4">Validar Correo</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>} {/* Muestra errores */}
                <input
                    type="text"
                    placeholder="Código de validación"
                    value={validationCode}
                    onChange={(e) => setValidationCode(e.target.value)}
                    required
                    className="border rounded p-2 w-full mb-4"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Validar</button>
            </form>
        )}

        {step === 'login' && (
            <form onSubmit={handleLogin}>
                <h1 className="text-2xl font-bold mb-4">Inicio de Sesión</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>} {/* Muestra errores */}
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border rounded p-2 w-full mb-4"
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border rounded p-2 w-full mb-4"
                />
                <button type="submit" className="bg-green-500 text-white p-2 rounded">Iniciar Sesión</button>
            </form>
        )}
    </main>
);
};



export default Onboarding;
