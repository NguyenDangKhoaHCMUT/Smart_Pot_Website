import { Message } from '@chatscope/chat-ui-kit-react';

const FunctionCallMessage = ({ role, functionCall }) => {
    const hasParams = Object.keys(functionCall.args).length > 0;

    return (
        <Message className="mt-2"
            model={{
                direction: role === 'user' ? 'outgoing' : 'incoming',
                payload: (
                    <Message.CustomContent style={{ padding: '8px' }}>
                        <strong>Dispatching: {functionCall.name}</strong>
                        <hr className="m-0 mt-2 mb-2" />
                        {hasParams ? (
                            <ul className="list-group">
                                {Object.entries(functionCall.args).map(([key, value]) => (
                                    <li key={key} className="list-group-item p-1 px-2">
                                        <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-muted m-0">No parameters</p>
                        )}
                    </Message.CustomContent>
                ),
            }}
        />
    );
};

export default FunctionCallMessage;
