import {TextareaHTMLAttributes, useEffect, useRef, useState} from "react";
import classnames from "classnames";
import styles from "./index.module.scss";

type Props = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>,
    'maxLength' | 'value' | 'onChange'> & {
    maxLength?: number
    className?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

function Textarea({className, value, onChange, maxLength = 100,...rest}: Props) {
    const [count, setCount] = useState(value!.length || 0);
    const textRef = useRef<HTMLTextAreaElement>(null)
    useEffect(() => {
        textRef.current!.focus();
    })

    const onValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
          {...rest}
      />
            <div className="count">
                {count}/{maxLength}
            </div>
        </div>
    );
};

export default Textarea;
