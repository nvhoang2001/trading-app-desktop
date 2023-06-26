import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button } from '@mui/material';

interface IComponentProps {
    isOpen: boolean;
    onOk: () => void;
    onCancel: () => void;
}

const ConfirmImportAccountDialog: React.FC<IComponentProps> = ({ isOpen, onCancel, onOk }) => {
    return (
        <Dialog open={isOpen} onClose={onCancel}>
            <DialogTitle>Warning!</DialogTitle>
            <DialogContent>
                <Typography>Your existing account'll be deleted once you import a new account</Typography>
                <Typography>Do you really want to proceed?</Typography>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" variant="contained" onClick={onCancel}>
                    Cancel
                </Button>
                <Button color="error" variant="contained" onClick={onOk}>
                    Proceed
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmImportAccountDialog;
