import { useState } from 'react';
//components
import MessagesDisplay from './components/MessagesDisplay';
import CodeDisplay from './components/CodeDisplay';

interface ChatData {
  role: string,
  content: string
}

function App() {
  const [value, setValue] = useState<string>("");
  const [chat, setChat] = useState<ChatData[]>([]);
  const [openAIError, setOpenAIError] =  useState<string>("");

  let responseData: ChatData;

  //make the call to the openai completions
  const getQuery = async() => {
     
       const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: value
          })
       }

       const response = await fetch("http://localhost:8000/completions", options)
       .catch((err: Error) => {
        //set the error
        setOpenAIError(`THERE WAS AN ERROR WITH THE API CONNECTION: ${err.message}` )
       });
       
       if(response){
        responseData = await response.json();

        //create an instance of the user's request string
        const userMessage = {
          role: "user",
          content: value 
        } 

        //save the data to the chat state
        setChat(oldChat => [...oldChat, responseData, userMessage]) 

        //clear the error
        setOpenAIError("")
       }       
     
      }
    
    

    //filter user messages to show previous messages sent to the openai api
    const filteredUserMessages = chat.filter(message => message.role === 'user');

    //get the latest response form openai
    const latestCode = chat.filter(message => message.role === 'assistant').pop();


  return (
    
      <div className='App'>
        <MessagesDisplay userMessages={filteredUserMessages}></MessagesDisplay>
        <input type="text" value={value} onChange={e => setValue(e.target.value)} />
        <CodeDisplay text={latestCode ? latestCode.content : "" }></CodeDisplay>
        <p>{openAIError}</p>
      <div className='buttons-container'>
        <button id='get_query' onClick={getQuery}>Get Query</button>
        <button id='clear_chat'>Clear Chat</button>
      </div>

      </div>
       
    
  )
}

export default App
