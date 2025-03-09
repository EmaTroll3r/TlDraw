import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { App, defaultRoomId } from './index';

export function roomIdManager(newRoomId: string) {
localStorage.setItem('roomId', newRoomId);
    const container = document.getElementById('root');
    if (container) {
        const root = ReactDOM.createRoot(container);
        root.render(<RoomIdManager initialRoomId={newRoomId} />);
    }
}

// Esponi la funzione globalmente
(window as any).roomIdManager = roomIdManager;


function RoomIdManager({ initialRoomId = defaultRoomId }: { initialRoomId?: string }) {
    const [roomId, setRoomId] = useState(initialRoomId);
    const [showRoomIdInput, setShowRoomIdInput] = useState(false);

    useEffect(() => {
        const storedRoomId = localStorage.getItem('roomId');
        if (storedRoomId) {
            setRoomId(storedRoomId);
        }
    }, []);

    // Expose a global function to change the room ID
    (window as any).setRoomId = (newRoomId: string) => {
        setRoomId(newRoomId);
        localStorage.setItem('roomId', newRoomId);
        window.location.reload();
    };

    return (
        <div>
            <App roomId={roomId} />
        </div>
    );
}

const container = document.getElementById('root');
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<RoomIdManager />);
}
