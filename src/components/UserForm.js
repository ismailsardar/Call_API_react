import React, { useState,useEffect } from 'react';

const UserForm = ({btnName,handelData,selecteUser}) => {
    const [user,setUser] = useState({
        title: '',
        body: ''
    });

    useEffect(() => {
      setUser({
        title:selecteUser.title,
        body:selecteUser.body,
      })
    }, [selecteUser]);
    

    const handelChang = (e)=>{
        const field = e.target.name;
        const value = e.target.value;

        setUser(oldData=>{
            return {...oldData,[field]:value};
        });
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        // console.log(user)
        handelData(user);
        setUser({
            title: '',
            body: ''
        });
    }

    const {title,body} = user;
  return (
    <>
        <form onSubmit={handelSubmit}>
            <div>
                <label htmlFor="title">Title :</label>
                <input type="text" id='title' name='title' value={title} required onChange={handelChang} />
            </div>
            <div>
                <label htmlFor="body">Body :</label>
                <input type="text" id='body' name='body' value={body} required onChange={handelChang} />
            </div>
            <button type='submit' className='btn'>{btnName}</button>
        </form>
    </>
  )
}

UserForm.defaultProps = {
    selecteUser:{
        title:'',
        body:'',
    }
}

export default UserForm