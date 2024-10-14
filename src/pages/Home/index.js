import { useState } from 'react';

import background from '../../assets/background.png';
import Button from '../../components/Button';
import Header from "../../components/Header";
import Input from '../../components/Input';
import ItemList from '../../components/ItemList';
import './styles.css';

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if(newUser.name){
      const {avatar_url, name, bio, login} = newUser;
      setCurrentUser({avatar_url, name, bio, login});
      
      const userReposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newUserReposData= await userReposData.json();
      
      if(newUserReposData.length){
        setRepos(newUserReposData);
      }
    }
  };

  return (
    <div className="App">
      <Header />
      <div className='conteudo'>
        <img src={background} alt="Imagem de fundo" className='background' />

        <div className='info'>
          <div className='busca'>
            <Input value={user} onChange={event => setUser(event.target.value)} 
            />
            
            <Button onClick={handleGetData} title="Buscar" />
          </div>

          {currentUser?.name ? (
            <>
              <div className='perfil'>
                <img src={currentUser.avatar_url} alt="Foto perfil"  className='profile'/>
                <div>
                  <h3>{currentUser.name}</h3>
                  <span>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
    
              <hr />
            </>
          ): null}

          {repos?.length ? (
            <>
              <div className='lista-repositorios'>
                  <h4 className='repositorio'>Repositórios</h4>
                  {repos.map(repo => (
                    <ItemList title={repo.name} description={repo.description} url={repo.html_url}/>
                  ))}
              </div>
            </>
          ): null}
        </div>
      </div>
    </div>
  );
}

export default App;
