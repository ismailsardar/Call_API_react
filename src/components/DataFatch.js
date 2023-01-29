import React, { useEffect, useState } from 'react';

// import { CustomerData } from './dataUser';
// const URL = "https://jsonplaceholder.typicode.com/users"
const URL = "https://jsonplaceholder.typicode.com/users"

const DataFatch = () => {
    const [users, setUsers] = useState(null);
    const [isLoding, setIsLoding] = useState(true);
    const [error, setError] = useState(null);
    
    const getAllUsers = () =>{
        fetch(URL).then((res)=>{
            if (!res.ok) {
                throw Error("Could not Fecth Data!")
            }
            return res.json();
        }).then((data)=>{
            // console.log(data)
            setUsers(data);//(oldData)=>[...oldData,data]
        }).catch((error)=>{
            setError(error);
            // console.log(error)
        }).finally(()=>{
            setIsLoding(false);
        });
    }

    useEffect(() => {
        getAllUsers()
        
    }, []);
    
    console.log(users)
    // console.log(Array.isArray(users) )
  return (
    <div>
        <h1>Customer Manegment App</h1>
        {isLoding && <h2>Loding...</h2>}
        {error && <h2>{error}</h2>}

        <section className='sectionGrid'>
        {users && users.map((user)=>{
            // console.log(user)
            const {id,name,email,website} = user;
            return(
                <article key={id} className="card">
                    <h2>{name}</h2>
                    <p>{user.company.name}</p>
                    <p>{website}</p>
                    <p>{email}</p>
                    <button className='btn'>Edit</button>
                    <button className='btn'>Delete</button>
                </article>
            )
        })}
        </section>
    </div>
  )
}

export default DataFatch