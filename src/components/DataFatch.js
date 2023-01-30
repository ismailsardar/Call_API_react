import React, { useEffect, useState } from 'react';
import UserForm from './UserForm';

// import { CustomerData } from './dataUser';
// const URL = "https://rest-api-without-db.herokuapp.com/users"
// const URL = "https://jsonplaceholder.typicode.com/users"
const URL = "https://jsonplaceholder.typicode.com/posts"

const DataFatch = () => {
    const [users, setUsers] = useState(null);
    const [isLoding, setIsLoding] = useState(true);
    const [error, setError] = useState(null);

    //update state
    const [selecte, setSelecte] = useState({
        title:'',
        body:''
    });
    const [updateFlag, setUpdateFlag] = useState(false);
    const [selectedId, setSelectId] = useState("");
    
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
        getAllUsers();
        
    }, []);
    
    //Delete method https://rest-api-without-db.herokuapp.com/users
    const handelDelete = (id)=>{
        // alert(id)
        // console.log(`${URL}/${id}`)
        fetch(`${URL}/${id}`,{
            method: 'DELETE',
        })
        .then((res)=>{
            if (!res.ok) {
                throw Error("Could not Delete Data!")
            }
            getAllUsers();
        }).catch((error)=>{
            setError(error);
        })
    }

    const addSubmitData = (user)=>{
        // console.log(user)
        fetch(URL,{
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((res)=>{
            if (!res.ok) {
                throw Error("Could not Created Data!")
            }
            getAllUsers();
        }).catch((error)=>{
            setError(error);
        })
    }

    const handelEdit = (id)=>{
        setSelectId(id);
        setUpdateFlag(true);
        const filterData = users.filter((user)=> user.id === id);
        setSelecte({
            title:filterData[0].title,
            body:filterData[0].body
        })
    }

    //update
    const handelUpdate =(user)=>{
        const {title,body} = user;
        fetch(`${URL}/${selectedId}`,{
            method: 'PUT',
            body: JSON.stringify({
                title:title,
                body:body,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((res)=>{
            if (!res.ok) {
                throw Error("Could not Update Data!")
            }
            getAllUsers();
            setUpdateFlag(false);
        }).catch((error)=>{
            setError(error);
        }).finally(()=>{
            setIsLoding(false);
        });
    }


  return (
    <div>
        <h1>Customer Manegment App</h1>
        {isLoding && <h2>Loding...</h2>}
        {error && <h2>{error}</h2>}

        {updateFlag ? <UserForm btnName="Update User" selecteUser={selecte} handelData={handelUpdate} /> : <UserForm btnName="Add User" handelData={addSubmitData}/>}

        <section className='sectionGrid'>
        {users && users.map((user)=>{
            // console.log(user)
            // const {id,name,email,website} = user;
            const {id,title,body} = user;
            return(
                <article key={id} className="card">
                    <h2>{id}</h2>
                    <h3>{title}</h3>
                    <p>{body}</p>
                    {/* <p>{email}</p> */}
                    <button className='btn' onClick={()=>{handelEdit(id)}} >Edit</button>
                    <button className='btn' onClick={()=>{handelDelete(id)}}>Delete</button>
                </article>
            )
        })}
        </section>
    </div>
  )
}

export default DataFatch