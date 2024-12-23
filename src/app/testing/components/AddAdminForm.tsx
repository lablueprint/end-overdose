'use client';
import { useState, useTransition } from 'react';
import { addAdmin } from '@/app/api/admins/actions';
import { Admin } from '@/types/Admin';

export function AddAdminForm() {
    const [newEmail, setNewEmail] = useState('');
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // create an admin object (custom email w/ placeholder fields)
            const admin: Admin = {
                name: {
                    first: 'John',
                    last: 'Doe',
                },
                email: newEmail,
                role: 'school_admin',
                school_name: 'Rawr School',
                approved: true,
            };
            await addAdmin(admin);
            setNewEmail('');
        } catch (error) {
            console.error(error);
            alert('Failed to add admin.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                 className="border-black border-2"
            />
            <button type="submit" disabled={isPending} className="bg-blue-500 text-white rounded-lg p-1">
                {isPending ? 'Adding...' : 'Add Admin'}
            </button>
        </form>
    );
}
