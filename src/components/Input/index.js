import React from "react";
import styles from './index.module.scss'
import classnames from 'classnames'
function Input({extra,onExtraClick,className,...rest}) {
    return (
        <div className={styles.root}>
            <input className={classnames("input",className)} {...rest}/>
            {extra ?(
                <div className="extra" onClick={onExtraClick}>
                    {extra}
                </div>
            ):null}
        </div>
    );
}

export default Input;
