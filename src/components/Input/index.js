import './styles.css';

function Input({value, onChange}) {
  return (
    <input value={value} onChange={onChange} 
      type="text" name="usuario" placeholder='@username' 
    />
  );
}

export default Input;