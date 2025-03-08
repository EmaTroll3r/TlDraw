import { getSnapshot, loadSnapshot } from 'tldraw';

export function handleExport(store: any) {
    const snapshot = getSnapshot(store);
    const blob = new Blob([JSON.stringify(snapshot)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tldraw-export.tldr';
    a.click();
    URL.revokeObjectURL(url);
}

export function handleImport(store: any, file: File) {
    const reader = new FileReader();
    reader.onload = (event) => {
        if (event.target?.result) {
            const snapshot = JSON.parse(event.target.result as string);
            loadSnapshot(store, snapshot);
        }
    };
    reader.readAsText(file);
}