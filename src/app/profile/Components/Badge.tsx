import Image from 'next/image';

interface BadgeProps {
    badgeTitle: string;
    badgeImage: string;
}

const Badge = ({ badgeTitle, badgeImage }: BadgeProps) => {
    // child
    return (
        <div>
            <Image src={badgeImage} width={50} height={50} alt="Badge Image" />
            <p>{badgeTitle}</p>
        </div>
    );
};

export default Badge;
