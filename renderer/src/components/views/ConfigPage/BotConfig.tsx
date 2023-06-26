import { ISystemConfigForm } from '@/@types/configs';

import { TextField, Grid, Checkbox, FormControlLabel, Button } from '@mui/material';

import useBotConfigViewController from './useBotConfigViewController';

interface IComponentProps {
    onSubmit: (form: ISystemConfigForm) => void;
    className?: string;
}

const BotConfigForm: React.FC<IComponentProps> = ({ className, onSubmit }) => {
    const {
        defaultForm,
        errors,
        alertAmountFieldControl,
        tradeTradeAmountFieldControl,
        tradeMinProfitAmountFieldControl,
        tradeActiveAmountFieldControl,
        crossActiveAmountFieldControl,
        crossMinProfitAmountFieldControl,
        crossTradeAmountFieldControl,
        themeFieldControl,
        isDarkMode,
        submit,
        restoreDefaultConfig,
    } = useBotConfigViewController(onSubmit);

    return (
        <section className={className}>
            <h2 className="text-lg font-semibold my-4 pl-5">Bot Configs</h2>
            <form onSubmit={submit}>
                <div className="pl-10">
                    <h4 className="text-base font-semibold my-4">Common</h4>

                    <Grid className="pl-5" container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                inputRef={alertAmountFieldControl.ref}
                                label="Alert Amount (USD):"
                                variant="standard"
                                helperText={errors.alertAmount?.message}
                                defaultValue={defaultForm?.alertAmount}
                                error={!!errors.alertAmount?.message}
                                name={alertAmountFieldControl.name}
                                onChange={alertAmountFieldControl.onChange}
                                onBlur={alertAmountFieldControl.onBlur}
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    width: '100%',
                                    mb: '.75rem',
                                    '& input:focus': {
                                        boxShadow: 'none',
                                    },
                                    '& .MuiFormLabel-root': {
                                        color: 'black',
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className="pl-10">
                    <h4 className="text-base font-semibold my-4">Trade View</h4>
                    <Grid className="pl-5" container rowSpacing={2} columnSpacing={4}>
                        <Grid item xs={6}>
                            <TextField
                                inputRef={tradeTradeAmountFieldControl.ref}
                                label="Trade Amount (USD):"
                                variant="standard"
                                helperText={errors.tradeTradeAmount?.message}
                                defaultValue={defaultForm?.tradeTradeAmount}
                                error={!!errors.tradeTradeAmount?.message}
                                name={tradeTradeAmountFieldControl.name}
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    width: '100%',
                                    mb: '.75rem',
                                    '& input:focus': {
                                        boxShadow: 'none',
                                    },
                                    '& .MuiFormLabel-root': {
                                        color: 'black',
                                    },
                                }}
                                onChange={tradeTradeAmountFieldControl.onChange}
                                onBlur={tradeTradeAmountFieldControl.onBlur}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                inputRef={tradeMinProfitAmountFieldControl.ref}
                                label="Minimun Predicted Profit Trade Amount (USD):"
                                variant="standard"
                                helperText={errors.tradeMinProfitAmount?.message}
                                defaultValue={defaultForm?.tradeMinProfitAmount}
                                error={!!errors.tradeMinProfitAmount?.message}
                                name={tradeMinProfitAmountFieldControl.name}
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    width: '100%',
                                    mb: '.75rem',
                                    '& input:focus': {
                                        boxShadow: 'none',
                                    },
                                    '& .MuiFormLabel-root': {
                                        color: 'black',
                                    },
                                }}
                                onChange={tradeMinProfitAmountFieldControl.onChange}
                                onBlur={tradeMinProfitAmountFieldControl.onBlur}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                inputRef={tradeActiveAmountFieldControl.ref}
                                label="Active Amount (USD):"
                                variant="standard"
                                helperText={errors.tradeActiveAmount?.message}
                                defaultValue={defaultForm?.tradeActiveAmount}
                                error={!!errors.tradeActiveAmount?.message}
                                name={tradeActiveAmountFieldControl.name}
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    width: '100%',
                                    mb: '.75rem',
                                    '& input:focus': {
                                        boxShadow: 'none',
                                    },
                                    '& .MuiFormLabel-root': {
                                        color: 'black',
                                    },
                                }}
                                onChange={tradeActiveAmountFieldControl.onChange}
                                onBlur={tradeActiveAmountFieldControl.onBlur}
                            />
                        </Grid>
                    </Grid>
                </div>

                <div className="pl-10">
                    <h4 className="text-base font-semibold my-4">Cross-platform trade</h4>
                    <Grid className="pl-5" container rowSpacing={2} columnSpacing={4}>
                        <Grid item xs={6}>
                            <TextField
                                inputRef={crossTradeAmountFieldControl.ref}
                                label="Trade Amount (USD):"
                                variant="standard"
                                helperText={errors.crossTradeAmount?.message}
                                defaultValue={defaultForm?.crossTradeAmount}
                                error={!!errors.crossTradeAmount?.message}
                                name={crossTradeAmountFieldControl.name}
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    width: '100%',
                                    mb: '.75rem',
                                    '& input:focus': {
                                        boxShadow: 'none',
                                    },
                                    '& .MuiFormLabel-root': {
                                        color: 'black',
                                    },
                                }}
                                onChange={crossTradeAmountFieldControl.onChange}
                                onBlur={crossTradeAmountFieldControl.onBlur}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                inputRef={crossMinProfitAmountFieldControl.ref}
                                label="Minimun Profit Trade Amount (USD):"
                                variant="standard"
                                helperText={errors.crossMinProfitAmount?.message}
                                defaultValue={defaultForm?.crossMinProfitAmount}
                                error={!!errors.crossMinProfitAmount?.message}
                                name={crossMinProfitAmountFieldControl.name}
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    width: '100%',
                                    mb: '.75rem',
                                    '& input:focus': {
                                        boxShadow: 'none',
                                    },
                                    '& .MuiFormLabel-root': {
                                        color: 'black',
                                    },
                                }}
                                onChange={crossMinProfitAmountFieldControl.onChange}
                                onBlur={crossMinProfitAmountFieldControl.onBlur}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                inputRef={crossActiveAmountFieldControl.ref}
                                label="Active Amount (USD):"
                                variant="standard"
                                helperText={errors.crossActiveAmount?.message}
                                defaultValue={defaultForm?.crossActiveAmount}
                                error={!!errors.crossActiveAmount?.message}
                                name={crossActiveAmountFieldControl.name}
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    width: '100%',
                                    mb: '.75rem',
                                    '& input:focus': {
                                        boxShadow: 'none',
                                    },
                                    '& .MuiFormLabel-root': {
                                        color: 'black',
                                    },
                                }}
                                onChange={crossActiveAmountFieldControl.onChange}
                                onBlur={crossActiveAmountFieldControl.onBlur}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className="pl-5">
                    <h2 className="text-lg font-semibold my-4">Theme</h2>

                    <Grid className="pl-5" container>
                        <Grid item xs={6}>
                            <FormControlLabel
                                label="Dark mode"
                                labelPlacement="start"
                                control={
                                    <Checkbox
                                        inputRef={themeFieldControl.ref}
                                        name={themeFieldControl.name}
                                        checked={isDarkMode}
                                        onChange={themeFieldControl.onChange}
                                    />
                                }
                            />
                        </Grid>
                    </Grid>
                </div>

                <div className="w-full pt-5 flex justify-end">
                    <Button
                        variant="outlined"
                        sx={{ width: '25%', fontWeight: 600, mr: 3 }}
                        onClick={restoreDefaultConfig}
                    >
                        Restore default
                    </Button>
                    <Button type="submit" variant="outlined" sx={{ width: '25%', fontWeight: 600 }}>
                        Save
                    </Button>
                </div>
            </form>
        </section>
    );
};

export default BotConfigForm;
