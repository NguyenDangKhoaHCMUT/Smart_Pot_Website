import { Message } from '@chatscope/chat-ui-kit-react';
import { useState } from 'react';

const FunctionResponseMessage = ({ role, functionResponse }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Message className="mt-2"
            model={{
                direction: role === 'user' ? 'outgoing' : 'incoming',
                payload: (
                    <Message.CustomContent style={{ padding: '8px' }}>
                        <strong>Response: {functionResponse.name}</strong>
                        <hr className="m-0 mt-2 mb-2" />
                        <button
                            className="btn btn-sm btn-outline-primary mb-2"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? 'Hide Response' : 'Show Response'}
                        </button>
                        {isOpen && (
                            <div className="bg-light p-2 rounded border" style={{ maxWidth: '400px', overflowX: 'auto' }}>
                                <pre className="m-0" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                    {JSON.stringify(functionResponse.response, null, 2)}
                                </pre>
                            </div>
                        )}
                    </Message.CustomContent>
                ),
            }}
        />
    );
};

export default FunctionResponseMessage;
