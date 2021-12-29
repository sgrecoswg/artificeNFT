import{useState} from 'react';

const Home = () => {  
    // let name = 'mario';
    const [name, setName] = useState('mario');
    const [age, setAge] = useState(25);

    const handleClick = (e) => {
        setName('luigi');
        setAge(30);
    }

    const handleClickAgain = (name, e) =>{
        console.log('hello ' + name, e.target);
    }
    
    return ( 
        <div className="home">
            <h2>Homepage</h2>
            <p>{name} is {age} years old</p>
            <button onClick={handleClick}>useState - Reactive value</button>

            <p>- - - -</p>
            <button onClick={(e) => handleClickAgain('Daniel', e)}>Anonious fucnction passes value</button>
        </div>
     );
}
 
export default Home;