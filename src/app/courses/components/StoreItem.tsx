import styles from './StoreItem.module.css';

interface StoreItemProps {
    name: string;
    price: number;
    image: string;
}

export default function StoreItem({ name, price, image }: StoreItemProps) {
    return (
        <div className={styles.storeItem}>
            Store
            <p>Name: {name}</p>
            <p>Price: {price}</p>
            <p>Image: {image}</p>
        </div>
    );
}
