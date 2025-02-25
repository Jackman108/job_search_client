import React, {useEffect, useState} from 'react';
import {SubscriptionItem} from '../../types/Subscription.types';

interface SubscriptionFormProps {
    initialData?: SubscriptionItem | null;
    onSubmit: (formData: Partial<SubscriptionItem>) => void;
    onCancel: () => void;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({initialData, onSubmit, onCancel}) => {
    const [formData, setFormData] = useState<Partial<SubscriptionItem>>({
        subscriptionType: 'daily',
        price: 0,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Subscription Type:</label>
                <select
                    name="subscriptionType"
                    value={formData.subscriptionType}
                    onChange={handleChange}
                >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Start Date:</label>
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate?.split('T')[0]}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>End Date:</label>
                <input
                    type="date"
                    name="endDate"
                    value={formData.endDate?.split('T')[0]}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">{initialData ? 'Обновить' : 'Создать'}</button>
            <button type="button" onClick={onCancel}>Отмена</button>
        </form>
    );
};

export default SubscriptionForm;