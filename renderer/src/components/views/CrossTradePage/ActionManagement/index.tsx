import { ICrossTradeActionState, TActionDispatchType } from '@/@types/crossTrade';
import { Grid, FormGroup, FormControlLabel, Checkbox, Divider } from '@mui/material';

interface IComponentProps {
    actionsState: ICrossTradeActionState;
    updateState: (state: TActionDispatchType) => void;
}

const ActionManagement: React.FC<IComponentProps> = ({ actionsState, updateState }) => {
    function updateSyncInputHandler(event: React.ChangeEvent<HTMLInputElement>) {
        updateState({
            type: 'SYNC_INPUT',
            data: event.target.checked,
        });
    }

    function updateSyncActionHandler(event: React.ChangeEvent<HTMLInputElement>) {
        updateState({
            type: 'SYNC_ACTIONS',
            data: event.target.checked,
        });
    }
    function updateInvertActionHandler(event: React.ChangeEvent<HTMLInputElement>) {
        updateState({
            type: 'INVERT_ACTION',
            data: event.target.checked,
        });
    }
    function updateActiveBotHandler(event: React.ChangeEvent<HTMLInputElement>) {
        updateState({
            type: 'ACTIVE_BOT',
            data: event.target.checked,
        });
    }

    return (
        <FormGroup row>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <FormControlLabel
                        className="[&.MuiFormControlLabel-root]:flex [&.MuiFormControlLabel-root]:m-0 justify-end w-fit"
                        value="sync-input"
                        control={<Checkbox checked={actionsState.isSyncInput} onChange={updateSyncInputHandler} />}
                        label="Synchronize Inputs"
                        labelPlacement="start"
                        disabled={actionsState.isActivateBot}
                    />
                    <FormControlLabel
                        className="[&.MuiFormControlLabel-root]:flex [&.MuiFormControlLabel-root]:m-0 justify-end w-fit"
                        value="sync-actions"
                        control={<Checkbox checked={actionsState.isSyncActions} onChange={updateSyncActionHandler} />}
                        label="Synchronize Actions"
                        labelPlacement="start"
                        disabled={actionsState.isActivateBot}
                    />
                    <FormControlLabel
                        className="[&.MuiFormControlLabel-root]:flex [&.MuiFormControlLabel-root]:m-0 justify-end w-fit"
                        value="invert-action"
                        control={
                            <Checkbox checked={actionsState.isInvertAction} onChange={updateInvertActionHandler} />
                        }
                        label="Synchronize Invert Actions"
                        labelPlacement="start"
                        disabled={actionsState.isActivateBot}
                    />
                </Grid>
                <Divider orientation="vertical" />
                <Grid item xs={5}>
                    <FormControlLabel
                        value="active-bot"
                        control={<Checkbox checked={actionsState.isActivateBot} onChange={updateActiveBotHandler} />}
                        label="Activate trade bot"
                        labelPlacement="start"
                    />
                </Grid>
            </Grid>
        </FormGroup>
    );
};

export default ActionManagement;
