import { useState } from "react";

export function useModal(){
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [type, setType] = useState('green');

    const openModal = (title,message,modalType) =>{
        setTitle(title);
        setMessage(message);
        setType(modalType);
        setIsOpen(true);
    };

    const closeModal = () =>{
        setIsOpen(false);
        setTitle('');
        setMessage('');
    }

    return {isOpen,message,title,type,openModal,closeModal};
}