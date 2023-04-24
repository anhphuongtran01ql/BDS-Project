import './Messenger.css';
import ListChat from "./ListChat";
import Message from "./Message";

const Messenger = ({}) => {
    return (
        <>
            <div className="container">
                <ListChat/>
                <Message/>
            </div>
        </>
    )
}

export default Messenger;