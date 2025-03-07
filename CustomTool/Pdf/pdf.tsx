import { AssetRecordType, createShapeId } from "tldraw"
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';

// Configura il percorso del worker con la versione corretta
GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

export async function import_pdf(editor: any, file: File) {
    const fileReader = new FileReader();

    const shapeScale = 3.0;
    const shapeSpacing = 20;
    const shapeIds = []; // Array per salvare tutte le shapeId

    fileReader.onload = async function () {
        const typedArray = new Uint8Array(this.result as ArrayBuffer);
        const pdf = await getDocument({ data: typedArray }).promise;

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: shapeScale }); // Aumenta il valore di scala per migliorare la qualità

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: context,
                viewport: viewport,
            };

            await page.render(renderContext).promise;

            // Aggiungi il canvas al tuo editor o fai qualsiasi altra operazione necessaria
            const shapeId = add_img(editor, canvas.toDataURL(), viewport.width, viewport.height, 0, (pageNum - 1) * (viewport.height + shapeSpacing * shapeScale));
            shapeIds.push(shapeId); // Salva la shapeId nell'array
        }

        // Puoi fare qualsiasi operazione necessaria con l'array shapeIds qui
        //console.log('Shape IDs:', shapeIds);
        const groupid = createShapeId()
        editor.groupShapes(shapeIds, { groupId: groupid, select:false});
        setTimeout(() => {
            editor.toggleLock([groupid]);
        }, 100);
    };
    fileReader.readAsArrayBuffer(file);
}

export function add_img(editor, imgSrc, imageWidth, imageHeight, xPos, yPos) {
    const assetId = AssetRecordType.createId();
    const shapeId = createShapeId();

    editor.createAssets([
        {
            id: assetId,
            type: 'image',
            typeName: 'asset',
            props: {
                name: 'tldraw.png',
                src: imgSrc,
                w: imageWidth,
                h: imageHeight,
                mimeType: 'image/png',
                isAnimated: false,
            },
            meta: {},
        },
    ]);

    editor.createShape({
        id: shapeId,
        type: 'image',
        x: xPos,
        y: yPos,
        props: {
            assetId,
            w: imageWidth,
            h: imageHeight,
        },
    });

    // Blocca la forma appena creata
    //editor.toggleLock([shapeId]);
    return shapeId;
}