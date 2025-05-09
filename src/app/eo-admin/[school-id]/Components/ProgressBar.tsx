type ProgressBarProps = {
    label: string;
    percentage: number;
};

export default function ProgressBar({ label, percentage }: ProgressBarProps) {
    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-xl text-black py-2">
                    {label}
                </span>
                <span className="text-sm text-gray-400">
                    <span className="text-black font-semibold">
                        {percentage}%
                    </span>{' '}
                    Avg. Score
                </span>
            </div>
            <div className="w-full bg-green-100 h-3 rounded-full">
                <div
                    className="h-3 rounded-full"
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: '#02B56B',
                    }}
                />
            </div>
        </div>
    );
}
