import { CSSProperties } from 'react';

export const pageStyle: CSSProperties = {
  padding: '20px',
  backgroundColor: '#293325',
  color: '#FFFFFF',
  minHeight: '100vh'
};

export const headingStyle: CSSProperties = {
  color: '#4CBB17',
  textAlign: 'center',
  marginBottom: '30px'
};

export const formStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  maxWidth: '500px',
  margin: '0 auto'
};

export const inputStyle: CSSProperties = {
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #4CBB17',
  fontSize: '16px'
};

export const buttonStyle: CSSProperties = {
  backgroundColor: '#4CBB17',
  color: 'white',
  padding: '12px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease'
};

export const resultsStyle: CSSProperties = {
  marginTop: '30px',
  textAlign: 'center'
};
