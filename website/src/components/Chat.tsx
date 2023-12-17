import { GiCancel } from "react-icons/gi";
import { RxAvatar } from "react-icons/rx";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import supabase from "@/utils/supabase";

const socket = io("http://localhost:3001");

export default function Chat({ setChatActive }: any): JSX.Element {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const chatContainerRef = useRef<any>(null);

  async function readDatabase() {
    let { data: chat, error } = await supabase.from("chat").select("*");
    setMessages(chat);
  }

  async function sendMessage(e: any) {
    e.preventDefault();

    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour12: false,
    });

    const messageData = { text: messageInput, date: currentTime };

    const { data, error } = await supabase
      .from("chat")
      .insert([{ text: messageInput, date: currentTime }])
      .select();

    socket.emit("message", messageData);
    setMessageInput("");
  }

  useEffect(() => {
    readDatabase();
    socket.on("message", (data: any) => {
      setMessages((prevMessages): any => [
        ...prevMessages,
        { text: data.text, date: data.date },
      ]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section className="fixed top-28 left-4 md:left-1/4 w-11/12 md:w-1/2 h-3/4 bg-purple-300 rounded-2xl shadow-xl backdrop-brightness-50 flex flex-col items-center">
      <div className="flex flex-row w-full h-12 mt-4 justify-center items-center border-b-2 shadow-lg">
        <p className="mr-auto ml-auto pl-8 font-bold text-2xl tracking-wide">
          Chat
        </p>
        <button
          className="flex justify-center items-center scale-150 mr-8 mb-1 text-red-600 hover:text-red-400"
          onClick={() => setChatActive(false)}
        >
          <GiCancel />
        </button>
      </div>
      <section
        className="w-full h-full mt-2 mb-4 overflow-auto"
        ref={chatContainerRef}
      >
        {messages &&
          messages.map((message: any, _: any): JSX.Element => {
            return (
              <div
                key={_}
                className="flex flex-col w-full mt-4 overflow-hidden scroll-smooth"
              >
                <div className="flex flex-row items-center justify-evenly">
                  <div className="flex flex-col justify-center items-center h-12">
                    <RxAvatar className="scale-150" />
                    <p>{message.date}</p>
                  </div>
                  <div className="w-10/12 h-8 rounded-lg bg-white flex flex-wrap items-center pl-2 pr-2 tracking-wider">
                    <p className="overflow-hidden">{message.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </section>
      <form
        className="mt-auto w-full mb-2 h-10 flex flex-row justify-around"
        onSubmit={(e) => sendMessage(e)}
      >
        <input
          className="pl-2 pr-2 border-2 rounded-lg w-9/12 tracking-wider shadow-xl"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          autoFocus
        />
        <button
          className="bg-blue-300 rounded-lg w-2/12 tracking-wider hover:bg-blue-400 shadow-xl"
          type="submit"
          onClick={(e) => sendMessage(e)}
        >
          Send
        </button>
      </form>
    </section>
  );
}
