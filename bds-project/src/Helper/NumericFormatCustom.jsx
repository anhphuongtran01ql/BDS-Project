import {NumericFormat} from 'react-number-format';
import PropTypes from "prop-types";
import {forwardRef} from "react";

const NumericFormatCustom = forwardRef(function NumericFormatCustom(
    props,
    ref,
) {
    const {onChange, ...other} = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            valueIsNumericString
        />
    );
});

NumericFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
export default NumericFormatCustom;