import {
    Message,
} from '@chatscope/chat-ui-kit-react';
import ReactMarkDown from 'react-markdown';

const TextMessage = ({ role, content }) => {
    return (
        <Message className="mt-2"
            model={{
                direction: role === 'user' ? 'outgoing' : 'incoming',
                payload: (
                    <Message.CustomContent style={{ paddingBottom: 0 }}>
                        {role === 'user' ? (
                            content
                        ) : (
                            <ReactMarkDown
                                components={{
                                    p: ({ children }) => (
                                        <p style={{ marginBottom: 0, display: 'inline-block', whiteSpace: 'normal' }}>
                                            {children}
                                        </p>
                                    ),
                                    ul: ({ children }) => (
                                        <ul style={{ marginBottom: 0, paddingLeft: '1rem', display: 'inline-block' }}>
                                            {children}
                                        </ul>
                                    ),
                                    li: ({ children }) => (
                                        <li style={{ marginBottom: 0 }}>{children}</li>
                                    ),
                                }}
                            >
                                {content}
                            </ReactMarkDown>
                        )}
                    </Message.CustomContent>
                ),
            }}
        />
    );
};


export default TextMessage;
