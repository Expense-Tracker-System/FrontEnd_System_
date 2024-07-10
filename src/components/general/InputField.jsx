import { Controller } from 'react-hook-form';

const InputField = ({ control, label, inputName, inputType = 'text', error, isTextarea = false }) => {
    const renderTopRow = () => {
        if (error) {
            return <span className='text-red-600 font-semibold'>{error}</span>;
        }
        if (label) {
            return <label className='font-semibold'>{label}</label>;
        }
        return null;
    };

    const dynamicClassName = error ? 'border-red-500 rounded-lg' : 'border-[#3eab73]';

    return (
        <div className='px-12 my-2 w-full'>
            {renderTopRow()}
            <Controller
                name={inputName}
                control={control}
                render={({ field }) => (
                    isTextarea ?
                        <textarea
                            {...field}
                            autoComplete='off'
                            rows={''}
                            cols={''}
                            className= {`w-full border-1 rounded-lg ${error ? 'border-red-500' : 'border-[#3eab73]'} focus:outline-none`}
                        />
                        :
                        <input
                            {...field}
                            autoComplete='off'
                            type={inputType}
                            className={dynamicClassName}
                        />
                )}
            />
        </div>
    );
};

export default InputField;
