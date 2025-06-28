export interface File {
    type: 'file'
    id: string;
    name: string;
}

export interface Folder {
    type: 'folder'
    id: string;
    name: string;
    expanded?: boolean;
    files: FileNode[]
}

export type FileNode = File | Folder

export type FileNodeExt = FileNode & { parent?: FileNode }