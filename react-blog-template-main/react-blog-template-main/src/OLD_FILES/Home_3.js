import{useState, useEffect} from 'react';
import BlogList from './BlogList';

const Home = () => {  
    const [blogs,setBlogs] = useState([
        { title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1 },
        { title: 'Welcome party!', body: 'lorem ipsum...', author: 'yoshi', id: 2 },
        { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'mario', id: 3 }
    ]);

    const [name, setName] = useState('mario');

    const handleDelete = (id) => {
        const newBlogs = blogs.filter(blogs => blogs.id !== id);
        setBlogs(newBlogs);
    }
    

    useEffect(() => { // Runs every time a render executed. DON'T change the state inside useEffect function! Good function for fetching data.
        console.log('use effect ran');
        console.log(name);
    }, [name]);

    return ( 
        <div className="home">
            <BlogList blogs={blogs} title="All Blogs!" handleDelete={handleDelete} />
            <BlogList blogs={blogs.filter((blog) => blog.author === 'mario')} title="Mario's blogs" handleDelete={handleDelete} />
            <button onClick={() => setName('luigi')}>change name</button>
            <p>{ name }</p>
        </div>
     );
}
 
export default Home;