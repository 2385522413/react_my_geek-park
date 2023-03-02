import React, {InputHTMLAttributes, useEffect, useRef} from "react";
import styles from './index.module.scss'
import classnames from 'classnames'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    extra?: string
    onExtraClick?: () => void
    className?: string
    autoFocus?: boolean
}

function Input({extra, onExtraClick, className, autoFocus, ...rest}: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (autoFocus) {
            inputRef.current!.focus();
        }
    }, [autoFocus])
    return (
        <div className={styles.root}>
            <input ref={inputRef} className={classnames("input", className)} {...rest}/>
            {extra ? (
                <div className="extra" onClick={onExtraClick}>
                    {extra}
                </div>
            ) : null}
        </div>
    );
}

export default Input;
