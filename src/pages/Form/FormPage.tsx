import React, { useState, useEffect } from 'react';
import type {
    FieldValues,
    SubmitHandler,
    UseFormReturn
} from 'react-hook-form';
import { useForm } from 'react-hook-form';
import styles from './FormPage.module.scss';
import { InputProps, SelectProps } from './FormPage.props';

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => (
    <input ref={ref} {...props} />
));

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ options, ...props }, ref) => (
        <select ref={ref} {...props}>
            {options.map(({ label, value }) => (
                <option key={String(value)} value={value}>
                    {label}
                </option>
            ))}
        </select>
    )
);

type FormProps<TFormValues extends FieldValues> = {
    onSubmit: SubmitHandler<TFormValues>;
    children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
};

const Form = <TFormValues extends FieldValues>({
    onSubmit,
    children
}: FormProps<TFormValues>) => {
    const methods = useForm<TFormValues>();
    return (
        <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
            {children(methods)}
        </form>
    );
};

type FormValues = {
    firstName: string;
    lastName: string;
    isKoshkodevochka: boolean;
};

type ModalProps = {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [show]);

    if (!show) {
        return null;
    }

    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
                <button className={styles.closeButton} onClick={onClose}>
                    X
                </button>
                {children}
            </div>
        </div>
    );
};

export default function FormPage() {
    const [showModal, setShowModal] = useState(false);

    const onSubmit = (data: FormValues) => {
        console.log(data);
        setShowModal(false); // Закрыть модальное окно после отправки
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 540) {
                setShowModal(true);
            } else {
                setShowModal(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Инициализация

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={styles.formWrapper}>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <h2>Рофлоформа</h2>
                <Form<FormValues> onSubmit={onSubmit}>
                    {({ register }) => (
                        <>
                            <Input
                                {...register('firstName')}
                                placeholder='Fifth Name'
                            />
                            <Input
                                {...register('lastName')}
                                placeholder='Third Name'
                            />
                            <p>Вы являетесь разработчиком?</p>
                            <Select
                                {...register('isKoshkodevochka')}
                                options={[
                                    { label: 'Yes', value: 'yes' },
                                    { label: 'No', value: 'no' }
                                ]}
                            />
                            <Input type='submit' />
                        </>
                    )}
                </Form>
            </Modal>
        </div>
    );
}
