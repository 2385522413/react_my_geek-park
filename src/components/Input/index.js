import React, {useEffect, useRef} from "react";
import styles from './index.module.scss'
import classnames from 'classnames'
function Input({extra,onExtraClick,className,autoFocus,...rest}) {
    const inputRef = useRef(null);
    useEffect(()=>{
        if (autoFocus) {
            inputRef.current.focus();
        }
    },[autoFocus])
    return (
        <div className={styles.root}>
            <input ref={inputRef} className={classnames("input",className)} {...rest}/>
            {extra ?(
                <div className="extra" onClick={onExtraClick}>
                    {extra}
                </div>
            ):null}
        </div>
    );
}

export default Input;
