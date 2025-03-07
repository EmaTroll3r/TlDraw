import React, { useRef, useEffect } from 'react';

export function UploadImage({ onFilesSelect, trigger }: { onFilesSelect: (files: FileList) => void, trigger: boolean }) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            onFilesSelect(files);
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
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            multiple
            onChange={handleFileChange}
        />
    );
}
