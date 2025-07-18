
type FileNode = File | Folder
export type FileTree = FileNode[]

export interface File {
    type: 'file'
    id: string;
    name: string;
}

interface Folder {
    type: 'folder'
    id: string;
    name: string;
    files: FileNode[]
}