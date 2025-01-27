import './newPrompt.css'
import { useRef, useEffect, useState } from 'react';
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const NewPrompt = () => {

    const[question, setQuestion] = useState("");
    const[answer, setAnswer] = useState("");

    const[img,setImg] = useState({
        isLoading: false,
        error: "",
        dbData: {},
        aiData: {},

    });

    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{text: "Hello, I have two dogs in my house."}],
            },
            {
                role: "model",
                parts: [{text: "Hello, what would you like to know?"}],
            },
        ],
        generationConfig: {
            //maxOutputTokens: 100
        },
    })

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current.scrollIntoView({behavior: "smooth"})
    }, [question, answer, img.dbData]);

    const queryClient = useQueryClient();

  

  const mutation = useMutation({
    mutationFn: (text) => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }).then((res) => res.json());
    },
    onSuccess: (id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chats/${id}`);
    },
  });

    const add = async (text) => {
        setQuestion(text);

        const result = await chat.sendMessageStream(
            Object.entries(img.aiData).length ? [img.aiData, text] : [text]
        );

        let accumulatedText = "";
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            console.log(chunkText);
            accumulatedText += chunkText

            setAnswer(accumulatedText);
        }
        
        
        setImg({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {},
        });
        

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const text = e.target.text.value;
        if(!text) return;

        add(text);

        
    }



    return (
        <>
        {/*ADD NEW CHAT*/}
        {img.isLoading && <div className="">Loading...</div>}
        {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="380"
          transformation={[{ width: 380 }]}
        />
        )}

        {question && <div className="message user">{question}</div>}
        {question && <div className="message user">{question}</div>}
        {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown>
        </div>
        )}
        
        
        
       
        <div className="endChat" ref = {endRef}></div>
        
        {/**Add a chat button below this for testing */}


            <form className = "newForm" onSubmit={handleSubmit}>
                <Upload setImg = {setImg} /> 
                <input id = "file" type="file" multiple = {false} hidden />
                <input type="text" name = "text" placeholder='Ask anything...' />
                <button>
                    <img src="/arrow.png" alt="" />
                </button>
            </form>
        </>
    )
}

export default NewPrompt;