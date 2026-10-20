const token = process.env.API_TOKEN;

if (typeof token !== 'string' || token.trim() === '') {
  console.error('ERROR: API_TOKEN no está configurada.');
  process.exitCode = 1;
} else {
  console.log('OK: API_TOKEN está configurada.');
}

console.log('Seguridad: el valor de API_TOKEN no se muestra.');
