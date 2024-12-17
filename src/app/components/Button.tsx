import { ReactNode } from 'react';

type ButtonProps = {
    handleClick?: () => void;
    children?: ReactNode;
};

function Button({ handleClick, children }: ButtonProps) {
    return (
        <>
            <button
                onClick={handleClick}
                style={{
                    border: '1px solid gray',
                    padding: '6px 10px',
                    margin: '0 10px',
                    borderRadius: '3px',
                }}
            >
                {children}
            </button>
        </>
    );
}

export default Button;
