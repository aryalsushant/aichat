import './newPrompt.css'
import { useRef, useEffect, useState } from 'react';
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const NewPrompt = ({data}) => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [img, setImg] = useState({
        isLoading: false,
        error: "",
        dbData: {},
        aiData: {},
    });

    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{text: "You are GenZ Brainrot, the ultimate Gen Z slang teacher who replies exclusively in chaotic, humorous Gen Z brainrot slang. Use quirky abbreviations, emojis, and pop culture references to explain slang terms and phrases in a fun way while staying informal and dripping with Gen Z vibes. Example: User: What does 'slay' mean? GenZ Brainrot: Omg, slay is like ✨peak vibes✨. It means you did something iconic, like queen-level amazing 🫶👑. You can slay an outfit, slay at work, or just slay at life in general. U go, king/queen/non-binary royalty 💅🔥. But don't make your responses longer than necessary, keep it short and sweet."
}],
            },
            {
                role: "model",
                parts: [{text: "Hello, what would you like to know?"}],
            },
        ],
        generationConfig: {
            //maxOutputTokens: 100
        },
    });

    const endRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({behavior: "smooth"});
    }, [question, answer, img.dbData]);

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => {
            return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    question: question.length > 0 ? question : undefined,
                    answer,
                    img: img.dbData?.filePath || undefined,
                }),
            }).then((res) => res.json());
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chat", data._id] }).then(() => {
                formRef.current.reset();
                setQuestion("");
                setAnswer("");
                setImg({
                    isLoading: false,
                    error: "",
                    dbData: {},
                    aiData: {},
                });
            });
        },
        onError: (err) => {
            console.log(err);
        }
    });

    const add = async (text, isInitial) => {
        if (!isInitial) setQuestion(text);

        try {
            const result = await chat.sendMessageStream(
                Object.entries(img.aiData).length ? [img.aiData, text] : [text]
            );
    
            let accumulatedText = "";
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                console.log(chunkText);
                accumulatedText += chunkText;
                setAnswer(accumulatedText);
            }

            await mutation.mutate();
        } catch(err) {
            console.log(err);
        }
        
        setImg({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {},
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const text = e.target.text.value;
        if(!text) return;
        add(text, false);
    };

    const hasRun = useRef(false);

    useEffect(() => {
        if (!hasRun.current) {
            if (data?.history?.length === 1) {
                add(data.history[0].parts[0].text, true);
            }
        }
        hasRun.current = true;
    }, []);

    return (
        <>
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
            {answer && (
                <div className="message">
                    <Markdown>{answer}</Markdown>
                </div>
            )}
            
            <div className="endChat" ref={endRef}></div>

            <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
                <Upload setImg={setImg} /> 
                <input id="file" type="file" multiple={false} hidden />
                <input type="text" name="text" placeholder='Ask anything...' />
                <button>
                    <img src="/arrow.png" alt="" />
                </button>
            </form>
        </>
    );
};

export default NewPrompt;