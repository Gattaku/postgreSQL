import React, { useEffect, useState } from 'react'
import dbApi from '../api/getDB';

const GetAll = () => {

    const [data,SetData] = useState([]);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newAge, setNewAge] = useState("");
    const [deleteID,setDeleteID] = useState("");
    const [updateID,setUpdateID] = useState("");
    const [updateName,setUpdateName] = useState("");

    const getAllData = async() => {
        try {
          const result = await dbApi.getAll();
          SetData(result.data);
        } catch (err) {
          alert(err);
        }
    }

    const changeName = (value) => {
        setNewName(value);
        // console.log(newName);
    }

    const changeEmail = (value) => {
        setNewEmail(value);
        // console.log(newEmail);
    }
    const changeAge = (value) => {
        setNewAge(value);
        // console.log(newEmail);
    }

    const createNewDB = async(e) => {
        e.preventDefault();
        try {
            const result = await dbApi.createNewDB({name:newName,email:newEmail,age:newAge})
            console.log(result.data);
            setNewName("");
            setNewEmail("");
            setNewAge("");
        } catch (err) {
            alert(err);
        }
    }

    const deleteIDset = (value) => {
        setDeleteID(value);
    }

    const deleteDB = async(e) => {
        e.preventDefault();
        try {
            const result = await dbApi.deleteDB(deleteID);
            console.log(result)
            setDeleteID("")
        } catch (err) {
            alert(err);
        }
    }

    const updateIDset = (value) => {
        setUpdateID(value);
    }
    const updateNameset = (value) => {
        setUpdateName(value);
    }

    const updateDB = async(e) => {
        e.preventDefault();
        try {
            const result = await dbApi.updateName(updateID, {name: updateName});
            setUpdateID("");
            setUpdateName("");
        } catch (err) {
            alert(err);
        }
    }

    //初回マウントされたときに全データを表示する
    useEffect(()=>{
        getAllData(); 
    },[data])


  return (
    <div>
        <button onClick={getAllData}>全取得</button>
        {data.map((eachdata)=>{
            return (
                <ul key={eachdata.id}>
                    <li>{`ID : ${eachdata.id}`}</li>
                    <li>{`Name : ${eachdata.name}`}</li>
                    <li>{`Email : ${eachdata.email}`}</li>
                    <li>{`Age : ${eachdata.age}`}</li>
                </ul>
            )
        })}
        <br />

        <div>
            <form action="" onSubmit={(e) => createNewDB(e)}>
            <button>新規追加</button>
                    <label htmlFor="">name</label>
                    <input type="text" value={newName} onChange={(e)=> changeName(e.target.value)}/>
                    <label htmlFor="">email</label>
                    <input type="text" value={newEmail} onChange={(e)=> changeEmail(e.target.value)}/>
                    <label htmlFor="">age</label>
                    <input type="text" value={newAge} onChange={(e)=> changeAge(e.target.value)}/>
            </form>
        </div>
        <br />
            <form onSubmit={(e) => deleteDB(e)}>
                <button>特定のユーザーを削除</button>
                <label htmlFor="">ID</label>
                <input value={deleteID} onChange={(e)=> deleteIDset(e.target.value)}/>
            </form>
        <br />
            <form onSubmit={(e) => updateDB(e)}>
                <button>特定のユーザーの名前を更新</button>
                <label htmlFor="">ID</label>
                <input value={updateID} onChange={(e)=> updateIDset(e.target.value)}/>
                <label htmlFor="">Name</label>
                <input value={updateName} onChange={(e)=> updateNameset(e.target.value)}/>
            </form>
    </div>
  )
}

export default GetAll