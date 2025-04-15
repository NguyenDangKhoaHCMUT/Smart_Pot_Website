import { useState, useContext, useEffect, useRef } from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  Avatar
} from '@chatscope/chat-ui-kit-react';
import Popup from "reactjs-popup";
import {
  doc,
  onSnapshot,
} from "firebase/firestore";
import { Button, Spinner } from 'react-bootstrap';

// Import bubble open button style
import "../../pagestyles/chatbubble.css";

import PlantContext from "../../context/PlantContext";
import TextMessage from "./TextMessage";
import FunctionCallMessage from "./FunctionCallMessage";
import FunctionResponseMessage from "./FunctionResponseMessage";

const ChatBubble = () => {
  const { initializeFirestore, sendRequest, chatID, setChatID, loading } = useContext(PlantContext);

  const [chat, setChat] = useState({
    History: [],
    Token: 0
  });

  useEffect(() => {
    if (!chatID) return;

    const db = initializeFirestore();
    const docRef = doc(db, "Assistant_Chat", chatID);

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setChat(docSnap.data());
        } else {
          console.warn("Chat document not found");
        }
      },
      (error) => {
        console.error("Error fetching chat:", error);
      }
    );

    return () => unsubscribe();
  }, [chatID]);

  const handleSendMessage = (message) => {
    switch (message) {
      case '/help':
        setChat((prev) => ({
          ...prev,
          History: [
            ...prev.History,
            {
              role: 'user',
              parts: [
                {
                  text: `
                  List of commands:
                  /load <id>: Load chat history with ID
                  /clear: Create a new chat
                  `
                }
              ]
            }
          ]
        }));
        break;
      case '/load':

        break;
      case '/clear':
        setChatID(null);
        break;
      default:
        sendRequest(message, 'send_message');
        setChat((prev) => ({
          ...prev,
          History: [
            ...prev.History,
            {
              role: 'user',
              parts: [
                {
                  text: message
                }
              ]
            }
          ]
        }));
        break;
    }
  };

  return (
    <Popup
      trigger={<button className="btn-open-chatbubble"></button>}
      position="left bottom"
      closeOnDocumentClick
      contentStyle={{
        padding: 0,
        backgroundColor: "rgba(0,0,0,0.0)",
        border: "none",
        boxShadow: "none"
      }}
      arrow={false}
    >
      <div
        className="chatbubble-expanded"
      >
        <MainContainer>
          <ChatContainer>
            <ConversationHeader>
              <Avatar
                name="Demeter"
                src="https://logowik.com/content/uploads/images/abstract-floral-plant8693.logowik.com.webp"
              />
              <ConversationHeader.Content
                info='Your helpful AI assistant'
                userName='Demeter'
              />
              <ConversationHeader.Actions>
                <Button>{chat.Token} token</Button>
              </ConversationHeader.Actions>
            </ConversationHeader>
            <MessageList>
              <Message model={{
                direction: "incoming",
                payload: <Message.CustomContent>
                  <strong>Hi there 👋</strong><br />
                  How can i help you today?
                </Message.CustomContent>
              }} />
              {
                chat.History.map((turn, turnIndex) => {
                  const currentTurnRole = turn.role;
                  return turn.parts.map((part, partIndex) => {
                    if (Object.hasOwn(part, 'text'))
                      return <TextMessage
                        key={`msg-turn${turnIndex}-part${partIndex}`}
                        role={currentTurnRole}
                        content={part.text}
                      />;
                    if (Object.hasOwn(part, 'function_call'))
                      return <FunctionCallMessage
                        key={`msg-turn${turnIndex}-part${partIndex}`}
                        role={currentTurnRole}
                        functionCall={part.function_call}
                      />;
                    if (Object.hasOwn(part, 'function_response'))
                      return <FunctionResponseMessage
                        key={`msg-turn${turnIndex}-part${partIndex}`}
                        role={'model'}
                        functionResponse={part.function_response}
                      />;
                  });
                })
              }
              {loading ?
                <div className='mt-2 mb-2' style={{
                  height: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Spinner animation="border" role="status" />
                  Handling your request
                </div> : null
              }

            </MessageList>
            <MessageInput
              disabled={loading}
              onSend={(message) => handleSendMessage(message)}
              placeholder='Type query here'
              attachButton={false}
              onPaste={(event) => {
                event.preventDefault(); // Prevent default paste behavior
                const text = event.clipboardData.getData("text/plain"); // Get only plain text
                document.execCommand("insertText", false, text); // Insert plain text manually
              }}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </Popup>
  );
};

export default ChatBubble;
