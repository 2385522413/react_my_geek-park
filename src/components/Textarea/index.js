import {useEffect, useRef, useState} from "react";
import classnames from "classnames";
import styles from "./index.module.scss";

function Textarea({className, value, onChange, placeholder, maxLength = 100}) {
    const [count, setCount] = useState(value.length || 0);
    const textRef=useRef(null)
    useEffect(()=>{
        textRef.current.focus();
    })

    const onValueChange = e => {
        onChange && onChange(e);
        setCount(e.target.value.length);
    };

    return (
        <div className={classnames(styles.root, className)}>
      <textarea
          ref={textRef}
          className="textarea"
          value={value}
          onChange={onValueChange}
          maxLength={maxLength}
          placeholder={placeholder}
      />
            <div className="count">
                {count}/{maxLength}
            </div>
        </div>
    );
};

export default Textarea;
