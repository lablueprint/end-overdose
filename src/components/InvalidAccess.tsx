import {
    Description,
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogBackdrop,
} from '@headlessui/react';
import { useState, useEffect } from 'react';

export default function InvalidAccess() {
    const [open, setOpen] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
        }, 5000); // close after 5000 ms (5 seconds)

        return () => clearTimeout(timer); // cleanup the timer on unmount
    }, []);

    return (
        <>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                className="relative"
            >
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="dialog-container">
                    <DialogPanel className="dialog-panel">
                        <DialogTitle>Invalid Page Access</DialogTitle>
                        <Description>Returning to home page</Description>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}
