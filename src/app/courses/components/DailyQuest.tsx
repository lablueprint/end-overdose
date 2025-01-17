'use client';

import { useRouter } from 'next/navigation';

interface DailyQuestProps {
    questPath: string;
    questTitle: string;
    questDescription: string;
    totalTasks: number;
    completedTasks: number;
}

export default function DailyQuest({
    questPath,
    questTitle,
    questDescription,
    totalTasks,
    completedTasks,
}: DailyQuestProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/quests/${questPath}`);
    };

    return (
        <div className="relative cursor-pointer border-2 w-full max-w-md min-h-32 m-5 p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div onClick={handleClick} className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center flex-shrink-0">
                    {/* Empty circle icon */}
                </div>
                <div className="flex-grow">
                    <h2 className="text-xl font-bold mb-2">{questTitle}</h2>
                    <p className="text-sm text-gray-600 mb-2">
                        {questDescription}
                    </p>
                    <div className="flex items-center space-x-2">
                        <progress
                            value={(completedTasks / totalTasks) * 100}
                            className="flex-grow"
                        />
                        <span className="text-sm font-medium">
                            {completedTasks}/{totalTasks}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
