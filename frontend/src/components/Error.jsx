import { useState } from "react";

const Error = (props) => {
    const [visible, setVisible] = useState(true);
    return (
        <>
            {visible &&
                <div className="flex justify-between items-center bg-red-100 text-red-400 font-bold pl-2 border-red-400 border-2 mb-2">
                    <span className="p-2">{props.error}</span>
                    <span className="cursor-pointer p-2"
                        onClick={() => setVisible(false)}>&times;</span>
                </div>
            }
        </>
    )
}

export default Error;