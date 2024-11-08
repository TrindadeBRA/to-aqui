'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { Jimp } from "jimp";

export default function SimpleImage() {
    const [selectedFile, setSelectedFile] = useState("");
    const [output, setOutput] = useState("");

    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = async (e) => {
            const data = e.target?.result;

            if (!data || !(data instanceof ArrayBuffer)) {
                return;
            }

            // Manipulate images uploaded directly from the website.
            const image = await Jimp.fromBuffer(data);

            image
                .greyscale()
                .contrast(0.5)
                .brightness(0.2)
                .blur(2)
                .sepia();

            setSelectedFile(URL.createObjectURL(file));
            setOutput(await image.getBase64("image/png"));
        };

        reader.readAsArrayBuffer(file);
    }

    useEffect(() => {
        // Or load images hosted on the same domain.
        Jimp.read("/jimp/dice.png").then(async (image) => {
            setSelectedFile(await image.getBase64("image/png"));
            image
                .greyscale()
                .contrast(0.5)
                .blur(2)
                .sepia();
            setOutput(await image.getBase64("image/png"));
        });
    }, []);

    return (
        <div>
            {/* A file input that takes a png/jpeg */}
            <input type="file" accept="image/*" onChange={handleFile} />

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    width: "100%",
                }}
            >
                {selectedFile && (
                    <Image
                        style={{ flex: 1, minWidth: 0, objectFit: "contain", margin: 0 }}
                        src={selectedFile}
                        alt="Input"
                        width={200}
                        height={300}
                    />
                )}
                {output && (
                    <Image
                        style={{ flex: 1, minWidth: 0, objectFit: "contain", margin: 0 }}
                        src={output}
                        alt="Output"
                        width={200}
                        height={300}
                    />
                )}
            </div>
        </div>
    );
} 