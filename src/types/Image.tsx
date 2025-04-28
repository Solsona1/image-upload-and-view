type Image = {
    id: string;
    url: string;
    name: string;
}

type LoadedImage = {
    id: string;
    url: string;
    file: File;
}

export type { Image, LoadedImage };