import { useState } from "react";
import { MouseEventHandler } from "react";
import { LazyImage } from "@/components/LazyImage";
import { random } from "lodash";

// Generate a random function between 1 and 123 with const?
// const random = (): number => Math.floor(Math.random() * 123) + 1;
const MyRandom = () => random(1, 123);

// generate simple unique id?
const generateId = () => Math.random().toString(36).substring(2, 9);

// Se hizo un tipo global y esta en el archivo app.d.ts
// type ImageItem = {
//   id: string;
//   url: string;
// };

export default function Home() {
  const [images, setImages] = useState<Array<IImageItem>>([]);

  const addNewFox: MouseEventHandler<HTMLButtonElement> = (event) => {
    // event.preventDefault();
    // const target = event.target;

    const newImageItem: IImageItem = {
      id: generateId(),
      url: `https://randomfox.ca/images/${MyRandom()}.jpg`,
    };

    setImages([...images, newImageItem]);

    // window.plausible("add_fox", {
    //   lodash/index.d.ts
    // })
  };

  return (
    <main>
      <h1>Hello Platzi</h1>
      <button onClick={addNewFox}>Add New Fox</button>
      {images.map(({ id, url }, index) => (
        <div key={id} className="p-4">
          <LazyImage
            src={url}
            alt="fox"
            width={320}
            height="auto"
            title="Random Fox"
            className="rounded-md bg-neutral-100"
            onClick={() => console.log("hey")}
            onLazyLoad={(img) => {
              console.log(`Image #${index + 1} cargada. Nodo:`, img);
            }}
          />
        </div>
      ))}
    </main>
  );
}
