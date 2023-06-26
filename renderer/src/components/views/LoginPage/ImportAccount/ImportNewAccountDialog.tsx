import { Button, Dialog, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useDropzone } from 'react-dropzone';
import { useCallback, type MouseEventHandler } from 'react';
import classNames from 'classnames';

interface IComponentProps {
    isOpen: boolean;
    onOk: (path: string) => void;
    onCancel: () => void;
    onOpenFile: () => Promise<void>;
}

const ImportNewAccountDialog: React.FC<IComponentProps> = ({ isOpen, onCancel, onOk, onOpenFile }) => {
    const onFileDrop = useCallback(
        (files: File[]) => {
            if (files.length > 0) {
                // @ts-ignore
                onOk(files[0].path);
            }
        },
        [onOk]
    );

    const dropAreaClickHandler: MouseEventHandler<HTMLElement> = useCallback(
        (event) => {
            event.stopPropagation();
            onOpenFile();
        },
        [onOpenFile]
    );

    const { getRootProps, getInputProps, isDragActive, inputRef } = useDropzone({
        onDrop: onFileDrop,
        multiple: false,
        noClick: true,
    });

    return (
        <Dialog open={isOpen} maxWidth="md" onClose={onCancel}>
            <DialogTitle>
                <div className="flex justify-end">
                    <Button onClick={onCancel}>
                        <CloseIcon />
                    </Button>
                </div>
            </DialogTitle>
            <div
                {...getRootProps({
                    className: classNames(
                        'h-80 w-[700px] flex justify-center items-center',
                        'border-2 border-dashed border-gray-400 m-4',
                        {
                            'border-blue-500': isDragActive,
                            'bg-blue-500/50': isDragActive,
                        }
                    ),
                    onClick: dropAreaClickHandler,
                })}
            >
                <input {...getInputProps()} />
                <CloudDownloadIcon
                    sx={{ fontSize: '3.75rem' }}
                    className={classNames({
                        'text-blue-500': isDragActive,
                    })}
                />
            </div>
        </Dialog>
    );
};

export default ImportNewAccountDialog;
