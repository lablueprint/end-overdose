import Image from 'next/image';

/**
 * Badge element that table is constructed with
 */

interface BadgeProps {
    badgeTitle: string;
    isActive: boolean;
}

const Badge = ({ badgeTitle, isActive }: BadgeProps) => {
    // child
    if (isActive) {
        return (
            <div>
                <Image
                    src={'/badge.png'}
                    width={50}
                    height={50}
                    alt="Badge Image"
                />
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
