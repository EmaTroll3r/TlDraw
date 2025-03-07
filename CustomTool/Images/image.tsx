import { AssetRecordType, createShapeId } from "tldraw";

export async function import_images(editor: any, files: FileList) {
    const shapeScale = 1.0;
    const shapeSpacing = 20;
    const shapeIds = []; // Array per salvare tutte le shapeId

    const promises = Array.from(files).map(async (file, i) => {
        const imgSrc = await readFileAsDataURL(file);
        const img = new Image();
        img.src = imgSrc;

        return new Promise<void>((resolve) => {
            img.onload = () => {
                const shapeId = add_img(editor, imgSrc, img.width, img.height, 0, i * (img.height + shapeSpacing * shapeScale));
                shapeIds.push(shapeId); // Salva la shapeId nell'array
                resolve();
            };
        });
    });

    await Promise.all(promises);

    // Puoi fare qualsiasi operazione necessaria con l'array shapeIds qui
    const groupid = createShapeId();
    editor.groupShapes(shapeIds, { groupId: groupid, select: false });
    editor.sendBack([groupid])
    editor.toggleLock([groupid]);
    /*
    setTimeout(() => {
        editor.toggleLock([groupid]);
    }, 100);
    */
}

function readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
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

    return shapeId;
}
