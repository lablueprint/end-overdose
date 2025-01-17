import Image from 'next/image';
import {
    Description,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react';
import { useState } from 'react';

/**
 * Badge element that table is constructed with
 */

interface BadgeProps {
    badgeTitle: string;
    isActive: boolean;
}

const Badge = ({ badgeTitle, isActive }: BadgeProps) => {
    // child
    const [isOpen, setIsOpen] = useState(false);

    const badgeDescription =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    if (isActive) {
        return (
            <div>
                <img
                    src={'/badge.png'}
                    width={50}
                    height={50}
                    alt="Badge Image"
                    onClick={() => setIsOpen(true)}
                />
                <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    style={{ position: 'relative', zIndex: '50' }}
                >
                    <div
                        style={{
                            position: 'fixed',
                            inset: '0px',
                            display: 'flex',
                            width: '100vw',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '4px',
                        }}
                    >
                        <DialogPanel
                            style={{
                                maxWidth: '1024px',
                                marginTop: '16px',
                                borderWidth: '1px',
                                padding: '12px',
                                backgroundColor: 'black',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'start',
                                justifyContent: 'center',
                            }}
                        >
                            <DialogTitle style={{ fontWeight: '700' }}>
                                {badgeTitle}
                            </DialogTitle>
                            <Description>{badgeDescription}</Description>
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{
                                    borderWidth: '1px',
                                    borderColor: 'white',
                                    padding: '4px',
                                    alignSelf: 'center',
                                }}
                            >
                                Close
                            </button>
                        </DialogPanel>
                    </div>
                </Dialog>
                <p className="active-text">{badgeTitle}</p>
            </div>
        );
    } else {
        return (
            <div>
                <Image
                    src={'/badge-grey.jpeg'}
                    width={50}
                    height={50}
                    alt="Badge Image"
                />
                <p className="inactive-text">{badgeTitle}</p>
            </div>
        );
    }
};

export default Badge;
