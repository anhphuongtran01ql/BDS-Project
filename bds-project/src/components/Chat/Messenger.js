import './Messenger.css';
import NoImageAvailable from "../../assets/No_Image_Available.jpg";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';
import {useEffect, useMemo, useState} from "react";
import useMessenger from "../../CustomHook/useMessenger";

const CONTENT = ' Hi !! This is message from Riya . Lorem ipsum, dolor sit amet consectetur adipisicing\n' +
    '                                        elit. Non quas nemo eum, earum sunt, nobis similique quisquam eveniet pariatur\n' +
    '                                        commodi modi voluptatibus iusto omnis harum illum\n' +
    '                                        iste distinctio expedita illo!';

const MessageBaseOnType = ({className, message}) => {
    return (
        <div className={className}>
            {message}
        </div>
    )
}
const Messenger = ({}) => {
    const userId = 1;
    const [messages] = useMessenger(LIST_MESSAGE);

    return (
        <>
            <div className="container">
                <div className="msg-header">
                    <div className="container1">
                        <AccountCircleIcon sx={{
                            width: ' 50px',
                            verticalAlign: 'middle',
                            borderStyle: 'none',
                            borderRadius: '100%'
                        }} className="msg-image"/>
                        <div className="active ">
                            User name
                        </div>
                    </div>
                </div>

                <div className="chat-page">
                    <div className="msg-inbox">
                        <div className="chats">
                            <div className="msg-page">
                            </div>
                        </div>
                        {
                            messages.map((message, index) => {
                                if (message.userId === userId) {
                                    return (
                                        <div className="received-chats" key={index}>
                                            <div className="received-chats-img">
                                                <AccountCircleIcon fontSize='large' className='received-chats-img'/>
                                            </div>
                                            <div className="received-msg">
                                                <div className="received-msg-inbox">
                                                    {
                                                        message.multiple === true ?
                                                            message.messages.map((item, itemIndex) => <MessageBaseOnType
                                                                className='received-msg-inbox-content'
                                                                message={item} key={`${itemIndex}-left-message`}/>)
                                                            :
                                                            <MessageBaseOnType message={message.message}
                                                                               className='received-msg-inbox-content'/>
                                                    }
                                                </div>
                                            </div>
                                        </div>)
                                } else {
                                    return (
                                        <div className="outgoing-chats" key={index}>
                                            <div className="outgoing-chats-img">
                                                <AccountCircleIcon fontSize='large' className='received-chats-img'/>
                                            </div>
                                            <div className="outgoing-chats-msg">
                                                {
                                                    message.multiple === true ?
                                                        message.messages.map((item, itemIndex) => <MessageBaseOnType
                                                            className='multi-msg'
                                                            message={item} key={`${itemIndex}-right-message`}/>)
                                                        :
                                                        <MessageBaseOnType message={message.message}
                                                                           className='multi-msg'/>
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }

                        <div className="msg-bottom">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Write message..."/>
                                <div className="input-group-append ">
                            <span className="input-group-text send-icon "><SendIcon className="bi bi-send "></SendIcon>
                            </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messenger;