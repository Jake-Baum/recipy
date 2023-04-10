import { Alert, AlertColor, Snackbar } from "@mui/material";
import { createContext, useContext, useRef, useState } from "react";

interface SnackbarOptions {
	message: string;
	severity: AlertColor;
}

const SnackbarServiceContext = createContext<(options: SnackbarOptions) => Promise<void>>(Promise.reject);

export const useSnackbar = () => useContext(SnackbarServiceContext);

export const SnackbarServiceProvider = ({ children }: any) => {
	const [options, setOptions] = useState<SnackbarOptions | null>(null);

	const awaitingPromiseRef = useRef<{ resolve: () => void, reject: () => void }>();

	const showSnackbar = (options: SnackbarOptions) => {
		setOptions(options);

		return new Promise<void>((resolve, reject) => {
			awaitingPromiseRef.current = { resolve, reject };
		});
	}

	return (
		<>
			<SnackbarServiceContext.Provider value={showSnackbar} children={children} />
			<Snackbar
				open={!!options?.message}
				autoHideDuration={5000}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				onClose={() => setOptions(null)}
			>
				<Alert onClose={() => setOptions(null)} severity={options?.severity}>{options?.message}</Alert>
			</Snackbar>
		</>
	)
}