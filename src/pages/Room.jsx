import { account, COLLECTION_ID_MESSAGES, DATABASE_ID, databases, client } from "../appwrite/appwriteConfig";
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import '../index.css'
import { ID, Query } from "appwrite";
import {Trash2} from 'react-feather'


function Room () {
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState('');

    const getMessages = async () =>{
       const response =  await databases.listDocuments(DATABASE_ID, COLLECTION_ID_MESSAGES,
        [
            Query.orderAsc('$createdAt'),
            Query.limit(100)
        ]
        
       );
    //    console.log("messages : ", response.documents)
       setMessages(response.documents);
    }
    useEffect(() => {
        getMessages();

        client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, response => {

            if(response.events.includes('databases.*.collections.*.documents.*.create')){
                console.log("Message is Created");
                setMessages(prevState => [response, ...prevState])
            }

            if(response.events.includes('databases.*.collections.*.documents.*.delete')){
                console.log("Message is Deleted");
                setMessages((prevState) => prevState.filter((message) => message.$id !== response.$id));
            }

        })


    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            content: messageContent,
            // user_id: 
        }

       const response =  await databases.createDocument(
            DATABASE_ID, 
            COLLECTION_ID_MESSAGES,
            ID.unique(),
            payload
        )
        // setMessages(response);
        // setMessages((prevState) => [response, ...prevState])
        setMessageContent('');
        console.log("response : ", response)
    }
    
    const deleteMessages = async (id) =>{
        await databases.deleteDocument(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            id
        );

        
    }

    return (
        <main className="container">
            <div className="room--container">
                <div>
                    {
                        messages.map((message)=>(
                            <div key={message.$id} className="message--wrapper">
                                <small>{new Date (message.$createdAt).toLocaleString()}</small>
                                <p className="message--header">{message.content}
                                    <Trash2 className="delete--btn" onClick={() => {deleteMessages(message.$id)}} />
                                </p>

                            </div>
                        ))
                    }
                </div>
            </div>
        <form id="message--form" onSubmit={handleSubmit} >
            <div>
                <textarea
                    required
                    maxLength="250"
                    placeholder="Say Something...."
                    onChange={(e) => {setMessageContent(e.target.value)}}
                    value={messageContent}
                ></textarea>
            </div>
            <div className="send-btn--wrapper">
                <input className="btn btn--secondary" type="submit" value="Send" />
            </div>
        </form>
        </main>
    )
}

export default Room;