const Button = ({ variant, type, label, onClick, loading, disabled }) => {
    const primaryClasses = ' text-white bg-[#07271f] border-[#07271f] hover:shadow-[0_0_5px_5px_#9bf2c5]';
    const secondaryClasses = ' text-white bg-green-400 border-green-400 hover:shadow-[0_0_2px_2px_#03d47c]';
    const dangerClasses = ' text-white bg-[#AE899A] border-[#AE899A] hover:shadow-[0_0_5px_5px_#ae899a70]';
    const lightClasses = ' text-[#e5fafe] border-green-400 hover:shadow-[0_0_3px_3px_#03d47c]';

    const classNameCreator = () => {
        let finalClassName =
            'flex justify-center items-center outline-none duration-300 h-10 text-lg font-semibold px-3 rounded-2xl border-2';
        if (variant === 'primary') {
            finalClassName += primaryClasses;
        } else if (variant === 'secondary') {
            finalClassName += secondaryClasses;
        } else if (variant === 'danger') {
            finalClassName += dangerClasses;
        } else if (variant === 'light') {
            finalClassName += lightClasses;
        }
        finalClassName += ' disabled:shadow-none disabled:bg-gray-300 disabled:border-gray-300';
        return finalClassName;
    };

    const loadingIconCreator = () => {
        return <div className='w-6 h-6 rounded-full animate-spin border-2 border-gray-400 border-t-gray-800'></div>;
    };

    return (
        <button type={type} onClick={onClick} className={classNameCreator()} disabled={disabled}>
            {loading ? loadingIconCreator() : label}
        </button>
    );
};

export default Button;
