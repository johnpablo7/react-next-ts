import { LazyImage } from "@/components/LazyImage";
import { MouseEventHandler } from "react";
import { useState } from "react";

// Generate a random function between 1 and 123 with const?
const random = (): number => Math.floor(Math.random() * 123) + 1;

// generate simple unique id?
const generateId = () => Math.random().toString(36).substring(2, 9);

type ImageItem = {
  id: string;
  url: string;
};

export default function Home() {
  const [images, setImages] = useState<Array<ImageItem>>([]);

  const addNewFox: MouseEventHandler<HTMLButtonElement> = (event) => {
    // event.preventDefault();
    // const target = event.target;

    const newImageItem: ImageItem = {
      id: generateId(),
      url: `https://randomfox.ca/images/${random()}.jpg`,
    };

    setImages([...images, newImageItem]);
  };

  return (
    <main>
      <h1>Hello Platzi</h1>
      <button onClick={addNewFox}>Add New Fox</button>
      {images.map((image) => (
        <div key={image.id} className="p-4">
          <LazyImage
            src={image.url}
            alt="fox"
            width={320}
            height="auto"
            title="Random Fox"
            className="rounded-md bg-neutral-100"
            onClick={() => console.log("hey")}
          />
        </div>
      ))}
    </main>
  );
}
