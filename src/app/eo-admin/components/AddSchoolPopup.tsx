'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { createNewSchool } from '@/app/api/schools/actions';
import { NewEOAdmin } from '@/types/newEOAdmin';

interface AddStudentPopupProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    onSchoolAdded?: () => void;
}

export default function AddSchoolPopup({
    isOpen,
    setIsOpen,
    onSchoolAdded,
}: AddStudentPopupProps) {
    const [inputValue, setInputValue] = useState('');

    function closeModal() {
        setIsOpen(false);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log('Student IDs:', inputValue);
        setInputValue('');
        createNewSchool(inputValue);
        if (onSchoolAdded) {
            onSchoolAdded();
        }
        closeModal();
    }

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                {/* Overlay */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        {/* Panel animation */}
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all relative">
                                <Dialog.Title className="text-xl font-extrabold text-gray-900 mb-4">
                                    ADD NEW SCHOOL
                                </Dialog.Title>
                                <hr className="border-t border-gray-300 mb-4" />

                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                                >
                                    X
                                </button>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-6">
                                        <label className="block text-med font-bold text-gray-700 mb-2">
                                            SCHOOL NAME (LOCATION)
                                        </label>
                                        <p className="text-sm text-gray-500 mb-4">
                                            Enter the full school name (no
                                            abbreviations) and location in
                                            pararenthesis.
                                        </p>
                                        <p className="text-sm text-gray-500 mb-6">
                                            EX - End Overdose High School
                                            (Pasadena, CA)
                                        </p>
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) =>
                                                setInputValue(e.target.value)
                                            }
                                            placeholder="Enter Student Name (Location)"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="bg-black text-white px-6 py-2 text-sm font-semibold rounded hover:bg-gray-800 transition-colors"
                                        >
                                            ADD
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
