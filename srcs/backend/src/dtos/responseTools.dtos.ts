export class responseDefault
{
    constructor(
        public error: boolean,
        public message: string,
    ){};
}

export class responseUploadPhoto
{
    constructor(
        public error: boolean,
        public message: string,
        public photo: string,
    ){};
}
