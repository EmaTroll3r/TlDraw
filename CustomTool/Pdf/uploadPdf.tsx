import React, { useRef, useEffect } from 'react';

export function UploadPdf({ onFileSelect, trigger }: { onFileSelect: (file: File) => void, trigger: boolean }) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };

    useEffect(() => {
        if (trigger) {
            fileInputRef.current?.click();
        }
    }, [trigger]);

    return (
        <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
        />
    );
}
